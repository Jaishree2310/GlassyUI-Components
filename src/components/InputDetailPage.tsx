import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Search } from 'lucide-react';
import BackToTopButton from './BackToTop';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onIconClick?: () => void;
  darkMode: boolean;
}

const Input: React.FC<InputProps> = ({
  className = '',
  icon,
  iconPosition = 'right',
  onIconClick,
  darkMode,
  ...props
}) => {
  const iconClasses = iconPosition === 'left' ? 'pl-10' : 'pr-10';

  return (
    <div className='relative'>
      <input
        className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-300 ${iconClasses} ${className}`}
        {...props}
      />
      {icon && (
        <span
          className={`absolute top-1/2 transform -translate-y-1/2 ${
            iconPosition === 'left' ? 'left-3' : 'right-3'
          } cursor-pointer`}
          onClick={onIconClick}
        >
          {icon}
        </span>
      )}
    </div>
  );
};

const InputDetailPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [customBgColor, setCustomBgColor] = useState('#ffffff');
  const [customTextColor, setCustomTextColor] = useState('#000000');
  const [customBorderColor, setCustomBorderColor] = useState('#000000');
  const [customOpacity, setCustomOpacity] = useState(50);
  const [customBorderWidth, setCustomBorderWidth] = useState(1);
  const [customBorderRadius, setCustomBorderRadius] = useState(8);
  const [customCode, setCustomCode] = useState('');

  const getGlassyClasses = (darkMode: boolean, opacity = 10) => {
    return `backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} bg-opacity-${opacity} 
  border border-opacity-20 rounded-lg shadow-lg transition-all duration-300 max-sm:px-1`;
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
      className={`absolute top-4 right-4 p-2 ${getGlassyClasses(darkMode)} ${darkMode ? 'text-white hover:bg-white/40' : 'text-black hover:bg-black/30'}  bg-opacity-20`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={20} />
      ) : (
        <Copy size={20} className={darkMode ? 'text-gray-100' : 'text-black'} />
      )}
    </button>
  );

  const handleSearch = () => {
    alert('Search clicked');
  };

  const handleBackToComponents = () => {
    navigate('/components');
  };

  const customInputStyle = {
    backgroundColor: customBgColor,
    color: customTextColor,
    borderColor: customBorderColor,
    borderWidth: `${customBorderWidth}px`,
    borderRadius: `${customBorderRadius}px`,
    opacity: customOpacity / 100,
  };

  useEffect(() => {
    updateCustomCode();
  }, [
    customBgColor,
    customTextColor,
    customBorderColor,
    customOpacity,
    customBorderWidth,
    customBorderRadius,
  ]);

  const updateCustomCode = () => {
    const code = `<Input 
  placeholder="Customizable search..." 
  className="backdrop-filter backdrop-blur-lg rounded-lg shadow-lg transition-all duration-300"
  style={{
    backgroundColor: '${customBgColor}${Math.round(customOpacity * 2.55)
      .toString(16)
      .padStart(2, '0')}',
    color: '${customTextColor}',
    borderColor: '${customBorderColor}',
    borderWidth: '${customBorderWidth}px',
    borderRadius: '${customBorderRadius}px',
  }}
  icon={<Search size={24} color="${customTextColor}" />}
  iconPosition="right"
  onIconClick={handleSearch}
/>`;
    setCustomCode(code);
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
          className={`flex items-center ${getGlassyClasses(darkMode)} px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'}`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </nav>

      <h1
        className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'} relative z-10`}
      >
        Glassmorphic Input Component
      </h1>
      <p
        className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
      >
        A customizable, glassmorphism-styled Input component.
      </p>

      <section
        className={`${getGlassyClasses(darkMode, 20)} p-6 mb-8 ${darkMode ? 'text-white' : 'text-black'} relative z-10`}
      >
        <h2 className='text-3xl font-bold mb-4'>Basic Usage</h2>
        <div
          className={`${getGlassyClasses(darkMode)} p-4 hover:shadow-xl mb-4`}
        >
          <Input
            placeholder='Enter text...'
            className={`${getGlassyClasses(darkMode, 20)} text-white placeholder-gray-500`}
            darkMode={darkMode}
          />
        </div>
        <pre
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-lg overflow-x-auto  max-sm:text-[0.55rem]`}
        >
          {`import { Input } from './Input';

function MyComponent() {
  return (
    <Input 
      placeholder="Enter text..." 
      className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg"
    />
  );
}`}
          <CopyButton
            darkMode={darkMode}
            text={`import { Input } from './Input';

function MyComponent() {
  return (
    <Input 
      placeholder="Enter text..." 
      className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg"
    />
  );
}`}
            codeKey='basicUsage'
          />
        </pre>
      </section>

      <section
        className={`${getGlassyClasses(darkMode, 20)} p-6 mb-8  ${darkMode ? 'text-white' : 'text-black'} relative z-10`}
      >
        <h2 className='text-2xl font-bold mb-4'>Props</h2>
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
                  Additional CSS classes to apply to the input
                </td>
              </tr>
              <tr
                className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
              >
                <td className={tableDataStyles}>icon</td>
                <td className={tableDataStyles}>React.ReactNode</td>
                <td className={tableDataStyles}>undefined</td>
                <td className={tableDataStyles}>
                  Icon to display inside the input
                </td>
              </tr>
              <tr>
                <td className={tableDataStyles}>iconPosition</td>
                <td className={tableDataStyles}>'left' | 'right'</td>
                <td className={tableDataStyles}>'right'</td>
                <td className={tableDataStyles}>
                  Position of the icon inside the input
                </td>
              </tr>
              <tr
                className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
              >
                <td className={tableDataStyles}>onIconClick</td>
                <td className={tableDataStyles}>{'() => void'}</td>
                <td className={tableDataStyles}>undefined</td>
                <td className={tableDataStyles}>
                  Function to call when the icon is clicked
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        className={`${getGlassyClasses(darkMode, 20)} p-6 mb-8 ${darkMode ? 'text-white' : 'text-black'} relative z-10`}
      >
        <h2 className='text-2xl font-bold mb-4'>Custom Styling</h2>
        <div className='mb-12'>
          <h3 className='text-xl font-semibold mb-6 flex items-center'>
            <Search size={24} className='mr-3' />
            Search Input Customization
          </h3>
          <div
            className={`${getGlassyClasses(darkMode)} p-8 hover:shadow-xl rounded-xl`}
          >
            <div className='mb-8'>
              <Input
                placeholder='Customizable search...'
                className={`backdrop-filter backdrop-blur-lg bg-white/30 border-white/20 bg-opacity-${customOpacity} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300 max-sm:px-1 text-lg`}
                style={customInputStyle}
                icon={<Search size={24} color={customTextColor} />}
                iconPosition='right'
                onIconClick={handleSearch}
                darkMode={darkMode}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div className='space-y-2'>
                <label
                  className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  Background Color
                </label>
                <div className='flex items-center space-x-3'>
                  <input
                    type='color'
                    value={customBgColor}
                    onChange={e => setCustomBgColor(e.target.value)}
                    className='w-8 h-8 cursor-pointer border-none'
                  />
                  <span className='text-sm'>{customBgColor}</span>
                </div>
              </div>
              <div className='space-y-2'>
                <label
                  className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  Text Color
                </label>
                <div className='flex items-center space-x-3'>
                  <input
                    type='color'
                    value={customTextColor}
                    onChange={e => setCustomTextColor(e.target.value)}
                    className='w-8 h-8 cursor-pointer border-none'
                  />
                  <span className='text-sm'>{customTextColor}</span>
                </div>
              </div>
              <div className='space-y-2'>
                <label
                  className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  Border Color
                </label>
                <div className='flex items-center space-x-3'>
                  <input
                    type='color'
                    value={customBorderColor}
                    onChange={e => setCustomBorderColor(e.target.value)}
                    className='w-8 h-8 cursor-pointer border-none'
                  />
                  <span className='text-sm'>{customBorderColor}</span>
                </div>
              </div>
              <div className='space-y-2'>
                <label
                  className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  Opacity
                </label>
                <input
                  type='range'
                  min='0'
                  max='100'
                  value={customOpacity}
                  onChange={e => setCustomOpacity(Number(e.target.value))}
                  className='w-full'
                />
                <span className='text-sm'>{customOpacity}%</span>
              </div>
              <div className='space-y-2'>
                <label
                  className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  Border Width
                </label>
                <input
                  type='number'
                  min='0'
                  value={customBorderWidth}
                  onChange={e => setCustomBorderWidth(Number(e.target.value))}
                  style={{ color: 'black' }}
                  className='w-full'
                />
                <span className='text-sm'>{customBorderWidth}px</span>
              </div>
              <div className='space-y-2'>
                <label
                  className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  Border Radius
                </label>
                <input
                  type='number'
                  min='0'
                  value={customBorderRadius}
                  onChange={e => setCustomBorderRadius(Number(e.target.value))}
                  style={{ color: 'black' }}
                  className='w-full'
                />
                <span className='text-sm'>{customBorderRadius}px</span>
              </div>
            </div>
            <div className='mt-8'>
              <h4 className='text-xl font-semibold mb-4'>Generated Code</h4>
              <div className='relative'>
                <pre
                  className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-lg overflow-x-auto  max-sm:text-[0.55rem]`}
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

export default InputDetailPage;
