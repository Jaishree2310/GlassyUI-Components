import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Check,
  Home,
  User,
  Settings,
  Phone,
} from 'lucide-react';
import PageShell from './PageShell';
import Tabs, { TabItem } from './Tabs';

export const TabsDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Playground Sandbox State
  const [activeTab, setActiveTab] = useState('home');
  const [variant, setVariant] = useState<'pill' | 'underline' | 'glass'>(
    'glass',
  );
  const [opacity, setOpacity] = useState(0.15);
  const [blur, setBlur] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [activeColor, setActiveColor] = useState('#8B5CF6');
  const [fullWidth, setFullWidth] = useState(false);

  const getGlassyClasses = (op = 20) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${op} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(
        () => setCopiedStates(prev => ({ ...prev, [key]: false })),
        2000,
      );
    });
  };

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses(10)} p-2 hover:bg-opacity-40 transition-all duration-300 z-10`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-emerald-400' />
      ) : (
        <Copy size={16} className='text-gray-100' />
      )}
    </button>
  );

  const sandboxTabs: TabItem[] = [
    { label: 'Home', id: 'home', icon: <Home size={16} /> },
    { label: 'Profile', id: 'profile', icon: <User size={16} /> },
    { label: 'Settings', id: 'settings', icon: <Settings size={16} /> },
    { label: 'Contact', id: 'contact', icon: <Phone size={16} /> },
  ];

  const basicUsageCode = `import Tabs from './Tabs';
import { Home, User, Settings } from 'lucide-react';

const tabs = [
  { label: 'Home', id: 'home', icon: <Home size={16} /> },
  { label: 'Profile', id: 'profile', icon: <User size={16} /> },
  { label: 'Settings', id: 'settings', icon: <Settings size={16} /> }
];

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Tabs 
      tabs={tabs} 
      activeTabId={activeTab} 
      onChange={setActiveTab} 
    />
  );
}`;

  const dynamicCode = `<Tabs
  tabs={[
    { label: 'Home', id: 'home', icon: <Home size={16} /> },
    { label: 'Profile', id: 'profile', icon: <User size={16} /> },
    { label: 'Settings', id: 'settings', icon: <Settings size={16} /> },
    { label: 'Contact', id: 'contact', icon: <Phone size={16} /> }
  ]}
  activeTabId="${activeTab}"
  onChange={(id) => setActiveTab(id)}
  variant="${variant}"
  glassOpacity={${opacity}}
  blurIntensity="${blur}"
  activeColor="${activeColor}"
  fullWidth={${fullWidth}}
