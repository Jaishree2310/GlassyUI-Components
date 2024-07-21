// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Copy, Check } from 'lucide-react';

// type Theme = 'pink' | 'brown' | 'white' | 'black';

// const ButtonDetailsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentTheme = (location.state as { currentTheme?: Theme })?.currentTheme || 'pink';
//   const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

//   const [customBg, setCustomBg] = useState('#000000');
//   const [customText, setCustomText] = useState('#ffffff');
//   const [customBorder, setCustomBorder] = useState('#000000');

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
//       className={`absolute top-10 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-20 transition-all duration-300`}
//       title="Copy to clipboard"
//     >
//       {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
//     </button>
//   );

//   const popThemes = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

//   const basicUsageCode = `import { Button } from 'glassy-ui';

// function Example() {
//   return (
//     <Button onClick={() => console.log('Clicked!')}>
//       Click me
//     </Button>
//   );
// }`;

//   const themedButtonCode = `<Button
//   bg="${customBg}"
//   textColor="${customText}"
//   borderColor="${customBorder}"
//   className="${getGlassyClasses()}"
// >
//   Themed Button
// </Button>`;

//   const alertButtonCode = `<Button
//   onClick={() => alert("Button clicked!")}
//   className="${getGlassyClasses()} hover:bg-opacity-20"
// >
//   Alert!
// </Button>`;

//   const fullWidthButtonCode = `<Button 
//   className="${getGlassyClasses()} w-full py-3 hover:bg-opacity-20"
// >
//   Full Width Button
// </Button>`;

//   return (
//     <div className={`min-h-screen p-8 font-mono transition-colors duration-300 ${getThemeClasses()}`}>
//       <button 
//         onClick={() => navigate(-1)} 
//         className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 transition-all duration-300`}
//       >
//         <ArrowLeft size={20} className="mr-2" />
//         Back to Components
//       </button>

//       <h1 className="text-4xl font-bold mb-8">Button </h1>

//       <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
//         <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
//         <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//           {basicUsageCode}
//         </pre>
//         <CopyButton text={basicUsageCode} codeKey="basicUsage" />
//       </div>

//       <div className={`${getGlassyClasses()} p-6`}>
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
//               <td className="p-2">variant</td>
//               <td className="p-2">'default' | 'accent'</td>
//               <td className="p-2">'default'</td>
//               <td className="p-2">The style variant of the button</td>
//             </tr>
//             <tr>
//               <td className="p-2">size</td>
//               <td className="p-2">'small' | 'medium' | 'large'</td>
//               <td className="p-2">'medium'</td>
//               <td className="p-2">The size of the button</td>
//             </tr>
//             <tr>
//               <td className="p-2">disabled</td>
//               <td className="p-2">boolean</td>
//               <td className="p-2">false</td>
//               <td className="p-2">Whether the button is disabled</td>
//             </tr>
//             <tr>
//               <td className="p-2">onClick</td>
//               <td className="p-2">function</td>
//               <td className="p-2">-</td>
//               <td className="p-2">Function called when the button is clicked</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className={`${getGlassyClasses()} p-6 mt-8`}>
//         <h2 className="text-2xl font-bold mb-4">Custom Button</h2>
//         <p className="mb-4">
//           Customize your button's appearance by selecting a preset theme or creating your own color scheme.
//         </p>
//         <div className="space-y-6">
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Theme: Pop</h3>
//             <div className="flex space-x-2 mb-4">
//               {popThemes.map((color, index) => (
//                 <button
//                   key={index}
//                   className="w-8 h-8 rounded-full"
//                   style={{ backgroundColor: color }}
//                   onClick={() => {
//                     setCustomBg(color);
//                     setCustomText(index === 1 ? '#000000' : '#ffffff');
//                   }}
//                 />
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-2">Custom Theme</h3>
//             <div className="flex space-x-4 mb-4">
//               <div>
//                 <label className="block mb-1">Background</label>
//                 <input
//                   type="color"
//                   value={customBg}
//                   onChange={(e) => setCustomBg(e.target.value)}
//                   className="w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Text</label>
//                 <input
//                   type="color"
//                   value={customText}
//                   onChange={(e) => setCustomText(e.target.value)}
//                   className="w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Border</label>
//                 <input
//                   type="color"
//                   value={customBorder}
//                   onChange={(e) => setCustomBorder(e.target.value)}
//                   className="w-full"
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-2">Preview</h3>
//             <button
//               className={`px-6 py-3 rounded transition-all duration-300 ${getGlassyClasses()}`}
//               style={{
//                 backgroundColor: `${customBg}20`,
//                 color: customText,
//                 borderColor: customBorder,
//                 borderWidth: '2px',
//                 borderStyle: 'solid',
//               }}
//             >
//               Themed Button
//             </button>
//           </div>

