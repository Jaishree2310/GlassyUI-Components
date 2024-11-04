import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

const SliderDetailsPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [customBgColor, setCustomBgColor] = useState('#ffffff');
  const [customOpacity, setCustomOpacity] = useState(50);
  const [customCode, setCustomCode] = useState('');
  const [sliderValue, setSliderValue] = useState(50);

  // Update customCode whenever sliderValue, customBgColor, or customOpacity changes
  useEffect(() => {
    const code = `<input
  type="range"
  min="0"
  max="100"
  value={${sliderValue}}
  onChange={handleSliderChange}
  class="${get_GlassyClasses(customOpacity)} 
  w-full h-2 rounded-lg appearance-none cursor-pointer"
  style={{
    background: \`linear-gradient(90deg, '${customBgColor}' \${sliderValue}%, '#cccccc' \${sliderValue}%)\`,
  }} />`;
    setCustomCode(code);
  }, [sliderValue, customBgColor, customOpacity]);

  const get_GlassyClasses = (opacity = 20) => {
    return `backdrop-filter backdrop-blur-lg bg-opacity-${opacity} 
  border border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  };

  const getGlassyClasses = (darkMode?: boolean, opacity = 20) => {
    return `backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} bg-opacity-${opacity} 
  border border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
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
      className={`absolute top-4 right-4 ${getGlassyClasses(darkMode)} p-2  ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'}`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={20} />
      ) : (
        <Copy size={20} className={darkMode ? 'text-gray-100' : 'text-black'} />
      )}
    </button>
  );

  const handleBackToComponents = () => {
    navigate('/components');
  };

  const tableHeadingStyles = `text-left p-2 ${darkMode ? 'text-gray-100' : 'text-black'}`;
  const tableDataStyles = `p-2 ${darkMode ? 'text-gray-200' : 'text-black/80'}`;

  return (
    <div
      className={`min-h-screen p-8 font-sans bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'} relative`}
    >
      <BackToTopButton />
      <nav className='mb-8 flex items-center justify-between relative z-10'>
        <button
          onClick={handleBackToComponents}
          className={`flex items-center ${getGlassyClasses(darkMode, 10)} px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'} transition-all duration-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </nav>

      <h1
        className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'} relative z-10`}
      >
        Glassmorphic Slider Component
      </h1>
      <p
        className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
      >
        A glassmorphism-styled Slider component.
      </p>

      <section
        className={`${getGlassyClasses(darkMode, 20)} p-6 mb-14 text-white relative z-10`}
      >
        <h2
          className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          Basic Usage
        </h2>
        <div className={`${getGlassyClasses(false)} p-4 hover:shadow-xl mb-4`}>
          <input
            type='range'
            min='0'
            max='100'
            value={sliderValue}
            onChange={handleSliderChange}
            className={`${get_GlassyClasses(50)} w-full h-2 rounded-lg appearance-none cursor-pointer`}
            style={{
              background: `linear-gradient(90deg, rgba(255, 255, 255, 0.3) ${sliderValue}%, rgba(255, 255, 255, 0.1) ${sliderValue}%)`,
            }}
          />
        </div>
        <pre
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap relative`}
        >
          {`<input 
  type="range" 
  min="0" 
  max="100" 
  value={${sliderValue}} 
  class="${getGlassyClasses(darkMode, 50)}" 
  style={{ backgroundColor: '${customBgColor}' }} />`}
          <CopyButton
            text={`<input type="range" min="0" max="100" value={${sliderValue}} class="${getGlassyClasses(darkMode, 50)}" style={{ backgroundColor: '${customBgColor}' }} />`}
            codeKey='basicUsage'
            darkMode={darkMode}
          />
        </pre>
      </section>

      <section
        className={`${getGlassyClasses(darkMode, 20)} p-6 mb-14 text-white relative z-10`}
      >
        <h2
          className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}
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
                <td className={tableDataStyles}>className</td>
                <td className={tableDataStyles}>string</td>
                <td className={tableDataStyles}>''</td>
                <td className={tableDataStyles}>
                  Additional CSS classes to apply to the slider
                </td>
              </tr>
              <tr
                className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
              >
                <td className={tableDataStyles}>min</td>
                <td className={tableDataStyles}>number</td>
                <td className={tableDataStyles}>0</td>
                <td className={tableDataStyles}>Minimum value of the slider</td>
              </tr>
              <tr>
                <td className={tableDataStyles}>max</td>
                <td className={tableDataStyles}>number</td>
                <td className={tableDataStyles}>100</td>
                <td className={tableDataStyles}>Maximum value of the slider</td>
              </tr>
              <tr
                className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
              >
                <td className={tableDataStyles}>defaultValue</td>
                <td className={tableDataStyles}>number</td>
                <td className={tableDataStyles}>50</td>
                <td className={tableDataStyles}>Default value of the slider</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        className={`${getGlassyClasses(darkMode, 20)} p-6 mb-8 text-white relative z-10`}
      >
        <h2
          className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          Custom Styling
        </h2>
        <div className='mb-12'>
          <h3
            className={`text-xl font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Slider Customization
          </h3>
          <div
            className={`${getGlassyClasses(darkMode)} p-8 hover:shadow-xl rounded-xl`}
          >
            <div className='mb-8'>
              <input
                type='range'
                min='0'
                max='100'
                value={sliderValue}
                onChange={handleSliderChange}
                className={`${getGlassyClasses(darkMode)} w-full h-2 rounded-lg appearance-none cursor-pointer`}
                style={{
                  background: `linear-gradient(90deg, ${customBgColor} ${sliderValue}%, #cccccc ${sliderValue}%)`,
                }}
              />
            </div>
            <div className='space-y-2'>
              <label
                className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}
              >
                Background Color
              </label>
              <input
                type='color'
                value={customBgColor}
                onChange={e => setCustomBgColor(e.target.value)}
                className='w-8 h-8 cursor-pointer border-none bg-transparent'
              />
              <span className='text-sm p-2 font-semibold'>{customBgColor}</span>
            </div>
            <div className='mt-8'>
              <h4
                className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}
              >
                Generated Code
              </h4>
              <div className='relative'>
                <pre
                  className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-lg overflow-x-auto`}
                >
                  {customCode}
                </pre>
                <CopyButton
                  text={customCode}
                  codeKey='customStyling'
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SliderDetailsPage;
