// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ArrowLeft, Copy, Check } from 'lucide-react';

// type Theme = 'pink' | 'brown' | 'white' | 'black';

// const CardDetailsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentTheme = (location.state as { currentTheme?: Theme })?.currentTheme || 'pink';

//   const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

//   const getThemeClasses = () => {
//     switch (currentTheme) {
//       case 'white':
//         return 'bg-gradient-to-br from-gray-50 to-white text-gray-800';
//       case 'black':
//         return 'bg-gradient-to-br from-gray-900 to-black text-white';
//       case 'brown':
//         return 'bg-gradient-to-br from-yellow-800 to-yellow-600 text-white';
//       default:
//         return 'bg-gradient-to-br from-pink-400 to-purple-500 text-white';
//     }
//   };

//   const getGlassyClasses = () => {
//     const baseClasses = 'backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300';
//     switch (currentTheme) {
//       case 'white':
//         return `${baseClasses} bg-gray-500 bg-opacity-10 border-gray-300 text-gray-800`;
//       case 'black':
//         return `${baseClasses} bg-white bg-opacity-10 border-gray-600 text-white`;
//       case 'brown':
//         return `${baseClasses} bg-white bg-opacity-10 border-yellow-300 text-white`;
//       default:
//         return `${baseClasses} bg-white bg-opacity-10 border-pink-300 text-white`;
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
//       className={`absolute top-4 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-20 transition-all duration-300`}
//       title="Copy to clipboard"
//     >
//       {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
//     </button>
//   );

//   return (
//     <div className={`min-h-screen p-8 font-mono transition-colors duration-300 ${getThemeClasses()}`}>
//       <button 
//         onClick={() => navigate(-1)} 
//         className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 transition-all duration-300`}
//       >
//         <ArrowLeft size={20} className="mr-2" />
//         Back to Components
//       </button>

//       <h1 className="text-4xl font-bold mb-8">Card Component</h1>

//       {/* Basic Usage */}
//       <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
//         <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//           {`// Basic usage code here`}
//         </pre>
//         <CopyButton text={`// Basic usage code here`} codeKey="basicUsage" />
//       </div>

//       {/* Props */}
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
//             {/* Add props here */}
//           </tbody>
//         </table>
//       </div>

//       {/* Examples */}
//       <div className={`${getGlassyClasses()} p-6 mt-8`}>
//         <h2 className="text-2xl font-bold mb-4">Examples</h2>
//         {/* Add examples here */}
//       </div>
//     </div>
//   );
// };

// export default CardDetailsPage;













// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ArrowLeft, Copy, Check } from 'lucide-react';

// type Theme = 'yellow' | 'brown' | 'white' | 'black' | 'custom';

// const CardDetailsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [currentTheme, setCurrentTheme] = useState<Theme>('yellow');
//   const [customColors, setCustomColors] = useState({
//     bg: '#fefcd0',
//     textColor: 'black',
//     borderColor: 'black',
//     shadowColor: '#c38105'
//   });

//   const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

//   const getThemeClasses = (theme: Theme) => {
//     switch (theme) {
//       case 'yellow':
//         return 'bg-[#fefcd0] text-black border-black shadow-[#c38105]';
//       case 'brown':
//         return 'bg-[#d2b48c] text-white border-[#8b4513] shadow-[#654321]';
//       case 'white':
//         return 'bg-white text-black border-black shadow-gray-300';
//       case 'black':
//         return 'bg-[#333333] text-white border-white shadow-black';
//       case 'custom':
//         return `bg-[${customColors.bg}] text-[${customColors.textColor}] border-[${customColors.borderColor}] shadow-[${customColors.shadowColor}]`;
//       default:
//         return 'bg-[#fefcd0] text-black border-black shadow-[#c38105]';
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
//       className="absolute top-4 right-4 p-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
//       title="Copy to clipboard"
//     >
//       {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
//     </button>
//   );

//   const CardPreview: React.FC = () => (
//     <div className={`p-4 border-2 rounded-lg ${getThemeClasses(currentTheme)}`}>
//       <h2 className="text-2xl font-bold mb-2">Card Title</h2>
//       <p>This is the card content.</p>
//     </div>
//   );

