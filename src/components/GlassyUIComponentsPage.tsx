// import React, { useState } from 'react';
// import { Star } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const GlassyUIComponentsPage: React.FC = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const githubRepoUrl = "https://github.com/Jaishree2310/GlassyUI-Components";
//   const navigate = useNavigate();

//   const getGlassyClasses = () => {
//     return 'backdrop-filter backdrop-blur-lg bg-white/20 border border-opacity-30 rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-br from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] border-white/20 text-white'; // Updated for frosted glass effect
//   };

//   return (
//     <div className="min-h-screen p-8 font-sans relative overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-50"></div>

//       {/* Background blobs */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute top-[60%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative z-10 text-white">
//         <header className="flex justify-between items-center mb-16">
//           <div className="text-3xl font-bold flex items-center">
//             <span className="mr-2">🔷</span> GlassyUI
//           </div>
//           <a 
//             href={githubRepoUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`flex items-center space-x-2 text-sm ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 transition-colors duration-300`}
//           >
//             <Star size={16} />
//             <span>Star on GitHub</span>
//           </a>
//         </header>

//         <main className="space-y-12">
//           <div>
//             <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9]">Components</h1>
//             <p className="text-xl mb-8 opacity-80">Elevate your UI with our collection of glassmorphic components.</p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <ComponentCard 
//               title="Button" 
//               description="Sleek, customizable buttons with glassmorphic styling."
//               onClick={() => navigate('/button-details')}
//               glassyClasses={getGlassyClasses()}
//             >
//               <div className="flex space-x-2">
//                 <button className={`px-4 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg hover:shadow-xl hover:border-white/50 transition-all`}>
//                   Click me
//                 </button>
//                 <button className={`px-4 py-2 ${getGlassyClasses()} bg-opacity-30 border-2 border-white/30 shadow-lg hover:shadow-xl hover:bg-opacity-40 transition-all`}>
//                   Accent
//                 </button>
//               </div>
//             </ComponentCard>

//             <ComponentCard 
//               title="Input" 
//               description="Elegant input fields with a glass-like appearance."
//               onClick={() => navigate('/input-details')}
//               glassyClasses={getGlassyClasses()}
//             >
//               <input
//                 type="text"
//                 placeholder="Type here..."
//                 className={`w-full px-3 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-white placeholder-opacity-50 hover:border-white/50 transition-all`}
//               />
//             </ComponentCard>

//             <ComponentCard 
//               title="Card" 
//               description="Versatile content containers with a frosted glass effect."
//               onClick={() => navigate('/card-details')}
//               glassyClasses={getGlassyClasses()}
//             >
//               <div className={`p-4 ${getGlassyClasses()} border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}>
//                 <h4 className="font-bold mb-2">Card Title</h4>
//                 <p className="opacity-70">This is some sample content for the card.</p>
//               </div>
//             </ComponentCard>

//             <ComponentCard 
//               title="ProgressBar" 
//               description="Stylish progress indicators with a glass-like finish."
//               onClick={() => navigate('/progress-bar-details')}
//               glassyClasses={getGlassyClasses()}
//             >
//               <div className={`w-full h-4 ${getGlassyClasses()} overflow-hidden border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}>
//                 <div className="bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] h-full" style={{ width: '60%' }}></div>
//               </div>
//             </ComponentCard>

//             <ComponentCard 
//               title="Textarea" 
//               description="Multi-line input fields with a sleek glassmorphic design."
//               onClick={() => navigate('/textarea-details')}
//               glassyClasses={getGlassyClasses()}
//             >
//               <textarea
//                 placeholder="Enter multiple lines..."
//                 className={`w-full px-3 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-white placeholder-opacity-50 hover:border-white/50 transition-all`}
//                 rows={3}
//               ></textarea>
//             </ComponentCard>

