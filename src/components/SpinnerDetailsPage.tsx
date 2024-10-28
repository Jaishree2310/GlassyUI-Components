import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

const SpinnerDetailsPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const [customColor, setCustomColor] = useState('#833AB4');
  const [customSize, setCustomSize] = useState('40');
  const [customBorderWidth, setCustomBorderWidth] = useState('4');

  const getGlassyClasses = (opacity = 20) => {
    return `backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} bg-opacity-${opacity} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
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

  const CopyButton: React.FC<{
    text: string;
    codeKey: string;
    darkMode: boolean;
  }> = ({ text, codeKey, darkMode }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 ${darkMode ? 'text-white hover:bg-white/40' : 'text-black hover:bg-black/30'} transition-all duration-300`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className={darkMode ? 'text-gray-100' : 'text-black'} />
      )}
    </button>
  );

  const basicUsageCode = `const Spinner: React.FC = () => (
  <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
);`;

  const themedSpinnerCode = `<div
  style={{
    width: '${customSize}px',
    height: '${customSize}px',
    border: '${customBorderWidth}px solid ${customColor}',
    borderTopColor: 'transparent'
  }}
  className="rounded-full animate-spin"
/>`;

  const fullWidthSpinnerCode = `<div
  className="w-full h-16 border-4 border-t-transparent border-white rounded-full animate-spin"
/>`;

  const tableHeadingStyles = `text-left p-2 ${darkMode ? 'text-gray-100' : 'text-black'}`;
  const tableDataStyles = `p-2 ${darkMode ? 'text-gray-200' : 'text-black/80'}`;

  return (
    <div
      className={`min-h-screen p-8 font-sans bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'} relative`}
    >
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'} transition-all duration-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1
          className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Spinner
        </h1>
        <p
          className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          A customizable, glassmorphism styled spinner component.
        </p>

        {/* Basic Usage */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Basic Usage
          </h2>
          <div className='relative'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {basicUsageCode}
            </pre>
            <CopyButton
              text={basicUsageCode}
              codeKey='basicUsage'
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Props */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Props
          </h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-20`}
                >
                  <th className={tableHeadingStyles}>Prop</th>
                  <th className={tableHeadingStyles}>Type</th>
                  <th className={tableHeadingStyles}>Default</th>
                  <th className={tableHeadingStyles}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tableDataStyles}>color</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    The color of the spinner's border.
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>size</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>40</td>
                  <td className={tableDataStyles}>
                    The size (diameter) of the spinner in pixels.
                  </td>
                </tr>
                <tr>
                  <td className={tableDataStyles}>borderWidth</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>4</td>
                  <td className={tableDataStyles}>
                    The width of the spinner's border in pixels.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Themed Spinner */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Themed Spinner
          </h2>
          <p
            className={`mb-6 text-lg ${darkMode ? 'text-white' : 'text-black'}`}
          >
            Customize your spinner's appearance by selecting a color, size, and
            border width.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className={`${getGlassyClasses(10)} p-6`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Color
              </label>
              <div className='flex items-center'>
                <input
                  type='color'
                  value={customColor}
                  onChange={e => setCustomColor(e.target.value)}
                  className='w-8 h-8 rounded-full border-2 border-white shadow-lg mr-4'
                />
                <input
                  type='text'
                  value={customColor}
                  onChange={e => setCustomColor(e.target.value)}
                  className='bg-transparent border-b border-gray-400 w-full py-1 px-2 text-white'
                />
              </div>
            </div>

            <div className={`${getGlassyClasses(10)} p-6`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Size (px)
              </label>
              <input
                type='number'
                value={customSize}
                onChange={e => setCustomSize(e.target.value)}
                className='bg-transparent border-b border-gray-400 w-full py-1 px-2 text-white'
              />
            </div>

            <div className={`${getGlassyClasses(10)} p-6`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Border Width (px)
              </label>
              <input
                type='number'
                value={customBorderWidth}
                onChange={e => setCustomBorderWidth(e.target.value)}
                className='bg-transparent border-b border-gray-400 w-full py-1 px-2 text-white'
              />
            </div>
          </div>

          <div className='relative mt-8'>
            <div
              className='mx-auto rounded-full animate-spin mb-6'
              style={{
                width: `${customSize}px`,
                height: `${customSize}px`,
                border: `${customBorderWidth}px solid ${customColor}`,
                borderTopColor: 'transparent',
              }}
            ></div>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {themedSpinnerCode}
            </pre>
            <CopyButton
              text={themedSpinnerCode}
              codeKey='themedSpinner'
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Full Width Spinner */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Full Width Spinner
          </h2>
          <p
            className={`mb-6 text-lg ${darkMode ? 'text-white' : 'text-black'}`}
          >
            For layouts that need the spinner to cover the entire width of the
            container.
          </p>

          <div className='relative'>
            <div className='w-full h-16 border-4 border-t-transparent border-white rounded-full animate-spin'></div>

            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {fullWidthSpinnerCode}
            </pre>
            <CopyButton
              text={fullWidthSpinnerCode}
              codeKey='fullWidthSpinner'
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerDetailsPage;