//   const AdditionalExamplePreview: React.FC = () => (
//     <div className="bg-[#333333] p-4 items-center flex flex-col rounded-lg border-2 border-white shadow-md shadow-black">
//       <h2 className="text-2xl font-bold mb-2 text-white">Card Title</h2>
//       <p className="mb-4 text-white">This card has custom content and styling.</p>
//       <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300">
//         Click me
//       </button>
//     </div>
//   );
  
//   return (
//     <div className="min-h-screen p-8 font-mono bg-gradient-to-br from-blue-100 to-blue-200">
//       <button 
//         onClick={() => navigate(-1)} 
//         className="mb-8 flex items-center px-4 py-2 bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
//       >
//         <ArrowLeft size={20} className="mr-2" />
//         Back to Components
//       </button>

//       <h1 className="text-4xl font-bold mb-8">Card Component</h1>

//       {/* Basic Usage */}
//       <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mb-8 relative">
//         <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//           {`import { Card } from 'pixel-retroui';

// function App() {
//   return (
//     <Card className="p-4">
//       <h2>Card Title</h2>
//       <p>This is the card content.</p>
//     </Card>
//   );
// }`}
//         </pre>
//         <CopyButton text={`import { Card } from 'pixel-retroui';\n\nfunction App() {\n  return (\n    <Card className="p-4">\n      <h2>Card Title</h2>\n      <p>This is the card content.</p>\n    </Card>\n  );\n}`} codeKey="basicUsage" />
//       </div>

//       {/* Props */}
//       <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mb-8">
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
//               <td className="p-2">Background color of the card</td>
//             </tr>
//             <tr>
//               <td className="p-2">textColor</td>
//               <td className="p-2">string</td>
//               <td className="p-2">'#000000'</td>
//               <td className="p-2">Text color of the card content</td>
//             </tr>
//             <tr>
//               <td className="p-2">borderColor</td>
//               <td className="p-2">string</td>
//               <td className="p-2">'#000000'</td>
//               <td className="p-2">Border color of the card</td>
//             </tr>
//             <tr>
//               <td className="p-2">shadowColor</td>
//               <td className="p-2">string</td>
//               <td className="p-2">'#000000'</td>
//               <td className="p-2">Shadow color of the card</td>
//             </tr>
//             <tr>
//               <td className="p-2">className</td>
//               <td className="p-2">string</td>
//               <td className="p-2">''</td>
//               <td className="p-2">Additional CSS classes to apply to the card</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Custom Card */}
//       <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mt-8">
//         <h2 className="text-2xl font-bold mb-4">Custom Card</h2>
//         <div className="mb-4">
//           <span className="text-sm font-bold mr-2">Theme:</span>
//           {['yellow', 'brown', 'white', 'black', 'custom'].map((theme) => (
//             <button
//               key={theme}
//               onClick={() => setCurrentTheme(theme as Theme)}
//               className={`w-6 h-6 rounded-full border-2 mr-2 ${
//                 currentTheme === theme ? 'border-blue-500' : 'border-gray-300'
//               }`}
//               style={{ backgroundColor: theme === 'custom' ? customColors.bg : '' }}
//             />
//           ))}
//         </div>
//         <CardPreview />
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4">
//           {`<Card
//   bg="${currentTheme === 'custom' ? customColors.bg : ''}"
//   textColor="${currentTheme === 'custom' ? customColors.textColor : ''}"
//   borderColor="${currentTheme === 'custom' ? customColors.borderColor : ''}"
//   shadowColor="${currentTheme === 'custom' ? customColors.shadowColor : ''}"
//   className="p-4"
// >
//   <h2>Card Title</h2>
//   <p>This is the card content.</p>
// </Card>`}
//         </pre>
//       {/* </div>
//     </div> */}






