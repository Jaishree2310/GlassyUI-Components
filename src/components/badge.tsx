import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

type BadgeTheme = 'blue' | 'green' | 'red' | 'purple' | 'rainbow';

const CustomBadge: React.FC = () => {
  const [theme, setTheme] = useState<BadgeTheme>('blue');

  const getThemeColors = (theme: BadgeTheme) => {
    switch (theme) {
      case 'blue':
        return { bg: '#007bff', textColor: 'white' };
      case 'green':
        return { bg: '#28a745', textColor: 'white' };
      case 'red':
        return { bg: '#dc3545', textColor: 'white' };
      case 'purple':
        return { bg: '#6f42c1', textColor: 'white' };
      case 'rainbow':
        return { bg: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)', textColor: 'white' };
      default:
        return { bg: '#007bff', textColor: 'white' };
    }
  };

  const themeColors = getThemeColors(theme);

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-2xl text-white font-bold mb-4">Custom Badge</h2>
      <p className="text-gray-200 mb-4">Select a theme for your badge.</p>
      <div className="mb-4">
        <label className="block text-white mb-2">Theme:</label>
        <div className="flex space-x-2">
          {(['blue', 'green', 'red', 'purple', 'rainbow'] as BadgeTheme[]).map((t) => (
            <button
              key={t}
              className={`w-6 h-6 rounded-full ${t === theme ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              style={{ background: t === 'rainbow' ? 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)' : getThemeColors(t).bg }}
              onClick={() => setTheme(t)}
            />
          ))}
        </div>
      </div>

      <div
        className="inline-block p-2 rounded-lg"
        style={{
          backgroundColor: themeColors.bg,
          color: themeColors.textColor,
        }}
      >
        Custom Badge
      </div>

      <div className="mt-4 bg-gray-800 p-2 rounded">
        <pre className="text-sm">
          {`<div
  style={{
    backgroundColor: '${themeColors.bg}',
    color: '${themeColors.textColor}',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
  }}
>
  Custom Badge
</div>`}
        </pre>
      </div>
    </div>
  );
};

const BadgeDetailPage: React.FC = () => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
    });
  };

  const CopyButton: React.FC<{ text: string, codeKey: string }> = ({ text, codeKey }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-4 right-4 p-2 hover:bg-opacity-20 transition-all duration-300`}
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  return (
    <div className="min-h-screen p-8 font-mono relative">
      <BackToTopButton />

      <div className="relative z-10 text-white">
        <h1 className="text-4xl font-bold mb-8">Badge Component</h1>

        {/* Custom Badge */}
        <div className="p-6 text-gray-200 mb-8">
          <CustomBadge />
        </div>

        {/* Basic Usage */}
        <div className="p-6 mb-8 relative">
          <h2 className="text-2xl text-gray-100 font-bold mb-4">Basic Usage</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            {`<div
  style={{
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
  }}
>
  Custom Badge
</div>`}
          </pre>
          <CopyButton text={`<div
  style={{
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
  }}
>
  Custom Badge
</div>`} codeKey="basicUsage" />
        </div>
      </div>
    </div>
  );
};

export default BadgeDetailPage;
