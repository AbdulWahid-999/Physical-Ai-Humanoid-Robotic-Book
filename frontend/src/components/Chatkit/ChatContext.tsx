import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect, useRef } from 'react';
import { ChatContextType, ChatMessage, ChatThread, ChatkitConfig } from './interfaces';

interface ChatProviderProps {
  children: ReactNode;
  config: ChatkitConfig;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children, config }) => {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const websocketRef = useRef<WebSocket | null>(null);

  const apiCall = useCallback(async (
    method: string,
    path: string,
    body?: any,
    isFormData: boolean = false
  ) => {
    setLoading(true);
    setError(null);
    try {
      const headers: HeadersInit = isFormData ? {} : { 'Content-Type': 'application/json' };
      const response = await fetch(`${config.apiEndpoint}${path}`, {
        method,
        headers,
        body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || response.statusText);
      }
      return await response.json();
    } catch (err: any) {
      setError(err.message || 'An API error occurred.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [config.apiEndpoint]);

  const fetchThreads = useCallback(async () => {
    try {
      const fetchedThreads: ChatThread[] = await apiCall('GET', '/threads');
      setThreads(fetchedThreads);
      if (fetchedThreads.length > 0 && !activeThread) {
        setActiveThread(fetchedThreads[0]);
      }
    } catch (err) {
      console.error("Failed to fetch threads:", err);
    }
  }, [apiCall, activeThread]);


  const sendMessage = useCallback(async (content: string) => {
    if (!activeThread) {
      setError('No active thread to send message to.');
      return;
    }
    try {
      const newMessage = await apiCall('POST', `/threads/${activeThread.id}/messages`, { content, role: 'user' });
      // Optimistically update the UI, assuming the WebSocket will confirm
      setActiveThread(prev => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, newMessage],
          updatedAt: new Date().toISOString(),
        };
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  }, [activeThread, apiCall]);

  const createThread = useCallback(async (initialMessageContent: string) => {
    try {
      const newThread = await apiCall('POST', '/threads', { initialMessageContent });
      setThreads(prev => [...prev, newThread]);
      setActiveThread(newThread);
      // If there was an initial message, send it to the new thread
      if (initialMessageContent) {
        await sendMessage(initialMessageContent);
      }
    } catch (err) {
      console.error("Failed to create thread:", err);
    }
  }, [apiCall, sendMessage]);

  const switchThread = useCallback((threadId: string) => {
    const threadToActivate = threads.find(thread => thread.id === threadId);
    setActiveThread(threadToActivate || null);
  }, [threads]);

  const deleteThread = useCallback(async (threadId: string) => {
    try {
      await apiCall('DELETE', `/threads/${threadId}`);
      setThreads(prev => prev.filter(thread => thread.id !== threadId));
      if (activeThread?.id === threadId) {
        setActiveThread(null);
      }
    } catch (err) {
      console.error("Failed to delete thread:", err);
    }
  }, [activeThread, apiCall]);

  const editMessage = useCallback(async (threadId: string, messageId: string, newContent: string) => {
    try {
      const updatedMessage = await apiCall('PUT', `/threads/${threadId}/messages/${messageId}`, { content: newContent });
      setActiveThread(prev => {
        if (!prev || prev.id !== threadId) return prev;
        return {
          ...prev,
          messages: prev.messages.map(msg =>
            msg.id === messageId ? updatedMessage : msg
          ),
          updatedAt: new Date().toISOString(),
        };
      });
    } catch (err) {
      console.error("Failed to edit message:", err);
    }
  }, [apiCall]);

  const regenerateMessage = useCallback(async (threadId: string, messageId: string) => {
    try {
      const regeneratedMessage = await apiCall('POST', `/threads/${threadId}/messages/${messageId}/regenerate`);
      setActiveThread(prev => {
        if (!prev || prev.id !== threadId) return prev;
        return {
          ...prev,
          messages: prev.messages.map(msg =>
            msg.id === messageId ? regeneratedMessage : msg
          ),
          updatedAt: new Date().toISOString(),
        };
      });
    } catch (err) {
      console.error("Failed to regenerate message:", err);
    }
  }, [apiCall]);

  const uploadFile = useCallback(async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiCall('POST', '/upload', formData, true);
      console.log('File upload response:', response);
      // Handle response, e.g., send a message with file info
    } catch (err) {
      console.error("Failed to upload file:", err);
    }
  }, [apiCall]);

  const likeMessage = useCallback(async (threadId: string, messageId: string) => {
    try {
      await apiCall('POST', `/threads/${threadId}/messages/${messageId}/like`);
      console.log(`Liked message ${messageId} in thread ${threadId}`);
    } catch (err) {
      console.error("Failed to like message:", err);
    }
  }, [apiCall]);

  const dislikeMessage = useCallback(async (threadId: string, messageId: string) => {
    try {
      await apiCall('POST', `/threads/${threadId}/messages/${messageId}/dislike`);
      console.log(`Disliked message ${messageId} in thread ${threadId}`);
    } catch (err) {
      console.error("Failed to dislike message:", err);
    }
  }, [apiCall]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  // WebSocket Integration
  useEffect(() => {
    if (!config.websocketEndpoint) return;

    const connectWebSocket = () => {
      websocketRef.current = new WebSocket(config.websocketEndpoint);

      websocketRef.current.onopen = () => {
        console.log('WebSocket Connected');
        setError(null);
      };

      websocketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket Message:', data);
        // Handle incoming messages (e.g., new messages, message updates)
        // This will require more sophisticated state updates based on message type
        if (data.type === 'new_message' && activeThread?.id === data.threadId) {
          setActiveThread(prev => {
            if (!prev) return null;
            return {
              ...prev,
              messages: [...prev.messages, data.message],
              updatedAt: new Date().toISOString(),
            };
          });
        } else if (data.type === 'thread_update') {
          // Potentially refetch threads or update a specific thread
          fetchThreads();
        }
      };

      websocketRef.current.onerror = (err) => {
        console.error('WebSocket Error:', err);
        setError('WebSocket connection error. Attempting to reconnect...');
      };

      websocketRef.current.onclose = () => {
        console.log('WebSocket Disconnected. Attempting to reconnect in 3 seconds...');
        setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
      };
    };

    connectWebSocket();

    return () => {
      websocketRef.current?.close();
    };
  }, [config.websocketEndpoint, activeThread, fetchThreads]);


  const contextValue: ChatContextType = {
    threads,
    activeThread,
    loading,
    error,
    sendMessage,
    createThread,
    switchThread,
    deleteThread,
    editMessage,
    regenerateMessage,
    uploadFile,
    likeMessage,
    dislikeMessage,
  };

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