//             <ComponentCard 
//               title="Popup" 
//               description="Eye-catching modal dialogs with glassmorphism effects."
//               onClick={() => navigate('/popup-details')}
//               glassyClasses={getGlassyClasses()}
//             >
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowPopup(true);
//                 }}
//                 className={`px-4 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}
//               >
//                 Open Popup
//               </button>
//               {showPopup && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
//                   <div className={`${getGlassyClasses()} p-6 max-w-sm mx-auto border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}>
//                     <div className="flex justify-between items-center mb-4">
//                       <h3 className="text-xl font-bold">Popup</h3>
//                       <button onClick={() => setShowPopup(false)} className="text-current hover:text-opacity-75">✕</button>
//                     </div>
//                     <p>This is a sample popup with glassmorphism effect.</p>
//                   </div>
//                 </div>
//               )}
//             </ComponentCard>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// const ComponentCard: React.FC<{ 
//   title: string; 
//   description: string; 
//   children: React.ReactNode; 
//   onClick: () => void;
//   glassyClasses: string;
// }> = ({ title, description, children, onClick, glassyClasses }) => (
//   <div 
//     className={`${glassyClasses} p-6 flex flex-col h-full cursor-pointer group overflow-hidden relative bg-white/20 border-2 border-white/30 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl`} // Added shadow, border, and hover effects
//     onClick={onClick}
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 translate-x-[-100%] group-hover:animate-shine pointer-events-none" />
//     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//       <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-glassy-shine" />
//     </div>
//     <h3 className="text-2xl font-bold mb-2 relative z-10 bg-clip-text bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9]">{title}</h3>
//     <p className="mb-4 opacity-80 relative z-10">{description}</p>
//     <div className="mt-auto relative z-10">
//       {children}
//     </div>
//   </div>
// );

// export default GlassyUIComponentsPage;











































// import React, { useState } from 'react';
// import { Star } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // Add this CSS to your global styles or use a CSS-in-JS solution
// const globalStyles = `
// @keyframes float {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-20px); }
// }

// @keyframes float-slow {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-10px); }
// }

// .animate-float {
//   animation: float 6s ease-in-out infinite;
// }

// .animate-float-slow {
//   animation: float-slow 8s ease-in-out infinite;
// }

// @keyframes shine {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }

// .animate-shine {
//   animation: shine 3s linear infinite;
// }

// @keyframes glassy-shine {
//   0% { transform: translateX(-100%) rotate(45deg); }
//   100% { transform: translateX(100%) rotate(45deg); }
// }

// .animate-glassy-shine {
//   animation: glassy-shine 3s linear infinite;
// }
// `;

// const GlassyUIComponentsPage: React.FC = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const githubRepoUrl = "https://github.com/Jaishree2310/GlassyUI-Components";
//   const navigate = useNavigate();

//   const getGlassyClasses = () => {
//     return 'backdrop-filter backdrop-blur-lg bg-white/30 border border-opacity-40 rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-br from-white/40 via-white/30 to-white/40 border-white/30 text-gray-800';
//   };

