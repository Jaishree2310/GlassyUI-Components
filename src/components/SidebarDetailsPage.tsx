import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Check,
  Menu,
  Home,
  Compass,
  MessageSquare,
  Shield,
  HelpCircle,
} from 'lucide-react';
import PageShell from './PageShell';
import Sidebar from './Sidebar';

export const SidebarDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Playground Sandbox State
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'left' | 'right'>('left');
  const [width, setWidth] = useState('300px');
  const [opacity, setOpacity] = useState(0.2);
  const [blur, setBlur] = useState<'sm' | 'md' | 'lg' | 'xl'>('xl');
  const [showOverlay, setShowOverlay] = useState(true);

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

  const basicUsageCode = `import Sidebar from './Sidebar';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Menu</button>
      <Sidebar 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        position="left"
      >
        <h3 className="text-xl font-bold text-white mb-6">Navigation</h3>
        <ul className="space-y-4">
          <li><a href="#home" className="text-white/70 hover:text-white">Home</a></li>
          <li><a href="#about" className="text-white/70 hover:text-white">About</a></li>
        </ul>
      </Sidebar>
    </>
  );
}`;

  const dynamicCode = `<Sidebar
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="${position}"
  width="${width}"
  glassOpacity={${opacity}}
  blurIntensity="${blur}"
  showOverlay={${showOverlay}}
>
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-white tracking-wide">GlassyUI Console</h3>
    <nav className="space-y-2">
      <a href="#home" className="flex items-center gap-3 p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
        <Home size={18} />
        <span>Dashboard</span>
      </a>
      <a href="#explore" className="flex items-center gap-3 p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
        <Compass size={18} />
        <span>Explore Kits</span>
      </a>
      <a href="#feedback" className="flex items-center gap-3 p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
        <MessageSquare size={18} />
        <span>Feedback Desk</span>
      </a>
    </nav>
  </div>
</Sidebar>`;

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
        <h1 className='text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200'>
          Sidebar / Drawer Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A premium slide-out navigation menu sheet component using high blur
          frosted glass.
        </p>
      </div>

      {/* Basic Usage */}
      <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-2xl font-bold mb-4 text-gray-100'>Basic Usage</h2>
        <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto'>
          <CopyButton text={basicUsageCode} codeKey='basicUsage' />
          {basicUsageCode}
        </pre>
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
                <td className='p-2'>isOpen</td>
                <td className='p-2 font-mono text-cyan-200'>boolean</td>
                <td className='p-2 font-mono text-red-300'>Required</td>
                <td className='p-2'>Toggles visible drawer sliding status.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>onClose</td>
                <td className='p-2 font-mono text-cyan-200'>{'() => void'}</td>
                <td className='p-2 font-mono text-red-300'>Required</td>
                <td className='p-2'>
                  Trigger callback when overlay is clicked or dismiss is
                  requested.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>position</td>
                <td className='p-2 font-mono text-cyan-200'>
                  'left' | 'right'
                </td>
                <td className='p-2 font-mono'>'left'</td>
                <td className='p-2'>
                  Side of the screen the sidebar slides out from.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>width</td>
                <td className='p-2 font-mono text-cyan-200'>string</td>
                <td className='p-2 font-mono'>'320px'</td>
                <td className='p-2'>CSS width size definitions.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>glassOpacity</td>
                <td className='p-2 font-mono text-cyan-200'>number</td>
                <td className='p-2 font-mono'>0.2</td>
                <td className='p-2'>Background white opacity multiplier.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>blurIntensity</td>
                <td className='p-2 font-mono text-cyan-200'>
                  'sm' | 'md' | 'lg' | 'xl'
                </td>
                <td className='p-2 font-mono'>'xl'</td>
                <td className='p-2'>Backdrop filter blur depth level.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>showOverlay</td>
                <td className='p-2 font-mono text-cyan-200'>boolean</td>
                <td className='p-2 font-mono'>true</td>
                <td className='p-2'>
                  Toggles visible dark backdrop overlays behind sidebars.
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
              <button
                onClick={() => setIsOpen(true)}
                className='w-full flex items-center justify-center gap-2 py-3 bg-white/15 border border-white/20 hover:bg-white/25 text-white font-bold rounded-xl transition-all shadow-md active:scale-98'
              >
                <Menu size={18} />
                <span>Launch Glassy Sidebar</span>
              </button>
            </div>

            <div>
              <label className='block mb-2 font-semibold'>Position</label>
              <div className='flex gap-2'>
                {(['left', 'right'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPosition(p)}
                    className={`flex-1 py-1 rounded text-xs font-bold capitalize transition-all ${
                      position === p
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className='block mb-2 font-semibold'>Width (CSS)</label>
              <input
                type='text'
                value={width}
                onChange={e => setWidth(e.target.value)}
                className='w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/35 text-sm'
              />
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
              <label className='block mb-2 font-semibold'>Blur level</label>
              <div className='flex gap-1.5'>
                {(['sm', 'md', 'lg', 'xl'] as const).map(bl => (
                  <button
                    key={bl}
                    onClick={() => setBlur(bl)}
                    className={`flex-1 py-1 uppercase rounded text-xs font-bold transition-all ${
                      blur === bl
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {bl}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Show Backdrop Overlay</label>
              <input
                type='checkbox'
                checked={showOverlay}
                onChange={e => setShowOverlay(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-cyan-600'
              />
            </div>
          </div>

          {/* Preview & Code */}
          <div className='lg:col-span-2 space-y-6 flex flex-col justify-between'>
            <div
              className={`${getGlassyClasses(5)} p-6 rounded-xl flex-grow flex flex-col justify-center items-center min-h-[160px]`}
            >
              <h3 className='text-sm font-semibold mb-4 text-gray-400 self-start'>
                Live Preview
              </h3>
              <p className='text-xs text-white/50 text-center max-w-sm'>
                Click the button on the left to trigger the sidebar. Click
                outside or use the drawer close button to dismiss.
              </p>
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

      {/* Render sidebar for live testing */}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        width={width}
        glassOpacity={opacity}
        blurIntensity={blur}
        showOverlay={showOverlay}
      >
        <div className='space-y-8'>
          <div>
            <h3 className='text-lg font-bold text-white tracking-wider mb-2'>
              GlassyUI Console
            </h3>
            <p className='text-[11px] text-white/45'>
              Premium components kit drawer navigation menu.
            </p>
          </div>

          <nav className='space-y-2'>
            <a
              href='#home'
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
              }}
              className='flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:translate-x-1.5 transition-all duration-300'
            >
              <Home size={18} />
              <span className='text-sm font-medium'>Dashboard</span>
            </a>
            <a
              href='#explore'
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
              }}
              className='flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:translate-x-1.5 transition-all duration-300'
            >
              <Compass size={18} />
              <span className='text-sm font-medium'>Explore Kits</span>
            </a>
            <a
              href='#security'
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
              }}
              className='flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:translate-x-1.5 transition-all duration-300'
            >
              <Shield size={18} />
              <span className='text-sm font-medium'>Security settings</span>
            </a>
            <a
              href='#support'
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
              }}
              className='flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:translate-x-1.5 transition-all duration-300'
            >
              <HelpCircle size={18} />
              <span className='text-sm font-medium'>Support Center</span>
            </a>
          </nav>

          <div className='pt-12 border-t border-white/10'>
            <p className='text-[10px] text-white/20 text-center'>
              Version 0.1.0 • GlassyUI-Components
            </p>
          </div>
        </div>
      </Sidebar>
    </PageShell>
  );
};

export default SidebarDetailsPage;
