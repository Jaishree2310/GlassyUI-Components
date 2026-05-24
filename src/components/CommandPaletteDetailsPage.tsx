import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  ArrowLeft,
  Search,
  Palette,
  BarChart3,
  Brain,
  Users,
  Settings,
  Sparkles,
  Zap,
  Copy,
  Check,
} from 'lucide-react';

import BackToTopButton from './BackToTop';

import CommandPalette from './CommandPalette';

const CommandPaletteDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<'default' | 'purple' | 'blue' | 'emerald'>(
    'default',
  );

  const [blur, setBlur] = useState(24);

  const [bgOpacity, setBgOpacity] = useState(10);

  const [borderOpacity, setBorderOpacity] = useState(20);

  const [radius, setRadius] = useState(24);

  const [copied, setCopied] = useState<{
    [key: string]: boolean;
  }>({});

  const getGlassyClasses = (opacity = 20) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} 
    border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);

    setCopied(prev => ({
      ...prev,
      [key]: true,
    }));

    setTimeout(() => {
      setCopied(prev => ({
        ...prev,
        [key]: false,
      }));
    }, 2000);
  };

  const CopyButton = ({ text, codeKey }: { text: string; codeKey: string }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className='absolute top-4 right-4 p-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300'
    >
      {copied[codeKey] ? (
        <Check size={16} className='text-green-400' />
      ) : (
        <Copy size={16} className='text-gray-300' />
      )}
    </button>
  );

  const basicUsageCode = `import CommandPalette from "./CommandPalette";

const commands = [
  {
    id: "dashboard",
    title: "Go to Dashboard",
  },

  {
    id: "profile",
    title: "View Profile",
  },

  {
    id: "settings",
    title: "Open Settings",
  },
];

export default function Example() {
  return (
    <CommandPalette
      commands={commands}
    />
  );
}`;

  const advancedCode = `import {
  BarChart3,
  Brain,
  Users,
  Settings,
} from "lucide-react";

import CommandPalette from "./CommandPalette";

const commands = [
  {
    id: "analytics",

    title: "Open Analytics Dashboard",

    description: "View reports and insights",

    shortcut: "⌘A",

    category: "Analytics",

    badge: "New",

    recent: true,

    icon: (
      <BarChart3
        size={18}
        className="text-blue-300"
      />
    ),
  },

  {
    id: "ai",

    title: "Generate AI Summary",

    description:
      "Summarize long reports instantly",

    shortcut: "⌘G",

    category: "AI Tools",

    badge: "AI",

    recent: true,

    icon: (
      <Brain
        size={18}
        className="text-purple-300"
      />
    ),
  },
];

export default function Example() {
  return (
    <CommandPalette
      commands={commands}
      placeholder="Search commands..."
      width="720px"
      theme="default"
    />
  );
}`;

  const commands = [
    {
      id: 'analytics',
      title: 'Open Analytics Dashboard',
      description: 'View reports and insights',
      shortcut: '⌘A',
      category: 'Analytics',
      badge: 'New',
      recent: true,
      icon: <BarChart3 size={18} className='text-blue-300' />,
    },

    {
      id: 'ai',
      title: 'Generate AI Summary',
      description: 'Summarize long reports instantly',
      shortcut: '⌘G',
      category: 'AI Tools',
      badge: 'AI',
      recent: true,
      icon: <Brain size={18} className='text-purple-300' />,
    },

    {
      id: 'team',
      title: 'Invite Team Members',
      description: 'Manage collaboration access',
      shortcut: '⌘T',
      category: 'Team',
      icon: <Users size={18} className='text-emerald-300' />,
    },

    {
      id: 'settings',
      title: 'Open Settings',
      description: 'Configure dashboard preferences',
      shortcut: '⌘S',
      category: 'Settings',
      icon: <Settings size={18} className='text-pink-300' />,
    },

    {
      id: 'reports',
      title: 'Export Reports',
      description: 'Download analytics reports',
      shortcut: '⌘R',
      category: 'Analytics',
      badge: 'Pro',
      icon: <BarChart3 size={18} className='text-blue-300' />,
    },

    {
      id: 'chat',
      title: 'Open AI Chat',
      description: 'Start AI conversation',
      shortcut: '⌘C',
      category: 'AI Tools',
      recent: true,
      icon: <Brain size={18} className='text-purple-300' />,
    },
  ];

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />

      <div className='relative z-10'>
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(
            10,
          )} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        {/* Heading */}
        <h1 className='text-6xl font-bold mb-8 text-white'>Command Palette</h1>

        <p className='text-xl mb-8 text-gray-300'>
          A customizable glassmorphism styled command palette
        </p>

        {/* Basic Usage */}
        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className='text-3xl font-bold mb-6 text-gray-100'>Basic Usage</h2>

          <div className='grid lg:grid-cols-2 gap-8 items-start'>
            {/* Code */}
            <div className='relative'>
              <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm'>
                {basicUsageCode}
              </pre>

              <CopyButton text={basicUsageCode} codeKey='basic' />
            </div>

            {/* Preview */}
            <div className='flex justify-center w-full'>
              <div className='w-full max-w-[700px]'>
                <CommandPalette
                  commands={[
                    {
                      id: 'dashboard',
                      title: 'Go to Dashboard',
                    },

                    {
                      id: 'profile',
                      title: 'View Profile',
                    },

                    {
                      id: 'settings',
                      title: 'Open Settings',
                    },
                  ]}
                  theme='default'
                  placeholder='Search commands...'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Props */}
        <section
          className={`${getGlassyClasses(
            20,
          )} p-6 mb-8 text-white relative z-10`}
        >
          <h2 className='text-2xl font-bold mb-4'>Props</h2>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-white bg-opacity-20'>
                  <th className='text-left p-2'>Prop</th>

                  <th className='text-left p-2'>Type</th>

                  <th className='text-left p-2'>Default</th>

                  <th className='text-left p-2'>Description</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className='p-2'>commands</td>

                  <td className='p-2'>Command[]</td>

                  <td className='p-2'>required</td>

                  <td className='p-2'>Array of command items to display.</td>
                </tr>

                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2'>placeholder</td>

                  <td className='p-2'>string</td>

                  <td className='p-2'>"Search commands..."</td>

                  <td className='p-2'>
                    Placeholder text for the search input.
                  </td>
                </tr>

                <tr>
                  <td className='p-2'>width</td>

                  <td className='p-2'>string</td>

                  <td className='p-2'>"700px"</td>

                  <td className='p-2'>
                    Controls the maximum width of the palette.
                  </td>
                </tr>

                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2'>theme</td>

                  <td className='p-2'>
                    "default" | "purple" | "blue" | "emerald"
                  </td>

                  <td className='p-2'>"default"</td>

                  <td className='p-2'>Changes the palette color theme.</td>
                </tr>

                <tr>
                  <td className='p-2'>onSelect</td>

                  <td className='p-2'>{'(command) => void'}</td>

                  <td className='p-2'>undefined</td>

                  <td className='p-2'>
                    Callback triggered when a command is selected.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Advanced */}
        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <div className='flex items-center gap-3 mb-6'>
            <Sparkles className='text-yellow-300' />

            <h2 className='text-3xl font-bold text-gray-100'>
              Advanced Example
            </h2>
          </div>

          <p className='mb-8 text-lg text-gray-300'>
            Advanced command palette with categories, shortcuts, descriptions
            and recent actions.
          </p>

          {/* Pills */}
          <div className='flex flex-wrap gap-4 mb-10'>
            {[
              'Grouped Commands',
              'Recent Actions',
              'Keyboard Navigation',
              'Search Highlighting',
              'Modern UX',
            ].map(feature => (
              <div
                key={feature}
                className='px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm text-gray-300'
              >
                {feature}
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className='grid md:grid-cols-3 gap-5 mb-10'>
            <div className='p-5 rounded-lg bg-white/10 border border-white/10'>
              <Zap className='text-yellow-300 mb-4' />

              <h3 className='text-lg font-semibold mb-2'>Quick Search</h3>

              <p className='text-gray-400 text-sm'>
                Instantly find commands and actions.
              </p>
            </div>

            <div className='p-5 rounded-lg bg-white/10 border border-white/10'>
              <Brain className='text-purple-300 mb-4' />

              <h3 className='text-lg font-semibold mb-2'>AI Workflow</h3>

              <p className='text-gray-400 text-sm'>
                Perfect for productivity apps.
              </p>
            </div>

            <div className='p-5 rounded-lg bg-white/10 border border-white/10'>
              <Palette className='text-pink-300 mb-4' />

              <h3 className='text-lg font-semibold mb-2'>Glassmorphism UI</h3>

              <p className='text-gray-400 text-sm'>
                Beautiful translucent interface.
              </p>
            </div>
          </div>

          {/* Layout */}
          <div className='grid lg:grid-cols-2 gap-8 items-start'>
            {/* Code */}
            <div className='relative'>
              <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm h-full'>
                {advancedCode}
              </pre>

              <CopyButton text={advancedCode} codeKey='advanced' />
            </div>

            {/* Preview */}
            <div className='flex justify-center'>
              <CommandPalette commands={commands} theme='default' />
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className={`${getGlassyClasses()} p-8`}>
          <div className='flex items-center gap-3 mb-5'>
            <Palette className='text-pink-300' />

            <h2 className='text-3xl font-bold text-gray-100'>Theme</h2>
          </div>

          <p className='text-gray-300 mb-10'>
            Customize the command palette appearance in real time.
          </p>

          <div className='grid lg:grid-cols-2 gap-10'>
            {/* Controls */}
            <div className='space-y-8'>
              <div>
                <h3 className='text-lg font-semibold mb-4'>Theme Presets</h3>

                <div className='flex flex-wrap gap-4'>
                  {['default', 'purple', 'blue', 'emerald'].map(item => (
                    <button
                      key={item}
                      onClick={() =>
                        setTheme(
                          item as 'default' | 'purple' | 'blue' | 'emerald',
                        )
                      }
                      className={`${getGlassyClasses(10)} px-5 py-3 capitalize`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className='space-y-6'>
                <div>
                  <div className='flex justify-between mb-2'>
                    <span>Blur</span>

                    <span>{blur}px</span>
                  </div>

                  <input
                    type='range'
                    min='0'
                    max='40'
                    value={blur}
                    onChange={e => setBlur(Number(e.target.value))}
                    className='w-full'
                  />
                </div>

                <div>
                  <div className='flex justify-between mb-2'>
                    <span>Background Opacity</span>

                    <span>{bgOpacity}%</span>
                  </div>

                  <input
                    type='range'
                    min='0'
                    max='40'
                    value={bgOpacity}
                    onChange={e => setBgOpacity(Number(e.target.value))}
                    className='w-full'
                  />
                </div>

                <div>
                  <div className='flex justify-between mb-2'>
                    <span>Border Opacity</span>

                    <span>{borderOpacity}%</span>
                  </div>

                  <input
                    type='range'
                    min='0'
                    max='100'
                    value={borderOpacity}
                    onChange={e => setBorderOpacity(Number(e.target.value))}
                    className='w-full'
                  />
                </div>

                <div>
                  <div className='flex justify-between mb-2'>
                    <span>Border Radius</span>

                    <span>{radius}px</span>
                  </div>

                  <input
                    type='range'
                    min='0'
                    max='40'
                    value={radius}
                    onChange={e => setRadius(Number(e.target.value))}
                    className='w-full'
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <div
                className='transition-all duration-500 overflow-hidden rounded-lg'
                style={{
                  backdropFilter: `blur(${blur}px)`,

                  background:
                    theme === 'purple'
                      ? `rgba(88,28,135,${bgOpacity / 100})`
                      : theme === 'blue'
                        ? `rgba(30,64,175,${bgOpacity / 100})`
                        : theme === 'emerald'
                          ? `rgba(6,95,70,${bgOpacity / 100})`
                          : `rgba(17,24,39,${bgOpacity / 100})`,

                  border: `1px solid rgba(255,255,255,${borderOpacity / 100})`,

                  borderRadius: `${radius}px`,
                }}
              >
                <CommandPalette commands={commands} theme={theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPaletteDetailsPage;
