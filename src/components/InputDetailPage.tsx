import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Search } from 'lucide-react';
import BackToTopButton from './BackToTop';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  className = '',
  icon,
  iconPosition = 'right',
  onIconClick,
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

const InputDetailPage: React.FC = () => {
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

  const getGlassyClasses = (opacity = 10) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300 max-sm:px-1`;
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
      className={`absolute top-4 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-20 text-white`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
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

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <nav className='mb-8 flex items-center justify-between relative z-10'>
        <button
          onClick={handleBackToComponents}
          className={`flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 text-white`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </nav>

      <h1 className='text-6xl font-bold mb-8 text-white relative z-10'>
        Glassmorphic Input Component
      </h1>
      <p className='text-xl mb-8 text-gray-100'>
        A customizable, glassmorphism-styled Input component.
      </p>

      <section
        className={`${getGlassyClasses(20)} p-6 mb-8 text-white relative z-10`}
      >
        <h2 className='text-3xl font-bold mb-4'>Basic Usage</h2>
        <div className={`${getGlassyClasses()} p-4 hover:shadow-xl mb-4`}>
          <Input
            placeholder='Enter text...'
            className={`${getGlassyClasses(20)} text-white placeholder-gray-500`}
          />
        </div>
        <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto relative  max-sm:text-[0.55rem]'>
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
        className={`${getGlassyClasses(20)} p-6 mb-8 text-white relative z-10`}
      >
        <h2 className='text-2xl font-bold mb-4'>Props</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-white bg-opacity-20'>
                <th className='text-left p-2'>Prop</th>
                <th className='text-left p-2'>Type</th>
                <th className='text-left p-2'>Default</th>
                <th className='text-left p-2'>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2'>className</td>
                <td className='p-2'>string</td>
                <td className='p-2'>''</td>
                <td className='p-2'>
                  Additional CSS classes to apply to the input
                </td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>icon</td>
                <td className='p-2'>React.ReactNode</td>
                <td className='p-2'>undefined</td>
                <td className='p-2'>Icon to display inside the input</td>
              </tr>
              <tr>
                <td className='p-2'>iconPosition</td>
                <td className='p-2'>'left' | 'right'</td>
                <td className='p-2'>'right'</td>
                <td className='p-2'>Position of the icon inside the input</td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>onIconClick</td>
                <td className='p-2'>{'() => void'}</td>
                <td className='p-2'>undefined</td>
                <td className='p-2'>
                  Function to call when the icon is clicked
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        className={`${getGlassyClasses(20)} p-6 mb-8 text-white relative z-10`}
      >
        <h2 className='text-2xl font-bold mb-4'>Custom Styling</h2>
        <div className='mb-12'>
          <h3 className='text-xl font-semibold mb-6 flex items-center'>
            <Search size={24} className='mr-3' />
            Search Input Customization
          </h3>
          <div
            className={`${getGlassyClasses()} p-8 hover:shadow-xl rounded-xl`}
          >
            <div className='mb-8'>
              <Input
                placeholder='Customizable search...'
                className={`${getGlassyClasses(customOpacity)} text-lg`}
                style={customInputStyle}
                icon={<Search size={24} color={customTextColor} />}
                iconPosition='right'
                onIconClick={handleSearch}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-white'>
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
                <label className='block text-sm font-medium text-white'>
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
                <label className='block text-sm font-medium text-white'>
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
                <label className='block text-sm font-medium text-white'>
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
                <label className='block text-sm font-medium text-white'>
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
                <label className='block text-sm font-medium text-white'>
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
                <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto  max-sm:text-[0.55rem]'>
                  {customCode}
                </pre>
                <CopyButton text={customCode} codeKey='customStyling' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InputDetailPage;
