import { ArrowLeft, Check, Copy, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // =========================
  // ONLY COPY BUTTON CHANGED
  // =========================
  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => {
    const copied = copiedStates[codeKey];

    return (
      <button
        onClick={() => copyToClipboard(text, codeKey)}
        className={`
          group absolute top-3 right-3
          flex items-center gap-2
          px-3 py-2
          rounded-xl
          border
          backdrop-blur-xl
          transition-all duration-300
          active:scale-95
          shadow-lg
          overflow-hidden

          ${
            copied
              ? 'bg-green-500/35 border-green-300 text-white shadow-[0_0_28px_rgba(34,197,94,0.75)]'
              : 'bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30'
          }
        `}
      >
        {/* Shine (UNCHANGED) */}
        <span className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent' />

        {/* Content */}
        <span className='relative flex items-center gap-2'>
          {/* ONLY CHANGE: stronger visibility + bolder icon container */}
          <span
            className={`
              flex items-center justify-center w-7 h-7 rounded-md
              transition-all duration-300

              ${
                copied
                  ? 'bg-green-500 shadow-[0_0_22px_rgba(34,197,94,0.95)]'
                  : ''
              }
            `}
          >
            {/* ONLY CHANGE: thicker arrow/tick feel */}
            {copied ? (
              <Check size={18} strokeWidth={3.4} />
            ) : (
              <Copy size={18} strokeWidth={3.4} />
            )}
          </span>

          <span className='text-sm font-medium tracking-wide'>
            {copied ? 'Copied' : 'Copy'}
          </span>
        </span>

        {/* Pulse (UNCHANGED) */}
        {copied && (
          <span className='absolute inset-0 rounded-xl bg-green-400/25 animate-pulse' />
        )}
      </button>
    );
  };

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
    <div className='min-h-screen pt-24 px-8 pb-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
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

      {/* EVERYTHING BELOW EXACTLY UNCHANGED (TABLE INCLUDED) */}
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
          {`import { Input } from './Input';`}

          <CopyButton
            text={`import { Input } from './Input';`}
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
                <td className='p-2'>'left'| 'right'</td>
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

            <div className='mt-8'>
              <h4 className='text-xl font-semibold mb-4'>Generated Code</h4>
              <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto'>
                {customCode}
              </pre>

              <CopyButton text={customCode} codeKey='customStyling' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InputDetailPage;
