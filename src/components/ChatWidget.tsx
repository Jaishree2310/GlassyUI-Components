import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ChatWidget.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatWidgetProps {
  apiEndpoint?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  apiEndpoint = 'http://localhost:5000/api/chat',
  title = '💬 Chat Assistant',
  subtitle = 'How can I help you today?',
  placeholder = 'Type your message...',
  buttonText = '💬',
}) => {
  // State Management
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // LocalStorage key
  const STORAGE_KEY = 'chat_widget_messages';

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus management when opening
  useEffect(() => {
    if (isOpen) {
      // Focus on input when opened
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      setIsOpen(false);
    }
  };

  // Send message handler
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Clear error
    setError(null);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedInput,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call API
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Connection error';
      setError(errorMsg);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter to send, Shift+Enter for newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isLoading) {
        handleSendMessage(e as any);
      }
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    setError(null);
    inputRef.current?.focus();
  };

  // Close widget and manage focus
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button - Fixed Bottom-Left */}
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Open chat widget'
        aria-expanded={isOpen}
        aria-controls='chat-widget-panel'
        title='Chat with assistant'
      >
        {buttonText}
      </button>

      {/* Backdrop - Only shown when open */}
      {isOpen && (
        <div
          ref={backdropRef}
          className={styles.backdrop}
          onClick={handleBackdropClick}
          role='presentation'
          aria-hidden='true'
        />
      )}

      {/* Chat Panel */}
      <div
        id='chat-widget-panel'
        ref={panelRef}
        className={`${styles.chatPanel} ${isOpen ? styles.open : ''}`}
        role='dialog'
        aria-labelledby='chat-panel-title'
        aria-modal='true'
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 id='chat-panel-title' className={styles.title}>
              {title}
            </h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label='Close chat'
            title='Close chat panel'
          >
            ✕
          </button>
        </div>

        {/* Messages Container */}
        <div className={styles.messagesContainer} role='log' aria-live='polite'>
          {messages.length === 0 && (
            <div className={styles.emptyState}>
              <p>👋 Start a conversation with the assistant</p>
              <small>Your messages will be saved locally</small>
            </div>
          )}

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`${styles.message} ${styles[msg.role]}`}
              role='article'
              aria-label={`${msg.role} message`}
            >
              <div className={styles.messageContent}>
                <p className={styles.messageText}>{msg.content}</p>
                <span className={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}

          {/* Loading state */}
          {isLoading && (
            <div className={`${styles.message} ${styles.assistant}`}>
              <div className={styles.messageContent}>
                <div
                  className={styles.typingIndicator}
                  aria-label='AI is typing'
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className={styles.errorMessage} role='alert'>
              <p>❌ {error}</p>
              <button
                className={styles.retryButton}
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer with Input */}
        <form
          onSubmit={handleSendMessage}
          className={styles.footer}
          role='search'
          aria-label='Message input'
        >
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            className={styles.input}
            rows={1}
            aria-label='Message input field'
            aria-describedby='input-hint'
          />
          <div id='input-hint' className={styles.inputHint}>
            Press Enter to send, Shift+Enter for new line
          </div>

          {/* Privacy Notice */}
          <div className={styles.privacyNotice} role='note'>
            🔒 Your messages are private and never shared
          </div>

          <div className={styles.buttonGroup}>
            <button
              type='submit'
              disabled={!inputValue.trim() || isLoading}
              className={styles.sendButton}
              aria-label='Send message'
            >
              {isLoading ? '⏳' : '📤'}
            </button>

            {messages.length > 0 && (
              <button
                type='button'
                onClick={handleClearChat}
                disabled={isLoading}
                className={styles.clearButton}
                aria-label='Clear chat history'
                title='Clear all messages'
              >
                🗑️
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;
