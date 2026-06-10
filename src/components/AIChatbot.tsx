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
    keywords: ['begin', 'start', 'where', 'new', 'beginner', 'first time', 'how do i'],
    response:
      'Welcome! The best place to start is by exploring our components at the "Explore Components" section. Pick any component you like, copy the code, and paste it into your React project. Make sure you have Tailwind CSS set up first. Check our GitHub README for a full getting started guide!',
},
  {
    keywords: ['nextjs', 'next.js', 'next js', 'next', 'install with next', 'with next', 'glassyui with next'],
    response:
      'To use GlassyUI-Components with Next.js, copy the component code directly into your project. Ensure Tailwind CSS is configured in your tailwind.config.js and postcss.config.js files. Next.js 13+ with both App Router and Pages Router are fully supported. Simply run npm install, add the component code, and import it into your page or layout file!',
},
  {
    keywords:  ['setup', 'how to use', 'get started', 'npm', 'yarn', 'usage', 'how do i use', 'setup instructions'],
    response:
      'To use GlassyUI-Components, simply navigate to the "Explore Components" section, choose a component, and copy its code directly into your React project. Make sure you have Tailwind CSS or support for CSS backdrop-filter enabled in your styling setup.',
  },
  {
    keywords: ['button', 'buttons', 'cta', 'call to action', 'clickable', 'hover effect', 'glow effect', 'border effect', 'animation','hover animation', 'glow', 'border' ],
    response:
      'Our glassmorphic buttons feature subtle glow effects, smooth hover animations, and translucent borders. You can view the details and copy the styles in the "Button" component page.',
  },
  {
    keywords: ['card', 'cards', 'container', 'box', 'glass box', 'glass container', 'shadow', 'blur', 'border'],
    response:
      'Cards are the core of glassmorphism. They feature multi-layered drop shadows, backdrop blur filters, and thin semi-transparent white borders to mimic real frosted glass. View them in the "Card" component page.',
  },
  {
    keywords: ['contribute', 'github', 'gssoc', 'pr', 'open source', 'issue', 'pull request', 'how to contribute', 'contribution guidelines'],
    response:
      'We welcome all contributions! You can find our repository at https://github.com/Jaishree2310/GlassyUI-Components. Fork the repo, look for open issues (including GSSOC tasks), and submit a pull request.',
  },
  {
    keywords: ['donate', 'sponsor', 'money', 'support', 'fund', 'contribution', 'how to support', 'donation'],
    response:
      'You can support our open-source journey by clicking "Sponsor" in the navbar, or by heading directly to the "/donate" page. Thank you for supporting the community!',
  },
  {
    keywords: ['components', 'list', 'what do you have', 'available', 'show me components', 'component library', 'ui elements', 'what can i use'],
    response:
      'We offer a wide range of glassy components: Buttons, Cards, Inputs, Textareas, Modals, Calendars, Tooltips, Navigation headers, Progress Bars, Speed Dial menus, and much more!',
  },
  {
    keywords: ['about', 'mission', 'creator', 'who made', 'glassyui', 'what is glassyui', 'project info', 'project details'],
    response:
      'GlassyUI-Components is a community-driven project created to bring stunning, accessible glassmorphic UI elements to modern web developers. It was initiated by Jaishree2310 and developed by dozens of talented contributors.',
  },
  {
    keywords: ['contact', 'email', 'support', 'help', 'feedback', 'reach out', 'get in touch', 'ask a question', 'report a bug', 'suggestion', 'contact us', 'github issue', 'contact support', 'contact maintainers'],
    response:
      'You can get in touch with us through the "Contact Us" page on our website, or by creating a GitHub issue for technical feedback.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'yo','Bonjour', 'hola', 'namaste', 'salutations', 'what\'s up', 'how are you', 'good morning', 'good afternoon', 'good evening', 'welcome'],
    response:
      'Hello! I am your GlassyUI Assistant. Ask me anything about our components, how to install them, or how to contribute to our open-source project!',
  },
  {
    keywords: ['nextjs', 'next.js', 'next js', 'next', 'install with next', 'setup with next', 'use with next', 'nextjs support', 'nextjs installation', 'nextjs setup'],
    response:
      'To use GlassyUI-Components with Next.js, copy the component code directly into your project. Make sure Tailwind CSS is configured in your next.config.js and that backdrop-filter is enabled. Next.js 13+ with App Router is fully supported.',
  },
  {
    keywords: ['tailwind', 'tailwindcss', 'without tailwind', 'no tailwind', 'tailwind css', 'css only', 'manual css', 'custom css'],
    response:
      'GlassyUI-Components is built with Tailwind CSS. While Tailwind is recommended, you can replicate the glassmorphism effect manually using CSS properties like backdrop-filter: blur(), background: rgba(), and semi-transparent borders.',
  },
  {
    keywords: ['figma', 'export to figma', 'export components', 'design export', 'sketch', 'adobe xd', 'design tools', 'figma support'],
    response:
      'GlassyUI-Components does not currently support direct Figma export. However, you can recreate the glassmorphism effects in Figma using background blur and fill opacity settings. We are open to contributions that add design tool integrations!',
  },
  {
    keywords: ['typescript', 'ts', 'type', 'type safety', 'typescript support', 'typescript compatibility'],
    response:
      'GlassyUI-Components fully supports TypeScript! The library is built with TypeScript (.tsx files) ensuring type safety and better developer experience out of the box.',
  },
  {
    keywords: ['vite', 'create react app', 'cra', 'remix', 'framework', 'react framework', 'react setup', 'use with vite', 'use with remix', 'use with cra'],
    response:
      'GlassyUI-Components works with any React-based framework including Vite, Create React App, Remix, and Next.js. Just ensure Tailwind CSS is configured and backdrop-filter is supported in your setup.',
  },
  {
    keywords: ['customize', 'customization', 'change color', 'modify', 'theme', 'custom styles', 'how to customize', 'customize components'],
    response:
      'You can customize GlassyUI components by modifying the Tailwind classes directly. Adjust backdrop-blur, background opacity, border colors, and shadow values to match your design system. Each component page has a live customization demo!',
  },
  {
    keywords: ['browser', 'compatibility', 'safari', 'firefox', 'chrome', 'support', 'which browsers', 'browser support', 'compatibility issues'],
    response:
      'GlassyUI-Components supports all modern browsers including Chrome, Firefox, Edge, and Safari. Note that backdrop-filter may require the -webkit- prefix for older Safari versions. Internet Explorer is not supported.',
  },
  {
    keywords: ['performance', 'slow', 'lag', 'optimize', 'gpu', 'heavy', 'resource intensive'],
    response:
      'Glassmorphism effects use backdrop-filter which can be GPU-intensive. For best performance, avoid stacking too many blurred elements and consider using will-change: transform on animated glassy components.',
  },
  {
    keywords: ['license', 'free', 'commercial', 'paid', 'open source license', 'usage rights', 'can i use in commercial projects'],
    response:
      'GlassyUI-Components is completely free and open-source under the MIT license. You can use it in personal and commercial projects without any restrictions.',
  },
  {
    keywords: ['dark mode', 'dark', 'light mode', 'theme mode', 'dark theme', 'light theme', 'mode support'],
    response:
      'GlassyUI-Components works beautifully in both dark and light modes. The glassmorphism effect naturally adapts to your background. You can adjust background opacity and blur values for optimal appearance in each mode.',
  },
  {
    keywords: ['responsive', 'mobile', 'tablet', 'screen size', 'responsive design', 'mobile friendly', 'responsive components'],
    response:
      'All GlassyUI-Components are fully responsive and mobile-friendly. They are built with Tailwind CSS responsive prefixes (sm:, md:, lg:) so they adapt seamlessly to any screen size.',
  },
  {
    keywords: ['animation', 'transition', 'motion', 'framer', 'animate', 'animated', 'hover animation', 'motion effects'],
    response:
      'GlassyUI-Components uses Framer Motion for smooth animations and transitions. You can customize animation duration, easing, and effects by modifying the motion props on each component.',
  },
  {
    keywords: ['accessibility', 'a11y', 'aria', 'screen reader', 'keyboard navigation', 'accessible', 'accessibility support'],
    response:
      'We are actively improving accessibility across all components. Most components include aria-labels and keyboard navigation support. Contributions improving accessibility are especially welcome!',
  },
  {
    keywords: ['props', 'api', 'options', 'parameters', 'component props', 'available props', 'api documentation'],
    response:
      'Each component page includes a detailed Props section listing all available options, their types, default values, and descriptions. Check the individual component detail pages for full API documentation.',
  },
  {
    keywords: ['version', 'update', 'changelog', 'latest', 'release', 'new version', 'what\'s new', 'version history'],
    response:
      'You can find the latest version and changelog on our GitHub repository at github.com/Jaishree2310/GlassyUI-Components. We recommend always using the latest version for bug fixes and new components.',
  },
  {
    keywords: ['asd', 'qwe', 'zxc', 'xyz', 'abc', 'test', 'asdf', '123', '???', '!!!', '@33443,#,$%^&*', 'random,9000000,692010iidien vo[',"owncOI","rwnrfOIWN", 'nonsense', 'gibberish', 'unintelligible'],
    response:
      'Hmm, I think you made a typo! Well, try asking me something like "How do I install GlassyUI?", "What components are available?", or "How do I contribute?" 😊',
},
];

]; // end of KNOWLEDGE_BASE

