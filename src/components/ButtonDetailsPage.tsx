import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

const ButtonDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [customBg, setCustomBg] = useState('#000000');
  const [customText, setCustomText] = useState('#ffffff');
  const [customBorder, setCustomBorder] = useState('#000000');

  const getGlassyClasses = () => {
    return 'bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-30 rounded-lg shadow-lg';
  };

  const codeExample = `import { Button } from 'glassy-ui';

function Example() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExample).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const buttonThemes = [
    { name: 'Default', class: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Success', class: 'bg-green-500 hover:bg-green-600' },
    { name: 'Warning', class: 'bg-yellow-500 hover:bg-yellow-600' },
    { name: 'Danger', class: 'bg-red-500 hover:bg-red-600' },
  ];

  const popThemes = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  return (
    <div className="min-h-screen p-8 font-mono bg-gradient-to-br from-pink-400 to-purple-500 text-white">
      <button 
        onClick={() => navigate(-1)} 
        className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 transition-all duration-300`}
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Components
      </button>

      <h1 className="text-4xl font-bold mb-8">Button Component</h1>

      <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
        <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
        <button 
          onClick={copyToClipboard}
          className={`absolute top-4 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-20 transition-all duration-300`}
          title="Copy to clipboard"
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </button>
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          {codeExample}
        </pre>
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
              className="px-6 py-3 rounded transition-colors duration-300"
              style={{
                backgroundColor: customBg,
                color: customText,
                borderColor: customBorder,
                borderWidth: '2px',
                borderStyle: 'solid',
              }}
            >
              Themed Button
            </button>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Code</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              {`<Button
  bg="${customBg}"
  textColor="${customText}"
  borderColor="${customBorder}"
>
  Themed Button
</Button>`}
            </pre>
          </div>
        </div>
      </div>

      <div className={`${getGlassyClasses()} p-6 mt-8`}>
        <h2 className="text-2xl font-bold mb-4">Additional Examples</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">With onClick Handler</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              {`<Button
  onClick={() => alert("Button clicked!")}
>
  Click me!
</Button>`}
            </pre>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Preview</h3>
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
              onClick={() => alert("Button clicked!")}
            >
              Alert!
            </button>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">With Additional Classes</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              {`<Button className="bg-gray-800 text-white shadow-lg hover:bg-gray-700 w-full py-3">
  Full Width Button
</Button>`}
            </pre>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Preview</h3>
            <button className="bg-gray-800 text-white shadow-lg hover:bg-gray-700 w-full py-3 rounded transition-colors duration-300">
              Full Width Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDetailsPage;