//           <div className="relative">
//             <h3 className="text-xl font-semibold mb-2">Code</h3>
//             <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//               {themedButtonCode}
//             </pre>
//             <CopyButton text={themedButtonCode} codeKey="themedButton" />
//           </div>
//         </div>
//       </div>

//       <div className={`${getGlassyClasses()} p-6 mt-8`}>
//         <h2 className="text-2xl font-bold mb-4">Additional Examples</h2>
//         <div className="space-y-6">
//           <div className="relative">
//             <h3 className="text-xl font-semibold mb-2">With onClick Handler</h3>
//             <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//               {alertButtonCode}
//             </pre>
//             <CopyButton text={alertButtonCode} codeKey="alertButton" />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Preview:</h3>
//             <button
//               className={`px-6 py-3 rounded transition-all duration-300 ${getGlassyClasses()} hover:bg-opacity-20`}
//               onClick={() => alert("Button clicked!")}
//             >
//               Alert!
//             </button>
//           </div>

//           <div className="relative">
//             <h3 className="text-xl font-semibold mb-2">With Additional Classes</h3>
//             <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//               {fullWidthButtonCode}
//             </pre>
//             <CopyButton text={fullWidthButtonCode} codeKey="fullWidthButton" />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Preview:</h3>
//             <button className={`w-full py-3 rounded transition-all duration-300 ${getGlassyClasses()} hover:bg-opacity-20`}>
//               Full Width Button
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ButtonDetailsPage;





































// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Copy, Check } from 'lucide-react';

// const ButtonDetailsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

//   const [customBg, setCustomBg] = useState('#6d28d9');
//   const [customText, setCustomText] = useState('#ffffff');
//   const [customBorder, setCustomBorder] = useState('#8b5cf6');

//   const getGlassyClasses = () => {
//     return 'backdrop-filter backdrop-blur-lg bg-opacity-10 border border-opacity-20 rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-400/30 to-blue-400/30 border-white/20 text-white';
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
//       className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-opacity-20 transition-all duration-300`}
//       title="Copy to clipboard"
//     >
//       {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
//     </button>
//   );

//   const popThemes = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

//   const basicUsageCode = `import { Button } from 'glassy-ui';

// function Example() {
//   return (
//     <Button onClick={() => console.log('Clicked!')}>
//       Click me
//     </Button>
//   );
// }`;

//   const themedButtonCode = `<Button
//   bg="${customBg}"
//   textColor="${customText}"
//   borderColor="${customBorder}"
//   className="${getGlassyClasses()}"
// >
//   Themed Button
// </Button>`;

//   const alertButtonCode = `<Button
//   onClick={() => alert("Button clicked!")}
//   className="${getGlassyClasses()} hover:bg-opacity-20"
// >
//   Alert!
// </Button>`;

//   const fullWidthButtonCode = `<Button 
//   className="${getGlassyClasses()} w-full py-3 hover:bg-opacity-20"
// >
//   Full Width Button
// </Button>`;