//   return (
//     <>
//       <style>{globalStyles}</style>
//       <div className="min-h-screen p-8 font-sans relative overflow-hidden bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9]">
//         {/* Floating 3D Objects */}
//         <div className="absolute inset-0 z-0 overflow-hidden">
//           <svg className="absolute top-1/4 left-1/4 w-64 h-64 animate-float-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" style={{stopColor: '#FFB3B3', stopOpacity: 0.8}} />
//                 <stop offset="100%" style={{stopColor: '#D8B0FF', stopOpacity: 0.8}} />
//               </linearGradient>
//             </defs>
//             <path fill="url(#grad1)" d="M44.7,-76.4C58.8,-69.7,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,89.1,-0.5C88.2,15.3,83.8,30.5,76.2,44.1C68.6,57.7,57.8,69.6,44.4,77.6C31.1,85.6,15.5,89.7,0.4,89C-14.7,88.4,-29.4,83,-42.5,75.2C-55.6,67.4,-67.1,57.2,-74.9,44.3C-82.7,31.4,-86.9,15.7,-86.5,0.2C-86.1,-15.2,-81.1,-30.4,-73.3,-44.1C-65.4,-57.8,-54.6,-70,-41.5,-76.9C-28.4,-83.8,-14.2,-85.4,0.8,-86.7C15.8,-88,31.5,-89,44.7,-76.4Z" transform="translate(100 100)" />
//           </svg>
//           <svg className="absolute top-3/4 right-1/4 w-48 h-48 animate-float" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" style={{stopColor: '#D8B0FF', stopOpacity: 0.8}} />
//                 <stop offset="100%" style={{stopColor: '#FFD5B9', stopOpacity: 0.8}} />
//               </linearGradient>
//             </defs>
//             <path fill="url(#grad2)" d="M37.9,-64.5C50.4,-59.1,62.5,-50.9,69.8,-39.7C77.1,-28.5,79.6,-14.2,79.8,0.1C79.9,14.4,77.7,28.8,70.7,40.2C63.7,51.6,51.9,60,39.2,67.8C26.4,75.6,13.2,82.7,-0.9,84.2C-15,85.7,-30,81.5,-43.5,74.4C-57,67.3,-69,57.3,-76.8,44.5C-84.6,31.7,-88.2,15.8,-87.6,0.3C-87,-15.1,-82.3,-30.3,-74.3,-43.2C-66.3,-56.1,-55,-66.8,-42,-71.7C-29,-76.5,-14.5,-75.5,-0.6,-74.5C13.3,-73.4,26.6,-72.3,37.9,-64.5Z" transform="translate(100 100)" />
//           </svg>
//           <svg className="absolute bottom-1/4 left-1/3 w-56 h-56 animate-float-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" style={{stopColor: '#FFD5B9', stopOpacity: 0.8}} />
//                 <stop offset="100%" style={{stopColor: '#FFB3B3', stopOpacity: 0.8}} />
//               </linearGradient>
//             </defs>
//             <path fill="url(#grad3)" d="M45.7,-78.3C59.1,-71.3,70.3,-59.7,77.7,-46.2C85.2,-32.7,89,-17.3,89.8,-1.5C90.5,14.4,88.2,28.8,81.8,41.2C75.4,53.6,64.8,64,52.1,72.5C39.4,81,24.6,87.5,9.2,88.1C-6.2,88.7,-22.3,83.4,-37.1,76.1C-51.9,68.8,-65.4,59.5,-74.7,47C-84,34.5,-89,18.2,-89.8,1.5C-90.5,-15.3,-86.9,-30.6,-79.4,-43.8C-71.8,-57,-60.3,-68.1,-46.9,-75.1C-33.5,-82.1,-16.7,-85,-0.4,-84.3C15.9,-83.7,31.8,-79.5,45.7,-78.3Z" transform="translate(100 100)" />
//           </svg>
//         </div>

//         {/* Content */}
//         <div className="relative z-10 text-gray-800">
//           <header className="flex justify-between items-center mb-16">
//             <div className="text-3xl font-bold flex items-center">
//               <span className="mr-2">🔷</span> GlassyUI
//             </div>
//             <a 
//               href={githubRepoUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`flex items-center space-x-2 text-sm ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 transition-colors duration-300`}
//             >
//               <Star size={16} />
//               <span>Star on GitHub</span>
//             </a>
//           </header>

//           <main className="space-y-12">
//             <div>
//               <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9]">Components</h1>
//               <p className="text-xl mb-8 opacity-80">Elevate your UI with our collection of glassmorphic components.</p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               <ComponentCard 
//                 title="Button" 
//                 description="Sleek, customizable buttons with glassmorphic styling."
//                 onClick={() => navigate('/button-details')}
//                 glassyClasses={getGlassyClasses()}
//               >
//                 <div className="flex space-x-2">
//                   <button className={`px-4 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg hover:shadow-xl hover:border-white/50 transition-all`}>
//                     Click me
//                   </button>
//                   <button className={`px-4 py-2 ${getGlassyClasses()} bg-opacity-30 border-2 border-white/30 shadow-lg hover:shadow-xl hover:bg-opacity-40 transition-all`}>
//                     Accent
//                   </button>
//                 </div>
//               </ComponentCard>

