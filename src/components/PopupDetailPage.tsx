import React, { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, X, Wifi, CreditCard } from 'lucide-react';
import BackToTopButton from './BackToTop';
import { date } from 'zod';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  style = {},
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-lg ${className}`}
    style={style}
  >
    {children}
  </button>
);

const CopyButton: React.FC<{
  text: string;
  codeKey: string;
  copiedStates: { [key: string]: boolean };
  copyToClipboard: (text: string, key: string) => void;
  getGlassyClasses: () => string;
  darkMode: boolean;
}> = ({
  text,
  codeKey,
  copiedStates,
  copyToClipboard,
  getGlassyClasses,
  darkMode,
}) => (
  <button
    onClick={() => copyToClipboard(text, codeKey)}
    className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 ${darkMode ? 'text-white hover:bg-white/40' : 'text-black hover:bg-black/30'} transition-all duration-300 z-10`}
    title='Copy to clipboard'
  >
    {copiedStates[codeKey] ? (
      <Check size={20} />
    ) : (
      <Copy size={20} className={darkMode ? 'text-gray-100' : 'text-black'} />
    )}
  </button>
);

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  bg?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
  opacity?: number;
  blur?: number;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  bg = '#ffffff',
  textColor = '#000000',
  borderColor = '#000000',
  className = '',
  opacity = 0.5,
  blur = 5,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='absolute inset-0 bg-black'
        style={{ opacity: opacity / 2 }}
        onClick={onClose}
      ></div>
      <div
        className={`relative p-6 rounded-lg shadow-2xl transform transition-all duration-300 ${className}`}
        style={{
          backgroundColor: bg,
          color: textColor,
          borderColor: borderColor,
          borderWidth: '2px',
          borderStyle: 'solid',
          boxShadow: `0 10px 25px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.05)`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          background: `rgba(${parseInt(bg.slice(1, 3), 16)}, ${parseInt(bg.slice(3, 5), 16)}, ${parseInt(bg.slice(5, 7), 16)}, ${opacity})`,
        }}
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const CustomPopup: React.FC<{
  getGlassyClasses: () => string;
  copiedStates: { [key: string]: boolean };
  copyToClipboard: (text: string, key: string) => void;
  darkMode: boolean;
}> = ({ getGlassyClasses, copiedStates, copyToClipboard, darkMode }) => {
  const [theme, setTheme] = useState<
    'blue' | 'brown' | 'white' | 'black' | 'custom'
  >('blue');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [customColors, setCustomColors] = useState({
    bg: '#ffffff',
    textColor: '#000000',
    borderColor: '#000000',
    buttonBg: '#4a90e2',
  });
  const [opacity, setOpacity] = useState(0.5);
  const [blur, setBlur] = useState(5);

  const getThemeColors = (
    theme: 'blue' | 'brown' | 'white' | 'black' | 'custom',
  ) => {
    switch (theme) {
      case 'blue':
        return {
          bg: '#fefcd0',
          textColor: 'black',
          borderColor: 'black',
          buttonBg: '#4a90e2',
        };
      case 'brown':
        return {
          bg: '#d2b48c',
          textColor: 'black',
          borderColor: 'black',
          buttonBg: '#a0522d',
        };
      case 'white':
        return {
          bg: 'white',
          textColor: 'black',
          borderColor: 'black',
          buttonBg: '#e0e0e0',
        };
      case 'black':
        return {
          bg: 'black',
          textColor: 'white',
          borderColor: 'white',
          buttonBg: '#555',
        };
      case 'custom':
        return customColors;
    }
  };

  const themeColors = getThemeColors(theme);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleColorChange =
    (colorType: keyof typeof customColors) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomColors(prev => ({ ...prev, [colorType]: e.target.value }));
      setTheme('custom');
    };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(parseFloat(e.target.value));
  };

  const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlur(parseInt(e.target.value));
  };

  return (
    <div className='p-4 rounded-lg'>
      <h2 className='text-3xl font-bold mb-4'>Glassmorphism Popup</h2>
      <p className='mb-4'>
        Customize your popup's appearance and glassmorphism effect.
      </p>

      <div className='mb-4'>
        <label className='block mb-2'>Theme:</label>
        <div className='flex space-x-2'>
          {(['blue', 'brown', 'white', 'black', 'custom'] as const).map(t => (
            <button
              key={t}
              className={`w-6 h-6 rounded-full ${t === theme ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              style={{
                background:
                  t === 'custom'
                    ? 'linear-gradient(45deg, red, blue)'
                    : getThemeColors(t).bg,
              }}
              onClick={() => setTheme(t)}
            />
          ))}
        </div>
      </div>

      {theme === 'custom' && (
        <div className='mb-4 grid grid-cols-2 gap-4'>
          <div>
            <label className='block mb-1'>Background:</label>
            <input
              type='color'
              value={customColors.bg}
              onChange={handleColorChange('bg')}
              className='w-full'
            />
          </div>
          <div>
            <label className='block mb-1'>Text Color:</label>
            <input
              type='color'
              value={customColors.textColor}
              onChange={handleColorChange('textColor')}
              className='w-full'
            />
          </div>
          <div>
            <label className='block mb-1'>Border Color:</label>
            <input
              type='color'
              value={customColors.borderColor}
              onChange={handleColorChange('borderColor')}
              className='w-full'
            />
          </div>
          <div>
            <label className='block mb-1'>Button Color:</label>
            <input
              type='color'
              value={customColors.buttonBg}
              onChange={handleColorChange('buttonBg')}
              className='w-full'
            />
          </div>
        </div>
      )}

      <div className='mb-4'>
        <label className='block mb-1'>Opacity: {opacity.toFixed(2)}</label>
        <div className='flex items-center'>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={opacity}
            onChange={handleOpacityChange}
            className='w-full mr-2'
          />
          <div
            className='w-6 h-6 rounded'
            style={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
          ></div>
        </div>
      </div>

      <div className='mb-4'>
        <label className='block mb-1'>Blur: {blur}px</label>
        <div className='flex items-center'>
          <input
            type='range'
            min='0'
            max='20'
            step='1'
            value={blur}
            onChange={handleBlurChange}
            className='w-full mr-2'
          />
          <div
            className='w-6 h-6 bg-gray-400 rounded'
            style={{ filter: `blur(${blur / 2}px)` }}
          ></div>
        </div>
      </div>

      <div className='flex justify-center mt-6'>
        <Button
          onClick={openPopup}
          className='text-white font-bold'
          style={{
            backgroundColor: themeColors.buttonBg,
            boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)`,
          }}
        >
          Open Popup
        </Button>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        bg={themeColors.bg}
        textColor={themeColors.textColor}
        borderColor={themeColors.borderColor}
        className='w-80'
        opacity={opacity}
        blur={blur}
      >
        <div className='p-4'>
          <h3 className='text-xl font-bold mb-2'>Welcome!</h3>
          <p>This is a glassmorphism popup.</p>
        </div>
      </Popup>

      <div className='mt-4 p-2 rounded relative'>
        <pre
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
        >
          {`const Popup = ({ isOpen, onClose, children, bg, textColor, borderColor, opacity, blur }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: opacity / 2 }}
        onClick={onClose}
      ></div>
      <div
        className="relative p-6 rounded-lg shadow-2xl transform transition-all duration-300"
        style={{
          backgroundColor: bg,
          color: textColor,
          borderColor: borderColor,
          borderWidth: '2px',
          borderStyle: 'solid',
          boxShadow: \`0 10px 25px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.05)\`,
          backdropFilter: \`blur(\${blur}px)\`,
          WebkitBackdropFilter: \`blur(\${blur}px)\`,
          background: \`rgba(\${parseInt(bg.slice(1, 3), 16)}, \${parseInt(bg.slice(3, 5), 16)}, \${parseInt(bg.slice(5, 7), 16)}, \${opacity})\`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Usage
<Popup
  isOpen={isPopupOpen}
  onClose={closePopup}
  bg="${themeColors.bg}"
  textColor="${themeColors.textColor}"
  borderColor="${themeColors.borderColor}"
  opacity={${opacity}}
  blur={${blur}}
>
  <div className="p-4">
    <h3 className="text-xl font-bold mb-2">Welcome!</h3>
    <p>This is a glassmorphism popup.</p>
  </div>
</Popup>`}
        </pre>
        <CopyButton
          text={`// Glassmorphism Popup Component...`} // Full text omitted for brevity
          codeKey='glassmorphismPopup'
          copiedStates={copiedStates}
          copyToClipboard={copyToClipboard}
          getGlassyClasses={getGlassyClasses}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

const PopupDetailPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

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

  const tableHeadingStyles = `text-left p-2 ${darkMode ? 'text-gray-100' : 'text-black'}`;
  const tableDataStyles = `p-2 ${darkMode ? 'text-gray-200' : 'text-black/80'}`;

  return (
    <div
      className={`min-h-screen p-8 font-sans bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'} relative`}
    >
      <BackToTopButton />
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
        Glassmorphism Popup
      </h1>

      <p
        className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
      >
        A customizable, glassmorphism-styled popup component for displaying
        modal content with adjustable blur and opacity effects.
      </p>

      {/* Basic Usage */}
      <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2
          className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          Basic Usage
        </h2>
        <pre
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
        >
          {`<div>
  <button onClick={openPopup}>Open Popup</button>
  <Popup
    isOpen={isPopupOpen}
    onClose={closePopup}
    bg="#ffffff"
    textColor="#000000"
    borderColor="#000000"
    opacity={0.5}
    blur={5}>
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">Welcome!</h3>
      <p>This is a glassmorphism popup.</p>
    </div>
  </Popup>
</div>`}
        </pre>
        <CopyButton
          darkMode={darkMode}
          text={`import React, { useState } from 'react';
import { Popup } from './components';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>

      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        bg="#ffffff"
        textColor="#000000"
        borderColor="#000000"
        opacity={0.5}
        blur={5}
      >
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Welcome!</h3>
          <p>This is a glassmorphism popup.</p>
        </div>
      </Popup>
    </div>
  );
}`}
          codeKey='basicUsage'
          copiedStates={copiedStates}
          copyToClipboard={copyToClipboard}
          getGlassyClasses={getGlassyClasses}
        />
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
                <td className={tableDataStyles}>isOpen</td>
                <td className={tableDataStyles}>boolean</td>
                <td className={tableDataStyles}>false</td>
                <td className={tableDataStyles}>
                  Controls whether the popup is visible
                </td>
              </tr>
              <tr
                className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
              >
                <td className={tableDataStyles}>onClose</td>
                <td className={tableDataStyles}>function</td>
                <td className={tableDataStyles}>-</td>
                <td className={tableDataStyles}>
                  Function to call when closing the popup
                </td>
              </tr>
              <tr>
                <td className={tableDataStyles}>bg</td>
                <td className={tableDataStyles}>string</td>
                <td className={tableDataStyles}>'#ffffff'</td>
                <td className={tableDataStyles}>
                  Background color of the popup content
                </td>
              </tr>
              <tr
                className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
              >
                <td className={tableDataStyles}>textColor</td>
                <td className={tableDataStyles}>string</td>
                <td className={tableDataStyles}>'#000000'</td>
                <td className={tableDataStyles}>
                  Text color of the popup content
                </td>
              </tr>
              <tr>
                <td className={tableDataStyles}>borderColor</td>
                <td className={tableDataStyles}>string</td>
                <td className={tableDataStyles}>'#000000'</td>
                <td className={tableDataStyles}>Border color of the popup</td>
              </tr>
              <tr
                className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
              >
                <td className={tableDataStyles}>opacity</td>
                <td className={tableDataStyles}>number</td>
                <td className={tableDataStyles}>0.5</td>
                <td className={tableDataStyles}>
                  Opacity of the popup background
                </td>
              </tr>
              <tr>
                <td className={tableDataStyles}>blur</td>
                <td className={tableDataStyles}>number</td>
                <td className={tableDataStyles}>5</td>
                <td className={tableDataStyles}>
                  Blur effect strength in pixels
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Popup */}
      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <CustomPopup
          getGlassyClasses={getGlassyClasses}
          copiedStates={copiedStates}
          copyToClipboard={copyToClipboard}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default PopupDetailPage;
