import React from 'react';
import { ChatkitConfig } from './interfaces';
import { ChatProvider } from './ChatContext';
import { useChat } from './ChatContext';

import ChatkitHeader from './ChatkitHeader';
import ThreadList from './ThreadList';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

import styles from './Chatkit.module.css'; // Import the CSS module

interface ChatkitProps {
  config: ChatkitConfig;
}

const ChatkitContent: React.FC = () => {
  const { threads, activeThread, loading, error } = useChat();

  return (
    <div className={styles['chatkit-container']}> {/* Apply the class from the CSS module */}
      <ChatkitHeader config={useChat().config} loading={loading} error={error} />
      <div className={styles['chat-main']}>
        <ThreadList />
        <div className={styles['chat-panel']}>
          <ChatWindow />
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

const Chatkit: React.FC<ChatkitProps> = ({ config }) => {
  return (
    <ChatProvider config={config}>
      <ChatkitContent />
    </ChatProvider>
  );
};

export default Chatkit;
