import React, { useState } from 'react';
import { useChat } from './ChatContext';

const MessageInput: React.FC = () => {
  const { sendMessage, loading, activeThread, uploadFile } = useChat();
  const [messageContent, setMessageContent] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageContent.trim() && activeThread) {
      sendMessage(messageContent);
      setMessageContent('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      uploadFile(selectedFile);
      setSelectedFile(null); // Clear selected file after upload
    }
  };

  return (
    <div className="message-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type a message..."
          disabled={loading || !activeThread}
        />
        <button type="submit" disabled={loading || !activeThread}>Send</button>
      </form>
      <div>
        <input type="file" onChange={handleFileChange} disabled={loading || !activeThread} />
        <button onClick={handleFileUpload} disabled={loading || !activeThread || !selectedFile}>Upload File</button>
        {selectedFile && <span>{selectedFile.name} ready for upload</span>}
      </div>
    </div>
  );
};

export default MessageInput;
