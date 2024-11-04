import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

type Theme = 'pink' | 'brown' | 'white' | 'black';
type CustomTheme = 'blue' | 'brown' | 'white' | 'black' | 'rainbow';

const CustomTextArea: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [theme, setTheme] = useState<CustomTheme>('blue');

  const getThemeColors = (theme: CustomTheme) => {
    switch (theme) {
      case 'blue':
        return { bg: '#fefcd0', textColor: 'black', borderColor: 'black' };
      case 'brown':
        return { bg: '#d2b48c', textColor: 'black', borderColor: 'black' };
      case 'white':
        return { bg: 'white', textColor: 'black', borderColor: 'black' };
      case 'black':
        return { bg: 'black', textColor: 'white', borderColor: 'white' };
      case 'rainbow':
        return {
          bg: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)',
          textColor: 'white',
          borderColor: 'white',
        };
      default:
        return { bg: 'white', textColor: 'black', borderColor: 'black' };
    }
  };

  const themeColors = getThemeColors(theme);

  return (
    <div className='rounded-lg'>
      <h2
        className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}
      >
        Custom TextArea
      </h2>
      <p className={darkMode ? 'text-gray-200 mb-4' : 'text-black mb-4'}>
        Customize your textarea's appearance by selecting a preset theme or
        creating your own color scheme.
      </p>
      <div className='mb-4'>
        <label
          className={`block ${darkMode ? 'text-white' : 'text-black'} mb-2`}
        >
          Theme:
        </label>
        <div className='flex space-x-2'>
          {(
            ['blue', 'brown', 'white', 'black', 'rainbow'] as CustomTheme[]
          ).map(t => (
            <button
              key={t}
              className={`w-6 h-6 rounded-full ${t === theme ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              style={{
                background:
                  t === 'rainbow'
                    ? 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)'
                    : getThemeColors(t).bg,
              }}
              onClick={() => setTheme(t)}
            />
          ))}
        </div>
      </div>

      <textarea
        className='w-full h-32 p-2 rounded'
        style={{
          backgroundColor: themeColors.bg.includes('linear-gradient')
            ? 'transparent'
            : themeColors.bg,
          color: themeColors.textColor,
          borderColor: themeColors.borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundImage: themeColors.bg.includes('linear-gradient')
            ? themeColors.bg
            : 'none',
        }}
        placeholder='Enter your text here...'
      />

      <div className='mt-4 p-2 rounded'>
        <pre
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg text-md max-sm:text-[0.55rem]`}
        >
          {`<textarea
  style={{
    backgroundColor: '${themeColors.bg.includes('linear-gradient') ? 'transparent' : themeColors.bg}',
    color: '${themeColors.textColor}',
    borderColor: '${themeColors.borderColor}',
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundImage: '${themeColors.bg.includes('linear-gradient') ? themeColors.bg : 'none'}'
  }}
  placeholder="Enter your text here..."
/>`}
        </pre>
      </div>
    </div>
  );
};

const TextareaDetailPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTheme =
    (location.state as { currentTheme?: Theme })?.currentTheme || 'pink';

  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getThemeClasses = () => {
    switch (currentTheme) {
      case 'white':
        return 'bg-gradient-to-br from-gray-50 to-white text-gray-100';
      case 'black':
        return 'bg-gradient-to-br from-gray-900 to-black text-white';
      case 'brown':
        return 'bg-gradient-to-br from-yellow-800 to-yellow-600 text-white';
      default:
        return 'bg-gradient-to-br from-pink-400 to-purple-500 text-white';
    }
  };

  const getGlassyClasses = (darkMode: boolean, opacity = 20) => {
    const baseClasses = `backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/20 border-black/20'} bg-opacity-${opacity} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
    switch (currentTheme) {
      case 'white':
        return `${baseClasses} bg-gray-500 bg-opacity-${opacity} border-gray-300 text-gray-100`;
      case 'black':
        return `${baseClasses} bg-white bg-opacity-${opacity} border-gray-600 text-white`;
      case 'brown':
        return `${baseClasses} bg-white bg-opacity-${opacity} border-yellow-300 text-white`;
      default:
        return `${baseClasses} bg-white bg-opacity-${opacity} border-white text-white`;
    }
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
      className={`absolute top-2 right-2 backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/20 border-black/30'} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300 p-2 ${darkMode ? 'text-white hover:bg-white/40' : 'text-black hover:bg-black/30'} transition-all duration-300 z-10`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={20} />
      ) : (
        <Copy size={20} className={darkMode ? 'text-gray-100' : 'text-black'} />
      )}
    </button>
  );

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
          className={`mb-8 flex items-center backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/20 border-black/20'} bg-opacity-10 border border-opacity-20 rounded-lg shadow-lg transition-all duration-300 px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'} transition-all duration-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1
          className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          TextArea Component
        </h1>
        <p
          className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          A customizable, glassmorphism-styled Text Area component.
        </p>

        {/* Basic Usage */}
        <div
          className={`backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300 p-6 mb-14 relative`}
        >
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Basic Usage
          </h2>
          <pre
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
          >
            {`function App() {
  return (
    <textarea
      placeholder="Enter your text here..."
      onChange={(e) => console.log(e.target.value)}
    />
  );
}`}
          </pre>
          <CopyButton
            darkMode={darkMode}
            text={`function App() {
  return (
    <textarea
      placeholder="Enter your text here..."
      onChange={(e) => console.log(e.target.value)}
    />
  );
}`}
            codeKey='basicUsage'
          />
        </div>

        {/* Props */}
        <div
          className={`backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300 p-6 mb-14`}
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
                  <td className={tableDataStyles}>style</td>
                  <td className={tableDataStyles}>CSSProperties</td>
                  <td className={tableDataStyles}>{}</td>
                  <td className={tableDataStyles}>
                    Inline styles for the textarea
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>className</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>""</td>
                  <td className={tableDataStyles}>
                    Additional CSS classes to apply to the textarea
                  </td>
                </tr>
                <tr>
                  <td className={tableDataStyles}>placeholder</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>""</td>
                  <td className={tableDataStyles}>
                    Placeholder text for the textarea
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>onChange</td>
                  <td className={tableDataStyles}>function</td>
                  <td className={tableDataStyles}>undefined</td>
                  <td className={tableDataStyles}>
                    Function to call when the textarea value changes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom TextArea */}
        <div
          className={`backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300 p-6 ${darkMode ? 'text-white' : 'text-black'} mb-14`}
        >
          <CustomTextArea darkMode={darkMode} />
        </div>

        {/* Additional Examples */}
        <div
          className={`backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300 p-6 mt-14`}
        >
          <h2
            className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}
          >
            Additional Examples
          </h2>

          <h3
            className={`text-xl mb-2 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            With Custom Styling
          </h3>
          <div
            className={`backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} bg-opacity-10 border border-opacity-20 rounded-lg shadow-lg transition-all duration-300 p-4 mb-6`}
          >
            <textarea
              className='w-full h-32 p-2 bg-gray-100 bg-opacity-50 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300'
              placeholder='Type something...'
            />
          </div>
          <pre
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-lg overflow-x-auto relative`}
          >
            {`<textarea
  className="w-full h-32 p-2"
  style={{
    backgroundColor: '#f0f0f0',
    color: 'black',
    borderColor: 'gray',
    borderWidth: '1px',
    borderStyle: 'solid'
  }}
  placeholder="Type something..."
/>`}
          </pre>
          <CopyButton
            darkMode={darkMode}
            text={`<textarea
  className="w-full h-32 p-2"
  style={{
    backgroundColor: '#f0f0f0',
    color: 'black',
    borderColor: 'gray',
    borderWidth: '1px',
    borderStyle: 'solid'
  }}
  placeholder="Type something..."
/>`}
            codeKey='customStyling'
          />
        </div>
      </div>
    </div>
  );
};

export default TextareaDetailPage;
