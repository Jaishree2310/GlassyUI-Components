import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

type Theme = 'pink' | 'brown' | 'white' | 'black';

const TextareaDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTheme = (location.state as { currentTheme?: Theme })?.currentTheme || 'pink';

  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

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
    <div className={`min-h-screen p-8 font-mono transition-colors duration-300 ${getThemeClasses()}`}>
      <button 
        onClick={() => navigate(-1)} 
        className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 transition-all duration-300`}
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Components
      </button>

      <h1 className="text-4xl font-bold mb-8">[Component Name] Component</h1>

      {/* Basic Usage */}
      <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
        <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          {`// Basic usage code here`}
        </pre>
        <CopyButton text={`// Basic usage code here`} codeKey="basicUsage" />
      </div>

      {/* Props */}
      <div className={`${getGlassyClasses()} p-6 mb-8`}>
        <h2 className="text-2xl font-bold mb-4">Props</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Prop</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Default</th>
              <th className="text-left p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {/* Add props here */}
          </tbody>
        </table>
      </div>

      {/* Examples */}
      <div className={`${getGlassyClasses()} p-6 mt-8`}>
        <h2 className="text-2xl font-bold mb-4">Examples</h2>
        {/* Add examples here */}
      </div>
    </div>
  );
};

export default TextareaDetailPage;