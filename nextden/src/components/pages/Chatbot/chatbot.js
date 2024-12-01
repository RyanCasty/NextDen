import { useState, useEffect, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import '../Chatbot/chatbot.css';
import happyImg from '../../../happy.png';
import neutralImg from '../../../neutral.png';
import angryImg from '../../../angry.png';

const FinanceCoach = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [coachStatus, setCoachStatus] = useState('neutral');
  const messagesEndRef = useRef(null);

  const statusToImage = {
    happy: happyImg,
    neutral: neutralImg,
    grumpy: angryImg,
  };

  const statusText = {
    happy: "Happy :)",
    neutral: "Online",
    grumpy: "Grumpy!"
  };

  const statusColors = {
    happy: "#4CAF50",
    neutral: "#808080",
    grumpy: "#FF0000"
  };

  const getRandomStatus = (currentStatus) => {
    const states = Object.keys(statusToImage).filter(state => state !== currentStatus);
    return states[Math.floor(Math.random() * states.length)];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCoachStatus(prevStatus => getRandomStatus(prevStatus));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // This is where you would make the actual API call to OpenAI
      // For demonstration, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const assistantMessage = {
        role: 'assistant',
        content: 'This is a simulated response. In a real implementation, this would be replaced with the OpenAI API response.'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="coach-info">
          <div 
            className="coach-avatar"
            style={{ 
              backgroundImage: `url(${statusToImage[coachStatus]})`,
            }}
          />
          <div className="coach-details">
            <h3 className="coach-name">Cubby Coach</h3>
            <span 
              className="coach-status"
              style={{ 
                color: statusColors[coachStatus],
                '--dot-color': statusColors[coachStatus]
              }}
            >
              Status: {statusText[coachStatus]}
            </span>
          </div>
        </div>
      </div>

      <div className="chat-content">
        <div className="chat-title">
          <h1>Hey, what do you want to do today?</h1>
        </div>

        <div className="messages">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              {message.role === 'assistant' && (
                <div 
                  className="coach-avatar-small"
                  style={{ 
                    backgroundImage: `url(${statusToImage[coachStatus]})`,
                  }}
                />
              )}
              <div className="message-content">
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant-message">
              <div 
                className="coach-avatar-small"
                style={{ 
                  backgroundImage: `url(${statusToImage[coachStatus]})`,
                }}
              />
              <div className="message-content">
                <div className="loading">
                  <Loader2 className="animate-spin" size={20} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input">
        <textarea
          className="input-field"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          rows={1}
        />
        <button 
          className="send-button"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default FinanceCoach;