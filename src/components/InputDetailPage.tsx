
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Copy, Check, Search } from 'lucide-react';

// type Theme = 'pop' | 'neutral' | 'dark' | 'custom';

// const GlassmorphicInputPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [currentTheme, setCurrentTheme] = useState<Theme>('pop');
//   const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
//   const [inputValue, setInputValue] = useState('');
//   const [bgColor, setBgColor] = useState('#ffffff');
//   const [textColor, setTextColor] = useState('#000000');
//   const [borderColor, setBorderColor] = useState('#000000');

//   useEffect(() => {
//     switch (currentTheme) {
//       case 'neutral':
//         setBgColor('#f3f4f6');
//         setTextColor('#1f2937');
//         setBorderColor('#9ca3af');
//         break;
//       case 'dark':
//         setBgColor('#1f2937');
//         setTextColor('#f3f4f6');
//         setBorderColor('#4b5563');
//         break;
//       case 'custom':
//         setBgColor('#d1edda');
//         setTextColor('#44573c');
//         setBorderColor('#44573c');
//         break;
//       default: // pop
//         setBgColor('#fefcd0');
//         setTextColor('#1f2937');
//         setBorderColor('#fca5a5');
//     }
//   }, [currentTheme]);

//   const getThemeClasses = () => {
//     switch (currentTheme) {
//       case 'neutral':
//         return 'bg-gray-100 text-gray-800';
//       case 'dark':
//         return 'bg-gray-900 text-white';
//       case 'custom':
//         return 'bg-gradient-to-br from-green-400 to-blue-500 text-white';
//       default: // pop
//         return 'bg-gradient-to-br from-yellow-200 to-pink-200 text-gray-800';
//     }
//   };

//   const getGlassyClasses = () => {
//     const baseClasses = 'backdrop-filter backdrop-blur-md bg-opacity-20 border border-opacity-30 rounded-lg shadow-lg transition-all duration-300';
//     switch (currentTheme) {
//       case 'neutral':
//         return `${baseClasses} bg-gray-200 border-gray-400 text-gray-800`;
//       case 'dark':
//         return `${baseClasses} bg-gray-700 border-gray-600 text-white bg-opacity-30 backdrop-blur-xl`;
//       case 'custom':
//         return `${baseClasses} bg-blue-200 border-blue-300 text-white bg-opacity-30 backdrop-blur-xl`;
//       default: // pop
//         return `${baseClasses} bg-pink-100 border-pink-200 text-gray-800`;
//     }
//   };

//   const getInputClasses = () => {
//     const baseClasses = 'w-full pl-4 pr-10 py-2 rounded-lg outline-none transition-all duration-300';
//     switch (currentTheme) {
//       case 'neutral':
//         return `${baseClasses} bg-gray-100 bg-opacity-50 focus:bg-opacity-70 text-gray-800 placeholder-gray-500`;
//       case 'dark':
//         return `${baseClasses} bg-gray-800 bg-opacity-50 focus:bg-opacity-70 text-white placeholder-gray-400`;
//       case 'custom':
//         return `${baseClasses} bg-blue-400 bg-opacity-50 focus:bg-opacity-70 text-white placeholder-blue-200`;
//       default: // pop
//         return `${baseClasses} bg-pink-200 bg-opacity-50 focus:bg-opacity-70 text-gray-800 placeholder-pink-400`;
//     }
//   };

//   const copyToClipboard = (text: string, key: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setCopiedStates(prev => ({ ...prev, [key]: true }));
//       setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
//     });
//   };

//   const CopyButton: React.FC<{ text: string, codeKey: string }> = ({ text, codeKey }) => (
//     <button 
//       onClick={() => copyToClipboard(text, codeKey)}
//       className={`absolute top-4 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-30`}
//       title="Copy to clipboard"
//     >
//       {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
//     </button>
//   );

//   const handleSearch = () => {
//     alert(`Searching for: ${inputValue}`);
//   };

//   return (
//     <div className={`min-h-screen p-8 font-mono transition-colors duration-300 ${getThemeClasses()}`}>
//       <button 
//         onClick={() => navigate(-1)} 
//         className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-30`}
//       >
//         <ArrowLeft size={20} className="mr-2" />
//         Back to Components
//       </button>

