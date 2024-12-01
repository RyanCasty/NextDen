import { useState } from "react";
import axios from "axios";
import "./chatbot.css";

function ChatBot() {
  const [message, setMessage] = useState(""); // Message to send
  const [chatHistory, setChatHistory] = useState([]); // Chat messages

  // Handle sending the message to the backend API
  const handleSendMessage = async () => {
    if (!message.trim()) return; // Prevent empty messages

    // Add the user's message to the chat history
    const userMessage = { sender: "user", content: message };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      // Send the message to the backend
      const response = await axios.post("http://localhost:5001/chat", {
        message,
      });

      // Add the bot's response to the chat history
      const botMessage = { sender: "bot", content: response.data.response };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorMessage = {
        sender: "bot",
        content: "Oops! Something went wrong. Please try again.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    }

    // Clear the input field
    setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="coach-info">
          <div className="coach-avatar"></div>
          <div className="coach-details">
            <h3 className="coach-name">Cubby Coach</h3>
            <span className="coach-status">Status: Grumpy!</span>
          </div>
        </div>
      </div>
      <div className="chat-content">
        <div className="chat-title">
          <h1>Hey, what do you want to do today?</h1>
        </div>
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`chat-message ${
                chat.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {chat.content}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;