//       {/* Additional Examples */}
//       <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mt-8">
//         <h2 className="text-2xl font-bold mb-4">Additional Examples</h2>
//         <h3 className="text-xl font-semibold mb-2">Card with Custom Content and Classes</h3>
//         <div className="mb-4">
//           <AdditionalExamplePreview />
//         </div>
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4 relative">
//           {`<Card bg="darkgray" className="p-4 items-center flex flex-col">
//   <h2 className="text-2xl font-bold mb-2 text-white">Card Title</h2>
//   <p className="mb-4 text-white">This card has custom content and styling.</p>
//   <Button bg="gray" onClick={() => console.log("Button clicked")}>
//     Click me
//   </Button>
// </Card>`}
//           <CopyButton 
//             text={`<Card bg="darkgray" className="p-4 items-center flex flex-col">
//   <h2 className="text-2xl font-bold mb-2 text-white">Card Title</h2>
//   <p className="mb-4 text-white">This card has custom content and styling.</p>
//   <Button bg="gray" onClick={() => console.log("Button clicked")}>
//     Click me
//   </Button>
// </Card>`} 
//             codeKey="additionalExample" 
//           />
//         </pre>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CardDetailsPage;















































// -------
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Copy, Check } from 'lucide-react';

// type Theme = 'yellow' | 'brown' | 'white' | 'black' | 'custom';

// interface ThemeColors {
//   bg: string;
//   textColor: string;
//   borderColor: string;
//   shadowColor: string;
// }

// const themes: Record<Theme, ThemeColors> = {
//   yellow: { bg: '#fefcd0', textColor: 'black', borderColor: 'black', shadowColor: '#c38105' },
//   brown: { bg: '#d2b48c', textColor: 'white', borderColor: '#8b4513', shadowColor: '#654321' },
//   white: { bg: '#ffffff', textColor: 'black', borderColor: 'black', shadowColor: '#cccccc' },
//   black: { bg: '#333333', textColor: 'white', borderColor: 'white', shadowColor: '#000000' },
//   custom: { bg: '#fefcd0', textColor: 'black', borderColor: 'black', shadowColor: '#c38105' },
// };

// const CardDetailsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [currentTheme, setCurrentTheme] = useState<Theme>('yellow');
//   const [customColors, setCustomColors] = useState<ThemeColors>(themes.custom);

//   const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

//   const getThemeColors = (): ThemeColors => {
//     return currentTheme === 'custom' ? customColors : themes[currentTheme];
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
//       className="absolute top-4 right-4 p-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
//       title="Copy to clipboard"
//     >
//       {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
//     </button>
//   );

//   const CardPreview: React.FC = () => {
//     const { bg, textColor, borderColor, shadowColor } = getThemeColors();
//     return (
//       <div style={{
//         backgroundColor: bg,
//         color: textColor,
//         borderColor: borderColor,
//         boxShadow: `4px 4px 0px ${shadowColor}`,
//       }} className="p-4 border-2 rounded-lg">
//         <h2 className="text-2xl font-bold mb-2">Card Title</h2>
//         <p>This is the card content.</p>
//       </div>
//     );
//   };

//   const AdditionalExamplePreview: React.FC = () => {
//     const { bg, textColor, borderColor, shadowColor } = getThemeColors();
//     return (
//       <div style={{
//         backgroundColor: bg,
//         color: textColor,
//         borderColor: borderColor,
//         boxShadow: `4px 4px 0px ${shadowColor}`,
//       }} className="p-4 items-center flex flex-col rounded-lg border-2">
//         <h2 className="text-2xl font-bold mb-2">Card Title</h2>
//         <p className="mb-4">This card has custom content and styling.</p>
//         <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300">
//           Click me
//         </button>
//       </div>
//     );
//   };
  
//   const { bg, textColor } = getThemeColors();
  
//   return (
//     <div className="min-h-screen p-8 font-mono" style={{ backgroundColor: bg, color: textColor }}>
//       <button 
//         onClick={() => navigate(-1)} 
//         className="mb-8 flex items-center px-4 py-2 bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
//         style={{ color: textColor }}
//       >
//         <ArrowLeft size={20} className="mr-2" />
//         Back to Components
//       </button>

