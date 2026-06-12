import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import PageShell from './PageShell';
import Avatar from './Avatar';

export const AvatarDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Playground Sandbox State
  const [useImage, setUseImage] = useState(true);
  const [name, setName] = useState('John Doe');
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>('lg');
  const [shape, setShape] = useState<'circle' | 'square' | 'hexagon'>('circle');
  const [glassBorder, setGlassBorder] = useState(true);
  const [glassOpacity, setGlassOpacity] = useState(0.2);
  const [glowColor, setGlowColor] = useState('#EC4899');
  const [status, setStatus] = useState<
    'online' | 'offline' | 'away' | 'busy' | 'none'
  >('online');
  const [statusPos, setStatusPos] = useState<
    'top-right' | 'bottom-right' | 'bottom-left' | 'top-left'
  >('bottom-right');

  const imageUrl =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';

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

  const basicUsageCode = `import Avatar from './Avatar';

function App() {
  return (
    <Avatar 
      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
      name="Jane Doe"
      size="md"
      status="online"
    />
  );
}`;

  const dynamicCode = `<Avatar
  ${useImage ? `src="${imageUrl}"` : ''}
  name="${name}"
  size="${size}"
  shape="${shape}"
  glassBorder={${glassBorder}}
  glassOpacity={${glassOpacity}}
  glowColor="${glowColor}"
  ${status !== 'none' ? `status="${status}"\n  statusPosition="${statusPos}"` : ''}
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
        <h1 className='text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200'>
          Avatar Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A premium glassmorphic avatar component for user profiles.
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
                <td className='p-2'>src</td>
                <td className='p-2 font-mono text-pink-200'>string</td>
                <td className='p-2 font-mono'>undefined</td>
                <td className='p-2'>Image URL for the avatar.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>alt</td>
                <td className='p-2 font-mono text-pink-200'>string</td>
                <td className='p-2 font-mono'>''</td>
                <td className='p-2'>Alt text description for the image.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>name</td>
                <td className='p-2 font-mono text-pink-200'>string</td>
                <td className='p-2 font-mono'>''</td>
                <td className='p-2'>Name to derive fallback text initials.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>size</td>
                <td className='p-2 font-mono text-pink-200'>
                  'sm' | 'md' | 'lg' | 'xl' | 'xxl'
                </td>
                <td className='p-2 font-mono'>'md'</td>
                <td className='p-2'>Size dimensions preset map.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>shape</td>
                <td className='p-2 font-mono text-pink-200'>
                  'circle' | 'square' | 'hexagon'
                </td>
                <td className='p-2 font-mono'>'circle'</td>
                <td className='p-2'>Layout shape border styling.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>glassBorder</td>
                <td className='p-2 font-mono text-pink-200'>boolean</td>
                <td className='p-2 font-mono'>true</td>
                <td className='p-2'>
                  Enables outer frosted glassy ring overlay.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>glassOpacity</td>
                <td className='p-2 font-mono text-pink-200'>number</td>
                <td className='p-2 font-mono'>0.2</td>
                <td className='p-2'>
                  Translucent white background capacity setting.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>glowColor</td>
                <td className='p-2 font-mono text-pink-200'>string</td>
                <td className='p-2 font-mono'>'#a855f7'</td>
                <td className='p-2'>
                  Colored back shadow glow intensity overrides.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>status</td>
                <td className='p-2 font-mono text-pink-200'>
                  'online' | 'offline' | 'away' | 'busy'
                </td>
                <td className='p-2 font-mono'>undefined</td>
                <td className='p-2'>Visual status badge attachment.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>statusPosition</td>
                <td className='p-2 font-mono text-pink-200'>
                  'top-right' | 'bottom-right' | 'bottom-left' | 'top-left'
                </td>
                <td className='p-2 font-mono'>'bottom-right'</td>
                <td className='p-2'>
                  Corner alignment placement of status indicator.
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
            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Use Image Source</label>
              <input
                type='checkbox'
                checked={useImage}
                onChange={e => setUseImage(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-pink-600'
              />
            </div>

            {!useImage && (
              <div>
                <label className='block mb-2 font-semibold'>
                  Fallback Name
                </label>
                <input
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/35'
                />
              </div>
            )}

            <div>
              <label className='block mb-2 font-semibold'>Shape</label>
              <div className='flex gap-2'>
                {(['circle', 'square', 'hexagon'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setShape(s)}
                    className={`flex-1 py-1 rounded text-xs font-bold capitalize transition-all ${
                      shape === s
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className='block mb-2 font-semibold'>Size</label>
              <div className='flex gap-1.5'>
                {(['sm', 'md', 'lg', 'xl', 'xxl'] as const).map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSize(sz)}
                    className={`flex-1 py-1 uppercase rounded text-xs font-bold transition-all ${
                      size === sz
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className='block mb-2 font-semibold'>Status Dot</label>
              <div className='flex gap-1.5 flex-wrap'>
                {(['none', 'online', 'offline', 'away', 'busy'] as const).map(
                  st => (
                    <button
                      key={st}
                      onClick={() => setStatus(st)}
                      className={`py-1 px-3 rounded text-xs font-bold capitalize transition-all ${
                        status === st
                          ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                          : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                      }`}
                    >
                      {st}
                    </button>
                  ),
                )}
              </div>
            </div>

            {status !== 'none' && (
              <div>
                <label className='block mb-2 font-semibold'>
                  Status Position
                </label>
                <div className='grid grid-cols-2 gap-1.5'>
                  {(
                    [
                      'top-right',
                      'bottom-right',
                      'bottom-left',
                      'top-left',
                    ] as const
                  ).map(pos => (
                    <button
                      key={pos}
                      onClick={() => setStatusPos(pos)}
                      className={`py-1 rounded text-xs font-bold capitalize transition-all ${
                        statusPos === pos
                          ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                          : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Glass Outer Ring</label>
              <input
                type='checkbox'
                checked={glassBorder}
                onChange={e => setGlassBorder(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-pink-600'
              />
            </div>

            {glassBorder && (
              <>
                <div>
                  <label className='block mb-1 font-semibold'>
                    Glass Opacity: {glassOpacity.toFixed(2)}
                  </label>
                  <input
                    type='range'
                    min='0.05'
                    max='0.40'
                    step='0.05'
                    value={glassOpacity}
                    onChange={e => setGlassOpacity(parseFloat(e.target.value))}
                    className='w-full accent-white cursor-pointer'
                  />
                </div>

                <div>
                  <label className='block text-xs font-semibold mb-1'>
                    Glow Highlights
                  </label>
                  <div className='flex items-center gap-2'>
                    <input
                      type='color'
                      value={glowColor}
                      onChange={e => setGlowColor(e.target.value)}
                      className='w-8 h-8 rounded border-none cursor-pointer bg-transparent'
                    />
                    <span className='text-xs font-mono'>{glowColor}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Preview & Code */}
          <div className='lg:col-span-2 space-y-6 flex flex-col justify-between'>
            <div
              className={`${getGlassyClasses(5)} p-6 rounded-xl flex-grow flex flex-col justify-center items-center min-h-[200px]`}
            >
              <h3 className='text-sm font-semibold mb-4 text-gray-400 self-start'>
                Live Preview
              </h3>
              <div className='flex items-center justify-center p-4'>
                <Avatar
                  src={useImage ? imageUrl : undefined}
                  name={name}
                  size={size}
                  shape={shape}
                  glassBorder={glassBorder}
                  glassOpacity={glassOpacity}
                  glowColor={glowColor}
                  status={status === 'none' ? undefined : status}
                  statusPosition={statusPos}
                />
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

export default AvatarDetailsPage;