//               <ComponentCard 
//                 title="Input" 
//                 description="Elegant input fields with a glass-like appearance."
//                 onClick={() => navigate('/input-details')}
//                 glassyClasses={getGlassyClasses()}
//               >
//                 <input
//                   type="text"
//                   placeholder="Type here..."
//                   className={`w-full px-3 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-white placeholder-opacity-50 hover:border-white/50 transition-all`}
//                 />
//               </ComponentCard>

//               <ComponentCard 
//                 title="Card" 
//                 description="Versatile content containers with a frosted glass effect."
//                 onClick={() => navigate('/card-details')}
//                 glassyClasses={getGlassyClasses()}
//               >
//                 <div className={`p-4 ${getGlassyClasses()} border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}>
//                   <h4 className="font-bold mb-2">Card Title</h4>
//                   <p className="opacity-70">This is some sample content for the card.</p>
//                 </div>
//               </ComponentCard>

//               <ComponentCard 
//                 title="ProgressBar" 
//                 description="Stylish progress indicators with a glass-like finish."
//                 onClick={() => navigate('/progress-bar-details')}
//                 glassyClasses={getGlassyClasses()}
//               >
//                 <div className={`w-full h-4 ${getGlassyClasses()} overflow-hidden border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}>
//                   <div className="bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] h-full" style={{ width: '60%' }}></div>
//                 </div>
//               </ComponentCard>

//               <ComponentCard 
//                 title="Textarea" 
//                 description="Multi-line input fields with a sleek glassmorphic design."
//                 onClick={() => navigate('/textarea-details')}
//                 glassyClasses={getGlassyClasses()}
//               >
//                 <textarea
//                   placeholder="Enter multiple lines..."
//                   className={`w-full px-3 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-white placeholder-opacity-50 hover:border-white/50 transition-all`}
//                   rows={3}
//                 ></textarea>
//               </ComponentCard>

//               <ComponentCard 
//                 title="Popup" 
//                 description="Eye-catching modal dialogs with glassmorphism effects."
//                 onClick={() => navigate('/popup-details')}
//                 glassyClasses={getGlassyClasses()}
//               >
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setShowPopup(true);
//                   }}
//                   className={`px-4 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}
//                 >
//                   Open Popup
//                 </button>
//                 {showPopup && (
//                   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
//                     <div className={`${getGlassyClasses()} p-6 max-w-sm mx-auto border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}>
//                       <div className="flex justify-between items-center mb-4">
//                         <h3 className="text-xl font-bold">Popup</h3>
//                         <button onClick={() => setShowPopup(false)} className="text-current hover:text-opacity-75">✕</button>
//                       </div>
//                       <p>This is a sample popup with glassmorphism effect.</p>
//                     </div>
//                   </div>
//                 )}
//               </ComponentCard>
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// const ComponentCard: React.FC<{ 
//   title: string; 
//   description: string; 
//   children: React.ReactNode; 
//   onClick: () => void;
//   glassyClasses: string;
// }> = ({ title, description, children, onClick, glassyClasses }) => (
//   <div 
//     className={`${glassyClasses} p-6 flex flex-col h-full cursor-pointer group overflow-hidden relative bg-white/40 border-2 border-white/40 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl`}
//     onClick={onClick}
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 translate-x-[-100%] group-hover:animate-shine pointer-events-none" />
//     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//       <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-glassy-shine" />
//     </div>
//     <h3 className="text-2xl font-bold mb-2 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9]">{title}</h3>
//     <p className="mb-4 opacity-80 relative z-10">{description}</p>
//     <div className="mt-auto relative z-10">
//       {children}
//     </div>
//   </div>
// );

// export default GlassyUIComponentsPage;







































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Star, ArrowRight, Box, Type, Sliders, MessageSquare, Menu, X } from 'lucide-react';

