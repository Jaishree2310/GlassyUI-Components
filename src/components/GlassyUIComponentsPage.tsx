// import React, { useState } from 'react';
// import { Star, ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const GlassyUIComponentsPage: React.FC = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const githubRepoUrl = "https://github.com/Jaishree2310/GlassyUI-Components";
//   const navigate = useNavigate();

//   const getGlassyClasses = () => {
//     return 'backdrop-filter backdrop-blur-lg bg-opacity-10 border border-opacity-20 rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] border-white/20 text-white';
//   };

//   return (
//     <div className="min-h-screen p-8 font-sans relative overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] filter blur-3xl opacity-50"></div>

//       {/* Background blobs */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute top-[60%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
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
//             <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]">Components</h1>
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
//                 <button className={`px-4 py-2 ${getGlassyClasses()} hover:bg-opacity-20`}>
//                   Click me
//                 </button>
//                 <button className={`px-4 py-2 ${getGlassyClasses()} bg-opacity-30 hover:bg-opacity-40`}>
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
//                 className={`w-full px-3 py-2 ${getGlassyClasses()} focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-white placeholder-opacity-50`}
//               />
//             </ComponentCard>

//             <ComponentCard 
//               title="Card" 
//               description="Versatile content containers with a frosted glass effect."
//               onClick={() => navigate('/card-details')}
//               glassyClasses={getGlassyClasses()}
//             >
//               <div className={`p-4 ${getGlassyClasses()}`}>
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
//               <div className={`w-full h-4 ${getGlassyClasses()} overflow-hidden`}>
//                 <div className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] h-full" style={{ width: '60%' }}></div>
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
//                 className={`w-full px-3 py-2 ${getGlassyClasses()} focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-white placeholder-opacity-50`}
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
//                 className={`px-4 py-2 ${getGlassyClasses()} hover:bg-opacity-20`}
//               >
//                 Open Popup
//               </button>
//               {showPopup && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
//                   <div className={`${getGlassyClasses()} p-6 max-w-sm mx-auto`}>
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
//     className={`${glassyClasses} p-6 flex flex-col h-full cursor-pointer group overflow-hidden relative`}
//     onClick={onClick}
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 translate-x-[-100%] group-hover:animate-shine pointer-events-none" />
//     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//       <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-glassy-shine" />
//     </div>
//     <h3 className="text-2xl font-bold mb-2 relative z-10 bg-clip-text bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]">{title}</h3>
//     <p className="mb-4 opacity-80 relative z-10">{description}</p>
//     <div className="mt-auto relative z-10">
//       {children}
//     </div>
//   </div>
// );

// export default GlassyUIComponentsPage;

























// import React, { useState } from 'react';
// import { Star, ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const GlassyUIComponentsPage: React.FC = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const githubRepoUrl = "https://github.com/Jaishree2310/GlassyUI-Components";
//   const navigate = useNavigate();

//   const getGlassyClasses = () => {
//     return 'backdrop-filter backdrop-blur-lg bg-opacity-10 border border-opacity-20 rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-br from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] border-white/20 text-white';
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
//                 <button className={`px-4 py-2 ${getGlassyClasses()} hover:bg-opacity-20`}>
//                   Click me
//                 </button>
//                 <button className={`px-4 py-2 ${getGlassyClasses()} bg-opacity-30 hover:bg-opacity-40`}>
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
//                 className={`w-full px-3 py-2 ${getGlassyClasses()} focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-white placeholder-opacity-50`}
//               />
//             </ComponentCard>

//             <ComponentCard 
//               title="Card" 
//               description="Versatile content containers with a frosted glass effect."
//               onClick={() => navigate('/card-details')}
//               glassyClasses={getGlassyClasses()}
//             >
//               <div className={`p-4 ${getGlassyClasses()}`}>
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
//               <div className={`w-full h-4 ${getGlassyClasses()} overflow-hidden`}>
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
//                 className={`w-full px-3 py-2 ${getGlassyClasses()} focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-white placeholder-opacity-50`}
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
//                 className={`px-4 py-2 ${getGlassyClasses()} hover:bg-opacity-20`}
//               >
//                 Open Popup
//               </button>
//               {showPopup && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
//                   <div className={`${getGlassyClasses()} p-6 max-w-sm mx-auto`}>
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
//     className={`${glassyClasses} p-6 flex flex-col h-full cursor-pointer group overflow-hidden relative`}
//     onClick={onClick}
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 translate-x-[-100%] group-hover:animate-shine pointer-events-none" />
//     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//       <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-glassy-shine" />
//     </div>
//     <h3 className="text-2xl font-bold mb-2 relative z-10 bg-clip-text bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9]">{title}</h3>
//     <p className="mb-4 opacity-80 relative z-10">{description}</p>
//     <div className="mt-auto relative z-10">
//       {children}
//     </div>
//   </div>
// );

// export default GlassyUIComponentsPage;
















import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GlassyUIComponentsPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const githubRepoUrl = "https://github.com/Jaishree2310/GlassyUI-Components";
  const navigate = useNavigate();

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-lg bg-white/20 border border-opacity-30 rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-br from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] border-white/20 text-white'; // Updated for frosted glass effect
  };

  return (
    <div className="min-h-screen p-8 font-sans relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-50"></div>

      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[60%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-white">
        <header className="flex justify-between items-center mb-16">
          <div className="text-3xl font-bold flex items-center">
            <span className="mr-2">🔷</span> GlassyUI
          </div>
          <a 
            href={githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 text-sm ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 transition-colors duration-300`}
          >
            <Star size={16} />
            <span>Star on GitHub</span>
          </a>
        </header>

        <main className="space-y-12">
          <div>
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9]">Components</h1>
            <p className="text-xl mb-8 opacity-80">Elevate your UI with our collection of glassmorphic components.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ComponentCard 
              title="Button" 
              description="Sleek, customizable buttons with glassmorphic styling."
              onClick={() => navigate('/button-details')}
              glassyClasses={getGlassyClasses()}
            >
              <div className="flex space-x-2">
                <button className={`px-4 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg hover:shadow-xl hover:border-white/50 transition-all`}>
                  Click me
                </button>
                <button className={`px-4 py-2 ${getGlassyClasses()} bg-opacity-30 border-2 border-white/30 shadow-lg hover:shadow-xl hover:bg-opacity-40 transition-all`}>
                  Accent
                </button>
              </div>
            </ComponentCard>

            <ComponentCard 
              title="Input" 
              description="Elegant input fields with a glass-like appearance."
              onClick={() => navigate('/input-details')}
              glassyClasses={getGlassyClasses()}
            >
              <input
                type="text"
                placeholder="Type here..."
                className={`w-full px-3 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-white placeholder-opacity-50 hover:border-white/50 transition-all`}
              />
            </ComponentCard>

            <ComponentCard 
              title="Card" 
              description="Versatile content containers with a frosted glass effect."
              onClick={() => navigate('/card-details')}
              glassyClasses={getGlassyClasses()}
            >
              <div className={`p-4 ${getGlassyClasses()} border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}>
                <h4 className="font-bold mb-2">Card Title</h4>
                <p className="opacity-70">This is some sample content for the card.</p>
              </div>
            </ComponentCard>

            <ComponentCard 
              title="ProgressBar" 
              description="Stylish progress indicators with a glass-like finish."
              onClick={() => navigate('/progress-bar-details')}
              glassyClasses={getGlassyClasses()}
            >
              <div className={`w-full h-4 ${getGlassyClasses()} overflow-hidden border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}>
                <div className="bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9] h-full" style={{ width: '60%' }}></div>
              </div>
            </ComponentCard>

            <ComponentCard 
              title="Textarea" 
              description="Multi-line input fields with a sleek glassmorphic design."
              onClick={() => navigate('/textarea-details')}
              glassyClasses={getGlassyClasses()}
            >
              <textarea
                placeholder="Enter multiple lines..."
                className={`w-full px-3 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-white placeholder-opacity-50 hover:border-white/50 transition-all`}
                rows={3}
              ></textarea>
            </ComponentCard>

            <ComponentCard 
              title="Popup" 
              description="Eye-catching modal dialogs with glassmorphism effects."
              onClick={() => navigate('/popup-details')}
              glassyClasses={getGlassyClasses()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(true);
                }}
                className={`px-4 py-2 ${getGlassyClasses()} border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}
              >
                Open Popup
              </button>
              {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
                  <div className={`${getGlassyClasses()} p-6 max-w-sm mx-auto border-2 border-white/30 shadow-lg hover:shadow-xl transition-all`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Popup</h3>
                      <button onClick={() => setShowPopup(false)} className="text-current hover:text-opacity-75">✕</button>
                    </div>
                    <p>This is a sample popup with glassmorphism effect.</p>
                  </div>
                </div>
              )}
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
  children: React.ReactNode; 
  onClick: () => void;
  glassyClasses: string;
}> = ({ title, description, children, onClick, glassyClasses }) => (
  <div 
    className={`${glassyClasses} p-6 flex flex-col h-full cursor-pointer group overflow-hidden relative bg-white/20 border-2 border-white/30 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl`} // Added shadow, border, and hover effects
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 translate-x-[-100%] group-hover:animate-shine pointer-events-none" />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-glassy-shine" />
    </div>
    <h3 className="text-2xl font-bold mb-2 relative z-10 bg-clip-text bg-gradient-to-r from-[#FFB3B3] via-[#D8B0FF] to-[#FFD5B9]">{title}</h3>
    <p className="mb-4 opacity-80 relative z-10">{description}</p>
    <div className="mt-auto relative z-10">
      {children}
    </div>
  </div>
);

export default GlassyUIComponentsPage;