//       <h1 className="text-4xl font-bold mb-8">Input Component</h1>
//       <p className="mb-8">A customizable, pixel-art styled input component with optional icon.</p>

//       <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
//         <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//           {`import { Input } from 'pixel-retroui';

// function App() {
//   return (
//     <Input
//       placeholder="Enter text..."
//       onChange={(e) => console.log(e.target.value)}
//     />
//   );
// }`}
//         </pre>
//         <CopyButton text={`import { Input } from 'pixel-retroui';

// function App() {
//   return (
//     <Input
//       placeholder="Enter text..."
//       onChange={(e) => console.log(e.target.value)}
//     />
//   );
// }`} codeKey="basicUsage" />
//       </div>

//       <div className={`${getGlassyClasses()} p-6 mb-8`}>
//         <h2 className="text-2xl font-bold mb-4">Props</h2>
//         <table className="w-full">
//           <thead>
//             <tr>
//               <th className="text-left p-2">Prop</th>
//               <th className="text-left p-2">Type</th>
//               <th className="text-left p-2">Default</th>
//               <th className="text-left p-2">Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="p-2">bg</td>
//               <td className="p-2">string</td>
//               <td className="p-2">'#ffffff'</td>
//               <td className="p-2">Background color of the input</td>
//             </tr>
//             <tr>
//               <td className="p-2">textColor</td>
//               <td className="p-2">string</td>
//               <td className="p-2">'#000000'</td>
//               <td className="p-2">Text color of the input</td>
//             </tr>
//             <tr>
//               <td className="p-2">borderColor</td>
//               <td className="p-2">string</td>
//               <td className="p-2">'#000000'</td>
//               <td className="p-2">Border color of the input</td>
//             </tr>
//             <tr>
//               <td className="p-2">icon</td>
//               <td className="p-2">string</td>
//               <td className="p-2">undefined</td>
//               <td className="p-2">URL of the icon to display</td>
//             </tr>
//             <tr>
//               <td className="p-2">onChange</td>
//               <td className="p-2">function</td>
//               <td className="p-2">undefined</td>
//               <td className="p-2">Function to call when the input value changes</td>
//             </tr>
//             <tr>
//               <td className="p-2">className</td>
//               <td className="p-2">string</td>
//               <td className="p-2">""</td>
//               <td className="p-2">Additional CSS classes to apply to the input</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className={`${getGlassyClasses()} p-6 mb-8`}>
//         <h2 className="text-2xl font-bold mb-4">Custom Input</h2>
//         <p className="mb-4">Customize your input's appearance by selecting a preset theme or creating your own color scheme.</p>
//         <div className="flex space-x-4 mb-4">
//           {(['pop', 'neutral', 'dark', 'custom'] as Theme[]).map((theme) => (
//             <button
//               key={theme}
//               onClick={() => setCurrentTheme(theme)}
//               className={`${getGlassyClasses()} px-4 py-2 capitalize ${currentTheme === theme ? 'ring-2 ring-opacity-50 ring-offset-2 ring-offset-transparent' : ''}`}
//             >
//               {theme}
//             </button>
//           ))}
//         </div>
//         <div className={`${getGlassyClasses()} p-4 hover:shadow-xl relative`}>
//           <input 
//             type="text" 
//             placeholder="Enter text..." 
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className={`${getInputClasses()} focus:shadow-inner`}
//             style={{backgroundColor: bgColor, color: textColor, borderColor: borderColor}}
//           />
//           <button
//             onClick={handleSearch}
//             className="absolute right-6 top-1/2 transform -translate-y-1/2 focus:outline-none"
//           >
//             <Search size={20} color={textColor} />
//           </button>
//         </div>
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4">
//           {`<Input
//   bg="${bgColor}"
//   textColor="${textColor}"
//   borderColor="${borderColor}"
//   placeholder="Enter text..."
//   onChange={(e) => setInputValue(e.target.value)}
//   icon="/path/to/search-icon.svg"
//   onIconClick={handleSearch}
// />`}
//         </pre>
//         <CopyButton text={`<Input
//   bg="${bgColor}"
//   textColor="${textColor}"
//   borderColor="${borderColor}"
//   placeholder="Enter text..."
//   onChange={(e) => setInputValue(e.target.value)}
//   icon="/path/to/search-icon.svg"
//   onIconClick={handleSearch}
// />`} codeKey="customInput" />
//       </div>
//     </div>
//   );
// };