//       <h1 className="text-4xl font-bold mb-8">Card Component</h1>

//       {/* Theme Selector */}
//       <div className="mb-8">
//         <span className="text-sm font-bold mr-2">Theme:</span>
//         {Object.keys(themes).map((theme) => (
//           <button
//             key={theme}
//             onClick={() => setCurrentTheme(theme as Theme)}
//             className={`w-6 h-6 rounded-full border-2 mr-2 ${
//               currentTheme === theme ? 'border-blue-500' : 'border-gray-300'
//             }`}
//             style={{ backgroundColor: themes[theme as Theme].bg }}
//           />
//         ))}
//       </div>

//       {/* Basic Usage */}
//       <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mb-8 relative">
//         <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//           {`import { Card } from 'glassy-ui';

// function App() {
//   return (
//     <Card className="p-4">
//       <h2>Card Title</h2>
//       <p>This is the card content.</p>
//     </Card>
//   );
// }`}
//         </pre>
//         <CopyButton text={`import { Card } from 'pixel-retroui';\n\nfunction App() {\n  return (\n    <Card className="p-4">\n      <h2>Card Title</h2>\n      <p>This is the card content.</p>\n    </Card>\n  );\n}`} codeKey="basicUsage" />
//       </div>

//       {/* Props */}
//       <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mb-8">
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
//               <td className="p-2">Background color of the card</td>
//             </tr>
//             <tr>
//               <td className="p-2">textColor</td>
//               <td className="p-2">string</td>
//               <td className="p-2">'#000000'</td>
//               <td className="p-2">Text color of the card content</td>
//             </tr>
//             <tr>
//               <td className="p-2">borderColor</td>
//               <td className="p-2">string</td>
//               <td className="p-2">'#000000'</td>
//               <td className="p-2">Border color of the card</td>
//             </tr>
//             <tr>
//               <td className="p-2">shadowColor</td>
//               <td className="p-2">string</td>
//               <td className="p-2">'#000000'</td>
//               <td className="p-2">Shadow color of the card</td>
//             </tr>
//             <tr>
//               <td className="p-2">className</td>
//               <td className="p-2">string</td>
//               <td className="p-2">''</td>
//               <td className="p-2">Additional CSS classes to apply to the card</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Custom Card */}
//       <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mt-8">
//         <h2 className="text-2xl font-bold mb-4">Custom Card</h2>
//         <CardPreview />
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4">
//           {`<Card
//   bg="${getThemeColors().bg}"
//   textColor="${getThemeColors().textColor}"
//   borderColor="${getThemeColors().borderColor}"
//   shadowColor="${getThemeColors().shadowColor}"
//   className="p-4"
// >
//   <h2>Card Title</h2>
//   <p>This is the card content.</p>
// </Card>`}
//         </pre>
//       </div>

//       {/* Additional Examples */}
//       <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mt-8">
//         <h2 className="text-2xl font-bold mb-4">Additional Examples</h2>
//         <h3 className="text-xl font-semibold mb-2">Card with Custom Content and Classes</h3>
//         <div className="mb-4">
//           <AdditionalExamplePreview />
//         </div>
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4 relative">
//           {`<Card
//   bg="${getThemeColors().bg}"
//   textColor="${getThemeColors().textColor}"
//   borderColor="${getThemeColors().borderColor}"
//   shadowColor="${getThemeColors().shadowColor}"
//   className="p-4 items-center flex flex-col"
// >
//   <h2 className="text-2xl font-bold mb-2">Card Title</h2>
//   <p className="mb-4">This card has custom content and styling.</p>
//   <Button bg="gray" onClick={() => console.log("Button clicked")}>
//     Click me
//   </Button>
// </Card>`}
//           <CopyButton 
//             text={`<Card
//   bg="${getThemeColors().bg}"
//   textColor="${getThemeColors().textColor}"
//   borderColor="${getThemeColors().borderColor}"
//   shadowColor="${getThemeColors().shadowColor}"
//   className="p-4 items-center flex flex-col"
// >
//   <h2 className="text-2xl font-bold mb-2">Card Title</h2>
//   <p className="mb-4">This card has custom content and styling.</p>
//   <Button bg="gray" onClick={() => console.log("Button clicked")}>
//     Click me
//   </Button>
// </Card>`} 
//             codeKey="additionalExample" 
//           />
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default CardDetailsPage;




























