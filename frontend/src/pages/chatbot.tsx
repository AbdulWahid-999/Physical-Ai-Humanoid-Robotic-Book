import React from 'react';
import Layout from '@theme/Layout';
import ChatbotInterface from '../components/Chatbot/ChatbotInterface';

function ChatbotPage() {
  return (
    <Layout
      title="Chatbot"
      description="Engage with our AI Chatbot">
      <main>
        <ChatbotInterface />
      </main>
    </Layout>
  );
}

export default ChatbotPage;
