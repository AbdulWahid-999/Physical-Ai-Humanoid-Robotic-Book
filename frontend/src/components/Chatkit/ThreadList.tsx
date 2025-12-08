import React from 'react';
import { useChat } from './ChatContext';
import { ChatThread } from './interfaces';

const ThreadList: React.FC = () => {
  const { threads, activeThread, switchThread, createThread, deleteThread, loading } = useChat();

  return (
    <div className="thread-list">
      <h2>Threads</h2>
      <ul>
        {threads.map((thread: ChatThread) => (
          <li key={thread.id}>
            <button onClick={() => switchThread(thread.id)} disabled={loading}>
              {thread.title} {activeThread?.id === thread.id && '(Active)'}
            </button>
            <button onClick={() => deleteThread(thread.id)} disabled={loading}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => createThread('Hello new thread!')} disabled={loading}>Create New Thread</button>
    </div>
  );
};

export default ThreadList;