// const GlassyUIComponentsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const githubRepoUrl = "https://github.com/YourUsername/GlassyUI-Components";

//   const getGlassyClasses = () => {
//     return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300';
//   };

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   return (
//     <div className="min-h-screen font-sans bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
//       <div className="container mx-auto px-4 py-8 lg:py-12">
//         <header className="flex justify-between items-center mb-16">
//           <div className="text-3xl lg:text-4xl font-bold tracking-tight">GlassyUI</div>
//           <div className="hidden md:flex items-center space-x-4">
//             <a 
//               href={githubRepoUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`flex items-center space-x-2 ${getGlassyClasses()} px-4 py-2 hover:bg-white/20 transition-colors duration-300`}
//             >
//               <Star size={18} />
//               <span className="text-sm font-medium">Star on GitHub</span>
//             </a>
//           </div>
//           <button className="md:hidden" onClick={toggleMenu}>
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </header>

//         {isMenuOpen && (
//           <div className="md:hidden mb-8">
//             <a 
//               href={githubRepoUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`flex items-center justify-center space-x-2 ${getGlassyClasses()} px-4 py-2 hover:bg-white/20 transition-colors duration-300 w-full`}
//             >
//               <Star size={18} />
//               <span className="text-sm font-medium">Star on GitHub</span>
//             </a>
//           </div>
//         )}

//         <main>
//           <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
//             Glassmorphic Components
//           </h1>
//           <p className="text-lg lg:text-xl mb-12 max-w-2xl leading-relaxed">
//             Elevate your UI with our collection of beautifully crafted, glassmorphic components. 
//             Perfect for creating modern, sleek interfaces with depth and style.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <ComponentCard 
//               title="Buttons"
//               description="Sleek, customizable buttons with glassmorphic styling."
//               icon={<Box size={24} />}
//               onClick={() => navigate('/button-details')}
//             >
//               <div className="flex space-x-2 mt-4">
//                 <button className={`${getGlassyClasses()} px-4 py-2 hover:bg-white/20`}>
//                   Click me
//                 </button>
//                 <button className={`${getGlassyClasses()} px-4 py-2 bg-white/20 hover:bg-white/30`}>
//                   Accent
//                 </button>
//               </div>
//             </ComponentCard>
            
//             <ComponentCard 
//               title="Inputs"
//               description="Elegant input fields with a glass-like appearance."
//               icon={<Type size={24} />}
//               onClick={() => navigate('/input-details')}
//             >
//               <input
//                 type="text"
//                 placeholder="Type here..."
//                 className={`${getGlassyClasses()} w-full px-4 py-2 mt-4 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50`}
//               />
//             </ComponentCard>
            
//             <ComponentCard 
//               title="Cards"
//               description="Versatile content containers with a frosted glass effect."
//               icon={<MessageSquare size={24} />}
//               onClick={() => navigate('/card-details')}
//             >
//               <div className={`${getGlassyClasses()} p-4 mt-4`}>
//                 <h4 className="font-semibold">Card Title</h4>
//                 <p className="text-sm opacity-80">Card content goes here.</p>
//               </div>
//             </ComponentCard>
            
//             <ComponentCard 
//               title="Progress Bars"
//               description="Stylish progress indicators with a glass-like finish."
//               icon={<Sliders size={24} />}
//               onClick={() => navigate('/progress-bar-details')}
//             >
//               <div className={`${getGlassyClasses()} w-full h-4 mt-4`}>
//                 <div className="bg-white/30 h-full rounded-2xl" style={{ width: '60%' }}></div>
//               </div>
//             </ComponentCard>
            
//             <ComponentCard 
//               title="Modals"
//               description="Eye-catching dialog boxes with glassmorphism effects."
//               icon={<MessageSquare size={24} />}
//               onClick={() => navigate('/modal-details')}
//             >
//               <button 
//                 onClick={(e) => { e.stopPropagation(); alert('Modal would open here'); }} 
//                 className={`${getGlassyClasses()} px-4 py-2 mt-4 hover:bg-white/20`}
//               >
//                 Open Modal
//               </button>
//             </ComponentCard>
            
//             <ComponentCard 
//               title="Navigation"
//               description="Sleek navigation components with a frosted glass look."
//               icon={<ArrowRight size={24} />}
//               onClick={() => navigate('/navigation-details')}
//             >
//               <nav className={`${getGlassyClasses()} flex justify-around mt-4 py-2`}>
//                 <a href="#" className="hover:bg-white/20 px-2 py-1 rounded">Home</a>
//                 <a href="#" className="hover:bg-white/20 px-2 py-1 rounded">About</a>
//                 <a href="#" className="hover:bg-white/20 px-2 py-1 rounded">Contact</a>
//               </nav>
//             </ComponentCard>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// const ComponentCard: React.FC<{ 
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   onClick: () => void;
//   children?: React.ReactNode;
// }> = ({ title, description, icon, onClick, children }) => {
//   const getGlassyClasses = () => {
//     return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300';
//   };

//   return (
//     <div 
//       className={`${getGlassyClasses()} p-6 flex flex-col h-full cursor-pointer group transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl`}
//       onClick={onClick}
//     >
//       <div className="flex items-center mb-4">
//         <div className="p-2 bg-white/20 rounded-lg mr-4">
//           {icon}
//         </div>
//         <h3 className="text-xl font-bold">{title}</h3>
//       </div>
//       <p className="text-sm opacity-80 mb-4 flex-grow">{description}</p>
//       {children}
//       <div className="flex items-center text-sm font-medium text-pink-200 mt-4">
//         <span>Learn more</span>
//         <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//       </div>
//     </div>
//   );
// };

// export default GlassyUIComponentsPage;













































import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, Box, Type, Sliders, MessageSquare, Menu, X, Layout, AlignLeft } from 'lucide-react';

const GlassyUIComponentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const githubRepoUrl = "https://github.com/YourUsername/GlassyUI-Components";

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300';
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigateToLandingPage = () => {
    navigate('/'); 
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <header className="flex justify-between items-center mb-16">
          <div className="text-3xl lg:text-4xl font-bold tracking-tight cursor-pointer hover:text-pink-200 transition-colors duration-300" onClick={navigateToLandingPage}>GlassyUI</div>
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 ${getGlassyClasses()} px-4 py-2 hover:bg-white/20 transition-colors duration-300`}
            >
              <Star size={18} />
              <span className="text-sm font-medium">Star on GitHub</span>
            </a>
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {isMenuOpen && (
          <div className="md:hidden mb-8">
            <a 
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center space-x-2 ${getGlassyClasses()} px-4 py-2 hover:bg-white/20 transition-colors duration-300 w-full`}
            >
              <Star size={18} />
              <span className="text-sm font-medium">Star on GitHub</span>
            </a>
          </div>
        )}

        <main>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
            Glassmorphic Components
          </h1>
          <p className="text-lg lg:text-xl mb-12 max-w-2xl leading-relaxed">
            Elevate your UI with our collection of beautifully crafted, glassmorphic components. 
            Perfect for creating modern, sleek interfaces with depth and style.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ComponentCard 
              title="Buttons"
              description="Sleek, customizable buttons with glassmorphic styling."
              icon={<Box size={24} />}
              onClick={() => navigate('/button-details')}
            >
              <div className="flex space-x-2 mt-4">
                <button className={`${getGlassyClasses()} px-4 py-2 hover:bg-white/20`}>
                  Click me
                </button>
                <button className={`${getGlassyClasses()} px-4 py-2 bg-white/20 hover:bg-white/30`}>
                  Accent
                </button>
              </div>
            </ComponentCard>
            
            <ComponentCard 
              title="Inputs"
              description="Elegant input fields with a glass-like appearance."
              icon={<Type size={24} />}
              onClick={() => navigate('/input-details')}
            >
              <input
                type="text"
                placeholder="Type here..."
                className={`${getGlassyClasses()} w-full px-4 py-2 mt-4 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50`}
              />
            </ComponentCard>
            
            <ComponentCard 
              title="Cards"
              description="Versatile content containers with a frosted glass effect."
              icon={<Layout size={24} />}
              onClick={() => navigate('/card-details')}
            >
              <div className={`${getGlassyClasses()} p-4 mt-4`}>
                <h4 className="font-semibold">Card Title</h4>
                <p className="text-sm opacity-80">Card content goes here.</p>
              </div>
            </ComponentCard>
            
            <ComponentCard 
              title="Progress Bars"
              description="Stylish progress indicators with a glass-like finish."
              icon={<Sliders size={24} />}
              onClick={() => navigate('/progress-bar-details')}
            >
              <div className={`${getGlassyClasses()} w-full h-4 mt-4`}>
                <div className="bg-white/30 h-full rounded-2xl" style={{ width: '60%' }}></div>
              </div>
            </ComponentCard>
            
            <ComponentCard 
              title="Modals"
              description="Eye-catching dialog boxes with glassmorphism effects."
              icon={<MessageSquare size={24} />}
              onClick={() => navigate('/modal-details')}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); alert('Modal would open here'); }} 
                className={`${getGlassyClasses()} px-4 py-2 mt-4 hover:bg-white/20`}
              >
                Open Modal
              </button>
            </ComponentCard>
            
            <ComponentCard 
              title="Navigation"
              description="Sleek navigation components with a frosted glass look."
              icon={<ArrowRight size={24} />}
              onClick={() => navigate('/navigation-details')}
            >
              <nav className={`${getGlassyClasses()} flex justify-around mt-4 py-2`}>
                <a href="#" className="hover:bg-white/20 px-2 py-1 rounded">Home</a>
                <a href="#" className="hover:bg-white/20 px-2 py-1 rounded">About</a>
                <a href="#" className="hover:bg-white/20 px-2 py-1 rounded">Contact</a>
              </nav>
            </ComponentCard>

            <ComponentCard 
              title="Popups"
              description="Attention-grabbing popup notifications with glassmorphic styling."
              icon={<MessageSquare size={24} />}
              onClick={() => navigate('/popup-details')}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setIsPopupOpen(true); }} 
                className={`${getGlassyClasses()} px-4 py-2 mt-4 hover:bg-white/20`}
              >
                Show Popup
              </button>
              {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setIsPopupOpen(false)}>
                  <div className={`${getGlassyClasses()} p-6 max-w-sm mx-auto`} onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-xl font-bold mb-2">Popup Title</h3>
                    <p className="mb-4">This is a sample popup with glassmorphism effect.</p>
                    <button 
                      onClick={() => setIsPopupOpen(false)}
                      className={`${getGlassyClasses()} px-4 py-2 hover:bg-white/20`}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </ComponentCard>

            <ComponentCard 
              title="Textarea"
              description="Multi-line input fields with elegant glassmorphic design."
              icon={<AlignLeft size={24} />}
              onClick={() => navigate('/textarea-details')}
            >
              <textarea
                placeholder="Enter your message..."
                className={`${getGlassyClasses()} w-full px-4 py-2 mt-4 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none`}
                rows={3}
              />
            </ComponentCard>
          </div>
        </main>
      </div>
    </div>
  );
};

const ComponentCard: React.FC<{ 
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  children?: React.ReactNode;
}> = ({ title, description, icon, onClick, children }) => {
  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300';
  };

  return (
    <div 
      className={`${getGlassyClasses()} p-6 flex flex-col h-full cursor-pointer group transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-white/20 rounded-lg mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-sm opacity-80 mb-4 flex-grow">{description}</p>
      {children}
      <div className="flex items-center text-sm font-medium text-pink-200 mt-4">
        <span>Learn more</span>
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  );
};

export default GlassyUIComponentsPage;