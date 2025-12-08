import React, { useState, useEffect } from 'react';
import { ChatkitConfig } from './interfaces';
import styles from './Chatkit.module.css'; // Import the CSS module

interface ChatkitHeaderProps {
  config: ChatkitConfig;
  loading: boolean;
  error: string | null;
}

const ChatkitHeader: React.FC<ChatkitHeaderProps> = ({ config, loading, error }) => {
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <div className={styles['chatkit-header']}>
      <h1>Chatkit Interface</h1>
      {loading && <p>Loading...</p>}
      {showError && error && (
        <div className={styles['error-message']}>
          <p>{error}</p>
          <button onClick={() => setShowError(false)}>X</button>
        </div>
      )}
      <p>API Endpoint: {config.apiEndpoint}</p>
      <p>WebSocket Endpoint: {config.websocketEndpoint}</p>
      <p>Project ID: {config.projectId}</p>
      <p>User ID: {config.userId}</p>
    </div>
  );
};

export default ChatkitHeader;
