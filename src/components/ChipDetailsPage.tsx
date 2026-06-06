import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Tag } from 'lucide-react';
import PageShell from './PageShell';
import Chip from './Chip';

export const ChipDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Playground Sandbox State
  const [label, setLabel] = useState('Glassmorphism');
  const [selected, setSelected] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [themeColor, setThemeColor] = useState('#8B5CF6');
  const [useIcon, setUseIcon] = useState(true);
  const [isDeleteable, setIsDeleteable] = useState(true);
  const [opacity, setOpacity] = useState(0.12);

  // Real-world filter demo state
  const [activeFilters, setActiveFilters] = useState<string[]>(['react']);
  const mockItems = [
    { title: 'Frosted Buttons Pack', categories: ['react', 'css'] },
    { title: 'Sidebar Navigation Drawers', categories: ['tailwind', 'css'] },
    { title: 'Date Calendar Popover', categories: ['react', 'typescript'] },
    {
      title: 'Responsive timeline cards',
      categories: ['typescript', 'tailwind'],
    },
  ];

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

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const basicUsageCode = `import Chip from './Chip';
import { Tag } from 'lucide-react';

function App() {
  const [selected, setSelected] = useState(false);

  return (
    <Chip 
      label="React" 
      selected={selected} 
      onSelect={() => setSelected(!selected)}
      icon={<Tag size={12} />}
    />
  );
}`;

  const dynamicCode = `<Chip
  label="${label}"
  selected={${selected}}
  onSelect={() => console.log("selected")}
  ${isDeleteable ? 'onDelete={() => console.log("deleted")}' : ''}
  size="${size}"
  themeColor="${themeColor}"
  ${useIcon ? 'icon={<Tag size={12} />}' : ''}
  glassOpacity={${opacity}}
/>`;

  // Filter items based on active tags
  const filteredItems = mockItems.filter(item => {
    if (activeFilters.length === 0) return true;
    return item.categories.some(cat => activeFilters.includes(cat));
  });

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
          Chip / Tag Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A premium glassmorphic tag chip indicator for sorting category
          filters.
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
                <td className='p-2'>label</td>
                <td className='p-2 font-mono text-purple-200'>string</td>
                <td className='p-2 font-mono text-red-300'>Required</td>
                <td className='p-2'>Label text display string.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>selected</td>
                <td className='p-2 font-mono text-purple-200'>boolean</td>
                <td className='p-2 font-mono'>false</td>
                <td className='p-2'>
                  Toggle value for highlighting active chip selection.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>onSelect</td>
                <td className='p-2 font-mono text-purple-200'>
                  {'() => void'}
                </td>
                <td className='p-2 font-mono'>undefined</td>
                <td className='p-2'>
                  Click callback parameters to change selection values.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>onDelete</td>
                <td className='p-2 font-mono text-purple-200'>
                  {'() => void'}
                </td>
                <td className='p-2 font-mono'>undefined</td>
                <td className='p-2'>
                  Dismiss trigger action key showing a close cross icon.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>size</td>
                <td className='p-2 font-mono text-purple-200'>
                  'sm' | 'md' | 'lg'
                </td>
                <td className='p-2 font-mono'>'md'</td>
                <td className='p-2'>
                  Chip padding and text size layout configurations.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>themeColor</td>
                <td className='p-2 font-mono text-purple-200'>string</td>
                <td className='p-2 font-mono'>'#a855f7'</td>
                <td className='p-2'>
                  Selection background highlight override style.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>icon</td>
                <td className='p-2 font-mono text-purple-200'>ReactNode</td>
                <td className='p-2 font-mono'>undefined</td>
                <td className='p-2'>Inline vector prepended to tag string.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>glassOpacity</td>
                <td className='p-2 font-mono text-purple-200'>number</td>
                <td className='p-2 font-mono'>0.12</td>
                <td className='p-2'>Background white opacity multiplier.</td>
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
              <label className='block mb-2 font-semibold'>Chip Label</label>
              <input
                type='text'
                value={label}
                onChange={e => setLabel(e.target.value)}
                className='w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/35 text-sm'
              />
            </div>

            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Selected Status</label>
              <input
                type='checkbox'
                checked={selected}
                onChange={e => setSelected(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-purple-600'
              />
            </div>

            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Include Icon</label>
              <input
                type='checkbox'
                checked={useIcon}
                onChange={e => setUseIcon(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-purple-600'
              />
            </div>

            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Dismissible (onDelete)</label>
              <input
                type='checkbox'
                checked={isDeleteable}
                onChange={e => setIsDeleteable(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-purple-600'
              />
            </div>

            <div>
              <label className='block mb-2 font-semibold'>Size</label>
              <div className='flex gap-2'>
                {(['sm', 'md', 'lg'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 py-1 rounded text-xs font-bold capitalize transition-all ${
                      size === s
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
              <label className='block text-xs font-semibold mb-1'>
                Highlight Color
              </label>
              <div className='flex items-center gap-2'>
                <input
                  type='color'
                  value={themeColor}
                  onChange={e => setThemeColor(e.target.value)}
                  className='w-8 h-8 rounded border-none cursor-pointer bg-transparent'
                />
                <span className='text-xs font-mono'>{themeColor}</span>
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
          </div>

          {/* Preview & Code */}
          <div className='lg:col-span-2 space-y-6 flex flex-col justify-between'>
            <div
              className={`${getGlassyClasses(5)} p-6 rounded-xl flex-grow flex flex-col justify-center items-center min-h-[160px]`}
            >
              <h3 className='text-sm font-semibold mb-4 text-gray-400 self-start'>
                Live Preview
              </h3>
              <div className='flex items-center justify-center p-4'>
                <Chip
                  label={label}
                  selected={selected}
                  onSelect={() => setSelected(!selected)}
                  onDelete={isDeleteable ? () => alert('Deleted!') : undefined}
                  size={size}
                  themeColor={themeColor}
                  icon={
                    useIcon ? (
                      <Tag
                        size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12}
                      />
                    ) : undefined
                  }
                  glassOpacity={opacity}
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

      {/* Real World Filter Demo */}
      <div className={`${getGlassyClasses()} p-6`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>
          Category Filter Demo
        </h2>
        <p className='text-lg mb-6 text-gray-300'>
          Click the chips to filter product listings.
        </p>

        <div className='flex gap-2 mb-8 flex-wrap'>
          {['react', 'typescript', 'tailwind', 'css'].map(filterName => (
            <Chip
              key={filterName}
              label={filterName}
              selected={activeFilters.includes(filterName)}
              onSelect={() => toggleFilter(filterName)}
              themeColor='#EC4899'
              size='md'
            />
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className={`${getGlassyClasses(10)} p-4 rounded-xl border border-white/10 flex flex-col justify-between`}
            >
              <h4 className='text-base font-bold text-white mb-3'>
                {item.title}
              </h4>
              <div className='flex gap-1.5 flex-wrap'>
                {item.categories.map(cat => (
                  <span
                    key={cat}
                    className='text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50'
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export default ChipDetailsPage;