//   return (
//     <div className="min-h-screen p-8 font-sans bg-black relative overflow-hidden">
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-purple-600 to-pink-600 filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute top-[60%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-pink-600 to-purple-600 filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative z-10 text-white">
//         <button 
//           onClick={() => navigate(-1)} 
//           className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 transition-all duration-300`}
//         >
//           <ArrowLeft size={20} className="mr-2" />
//           Back to Components
//         </button>

//         <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Button Component</h1>

//         <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
//           <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
//           <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//             {basicUsageCode}
//           </pre>
//           <CopyButton text={basicUsageCode} codeKey="basicUsage" />
//         </div>

//         <div className={`${getGlassyClasses()} p-6 mb-8`}>
//           <h2 className="text-2xl font-bold mb-4">Props</h2>
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="text-left p-2">Prop</th>
//                 <th className="text-left p-2">Type</th>
//                 <th className="text-left p-2">Default</th>
//                 <th className="text-left p-2">Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="p-2">variant</td>
//                 <td className="p-2">'default' | 'accent'</td>
//                 <td className="p-2">'default'</td>
//                 <td className="p-2">The style variant of the button</td>
//               </tr>
//               <tr>
//                 <td className="p-2">size</td>
//                 <td className="p-2">'small' | 'medium' | 'large'</td>
//                 <td className="p-2">'medium'</td>
//                 <td className="p-2">The size of the button</td>
//               </tr>
//               <tr>
//                 <td className="p-2">disabled</td>
//                 <td className="p-2">boolean</td>
//                 <td className="p-2">false</td>
//                 <td className="p-2">Whether the button is disabled</td>
//               </tr>
//               <tr>
//                 <td className="p-2">onClick</td>
//                 <td className="p-2">function</td>
//                 <td className="p-2">-</td>
//                 <td className="p-2">Function called when the button is clicked</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className={`${getGlassyClasses()} p-6 mb-8`}>
//           <h2 className="text-2xl font-bold mb-4">Custom Button</h2>
//           <p className="mb-4">
//             Customize your button's appearance by selecting a preset theme or creating your own color scheme.
//           </p>
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Theme: Pop</h3>
//               <div className="flex space-x-2 mb-4">
//                 {popThemes.map((color, index) => (
//                   <button
//                     key={index}
//                     className="w-8 h-8 rounded-full"
//                     style={{ backgroundColor: color }}
//                     onClick={() => {
//                       setCustomBg(color);
//                       setCustomText(index === 1 ? '#000000' : '#ffffff');
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold mb-2">Custom Theme</h3>
//               <div className="flex space-x-4 mb-4">
//                 <div>
//                   <label className="block mb-1">Background</label>
//                   <input
//                     type="color"
//                     value={customBg}
//                     onChange={(e) => setCustomBg(e.target.value)}
//                     className="w-full"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1">Text</label>
//                   <input
//                     type="color"
//                     value={customText}
//                     onChange={(e) => setCustomText(e.target.value)}
//                     className="w-full"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1">Border</label>
//                   <input
//                     type="color"
//                     value={customBorder}
//                     onChange={(e) => setCustomBorder(e.target.value)}
//                     className="w-full"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold mb-2">Preview</h3>
//               <button
//                 className={`px-6 py-3 rounded transition-all duration-300 ${getGlassyClasses()}`}
//                 style={{
//                   backgroundColor: `${customBg}20`,
//                   color: customText,
//                   borderColor: customBorder,
//                   borderWidth: '2px',
//                   borderStyle: 'solid',
//                 }}
//               >
//                 Themed Button
//               </button>
//             </div>

//             <div className="relative">
//               <h3 className="text-xl font-semibold mb-2">Code</h3>
//               <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//                 {themedButtonCode}
//               </pre>
//               <CopyButton text={themedButtonCode} codeKey="themedButton" />
//             </div>
//           </div>
//         </div>

//         <div className={`${getGlassyClasses()} p-6 mt-8`}>
//           <h2 className="text-2xl font-bold mb-4">Additional Examples</h2>
//           <div className="space-y-6">
//             <div className="relative">
//               <h3 className="text-xl font-semibold mb-2">With onClick Handler</h3>
//               <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//                 {alertButtonCode}
//               </pre>
//               <CopyButton text={alertButtonCode} codeKey="alertButton" />
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Preview:</h3>
//               <button
//                 className={`px-6 py-3 rounded transition-all duration-300 ${getGlassyClasses()} hover:bg-opacity-20`}
//                 onClick={() => alert("Button clicked!")}
//               >
//                 Alert!
//               </button>
//             </div>

//             <div className="relative">
//               <h3 className="text-xl font-semibold mb-2">With Additional Classes</h3>
//               <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//                 {fullWidthButtonCode}
//               </pre>
//               <CopyButton text={fullWidthButtonCode} codeKey="fullWidthButton" />
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Preview:</h3>
//               <button className={`w-full py-3 rounded transition-all duration-300 ${getGlassyClasses()} hover:bg-opacity-20`}>
//                 Full Width Button
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ButtonDetailsPage;



































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Copy, Check } from 'lucide-react';

// const ButtonDetailsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

