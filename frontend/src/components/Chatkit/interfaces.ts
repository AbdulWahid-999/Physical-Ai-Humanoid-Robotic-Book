export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
}

export interface ChatThread {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatContextType {
  threads: ChatThread[];
  activeThread: ChatThread | null;
  loading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  createThread: (initialMessageContent: string) => Promise<void>;
  switchThread: (threadId: string) => void;
  deleteThread: (threadId: string) => Promise<void>;
  editMessage: (threadId: string, messageId: string, newContent: string) => Promise<void>;
  regenerateMessage: (threadId: string, messageId: string) => Promise<void>;
  uploadFile: (file: File) => Promise<void>; // For file attachments
  likeMessage: (threadId: string, messageId: string) => Promise<void>; // For feedback
  dislikeMessage: (threadId: string, messageId: string) => Promise<void>; // For feedback
}

export interface ChatkitConfig {
  apiEndpoint: string;
  websocketEndpoint: string;
  projectId: string;
  userId: string;
}