import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

type Theme = 'yellow' | 'brown' | 'white' | 'black' | 'custom';

interface ThemeColors {
  bg: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
}

const themes: Record<Theme, ThemeColors> = {
  yellow: { bg: '#fefcd0', textColor: 'black', borderColor: 'black', shadowColor: '#c38105' },
  brown: { bg: '#d2b48c', textColor: 'white', borderColor: '#8b4513', shadowColor: '#654321' },
  white: { bg: '#ffffff', textColor: 'black', borderColor: 'black', shadowColor: '#cccccc' },
  black: { bg: '#333333', textColor: 'white', borderColor: 'white', shadowColor: '#000000' },
  custom: { bg: '#fefcd0', textColor: 'black', borderColor: 'black', shadowColor: '#c38105' },
};

const CardDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState<Theme>('yellow');
  const [customColors, setCustomColors] = useState<ThemeColors>(themes.custom);

  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const getThemeColors = (): ThemeColors => {
    return currentTheme === 'custom' ? customColors : themes[currentTheme];
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
      className="absolute top-4 right-4 p-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  const CardPreview: React.FC = () => {
    const { bg, textColor, borderColor, shadowColor } = getThemeColors();
    return (
      <div style={{
        backgroundColor: bg,
        color: textColor,
        borderColor: borderColor,
        boxShadow: `4px 4px 0px ${shadowColor}`,
      }} className="p-4 border-2 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Card Title</h2>
        <p>This is the card content.</p>
      </div>
    );
  };

  const AdditionalExamplePreview: React.FC = () => {
    const { bg, textColor, borderColor, shadowColor } = getThemeColors();
    return (
      <div style={{
        backgroundColor: bg,
        color: textColor,
        borderColor: borderColor,
        boxShadow: `4px 4px 0px ${shadowColor}`,
      }} className="p-4 items-center flex flex-col rounded-lg border-2">
        <h2 className="text-2xl font-bold mb-2">Card Title</h2>
        <p className="mb-4">This card has custom content and styling.</p>
        <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300">
          Click me
        </button>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen p-8 font-mono bg-gradient-to-br from-blue-100 to-blue-200">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center px-4 py-2 bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Components
      </button>

      <h1 className="text-4xl font-bold mb-8">Card Component</h1>

      {/* Basic Usage */}
      <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mb-8 relative">
        <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          {`import { Card } from 'pixel-retroui';

function App() {
  return (
    <Card className="p-4">
      <h2>Card Title</h2>
      <p>This is the card content.</p>
    </Card>
  );
}`}
        </pre>
        <CopyButton text={`import { Card } from 'pixel-retroui';\n\nfunction App() {\n  return (\n    <Card className="p-4">\n      <h2>Card Title</h2>\n      <p>This is the card content.</p>\n    </Card>\n  );\n}`} codeKey="basicUsage" />
      </div>

      {/* Props */}
      <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mb-8">
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
              <td className="p-2">bg</td>
              <td className="p-2">string</td>
              <td className="p-2">'#ffffff'</td>
              <td className="p-2">Background color of the card</td>
            </tr>
            <tr>
              <td className="p-2">textColor</td>
              <td className="p-2">string</td>
              <td className="p-2">'#000000'</td>
              <td className="p-2">Text color of the card content</td>
            </tr>
            <tr>
              <td className="p-2">borderColor</td>
              <td className="p-2">string</td>
              <td className="p-2">'#000000'</td>
              <td className="p-2">Border color of the card</td>
            </tr>
            <tr>
              <td className="p-2">shadowColor</td>
              <td className="p-2">string</td>
              <td className="p-2">'#000000'</td>
              <td className="p-2">Shadow color of the card</td>
            </tr>
            <tr>
              <td className="p-2">className</td>
              <td className="p-2">string</td>
              <td className="p-2">''</td>
              <td className="p-2">Additional CSS classes to apply to the card</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Custom Card */}
      <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Custom Card</h2>
        <div className="mb-4">
          <span className="text-sm font-bold mr-2">Theme:</span>
          {Object.keys(themes).map((theme) => (
            <button
              key={theme}
              onClick={() => setCurrentTheme(theme as Theme)}
              className={`w-6 h-6 rounded-full border-2 mr-2 ${
                currentTheme === theme ? 'border-blue-500' : 'border-gray-300'
              }`}
              style={{ backgroundColor: themes[theme as Theme].bg }}
            />
          ))}
        </div>
        <CardPreview />
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4">
          {`<Card
  bg="${getThemeColors().bg}"
  textColor="${getThemeColors().textColor}"
  borderColor="${getThemeColors().borderColor}"
  shadowColor="${getThemeColors().shadowColor}"
  className="p-4"
>
  <h2>Card Title</h2>
  <p>This is the card content.</p>
</Card>`}
        </pre>
      </div>

      {/* Additional Examples */}
      <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Additional Examples</h2>
        <h3 className="text-xl font-semibold mb-2">Card with Custom Content and Classes</h3>
        <div className="mb-4">
          <AdditionalExamplePreview />
        </div>
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4 relative">
          {`<Card
  bg="${getThemeColors().bg}"
  textColor="${getThemeColors().textColor}"
  borderColor="${getThemeColors().borderColor}"
  shadowColor="${getThemeColors().shadowColor}"
  className="p-4 items-center flex flex-col"
>
  <h2 className="text-2xl font-bold mb-2">Card Title</h2>
  <p className="mb-4">This card has custom content and styling.</p>
  <Button bg="gray" onClick={() => console.log("Button clicked")}>
    Click me
  </Button>
</Card>`}
          <CopyButton 
            text={`<Card
  bg="${getThemeColors().bg}"
  textColor="${getThemeColors().textColor}"
  borderColor="${getThemeColors().borderColor}"
  shadowColor="${getThemeColors().shadowColor}"
  className="p-4 items-center flex flex-col"
>
  <h2 className="text-2xl font-bold mb-2">Card Title</h2>
  <p className="mb-4">This card has custom content and styling.</p>
  <Button bg="gray" onClick={() => console.log("Button clicked")}>
    Click me
  </Button>
</Card>`} 
            codeKey="additionalExample" 
          />
        </pre>
      </div>
    </div>
  );
};

