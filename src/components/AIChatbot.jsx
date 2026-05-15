import React, { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Send message to backend API
   * The backend communicates with Google Gemini API
   * API key is kept secure on the backend, never exposed to frontend
   */
  const handleSendMessage = async e => {
    e.preventDefault();

    // Validate input
    if (!inputValue.trim()) {
      setError('Please enter a message');
      return;
    }

    // Clear error state
    setError(null);

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send message to backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
        }),
      });

      // Handle response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Add AI response to chat
        const aiMessage = {
          id: Date.now() + 1,
          text: data.reply,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
      console.error('Chat Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setError(null);
    setInputValue('');
  };

  return (
    <div className='chatbot-container'>
      <div className='chatbot-header'>
        <h2>🤖 AI Chatbot</h2>
        <p>Powered by Google Gemini</p>
      </div>

      <div className='chatbot-messages'>
        {messages.length === 0 && (
          <div className='chatbot-empty-state'>
            <p>Start a conversation with the AI</p>
            <small>Type a message and press Enter or click Send</small>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
            <div className='message-content'>
              <p>{msg.text}</p>
              <small>{msg.timestamp.toLocaleTimeString()}</small>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className='chatbot-message ai'>
            <div className='message-content'>
              <div className='typing-indicator'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className='chatbot-error'>
            <p>❌ Error: {error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className='chatbot-input-form'>
        <input
          type='text'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='Type your message...'
          disabled={isLoading}
          className='chatbot-input'
        />
        <button
          type='submit'
          disabled={isLoading || !inputValue.trim()}
          className='chatbot-send-btn'
        >
          {isLoading ? '⏳ Sending...' : '📤 Send'}
        </button>
        {messages.length > 0 && (
          <button
            type='button'
            onClick={handleClearChat}
            disabled={isLoading}
            className='chatbot-clear-btn'
          >
            🗑️ Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default AIChatbot;
