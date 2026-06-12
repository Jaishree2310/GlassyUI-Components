import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import PageShell from './PageShell';
import CalendarPicker from './CalendarPicker';

export const CalendarPickerDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Playground Sandbox State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [opacity, setOpacity] = useState(0.15);
  const [accentColor, setAccentColor] = useState('#8B5CF6');

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

  const basicUsageCode = `import CalendarPicker from './CalendarPicker';

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <CalendarPicker 
      value={date} 
      onChange={setDate} 
      placeholder="Select date..."
    />
  );
}`;

  const dynamicCode = `<CalendarPicker
  value={new Date("${selectedDate.toDateString()}")}
  onChange={(date) => console.log(date)}
  glassOpacity={${opacity}}
  accentColor="${accentColor}"
  placeholder="Select date..."
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
          Calendar Picker Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A premium glassmorphic date input popover component with month
          navigators.
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
                <td className='p-2'>value</td>
                <td className='p-2 font-mono text-purple-200'>Date</td>
                <td className='p-2 font-mono'>new Date()</td>
                <td className='p-2'>The currently selected Date.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>onChange</td>
                <td className='p-2 font-mono text-purple-200'>
                  {'(date: Date) => void'}
                </td>
                <td className='p-2 font-mono'>undefined</td>
                <td className='p-2'>
                  Callback triggered when date selection updates.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>glassOpacity</td>
                <td className='p-2 font-mono text-purple-200'>number</td>
                <td className='p-2 font-mono'>0.15</td>
                <td className='p-2'>
                  Input field base background white opacity.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>accentColor</td>
                <td className='p-2 font-mono text-purple-200'>string</td>
                <td className='p-2 font-mono'>'#a855f7'</td>
                <td className='p-2'>
                  Theme color for active day tile selections.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>placeholder</td>
                <td className='p-2 font-mono text-purple-200'>string</td>
                <td className='p-2 font-mono'>'Select date...'</td>
                <td className='p-2'>
                  Input prompt string when no date selection is active.
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
              <label className='block text-xs font-semibold mb-1'>
                Accent selection color
              </label>
              <div className='flex items-center gap-2'>
                <input
                  type='color'
                  value={accentColor}
                  onChange={e => setAccentColor(e.target.value)}
                  className='w-8 h-8 rounded border-none cursor-pointer bg-transparent'
                />
                <span className='text-xs font-mono'>{accentColor}</span>
              </div>
            </div>

            <div className='p-4 bg-white/5 border border-white/10 rounded-xl'>
              <span className='block text-xs font-bold text-gray-400 mb-1 uppercase'>
                Date selected
              </span>
              <span className='text-sm font-semibold text-white'>
                {selectedDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Preview & Code */}
          <div className='lg:col-span-2 space-y-6 flex flex-col justify-between'>
            <div
              className={`${getGlassyClasses(5)} p-6 rounded-xl flex-grow flex flex-col justify-center items-center min-h-[260px]`}
            >
              <h3 className='text-sm font-semibold mb-4 text-gray-400 self-start'>
                Live Preview
              </h3>
              <div className='flex items-center justify-center p-4'>
                <CalendarPicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  glassOpacity={opacity}
                  accentColor={accentColor}
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

export default CalendarPickerDetailsPage;
