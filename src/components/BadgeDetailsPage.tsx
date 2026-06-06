import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Mail, Bell } from 'lucide-react';
import PageShell from './PageShell';
import Badge from './Badge';

export const BadgeDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Playground Sandbox State
  const [variant, setVariant] = useState<'dot' | 'count' | 'pill'>('count');
  const [content, setContent] = useState<string | number>('9');
  const [themeColor, setThemeColor] = useState<string>('red');
  const [pulse, setPulse] = useState(false);
  const [position, setPosition] = useState<
    'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline'
  >('top-right');
  const [glassEffect, setGlassEffect] = useState(true);
  const [opacity, setOpacity] = useState(0.25);

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

  const basicUsageCode = `import Badge from './Badge';
import { Mail } from 'lucide-react';

function App() {
  return (
    <Badge content="5" variant="count" position="top-right" themeColor="red">
      <div className="p-3 bg-white/10 rounded-xl border border-white/20">
        <Mail size={24} />
      </div>
    </Badge>
  );
}`;

  const dynamicCode = `<Badge
  content="${content}"
  variant="${variant}"
  position="${position}"
  themeColor="${themeColor}"
  pulse={${pulse}}
  glassEffect={${glassEffect}}
  glassOpacity={${opacity}}
>
  <div className="p-3 bg-white/10 rounded-xl border border-white/20">
    <Mail size={24} />
  </div>
</Badge>`;

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
        <h1 className='text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-200'>
          Badge Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A premium glassmorphic badge overlay for alerts and notification
          counts.
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
                <td className='p-2'>content</td>
                <td className='p-2 font-mono text-red-200'>string | number</td>
                <td className='p-2 font-mono'>undefined</td>
                <td className='p-2'>
                  Text or number display content inside the badge.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>variant</td>
                <td className='p-2 font-mono text-red-200'>
                  'dot' | 'count' | 'pill'
                </td>
                <td className='p-2 font-mono'>'count'</td>
                <td className='p-2'>
                  Structure type. 'dot' renders a status indicator, 'pill' has
                  extra padding.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>position</td>
                <td className='p-2 font-mono text-red-200'>
                  'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' |
                  'inline'
                </td>
                <td className='p-2 font-mono'>'top-right'</td>
                <td className='p-2'>
                  Corner alignment offset parameters relative to child element.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>themeColor</td>
                <td className='p-2 font-mono text-red-200'>
                  'blue' | 'green' | 'red' | 'purple' | 'rainbow' | string
                </td>
                <td className='p-2 font-mono'>'red'</td>
                <td className='p-2'>
                  Theme color class or custom CSS background definitions.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>pulse</td>
                <td className='p-2 font-mono text-red-200'>boolean</td>
                <td className='p-2 font-mono'>false</td>
                <td className='p-2'>
                  Adds recursive pulsing animation rings to status dots.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>glassEffect</td>
                <td className='p-2 font-mono text-red-200'>boolean</td>
                <td className='p-2 font-mono'>true</td>
                <td className='p-2'>
                  Toggles premium frosted white overlay styling.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>glassOpacity</td>
                <td className='p-2 font-mono text-red-200'>number</td>
                <td className='p-2 font-mono'>0.25</td>
                <td className='p-2'>
                  Translucent background white capability.
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
                {(['count', 'dot', 'pill'] as const).map(v => (
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

            {variant !== 'dot' && (
              <div>
                <label className='block mb-2 font-semibold'>Content</label>
                <input
                  type='text'
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className='w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/35 text-sm'
                />
              </div>
            )}

            <div>
              <label className='block mb-2 font-semibold'>Theme Color</label>
              <div className='flex gap-1.5 flex-wrap'>
                {(['red', 'blue', 'green', 'purple', 'rainbow'] as const).map(
                  c => (
                    <button
                      key={c}
                      onClick={() => setThemeColor(c)}
                      className={`py-1 px-3 rounded text-xs font-bold capitalize transition-all ${
                        themeColor === c
                          ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                          : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                      }`}
                    >
                      {c}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div>
              <label className='block mb-2 font-semibold'>Position</label>
              <div className='grid grid-cols-2 gap-1.5'>
                {(
                  [
                    'top-right',
                    'top-left',
                    'bottom-right',
                    'bottom-left',
                    'inline',
                  ] as const
                ).map(pos => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    className={`py-1 rounded text-xs font-bold capitalize transition-all ${
                      position === pos
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Pulsing Glow</label>
              <input
                type='checkbox'
                checked={pulse}
                onChange={e => setPulse(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-red-600'
              />
            </div>

            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Glass Effect</label>
              <input
                type='checkbox'
                checked={glassEffect}
                onChange={e => setGlassEffect(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-red-600'
              />
            </div>

            {glassEffect && (
              <div>
                <label className='block mb-1 font-semibold'>
                  Glass Opacity: {opacity.toFixed(2)}
                </label>
                <input
                  type='range'
                  min='0.05'
                  max='0.50'
                  step='0.05'
                  value={opacity}
                  onChange={e => setOpacity(parseFloat(e.target.value))}
                  className='w-full accent-white cursor-pointer'
                />
              </div>
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
              <div className='flex items-center justify-center p-8'>
                <Badge
                  content={content}
                  variant={variant}
                  position={position}
                  themeColor={themeColor}
                  pulse={pulse}
                  glassEffect={glassEffect}
                  glassOpacity={opacity}
                >
                  <div className='p-4 bg-white/10 rounded-2xl border border-white/15 backdrop-filter backdrop-blur-md text-white'>
                    <Mail size={32} />
                  </div>
                </Badge>
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

export default BadgeDetailsPage;
