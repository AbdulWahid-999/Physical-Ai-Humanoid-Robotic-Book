import React, { useState } from 'react';

const API_ENDPOINT = 'http://localhost:8000/ask'; // Your FastAPI endpoint

function ChatComponent() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('Ask a question about the book content!');
  const [loading, setLoading] = useState(false);

  // 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (!query.trim()) return; // Don't send empty queries

    setLoading(true);
    setAnswer('Searching the book and generating answer...');

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The body MUST match the ChatQuery Pydantic model in main.py
        body: JSON.stringify({ 
          query: query,
          user_id: "docusaurus-user" // Example user ID
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data.answer); // Update the answer state with the response
      
    } catch (error) {
      console.error('Error fetching RAG response:', error);
      setAnswer(`Error: Could not connect to the AI service. (${error.message})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>🤖 Book Assistant</h1>
      
      <div style={{ minHeight: '100px', padding: '15px', background: '#f8f8f8', borderRadius: '4px', marginBottom: '20px' }}>
        <p><strong>Answer:</strong> {answer}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question about the documentation content..."
          disabled={loading}
          style={{ width: '80%', padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Sending...' : 'Ask'}
        </button>
      </form>
    </div>
  );
}

export default ChatComponent;