const getBotResponse = (query: string): string => {
  const cleanQuery = query.toLowerCase();

  // Specific phrase checks first
  if (cleanQuery.includes('next.js') || cleanQuery.includes('nextjs') || cleanQuery.includes('next js') || (cleanQuery.includes('next') && cleanQuery.includes('install'))) {
    return KNOWLEDGE_BASE.find(e => e.keywords.includes('nextjs'))!.response;
  }
  if (cleanQuery.includes('vite') || cleanQuery.includes('remix') || cleanQuery.includes('cra')) {
    return KNOWLEDGE_BASE.find(e => e.keywords.includes('vite'))!.response;
  }
  if (cleanQuery.includes('without tailwind') || cleanQuery.includes('no tailwind')) {
    return KNOWLEDGE_BASE.find(e => e.keywords.includes('tailwind'))!.response;
  }

  // Fall back to keyword matching
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some(keyword => cleanQuery.includes(keyword))) {
      return entry.response;
    }
  }

  return "I didn't quite catch that! 🤔 Try asking about installation, available components, customization, or how to contribute. Type 'hi' to see what I can help with!";
};

const AiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div
      className='fixed lg:bottom-6 lg:right-6 bottom-[100px] right-4 z-50 font-sans flex flex-col items-end'
      style={isMobile ? { bottom: '100px', right: '16px' } : undefined}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='w-[350px] sm:w-[400px] h-[500px] rounded-2xl border shadow-2xl backdrop-blur-xl bg-white/85 dark:bg-slate-900/80 border-slate-200 dark:border-white/20 text-slate-800 dark:text-white flex flex-col overflow-hidden mb-4'
          >
            {/* Chat Header */}
            <div className='px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-blue-600/30 to-purple-600/30'>
              <div className='flex items-center gap-3'>
                <div className='p-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-500 dark:text-blue-400'>
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className='font-semibold text-sm flex items-center gap-1.5 text-slate-800 dark:text-white'>
                    GlassyUI Assistant
                    <Sparkles
                      size={12}
                      className='text-yellow-500 dark:text-yellow-300 animate-pulse'
                    />
                  </h3>
                  <p className='text-[10px] text-green-600 dark:text-green-400 font-medium dark:font-light flex items-center gap-1'>
                    <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-ping' />
                    Online & Ready
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='p-1.5 rounded-full hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-white/70 hover:text-slate-800 dark:hover:text-white'
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
                        ? 'bg-blue-600/20 border-blue-500/30 text-blue-600 dark:text-blue-300'
                        : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-purple-600 dark:text-purple-300'
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
                        ? 'bg-blue-600/10 dark:bg-blue-600/20 border-blue-500/20 dark:border-blue-500/30 text-slate-800 dark:text-white rounded-tr-none'
                        : 'bg-slate-100/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className='flex gap-3 max-w-[85%]'>
                  <div className='p-2 h-8 w-8 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-300'>
                    <Bot size={14} />
                  </div>
                  <div className='p-3.5 rounded-2xl rounded-tl-none bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-1.5'>
                    <span
                      className='w-2 h-2 rounded-full bg-slate-400 dark:bg-white/40 animate-bounce'
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className='w-2 h-2 rounded-full bg-slate-400 dark:bg-white/40 animate-bounce'
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className='w-2 h-2 rounded-full bg-slate-400 dark:bg-white/40 animate-bounce'
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className='p-4 border-t border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-black/20 flex gap-2 items-center'>
              <input
                type='text'
                placeholder='Ask me a question...'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className='flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors text-sm'
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