export default CardDetailsPage;













// A new design of card ----------------------------------------------------------


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Copy, Check } from 'lucide-react';

// type Theme = 'light' | 'dark' | 'colorful';

// interface ThemeColors {
//   bg: string;
//   textColor: string;
//   glassColor: string;
// }

// const themes: Record<Theme, ThemeColors> = {
//   light: { 
//     bg: 'from-blue-200 to-purple-200', 
//     textColor: 'text-gray-800',
//     glassColor: 'from-white/50 to-white/30'
//   },
//   dark: { 
//     bg: 'from-gray-900 to-gray-700', 
//     textColor: 'text-white',
//     glassColor: 'from-gray-800/50 to-gray-800/30'
//   },
//   colorful: { 
//     bg: 'from-pink-300 via-purple-300 to-indigo-400', 
//     textColor: 'text-gray-800',
//     glassColor: 'from-white/50 to-white/30'
//   }
// };

// const CardDetailsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [currentTheme, setCurrentTheme] = useState<Theme>('light');
//   const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

//   const copyToClipboard = (text: string, key: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setCopiedStates(prev => ({ ...prev, [key]: true }));
//       setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
//     });
//   };

//   const GlassContainer: React.FC<React.PropsWithChildren<{className?: string}>> = ({ children, className = '' }) => (
//     <div className={`backdrop-blur-md bg-gradient-to-br ${themes[currentTheme].glassColor} rounded-xl border border-white/20 shadow-lg ${className}`}>
//       {children}
//     </div>
//   );

