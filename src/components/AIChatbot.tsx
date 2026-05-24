import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const KNOWLEDGE_BASE = [
  {
    keywords: ['install', 'setup', 'how to use', 'get started', 'npm', 'yarn'],
    response:
      'To use GlassyUI-Components, simply navigate to the "Explore Components" section, choose a component, and copy its code directly into your React project. Make sure you have Tailwind CSS or support for CSS backdrop-filter enabled in your styling setup.',
  },
  {
    keywords: ['button', 'buttons'],
    response:
      'Our glassmorphic buttons feature subtle glow effects, smooth hover animations, and translucent borders. You can view the details and copy the styles in the "Button" component page.',
  },
  {
    keywords: ['card', 'cards'],
    response:
      'Cards are the core of glassmorphism. They feature multi-layered drop shadows, backdrop blur filters, and thin semi-transparent white borders to mimic real frosted glass. View them in the "Card" component page.',
  },
  {
    keywords: ['contribute', 'github', 'gssoc', 'pr', 'open source', 'issue'],
    response:
      'We welcome all contributions! You can find our repository at https://github.com/Jaishree2310/GlassyUI-Components. Fork the repo, look for open issues (including GSSOC tasks), and submit a pull request.',
  },
  {
    keywords: ['donate', 'sponsor', 'money', 'support'],
    response:
      'You can support our open-source journey by clicking "Sponsor" in the navbar, or by heading directly to the "/donate" page. Thank you for supporting the community!',
  },
  {
    keywords: ['components', 'list', 'what do you have', 'available'],
    response:
      'We offer a wide range of glassy components: Buttons, Cards, Inputs, Textareas, Modals, Calendars, Tooltips, Navigation headers, Progress Bars, Speed Dial menus, and much more!',
  },
  {
    keywords: ['about', 'mission', 'creator', 'who made', 'glassyui'],
    response:
      'GlassyUI-Components is a community-driven project created to bring stunning, accessible glassmorphic UI elements to modern web developers. It was initiated by Jaishree2310 and developed by dozens of talented contributors.',
  },
  {
    keywords: ['contact', 'email', 'support', 'help'],
    response:
      'You can get in touch with us through the "Contact Us" page on our website, or by creating a GitHub issue for technical feedback.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'yo'],
    response:
      'Hello! I am your GlassyUI Assistant. Ask me anything about our components, how to install them, or how to contribute to our open-source project!',
  },
];

const getBotResponse = (query: string): string => {
  const cleanQuery = query.toLowerCase();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some(keyword => cleanQuery.includes(keyword))) {
      return entry.response;
    }
  }
  return "That's a great question! While I don't have a specific answer for that, you can check our official documentation, open a GitHub discussion, or ask the maintainers directly on our repository at github.com/Jaishree2310/GlassyUI-Components.";
};

const AiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Hi there! I am your GlassyUI Assistant. How can I help you build beautiful glassmorphism interfaces today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = getBotResponse(userMessage.text);
      const botMessage: Message = {
        id: Math.random().toString(36).substring(7),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className='fixed bottom-6 right-6 z-50 font-sans'>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='w-[350px] sm:w-[400px] h-[500px] rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl bg-slate-900/80 text-white flex flex-col overflow-hidden mb-4'
          >
            {/* Chat Header */}
            <div className='px-6 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-blue-600/30 to-purple-600/30'>
              <div className='flex items-center gap-3'>
                <div className='p-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-400'>
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className='font-semibold text-sm flex items-center gap-1.5'>
                    GlassyUI Assistant
                    <Sparkles
                      size={12}
                      className='text-yellow-300 animate-pulse'
                    />
                  </h3>
                  <p className='text-[10px] text-green-400 font-light flex items-center gap-1'>
                    <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-ping' />
                    Online & Ready
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white'
                aria-label='Close Chat'
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className='flex-1 p-6 overflow-y-auto space-y-4 max-h-[350px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent'>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div
                    className={`p-2 h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${
                      msg.sender === 'user'
                        ? 'bg-blue-600/20 border-blue-500/30 text-blue-300'
                        : 'bg-white/5 border-white/10 text-purple-300'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User size={14} />
                    ) : (
                      <Bot size={14} />
                    )}
                  </div>
                  <div
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed border ${
                      msg.sender === 'user'
                        ? 'bg-blue-600/20 border-blue-500/30 text-white rounded-tr-none'
                        : 'bg-white/5 border-white/10 text-gray-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className='flex gap-3 max-w-[85%]'>
                  <div className='p-2 h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-purple-300'>
                    <Bot size={14} />
                  </div>
                  <div className='p-3.5 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 flex items-center gap-1.5'>
                    <span
                      className='w-2 h-2 rounded-full bg-white/40 animate-bounce'
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className='w-2 h-2 rounded-full bg-white/40 animate-bounce'
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className='w-2 h-2 rounded-full bg-white/40 animate-bounce'
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className='p-4 border-t border-white/10 bg-black/20 flex gap-2 items-center'>
              <input
                type='text'
                placeholder='Ask me a question...'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className='flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors text-sm'
              />
              <button
                onClick={handleSendMessage}
                className='p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 border border-blue-500/50 text-white transition-all hover:scale-105 active:scale-95'
                aria-label='Send Message'
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative group'
        aria-label='Open Chat'
      >
        <MessageSquare size={24} />
        {!isOpen && (
          <span className='absolute bottom-full mb-2.5 right-0 px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none'>
            Chat with Assistant
          </span>
        )}
      </button>
    </div>
  );
};

export default AiChatbot;