//   const [customBg, setCustomBg] = useState('#6d28d9');
//   const [customText, setCustomText] = useState('#ffffff');
//   const [customBorder, setCustomBorder] = useState('#8b5cf6');

//   const getGlassyClasses = () => {
//     return 'backdrop-filter backdrop-blur-lg bg-opacity-10 border border-opacity-20 rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-400/30 to-blue-400/30 border-white/20 text-white';
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
//       className={`absolute top-2 left-2 ${getGlassyClasses()} p-2 hover:bg-opacity-20 transition-all duration-300 z-10`}
//       title="Copy to clipboard"
//     >
//       {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
//     </button>
//   );

//   const popThemes = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

//   const basicUsageCode = `import { Button } from 'glassy-ui';

// function Example() {
//   const getGlassyClasses = () => {
//     return 'backdrop-filter backdrop-blur-lg bg-opacity-10 border border-opacity-20 rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-400/30 to-blue-400/30 border-white/20 text-white';
//   };

//   return (
//     <Button 
//       onClick={() => console.log('Clicked!')}
//       className={getGlassyClasses()}
//     >
//       Click me
//     </Button>
//   );
// }`;

//   const themedButtonCode = `<Button
//   bg="${customBg}"
//   textColor="${customText}"
//   borderColor="${customBorder}"
//   className="${getGlassyClasses()}"
// >
//   Themed Button
// </Button>`;

//   const alertButtonCode = `<Button
//   onClick={() => alert("Button clicked!")}
//   className="${getGlassyClasses()} hover:bg-opacity-20"
// >
//   Alert!
// </Button>`;

//   const fullWidthButtonCode = `<Button 
//   className="${getGlassyClasses()} w-full py-3 hover:bg-opacity-20"
// >
//   Full Width Button
// </Button>`;