//   const GlassButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
//     <button
//       {...props}
//       className={`px-4 py-2 rounded-lg bg-gradient-to-br ${themes[currentTheme].glassColor} backdrop-blur-md border border-white/20 shadow-md hover:shadow-lg transition-all duration-300 ${props.className}`}
//     />
//   );

//   const CopyButton: React.FC<{ text: string, codeKey: string }> = ({ text, codeKey }) => (
//     <GlassButton
//       onClick={() => copyToClipboard(text, codeKey)}
//       className="absolute top-4 right-4"
//       title="Copy to clipboard"
//     >
//       {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
//     </GlassButton>
//   );

//   const CardPreview: React.FC = () => (
//     <GlassContainer className="p-6">
//       <h2 className={`text-2xl font-bold mb-2 ${themes[currentTheme].textColor}`}>Card Title</h2>
//       <p className={themes[currentTheme].textColor}>This is the card content with a glassmorphism effect.</p>
//     </GlassContainer>
//   );

//   const getCardCode = () => `
// import React from 'react';

// const GlassContainer: React.FC<React.PropsWithChildren<{className?: string}>> = ({ children, className = '' }) => (
//   <div className={\`backdrop-blur-md bg-gradient-to-br ${themes[currentTheme].glassColor} rounded-xl border border-white/20 shadow-lg \${className}\`}>
//     {children}
//   </div>
// );

// const Card: React.FC = () => (
//   <GlassContainer className="p-6">
//     <h2 className="${themes[currentTheme].textColor} text-2xl font-bold mb-2">Card Title</h2>
//     <p className="${themes[currentTheme].textColor}">This is the card content with a glassmorphism effect.</p>
//   </GlassContainer>
// );

// export default Card;`;

//   return (
//     <div className={`min-h-screen p-8 font-mono bg-gradient-to-br ${themes[currentTheme].bg}`}>
//       <GlassButton 
//         onClick={() => navigate(-1)} 
//         className="mb-8 flex items-center"
//       >
//         <ArrowLeft size={20} className="mr-2" />
//         Back to Components
//       </GlassButton>

//       <h1 className={`text-4xl font-bold mb-8 ${themes[currentTheme].textColor}`}>Glassmorphic Card Component</h1>

//       <div className="mb-8 flex space-x-4">
//         {Object.keys(themes).map((theme) => (
//           <GlassButton
//             key={theme}
//             onClick={() => setCurrentTheme(theme as Theme)}
//             className={`${currentTheme === theme ? 'ring-2 ring-white' : ''}`}
//           >
//             {theme}
//           </GlassButton>
//         ))}
//       </div>

//       {/* Basic Usage */}
//       <GlassContainer className="p-6 mb-8 relative">
//         <h2 className={`text-2xl font-bold mb-4 ${themes[currentTheme].textColor}`}>Basic Usage</h2>
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//           {getCardCode()}
//         </pre>
//         <CopyButton text={getCardCode()} codeKey="basicUsage" />
//       </GlassContainer>

//       {/* Custom Card Preview */}
//       <GlassContainer className="p-6 mb-8">
//         <h2 className={`text-2xl font-bold mb-4 ${themes[currentTheme].textColor}`}>Card Preview</h2>
//         <CardPreview />
//       </GlassContainer>

//       {/* Additional Example */}
//       <GlassContainer className="p-6 mb-8">
//         <h2 className={`text-2xl font-bold mb-4 ${themes[currentTheme].textColor}`}>Additional Example</h2>
//         <GlassContainer className="p-6">
//           <h2 className={`text-2xl font-bold mb-2 ${themes[currentTheme].textColor}`}>Interactive Card</h2>
//           <p className={`mb-4 ${themes[currentTheme].textColor}`}>This card demonstrates interactive elements within a glassmorphic design.</p>
//           <GlassButton>
//             Click me!
//           </GlassButton>
//         </GlassContainer>
//       </GlassContainer>
//     </div>
//   );
// };

// export default CardDetailsPage;