/>`;

  return (
    <PageShell>
      <button
        onClick={() => navigate('/components')}
        className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-opacity-40 transition-all duration-300 text-gray-100`}
      >
        <ArrowLeft size={20} className='mr-2' />
        Back to Components
      </button>

      <div className='mb-12'>
        <h1 className='text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200'>
          Tabs Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A premium glassmorphic tabs component for seamless navigation
          transitions.
        </p>
      </div>

      {/* Basic Usage */}
      <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-2xl font-bold mb-4 text-gray-100'>Basic Usage</h2>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto'>
            <CopyButton text={basicUsageCode} codeKey='basicUsage' />
            {basicUsageCode}
          </pre>
        </div>
      </div>

      {/* Props */}
      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>Props</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-white bg-opacity-20 text-left'>
                <th className='p-2'>Prop</th>
                <th className='p-2'>Type</th>
                <th className='p-2'>Default</th>
                <th className='p-2'>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-white/10'>
                <td className='p-2'>tabs</td>
                <td className='p-2 font-mono text-purple-200'>TabItem[]</td>
                <td className='p-2 font-mono text-red-300'>Required</td>
                <td className='p-2'>
                  Tab arrays comprising label, id, and icon values.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>activeTabId</td>
                <td className='p-2 font-mono text-purple-200'>string</td>
                <td className='p-2 font-mono text-red-300'>Required</td>
                <td className='p-2'>Currently active tab ID.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>onChange</td>
                <td className='p-2 font-mono text-purple-200'>
                  {'(t: string) => void'}
                </td>
                <td className='p-2 font-mono text-red-300'>Required</td>
                <td className='p-2'>
                  Trigger function on active click selections.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>variant</td>
                <td className='p-2 font-mono text-purple-200'>
                  'pill' | 'underline' | 'glass'
                </td>
                <td className='p-2 font-mono'>'glass'</td>
                <td className='p-2'>Theme structure of selected markers.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>glassOpacity</td>
                <td className='p-2 font-mono text-purple-200'>number</td>
                <td className='p-2 font-mono'>0.15</td>
                <td className='p-2'>Background white opacity (0.05 - 0.40).</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>blurIntensity</td>
                <td className='p-2 font-mono text-purple-200'>
                  'sm' | 'md' | 'lg' | 'xl'
                </td>
                <td className='p-2 font-mono'>'lg'</td>
                <td className='p-2'>Background glass filter blur level.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>activeColor</td>
                <td className='p-2 font-mono text-purple-200'>string</td>
                <td className='p-2 font-mono'>'#a855f7'</td>
                <td className='p-2'>
                  Highlight color for pill or underline items.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>fullWidth</td>
                <td className='p-2 font-mono text-purple-200'>boolean</td>
                <td className='p-2 font-mono'>false</td>
                <td className='p-2'>
                  Expands the tab container to 100% width.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sandbox Playground */}
      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>
          Interactive Sandbox
        </h2>
        <p className='text-xl mb-6 text-gray-300'>
          Customize properties and view alterations live.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Controls */}
          <div className='space-y-6'>
            <div>
              <label className='block mb-2 font-semibold'>Variant</label>
              <div className='flex gap-2'>
                {(['glass', 'pill', 'underline'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`flex-1 py-1 rounded text-xs font-bold capitalize transition-all ${
                      variant === v
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className='block mb-1 font-semibold'>
                Glass Opacity: {opacity.toFixed(2)}
              </label>
              <input
                type='range'
                min='0.05'
                max='0.40'
                step='0.05'
                value={opacity}
                onChange={e => setOpacity(parseFloat(e.target.value))}
                className='w-full accent-white cursor-pointer'
              />
            </div>

            <div>
              <label className='block mb-2 font-semibold'>Blur Intensity</label>
              <div className='flex gap-1.5'>
                {(['sm', 'md', 'lg', 'xl'] as const).map(b => (
                  <button
                    key={b}
                    onClick={() => setBlur(b)}
                    className={`flex-1 py-1 uppercase rounded text-xs font-bold transition-all ${
                      blur === b
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold mb-1'>
                Active Color
              </label>
              <div className='flex items-center gap-2'>
                <input
                  type='color'
                  value={activeColor}
                  onChange={e => setActiveColor(e.target.value)}
                  className='w-8 h-8 rounded border-none cursor-pointer bg-transparent'
                />
                <span className='text-xs font-mono'>{activeColor}</span>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Full Width</label>
              <input
                type='checkbox'
                checked={fullWidth}
                onChange={e => setFullWidth(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-purple-600'
              />
            </div>
          </div>

          {/* Preview & Code */}
          <div className='lg:col-span-2 space-y-6 flex flex-col justify-between'>
            <div
              className={`${getGlassyClasses(5)} p-6 rounded-xl flex-grow flex flex-col justify-center min-h-[180px]`}
            >
              <h3 className='text-sm font-semibold mb-4 text-gray-400'>
                Live Preview
              </h3>
              <div className='flex items-center justify-center p-4'>
                <Tabs
                  tabs={sandboxTabs}
                  activeTabId={activeTab}
                  onChange={setActiveTab}
                  variant={variant}
                  glassOpacity={opacity}
                  blurIntensity={blur}
                  activeColor={activeColor}
                  fullWidth={fullWidth}
                />
              </div>
              <div className='mt-4 text-center text-sm text-gray-300'>
                Active panel content:{' '}
                <strong className='text-white capitalize'>
                  {activeTab} panel
                </strong>
              </div>
            </div>

            <div className='relative'>
              <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-xs'>
                <CopyButton text={dynamicCode} codeKey='sandbox' />
                {dynamicCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default TabsDetailsPage;