//   return (
//     <div className="min-h-screen p-8 font-sans bg-black relative overflow-hidden">
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-purple-600 to-pink-600 filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute top-[60%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-pink-600 to-purple-600 filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative z-10 text-white">
//         <button 
//           onClick={() => navigate(-1)} 
//           className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 transition-all duration-300`}
//         >
//           <ArrowLeft size={20} className="mr-2" />
//           Back to Components
//         </button>

//         <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Button Component</h1>

//         <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
//           <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
//           <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//             {basicUsageCode}
//           </pre>
//           <CopyButton text={basicUsageCode} codeKey="basicUsage" />
//         </div>

//         <div className={`${getGlassyClasses()} p-6 mb-8`}>
//           <h2 className="text-2xl font-bold mb-4">Props</h2>
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="text-left p-2">Prop</th>
//                 <th className="text-left p-2">Type</th>
//                 <th className="text-left p-2">Default</th>
//                 <th className="text-left p-2">Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="p-2">variant</td>
//                 <td className="p-2">'default' | 'accent'</td>
//                 <td className="p-2">'default'</td>
//                 <td className="p-2">The style variant of the button</td>
//               </tr>
//               <tr>
//                 <td className="p-2">size</td>
//                 <td className="p-2">'small' | 'medium' | 'large'</td>
//                 <td className="p-2">'medium'</td>
//                 <td className="p-2">The size of the button</td>
//               </tr>
//               <tr>
//                 <td className="p-2">disabled</td>
//                 <td className="p-2">boolean</td>
//                 <td className="p-2">false</td>
//                 <td className="p-2">Whether the button is disabled</td>
//               </tr>
//               <tr>
//                 <td className="p-2">onClick</td>
//                 <td className="p-2">function</td>
//                 <td className="p-2">-</td>
//                 <td className="p-2">Function called when the button is clicked</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className={`${getGlassyClasses()} p-6 mb-8`}>
//           <h2 className="text-2xl font-bold mb-4">Custom Button</h2>
//           <p className="mb-4">
//             Customize your button's appearance by selecting a preset theme or creating your own color scheme.
//           </p>
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Theme: Pop</h3>
//               <div className="flex space-x-2 mb-4">
//                 {popThemes.map((color, index) => (
//                   <button
//                     key={index}
//                     className="w-10 h-10 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110"
//                     style={{ backgroundColor: color }}
//                     onClick={() => {
//                       setCustomBg(color);
//                       setCustomText(index === 1 ? '#000000' : '#ffffff');
//                       setCustomBorder(color);
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className={`${getGlassyClasses()} p-4`}>
//                 <label className="block mb-2 font-semibold">Background</label>
//                 <div className="flex items-center">
//                   <input
//                     type="color"
//                     value={customBg}
//                     onChange={(e) => setCustomBg(e.target.value)}
//                     className="w-10 h-10 rounded-full border-2 border-white shadow-lg mr-2"
//                   />
//                   <input 
//                     type="text" 
//                     value={customBg} 
//                     onChange={(e) => setCustomBg(e.target.value)}
//                     className="bg-transparent border-b border-white w-full"
//                   />
//                 </div>
//               </div>
//               <div className={`${getGlassyClasses()} p-4`}>
//                 <label className="block mb-2 font-semibold">Text</label>
//                 <div className="flex items-center">
//                   <input
//                     type="color"
//                     value={customText}
//                     onChange={(e) => setCustomText(e.target.value)}
//                     className="w-10 h-10 rounded-full border-2 border-white shadow-lg mr-2"
//                   />
//                   <input 
//                     type="text" 
//                     value={customText} 
//                     onChange={(e) => setCustomText(e.target.value)}
//                     className="bg-transparent border-b border-white w-full"
//                   />
//                 </div>
//               </div>
//               <div className={`${getGlassyClasses()} p-4`}>
//                 <label className="block mb-2 font-semibold">Border</label>
//                 <div className="flex items-center">
//                   <input
//                     type="color"
//                     value={customBorder}
//                     onChange={(e) => setCustomBorder(e.target.value)}
//                     className="w-10 h-10 rounded-full border-2 border-white shadow-lg mr-2"
//                   />
//                   <input 
//                     type="text" 
//                     value={customBorder} 
//                     onChange={(e) => setCustomBorder(e.target.value)}
//                     className="bg-transparent border-b border-white w-full"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold mb-2">Preview</h3>
//               <button
//                 className={`px-6 py-3 rounded transition-all duration-300 ${getGlassyClasses()}`}
//                 style={{
//                   backgroundColor: `${customBg}40`,
//                   color: customText,
//                   borderColor: customBorder,
//                   borderWidth: '2px',
//                   borderStyle: 'solid',
//                 }}
//               >
//                 Themed Button
//               </button>
//             </div>

//             <div className="relative">
//               <h3 className="text-xl font-semibold mb-2">Code</h3>
//               <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//                 {themedButtonCode}
//               </pre>
//               <CopyButton text={themedButtonCode} codeKey="themedButton" />
//             </div>
//           </div>
//         </div>

//         <div className={`${getGlassyClasses()} p-6 mt-8`}>
//           <h2 className="text-2xl font-bold mb-4">Additional Examples</h2>
//           <div className="space-y-6">
//             <div className="relative">
//               <h3 className="text-xl font-semibold mb-2">With onClick Handler</h3>
//               <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//                 {alertButtonCode}
//               </pre>
//               <CopyButton text={alertButtonCode} codeKey="alertButton" />
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Preview:</h3>
//               <button
//                 className={`px-6 py-3 rounded transition-all duration-300 ${getGlassyClasses()} hover:bg-opacity-20`}
//                 onClick={() => alert("Button clicked!")}
//               >
//                 Alert!
//               </button>
//             </div>

//             <div className="relative">
//               <h3 className="text-xl font-semibold mb-2">With Additional Classes</h3>
//               <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//                 {fullWidthButtonCode}
//               </pre>
//               <CopyButton text={fullWidthButtonCode} codeKey="fullWidthButton" />
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Preview:</h3>
//               <button className={`w-full py-3 rounded transition-all duration-300 ${getGlassyClasses()} hover:bg-opacity-20`}>
//                 Full Width Button
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ButtonDetailsPage;
































import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

const ButtonDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const [customBg, setCustomBg] = useState('#6d28d9');
  const [customText, setCustomText] = useState('#ffffff');
  const [customBorder, setCustomBorder] = useState('#8b5cf6');

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-lg transition-all duration-300';
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
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/20 transition-all duration-300 z-10`}
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-white" />}
    </button>
  );

  const popThemes = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  const basicUsageCode = `import { Button } from 'glassy-ui';

const getGlassyClasses = () => 'backdrop-filter backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

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
  className={\`\${getGlassyClasses()} hover:bg-white/20\`}
>
  Alert!
</Button>`;

  const fullWidthButtonCode = `<Button 
  className={\`\${getGlassyClasses()} w-full py-3 hover:bg-white/20\`}
>
  Full Width Button
</Button>`;

  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-purple-600 to-pink-600 filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[60%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-pink-600 to-purple-600 filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <button 
          onClick={() => navigate(-1)} 
          className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/20 transition-all duration-300`}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Components
        </button>

        <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Button Component</h1>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className="text-3xl font-bold mb-6">Basic Usage</h2>
          <div className="relative">
            <pre className="bg-black/50 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {basicUsageCode}
            </pre>
            <CopyButton text={basicUsageCode} codeKey="basicUsage" />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className="text-3xl font-bold mb-6">Props</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-2">Prop</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Default</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="p-2">variant</td>
                <td className="p-2">'default' | 'accent'</td>
                <td className="p-2">'default'</td>
                <td className="p-2">The style variant of the button</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-2">size</td>
                <td className="p-2">'small' | 'medium' | 'large'</td>
                <td className="p-2">'medium'</td>
                <td className="p-2">The size of the button</td>
              </tr>
              <tr className="border-b border-white/10">
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

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className="text-3xl font-bold mb-6">Custom Button</h2>
          <p className="mb-6 text-lg">
            Customize your button's appearance by selecting a preset theme or creating your own color scheme.
          </p>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Theme: Pop</h3>
              <div className="flex space-x-4 mb-4">
                {popThemes.map((color, index) => (
                  <button
                    key={index}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setCustomBg(color);
                      setCustomText(index === 1 ? '#000000' : '#ffffff');
                      setCustomBorder(color);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${getGlassyClasses()} p-6`}>
                <label className="block mb-2 font-semibold text-lg">Background</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={customBg}
                    onChange={(e) => setCustomBg(e.target.value)}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg mr-4"
                  />
                  <input 
                    type="text" 
                    value={customBg} 
                    onChange={(e) => setCustomBg(e.target.value)}
                    className="bg-transparent border-b border-white w-full text-lg p-2"
                  />
                </div>
              </div>
              <div className={`${getGlassyClasses()} p-6`}>
                <label className="block mb-2 font-semibold text-lg">Text</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg mr-4"
                  />
                  <input 
                    type="text" 
                    value={customText} 
                    onChange={(e) => setCustomText(e.target.value)}
                    className="bg-transparent border-b border-white w-full text-lg p-2"
                  />
                </div>
              </div>
              <div className={`${getGlassyClasses()} p-6`}>
                <label className="block mb-2 font-semibold text-lg">Border</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={customBorder}
                    onChange={(e) => setCustomBorder(e.target.value)}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg mr-4"
                  />
                  <input 
                    type="text" 
                    value={customBorder} 
                    onChange={(e) => setCustomBorder(e.target.value)}
                    className="bg-transparent border-b border-white w-full text-lg p-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Preview</h3>
              <button
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${getGlassyClasses()}`}
                style={{
                  backgroundColor: `${customBg}40`,
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
              <h3 className="text-2xl font-semibold mb-4">Code</h3>
              <pre className="bg-black/50 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {themedButtonCode}
              </pre>
              <CopyButton text={themedButtonCode} codeKey="themedButton" />
            </div>
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mt-8`}>
          <h2 className="text-3xl font-bold mb-6">Additional Examples</h2>
          <div className="space-y-8">
            <div className="relative">
              <h3 className="text-2xl font-semibold mb-4">With onClick Handler</h3>
              <pre className="bg-black/50 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {alertButtonCode}
              </pre>
              <CopyButton text={alertButtonCode} codeKey="alertButton" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Preview:</h3>
              <button
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${getGlassyClasses()} hover:bg-white/20`}
                onClick={() => alert("Button clicked!")}
              >
                Alert!
              </button>
            </div>

            <div className="relative">
              <h3 className="text-2xl font-semibold mb-4">With Additional Classes</h3>
              <pre className="bg-black/50 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {fullWidthButtonCode}
              </pre>
              <CopyButton text={fullWidthButtonCode} codeKey="fullWidthButton" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Preview:</h3>
              <button className={`w-full py-3 rounded-xl transition-all duration-300 ${getGlassyClasses()} hover:bg-white/20`}>
                Full Width Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDetailsPage;