
import React, { useState, useRef, useEffect } from "react";
import "./ChatbotInterface.css";

const API_ENDPOINT = "http://localhost:8000/ask"; // <--- API Endpoint defined here!

function ChatbotInterface() {
  // New state to control visibility: starts as closed (false)
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Book Assistant. Ask me anything about the book's content!",
      sender: "agent",
      id: 1,
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); // Toggle function

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }; // Scroll when the chat is open AND messages change

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]); // --- INTEGRATED handleSend FUNCTION ---

  const handleSend = async () => {
    // CRITICAL: Function must be async
    const userQuery = input.trim();
    if (userQuery === "") return; // 1. Add user message to state and clear input

    const newUserMessage = { text: userQuery, sender: "user", id: Date.now() };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput(""); // 2. Add 'Thinking...' message
    const thinkingMessage = {
      text: "Thinking...",
      sender: "agent",
      id: Date.now() + 1,
    };
    setMessages((prevMessages) => [...prevMessages, thinkingMessage]); // 3. Backend Call (Replacing the setTimeout placeholder)

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Critical for FastAPI
        }, // Send data matching the FastAPI Pydantic model
        body: JSON.stringify({
          query: userQuery,
          user_id: "docusaurus-user",
        }),
      });

      if (!response.ok) {
        // Throw error if HTTP status is 4xx or 5xx
        throw new Error(
          `Server returned status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const agentResponseText = data.answer; // 4. Replace 'Thinking...' with the final RAG answer

      setMessages((prevMessages) => {
        // Filter out the 'Thinking...' message
        const messagesWithoutThinking = prevMessages.filter(
          (msg) => msg.id !== thinkingMessage.id
        );
        const agentResponse = {
          text: agentResponseText,
          sender: "agent",
          id: Date.now() + 2,
        };
        return [...messagesWithoutThinking, agentResponse];
      });
    } catch (error) {
      console.error(" API Call Error:", error); // 5. Replace 'Thinking...' with an error message
      setMessages((prevMessages) => {
        const messagesWithoutThinking = prevMessages.filter(
          (msg) => msg.id !== thinkingMessage.id
        );
        const errorResponse = {
          text: `Error: Failed to connect to AI. Check server (http://localhost:8000).`,
          sender: "agent",
          id: Date.now() + 2,
        };
        return [...messagesWithoutThinking, errorResponse];
      });
    }
  }; // --- RENDER LOGIC ---

  return (
    <div className={`chatbot-container ${isOpen ? "open" : "closed"}`}>
                  {/* 1. The Floating Icon/Button (Always visible) */}     {" "}
      <button className="chatbot-toggle-button" onClick={toggleChat}>
        {isOpen ? "❌" : "💬"} {" "}
      </button>
            {/* 2. The Full Chat Interface (Conditionally visible) */}     {" "}
      <div className={`chatbot-widget ${isOpen ? "open" : "closed"}`}>
        <h3> 🤖 Book Assistant</h3> {" "}
        <div className="messages-window">
               {" "}
          {messages.map((msg) => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                    {msg.text}     {" "}
            </div>
          ))}
                <div ref={messagesEndRef} />     {" "}
        </div>
        {" "}
        <div className="input-area">
          {" "}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask a question..."
            disabled={messages.some((msg) => msg.text === "Thinking...")}
          />
               {" "}
          <button
            onClick={handleSend}
            disabled={messages.some((msg) => msg.text === "Thinking...")}
          >
                Send     {" "}
          </button>
               {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
}

export default ChatbotInterface;
