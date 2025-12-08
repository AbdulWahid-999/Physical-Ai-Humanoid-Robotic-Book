import React, { useEffect, useRef } from 'react';
import { useChat } from './ChatContext';
import { ChatMessage } from './interfaces';

const ChatWindow: React.FC = () => {
  const { activeThread, loading, editMessage, regenerateMessage, likeMessage, dislikeMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeThread?.messages]);

  if (!activeThread) {
    return <div className="chat-window">Select a thread to start chatting.</div>;
  }

  return (
    <div className="chat-window">
      <h2>{activeThread.title}</h2>
      <div className="message-list" style={{ border: '1px solid #ccc', height: '300px', overflowY: 'auto', padding: '10px' }}>
        {activeThread.messages.length === 0 && <p>No messages yet.</p>}
        {activeThread.messages.map((message: ChatMessage) => (
          <div key={message.id} style={{ marginBottom: '5px', background: message.role === 'user' ? '#e6f7ff' : '#f0f0f0', padding: '5px', borderRadius: '5px' }}>
            <strong>{message.role}:</strong> {message.content} <small>({new Date(message.timestamp).toLocaleTimeString()})</small>
            <div>
              <button onClick={() => editMessage(activeThread.id, message.id, prompt('Edit message:', message.content) || message.content)} disabled={loading}>Edit</button>
              <button onClick={() => regenerateMessage(activeThread.id, message.id)} disabled={loading}>Regenerate</button>
              <button onClick={() => likeMessage(activeThread.id, message.id)} disabled={loading}>👍</button>
              <button onClick={() => dislikeMessage(activeThread.id, message.id)} disabled={loading}>👎</button>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
