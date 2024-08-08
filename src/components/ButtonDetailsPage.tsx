import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

const ButtonDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const [customBg, setCustomBg] = useState('#FD1D1D');
  const [customText, setCustomText] = useState('#ffffff');
  const [customBorder, setCustomBorder] = useState('#833AB4');

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';
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
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-800" />}
    </button>
  );

  const instagramThemes = ['#FD1D1D', '#F77737', '#FCAF45', '#FFDC80', '#833AB4', '#C13584', '#E1306C'];

  const basicUsageCode = `const getGlassyClasses = () => 'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

function Example() {
  return (
    <Button onClick={() => console.log('Clicked!')} className={getGlassyClasses()}>
      Click me
    </Button>
  );
}`;

  const themedButtonCode = `<Button
  style={{
    backgroundColor: '${customBg}40',
    color: '${customText}',
    borderColor: '${customBorder}'
  }}
  className={getGlassyClasses()}
>
  Themed Button
</Button>`;

  const alertButtonCode = `<Button
  onClick={() => alert("Button clicked!")}
  className={\`\${getGlassyClasses()} hover:bg-white/40\`}
>
  Alert!
</Button>`;

  const fullWidthButtonCode = `<Button 
  className={\`\${getGlassyClasses()} w-full py-3 hover:bg-white/40\`}
>
  Full Width Button
</Button>`;

  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-r from-[#ffc6c6] via-[#ffc6e5] to-[#e7c6ff] relative">
      <div className="relative z-10">
        <button 
          onClick={() => navigate(-1)} 
          className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-800`}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Components
        </button>

        <h1 className="text-6xl font-bold mb-8 text-gray-900">Button</h1>
        <p className="text-xl mb-8 text-gray-800">A customizable, glassmorphism styled button component.</p>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Basic Usage</h2>
          <div className="relative">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {basicUsageCode}
            </pre>
            <CopyButton text={basicUsageCode} codeKey="basicUsage" />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Props</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="text-left p-2 text-gray-800">Prop</th>
                <th className="text-left p-2 text-gray-800">Type</th>
                <th className="text-left p-2 text-gray-800">Default</th>
                <th className="text-left p-2 text-gray-800">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2 text-gray-700">backgroundColor</td>
                <td className="p-2 text-gray-700">string</td>
                <td className="p-2 text-gray-700">-</td>
                <td className="p-2 text-gray-700">The background color of the button</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 text-gray-700">color</td>
                <td className="p-2 text-gray-700">string</td>
                <td className="p-2 text-gray-700">-</td>
                <td className="p-2 text-gray-700">The text color of the button</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 text-gray-700">borderColor</td>
                <td className="p-2 text-gray-700">string</td>
                <td className="p-2 text-gray-700">-</td>
                <td className="p-2 text-gray-700">The border color of the button</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Themed Button</h2>
          <p className="mb-6 text-lg text-gray-700">
            Customize your button's appearance by selecting a preset theme or creating your own color scheme.
          </p>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Custom Theme</h3>
              <div className="flex space-x-4 mb-4">
                {instagramThemes.map((color, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setCustomBg(color);
                      setCustomText(index === 3 ? '#000000' : '#ffffff');
                      setCustomBorder(color);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${getGlassyClasses()} p-6`}>
                <label className="block mb-2 font-semibold text-lg text-gray-800">Background Color</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={customBg}
                    onChange={(e) => setCustomBg(e.target.value)}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg mr-4"
                  />
                  <input 
                    type="text" 
                    value={customBg} 
                    onChange={(e) => setCustomBg(e.target.value)}
                    className="bg-transparent border-b border-gray-400 w-full py-1 px-2 text-gray-800"
                  />
                </div>
              </div>
              <div className={`${getGlassyClasses()} p-6`}>
                <label className="block mb-2 font-semibold text-lg text-gray-800">Text Color</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg mr-4"
                  />
                  <input 
                    type="text" 
                    value={customText} 
                    onChange={(e) => setCustomText(e.target.value)}
                    className="bg-transparent border-b border-gray-400 w-full py-1 px-2 text-gray-800"
                  />
                </div>
              </div>
              <div className={`${getGlassyClasses()} p-6`}>
                <label className="block mb-2 font-semibold text-lg text-gray-800">Border Color</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={customBorder}
                    onChange={(e) => setCustomBorder(e.target.value)}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg mr-4"
                  />
                  <input 
                    type="text" 
                    value={customBorder} 
                    onChange={(e) => setCustomBorder(e.target.value)}
                    className="bg-transparent border-b border-gray-400 w-full py-1 px-2 text-gray-800"
                  />
                </div>
              </div>
            </div>

            <div className="relative mt-8">
              <button
                className={`py-3 px-6 text-lg font-semibold rounded-lg ${getGlassyClasses()} hover:bg-white/40 transition-transform hover:scale-110`}
                style={{
                  backgroundColor: `${customBg}40`,
                  color: customText,
                  borderColor: customBorder
                }}
              >
                Themed Button
              </button>
              <pre className="bg-gray-800 text-white p-6 rounded-lg mt-4 overflow-x-auto whitespace-pre-wrap">
                {themedButtonCode}
              </pre>
              <CopyButton text={themedButtonCode} codeKey="themedButton" />
            </div>
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Alert Button</h2>
          <p className="mb-6 text-lg text-gray-700">
            A button that triggers an alert message when clicked.
          </p>
          <button 
            onClick={() => alert('Button clicked!')} 
            className={`${getGlassyClasses()} px-6 py-3 text-lg font-semibold rounded-lg hover:bg-white/40 transition-transform hover:scale-110 text-gray-800`}
          >
            Alert!
          </button>
          <div className="relative mt-8">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {alertButtonCode}
            </pre>
            <CopyButton text={alertButtonCode} codeKey="alertButton" />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Full Width Button</h2>
          <p className="mb-6 text-lg text-gray-700">
            A button that spans the full width of its container.
          </p>
          <button 
            className={`w-full py-3 text-lg font-semibold rounded-lg ${getGlassyClasses()} hover:bg-white/40 transition-transform hover:scale-105 text-gray-800`}
          >
            Full Width Button
          </button>
          <div className="relative mt-8">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {fullWidthButtonCode}
            </pre>
            <CopyButton text={fullWidthButtonCode} codeKey="fullWidthButton" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDetailsPage;