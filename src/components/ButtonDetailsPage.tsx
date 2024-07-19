import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

type Theme = 'pink' | 'brown' | 'white' | 'black';

const ButtonDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTheme = (location.state as { currentTheme?: Theme })?.currentTheme || 'pink';
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const [customBg, setCustomBg] = useState('#000000');
  const [customText, setCustomText] = useState('#ffffff');
  const [customBorder, setCustomBorder] = useState('#000000');

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
      className={`absolute top-10 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-20 transition-all duration-300`}
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  const popThemes = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  const basicUsageCode = `import { Button } from 'glassy-ui';

function Example() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}`;

  const themedButtonCode = `<Button
  bg="${customBg}"
  textColor="${customText}"
  borderColor="${customBorder}"
  className="${getGlassyClasses()}"
>
  Themed Button
</Button>`;

  const alertButtonCode = `<Button
  onClick={() => alert("Button clicked!")}
  className="${getGlassyClasses()} hover:bg-opacity-20"
>
  Alert!
</Button>`;

  const fullWidthButtonCode = `<Button 
  className="${getGlassyClasses()} w-full py-3 hover:bg-opacity-20"
>
  Full Width Button
</Button>`;

  return (
    <div className={`min-h-screen p-8 font-mono transition-colors duration-300 ${getThemeClasses()}`}>
      <button 
        onClick={() => navigate(-1)} 
        className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 transition-all duration-300`}
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Components
      </button>

      <h1 className="text-4xl font-bold mb-8">Button </h1>

      <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
        <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          {basicUsageCode}
        </pre>
        <CopyButton text={basicUsageCode} codeKey="basicUsage" />
      </div>

      <div className={`${getGlassyClasses()} p-6`}>
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
            <tr>
              <td className="p-2">variant</td>
              <td className="p-2">'default' | 'accent'</td>
              <td className="p-2">'default'</td>
              <td className="p-2">The style variant of the button</td>
            </tr>
            <tr>
              <td className="p-2">size</td>
              <td className="p-2">'small' | 'medium' | 'large'</td>
              <td className="p-2">'medium'</td>
              <td className="p-2">The size of the button</td>
            </tr>
            <tr>
              <td className="p-2">disabled</td>
              <td className="p-2">boolean</td>
              <td className="p-2">false</td>
              <td className="p-2">Whether the button is disabled</td>
            </tr>
            <tr>
              <td className="p-2">onClick</td>
              <td className="p-2">function</td>
              <td className="p-2">-</td>
              <td className="p-2">Function called when the button is clicked</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={`${getGlassyClasses()} p-6 mt-8`}>
        <h2 className="text-2xl font-bold mb-4">Custom Button</h2>
        <p className="mb-4">
          Customize your button's appearance by selecting a preset theme or creating your own color scheme.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Theme: Pop</h3>
            <div className="flex space-x-2 mb-4">
              {popThemes.map((color, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setCustomBg(color);
                    setCustomText(index === 1 ? '#000000' : '#ffffff');
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Custom Theme</h3>
            <div className="flex space-x-4 mb-4">
              <div>
                <label className="block mb-1">Background</label>
                <input
                  type="color"
                  value={customBg}
                  onChange={(e) => setCustomBg(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Text</label>
                <input
                  type="color"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Border</label>
                <input
                  type="color"
                  value={customBorder}
                  onChange={(e) => setCustomBorder(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Preview</h3>
            <button
              className={`px-6 py-3 rounded transition-all duration-300 ${getGlassyClasses()}`}
              style={{
                backgroundColor: `${customBg}20`,
                color: customText,
                borderColor: customBorder,
                borderWidth: '2px',
                borderStyle: 'solid',
              }}
            >
              Themed Button
            </button>
          </div>

          <div className="relative">
            <h3 className="text-xl font-semibold mb-2">Code</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              {themedButtonCode}
            </pre>
            <CopyButton text={themedButtonCode} codeKey="themedButton" />
          </div>
        </div>
      </div>

      <div className={`${getGlassyClasses()} p-6 mt-8`}>
        <h2 className="text-2xl font-bold mb-4">Additional Examples</h2>
        <div className="space-y-6">
          <div className="relative">
            <h3 className="text-xl font-semibold mb-2">With onClick Handler</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              {alertButtonCode}
            </pre>
            <CopyButton text={alertButtonCode} codeKey="alertButton" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Preview:</h3>
            <button
              className={`px-6 py-3 rounded transition-all duration-300 ${getGlassyClasses()} hover:bg-opacity-20`}
              onClick={() => alert("Button clicked!")}
            >
              Alert!
            </button>
          </div>

          <div className="relative">
            <h3 className="text-xl font-semibold mb-2">With Additional Classes</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              {fullWidthButtonCode}
            </pre>
            <CopyButton text={fullWidthButtonCode} codeKey="fullWidthButton" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Preview:</h3>
            <button className={`w-full py-3 rounded transition-all duration-300 ${getGlassyClasses()} hover:bg-opacity-20`}>
              Full Width Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ButtonDetailsPage;