// export default GlassmorphicInputPage;










//--------------









import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Search, Mail, Lock} from 'lucide-react';

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
    <div className="relative">
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
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const [customBgColor, setCustomBgColor] = useState('#ffffff');
  const [customTextColor, setCustomTextColor] = useState('#000000');
  const [customBorderColor, setCustomBorderColor] = useState('#000000');
  const [customOpacity, setCustomOpacity] = useState(50);
  const [customBorderWidth, setCustomBorderWidth] = useState(1);
  const [customBorderRadius, setCustomBorderRadius] = useState(8);

  const getGlassyClasses = (opacity = 10) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
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
      className={`absolute top-4 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-20 text-gray-800`}
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  const handleSearch = () => {
    alert('Search clicked');
  };

  const handleBackToComponents = () => {
    navigate('/components/GlassyUIComponentsPage')
  };

  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <nav className="mb-8 flex items-center justify-between">
        <button 
          className={`flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 text-gray-800`}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Components
        </button>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-white">Glassmorphic Input Component</h1>

      <section className={`${getGlassyClasses(20)} p-6 mb-8 text-gray-800`}>
        <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
        <div className={`${getGlassyClasses()} p-4 hover:shadow-xl mb-4`}>
          <Input 
            placeholder="Enter text..." 
            className={`${getGlassyClasses(50)} text-gray-800 placeholder-gray-500`}
          />
        </div>
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto relative">
          {`import { Input } from './Input';

function MyComponent() {
  return (
    <Input 
      placeholder="Enter text..." 
      className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg"
    />
  );
}`}
          <CopyButton text={`import { Input } from './Input';

function MyComponent() {
  return (
    <Input 
      placeholder="Enter text..." 
      className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg"
    />
  );
}`} codeKey="basicUsage" />
        </pre>
      </section>

      <section className={`${getGlassyClasses(20)} p-6 mb-8 text-gray-800`}>
        <h2 className="text-2xl font-bold mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white bg-opacity-20">
                <th className="text-left p-2">Prop</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Default</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">className</td>
                <td className="p-2">string</td>
                <td className="p-2">''</td>
                <td className="p-2">Additional CSS classes to apply to the input</td>
              </tr>
              <tr className="bg-white bg-opacity-10">
                <td className="p-2">icon</td>
                <td className="p-2">React.ReactNode</td>
                <td className="p-2">undefined</td>
                <td className="p-2">Icon to display inside the input</td>
              </tr>
              <tr>
                <td className="p-2">iconPosition</td>
                <td className="p-2">'left' | 'right'</td>
                <td className="p-2">'right'</td>
                <td className="p-2">Position of the icon inside the input</td>
              </tr>
              <tr className="bg-white bg-opacity-10">
                <td className="p-2">onIconClick</td>
                <td className="p-2">{"() => void"}</td>
                <td className="p-2">undefined</td>
                <td className="p-2">Function to call when the icon is clicked</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={`${getGlassyClasses(20)} p-6 mb-8 text-gray-800`}>
        <h2 className="text-2xl font-bold mb-4">Custom Styling</h2>
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center text-white">
            <Search size={28} className="mr-3" />
            Search Input Customization
          </h3>
          <div className={`${getGlassyClasses(30)} p-8 hover:shadow-xl rounded-xl`}>
            <div className="mb-8">
              <Input 
                placeholder="Customizable search..." 
                className={`${getGlassyClasses(customOpacity)} text-lg`}
                style={{
                  backgroundColor: customBgColor,
                  color: customTextColor,
                  borderColor: customBorderColor,
                  borderWidth: `${customBorderWidth}px`,
                  borderRadius: `${customBorderRadius}px`,
                }}
                icon={<Search size={24} color={customTextColor} />}
                iconPosition="right"
                onIconClick={handleSearch}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Background Color</label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="color" 
                    value={customBgColor} 
                    onChange={(e) => setCustomBgColor(e.target.value)} 
                    className="w-10 h-10 rounded-md border-2 border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm font-mono">{customBgColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Text Color</label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="color" 
                    value={customTextColor} 
                    onChange={(e) => setCustomTextColor(e.target.value)} 
                    className="w-10 h-10 rounded-md border-2 border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm font-mono">{customTextColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Border Color</label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="color" 
                    value={customBorderColor} 
                    onChange={(e) => setCustomBorderColor(e.target.value)} 
                    className="w-10 h-10 rounded-md border-2 border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm font-mono">{customBorderColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Opacity</label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={customOpacity} 
                    onChange={(e) => setCustomOpacity(parseInt(e.target.value))} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-mono w-12 text-right">{customOpacity}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Border Width</label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={customBorderWidth} 
                    onChange={(e) => setCustomBorderWidth(parseInt(e.target.value))} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-mono w-12 text-right">{customBorderWidth}px</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Border Radius</label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="20" 
                    value={customBorderRadius} 
                    onChange={(e) => setCustomBorderRadius(parseInt(e.target.value))} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-mono w-12 text-right">{customBorderRadius}px</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${getGlassyClasses(20)} p-6 mt-6 rounded-xl`}>
            <h4 className="text-lg font-semibold mb-3 text-white">Generated Code</h4>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto relative">
              {`<Input 
  placeholder="Customizable search..." 
  className="backdrop-filter backdrop-blur-lg rounded-lg"
  style={{
    backgroundColor: '${customBgColor}${customOpacity.toString(16).padStart(2, '0')}',
    color: '${customTextColor}',
    borderColor: '${customBorderColor}',
    borderWidth: '${customBorderWidth}px',
    borderRadius: '${customBorderRadius}px',
  }}
  icon={<Search size={20} color="${customTextColor}" />}
  iconPosition="right"
  onIconClick={handleSearch}
/>`}
              <CopyButton 
                text={`<Input 
  placeholder="Customizable search..." 
  className="backdrop-filter backdrop-blur-lg rounded-lg"
  style={{
    backgroundColor: '${customBgColor}${customOpacity.toString(16).padStart(2, '0')}',
    color: '${customTextColor}',
    borderColor: '${customBorderColor}',
    borderWidth: '${customBorderWidth}px',
    borderRadius: '${customBorderRadius}px',
  }}
  icon={<Search size={20} color="${customTextColor}" />}
  iconPosition="right"
  onIconClick={handleSearch}
/>`} 
                codeKey="customSearchInput" 
              />
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Mail size={24} className="mr-2" />
            <Lock size={24} className="mr-2" />
            Email and Password Inputs
          </h3>
          <div className={`${getGlassyClasses()} p-6 hover:shadow-xl space-y-4`}>
            <Input 
              type="email"
              placeholder="Enter your email" 
              className={`${getGlassyClasses(50)} text-gray-800 placeholder-gray-500`}
              icon={<Mail size={20} color="#4A5568" />}
              iconPosition="left"
            />
            <Input 
              type="password"
              placeholder="Enter your password" 
              className={`${getGlassyClasses(50)} text-gray-800 placeholder-gray-500`}
              icon={<Lock size={20} color="#4A5568" />}
              iconPosition="left"
            />
          </div>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4 relative">
            {`<Input 
  type="email"
  placeholder="Enter your email" 
  className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg text-gray-800 placeholder-gray-500"
  icon={<Mail size={20} color="#4A5568" />}
  iconPosition="left"
/>

<Input 
  type="password"
  placeholder="Enter your password" 
  className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg text-gray-800 placeholder-gray-500"
  icon={<Lock size={20} color="#4A5568" />}
  iconPosition="left"
/>`}
            <CopyButton text={`<Input 
  type="email"
  placeholder="Enter your email" 
  className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg text-gray-800 placeholder-gray-500"
  icon={<Mail size={20} color="#4A5568" />}
  iconPosition="left"
/>

<Input 
  type="password"
  placeholder="Enter your password" 
  className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg text-gray-800 placeholder-gray-500"
  icon={<Lock size={20} color="#4A5568" />}
  iconPosition="left"
/>`} codeKey="emailPasswordInputs" />
          </pre>
        </div>
      </section>
    </div>
  
  );
};

export default InputDetailPage;