import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Folder, FileText } from 'lucide-react';
import PageShell from './PageShell';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';

export const BreadcrumbsDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Playground Sandbox State
  const [separator, setSeparator] = useState<'/' | '>' | '-'>('>');
  const [showHome, setShowHome] = useState(true);
  const [opacity, setOpacity] = useState(0.1);

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

  const sandboxItems: BreadcrumbItem[] = [
    { label: 'Documents', href: '#docs', icon: <Folder size={14} /> },
    { label: 'Project Assets', href: '#assets', icon: <Folder size={14} /> },
    { label: 'glassy-ui-config.json', icon: <FileText size={14} /> },
  ];

  const basicUsageCode = `import Breadcrumbs from './Breadcrumbs';
import { Folder } from 'lucide-react';

const items = [
  { label: 'Documents', href: '/docs', icon: <Folder size={14} /> },
  { label: 'Resume.pdf' }
];

function App() {
  return (
    <Breadcrumbs 
      items={items} 
      separator=">" 
      showHomeIcon={true} 
    />
  );
}`;

  const dynamicCode = `<Breadcrumbs
  items={[
    { label: 'Documents', href: '#docs', icon: <Folder size={14} /> },
    { label: 'Project Assets', href: '#assets', icon: <Folder size={14} /> },
    { label: 'glassy-ui-config.json' }
  ]}
  separator="${separator}"
  showHomeIcon={${showHome}}
  glassOpacity={${opacity}}
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
        <h1 className='text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200'>
          Breadcrumbs Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A premium glassmorphic breadcrumb navigator component indicating
          folder paths.
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
                <td className='p-2'>items</td>
                <td className='p-2 font-mono text-indigo-200'>
                  BreadcrumbItem[]
                </td>
                <td className='p-2 font-mono text-red-300'>Required</td>
                <td className='p-2'>
                  Array of elements with label, href, and icon variables.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>separator</td>
                <td className='p-2 font-mono text-indigo-200'>
                  '/' | '&gt;' | '-' | ReactNode
                </td>
                <td className='p-2 font-mono'>'&gt;'</td>
                <td className='p-2'>
                  Dividing symbol inline render between paths.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>showHomeIcon</td>
                <td className='p-2 font-mono text-indigo-200'>boolean</td>
                <td className='p-2 font-mono'>true</td>
                <td className='p-2'>
                  Prepends a clickable Home vector path to the breadcrumbs
                  start.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>glassOpacity</td>
                <td className='p-2 font-mono text-indigo-200'>number</td>
                <td className='p-2 font-mono'>0.1</td>
                <td className='p-2'>
                  Translucent white background capacity setting.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>onItemClick</td>
                <td className='p-2 font-mono text-indigo-200'>
                  {'(item: BreadcrumbItem, index: number) => void'}
                </td>
                <td className='p-2 font-mono'>undefined</td>
                <td className='p-2'>
                  Trigger callback when breadcrumbs path is clicked.
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
              <label className='block mb-2 font-semibold'>
                Separator Symbol
              </label>
              <div className='flex gap-2'>
                {(['>', '/', '-'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSeparator(s)}
                    className={`flex-1 py-1 rounded text-xs font-bold transition-all ${
                      separator === s
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Show Home Anchor</label>
              <input
                type='checkbox'
                checked={showHome}
                onChange={e => setShowHome(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-indigo-600'
              />
            </div>

            <div>
              <label className='block mb-1 font-semibold'>
                Glass Opacity: {opacity.toFixed(2)}
              </label>
              <input
                type='range'
                min='0.05'
                max='0.30'
                step='0.05'
                value={opacity}
                onChange={e => setOpacity(parseFloat(e.target.value))}
                className='w-full accent-white cursor-pointer'
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
              <div className='flex items-center justify-center p-4 w-full'>
                <Breadcrumbs
                  items={sandboxItems}
                  separator={separator}
                  showHomeIcon={showHome}
                  glassOpacity={opacity}
                  onItemClick={(item, idx) =>
                    alert(`Clicked: ${item.label} at index ${idx}`)
                  }
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

export default BreadcrumbsDetailsPage;
