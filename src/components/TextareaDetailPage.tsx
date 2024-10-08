import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

type Theme = 'pink' | 'brown' | 'white' | 'black';
type CustomTheme = 'blue' | 'brown' | 'white' | 'black' | 'rainbow';

const CustomTextArea: React.FC = () => {
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
        return { bg: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)', textColor: 'white', borderColor: 'white' };
      default:
        return { bg: 'white', textColor: 'black', borderColor: 'black' };
    }
  };

  const themeColors = getThemeColors(theme);

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-2xl text-black font-bold mb-4">Custom TextArea</h2>
      <p className="text-gray-700 mb-4">Customize your textarea's appearance by selecting a preset theme or creating your own color scheme.</p>
      
      <div className="mb-4">
        <label className="block text-black mb-2">Theme:</label>
        <div className="flex space-x-2">
          {(['blue', 'brown', 'white', 'black', 'rainbow'] as CustomTheme[]).map((t) => (
            <button
              key={t}
              className={`w-6 h-6 rounded-full ${t === theme ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              style={{ background: t === 'rainbow' ? 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)' : getThemeColors(t).bg }}
              onClick={() => setTheme(t)}
            />
          ))}
        </div>
      </div>

      <textarea
        className="w-full h-32 p-2 rounded"
        style={{
          backgroundColor: themeColors.bg.includes('linear-gradient') ? 'transparent' : themeColors.bg,
          color: themeColors.textColor,
          borderColor: themeColors.borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundImage: themeColors.bg.includes('linear-gradient') ? themeColors.bg : 'none'
        }}
        placeholder="Enter your text here..."
      />

      <div className="mt-4 bg-gray-800 p-2 rounded">
        <pre className="text-sm">
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

const TextareaDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTheme = (location.state as { currentTheme?: Theme })?.currentTheme || 'pink';

  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const getThemeClasses = () => {
    switch (currentTheme) {
      case 'white':
        return 'bg-gradient-to-br from-gray-50 to-white text-gray-800';
      case 'black':
        return 'bg-gradient-to-br from-gray-900 to-black text-white';
      case 'brown':
        return 'bg-gradient-to-br from-yellow-800 to-yellow-600 text-white';
      default:
        return 'bg-gradient-to-br from-pink-400 to-purple-500 text-white';
    }
  };

  const getGlassyClasses = () => {
    const baseClasses = 'backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300';
    switch (currentTheme) {
      case 'white':
        return `${baseClasses} bg-gray-500 bg-opacity-10 border-gray-300 text-gray-800`;
      case 'black':
        return `${baseClasses} bg-white bg-opacity-10 border-gray-600 text-white`;
      case 'brown':
        return `${baseClasses} bg-white bg-opacity-10 border-yellow-300 text-white`;
      default:
        return `${baseClasses} bg-white bg-opacity-10 border-pink-300 text-white`;
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
    });
  };

  const CopyButton: React.FC<{ text: string, codeKey: string }> = ({ text, codeKey }) => (
    <button 
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-4 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-20 transition-all duration-300`}
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  return (
    <div className="min-h-screen p-8 font-mono relative overflow-hidden">
      <BackToTopButton />
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-50"></div>

      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[60%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-black">
        <button style={{color:'black'}}
          onClick={() => navigate(-1)} 
          className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 text-black transition-all duration-300`}
        >
          <ArrowLeft size={20} className="mr-2 text-black" />
          Back to Components
        </button>

        <h1 className="text-4xl font-bold mb-8">TextArea Component</h1>

        {/* Basic Usage */}
        <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
          <h2 className="text-2xl text-gray-800 font-bold mb-4">Basic Usage</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            {`function App() {
  return (
    <textarea
      placeholder="Enter your text here..."
      onChange={(e) => console.log(e.target.value)}
    />
  );
}`}
          </pre>
          <CopyButton text={`function App() {
  return (
    <textarea
      placeholder="Enter your text here..."
      onChange={(e) => console.log(e.target.value)}
    />
  );
}`} codeKey="basicUsage" />
        </div>

        {/* Props */}
        <div className={`${getGlassyClasses()} p-6 mb-8`}>
          <h2 className="text-2xl text-gray-800 font-bold mb-4">Props</h2>
          <div className="overflow-x-auto text-gray-500">
            <table className="w-full">
              <thead>
                <tr className="bg-white text-gray bg-opacity-20">
                  <th className="text-left p-2">Prop</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Default</th>
                  <th className="text-left p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">style</td>
                  <td className="p-2">CSSProperties</td>
                  <td className="p-2">{}</td>
                  <td className="p-2">Inline styles for the textarea</td>
                </tr>
                <tr className="bg-white bg-opacity-10">
                  <td className="p-2">className</td>
                  <td className="p-2">string</td>
                  <td className="p-2">""</td>
                  <td className="p-2">Additional CSS classes to apply to the textarea</td>
                </tr>
                <tr>
                  <td className="p-2">placeholder</td>
                  <td className="p-2">string</td>
                  <td className="p-2">""</td>
                  <td className="p-2">Placeholder text for the textarea</td>
                </tr>
                <tr className="bg-white bg-opacity-10">
                  <td className="p-2">onChange</td>
                  <td className="p-2">function</td>
                  <td className="p-2">undefined</td>
                  <td className="p-2">Function to call when the textarea value changes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom TextArea */}
        <div className={`${getGlassyClasses()} p-6 text-gray-600 mb-8`}>
          <CustomTextArea />
        </div>

        {/* Additional Examples */}
        <div className={`${getGlassyClasses()} p-6 mt-8`}>
          <h2 className="text-2xl text-black font-bold mb-4">Additional Examples</h2>
          
          <h3 className="text-xl text-gray-600 font-semibold mb-2">With Custom Styling</h3>
          <div className={`${getGlassyClasses()} p-4 mb-4`}>
            <textarea 
              className="w-full h-32 p-2 bg-gray-100 bg-opacity-50 text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
              placeholder="Type something..."
            />
          </div>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto relative">
            {`<textarea
  className="w-full h-32 p-2"
  style={{
    backgroundColor: '#f0f0f0',
    color: 'gray',
    borderColor: 'gray',
    borderWidth: '1px',
    borderStyle: 'solid'
  }}
  placeholder="Type something..."
/>`}
          </pre>
          <CopyButton text={`<textarea
  className="w-full h-32 p-2"
  style={{
    backgroundColor: '#f0f0f0',
    color: 'gray',
    borderColor: 'gray',
    borderWidth: '1px',
    borderStyle: 'solid'
  }}
  placeholder="Type something..."
/>`} codeKey="customStyling" />
        </div>
      </div>
    </div>
  );
};

export default TextareaDetailPage;



















