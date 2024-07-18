
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

type Theme = 'pink' | 'brown' | 'white' | 'black';

const GlassyUIComponentsPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [theme, setTheme] = useState<Theme>('pink');
  const githubRepoUrl = "https://github.com/Jaishree2310/GlassyUI-Components";

  const getThemeClasses = () => {
    switch (theme) {
      case 'white':
        return 'bg-gradient-to-br from-gray-100 to-white text-gray-800';
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
    switch (theme) {
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

  return (
    <div className={`min-h-screen p-8 font-mono transition-colors duration-300 ${getThemeClasses()}`}>
      <header className="flex justify-between items-center mb-12">
        <div className="text-2xl font-bold flex items-center">
          <span className="mr-2">🔷</span> GlassyUI
        </div>
        <a 
          href={githubRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-2 text-sm hover:text-blue-400 transition-colors duration-300 ${getGlassyClasses()} px-4 py-2`}
        >
          <Star size={16} />
          <span>Star the repo</span>
        </a>
      </header>

      <main className="space-y-8">
        <h1 className="text-6xl font-bold mb-4">Components</h1>
        <p className="text-xl mb-8">Each component is built to bring glassy charm to your modern web applications.</p>

        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <img src="/api/placeholder/80/80" alt="Mascot" className="rounded-full shadow-md" />
            <div className="absolute -top-2 -right-2 bg-pink-400 text-white p-1 rounded-full shadow-sm">
              <span role="img" aria-label="Heart">❤️</span>
            </div>
          </div>
          <div className={`${getGlassyClasses()} p-3`}>
            Click me to setup your project
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <span>themes:</span>
          {(['pink', 'brown', 'white', 'black'] as Theme[]).map((color) => (
            <button
              key={color}
              onClick={() => setTheme(color)}
              className={`w-8 h-8 rounded-full border-2 ${color === theme ? 'ring-2 ring-offset-2 ring-opacity-50' : ''} transition-all duration-300`}
              style={{ backgroundColor: color === 'white' ? '#f3f4f6' : color, borderColor: color === 'white' ? '#000' : 'white' }}
            ></button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ComponentCard title="Button" description="Customizable, pixel-art styled buttons">
            <div className="flex space-x-2">
              <button className={`px-4 py-2 ${getGlassyClasses()}`}>
                Click me
              </button>
              <button className={`px-4 py-2 ${getGlassyClasses()} bg-purple-500 bg-opacity-50`}>
                Accent
              </button>
            </div>
          </ComponentCard>

          <ComponentCard title="Input" description="Glassy-styled input fields for user">
            <input
              type="text"
              placeholder="Type here..."
              className={`w-full px-3 py-2 ${getGlassyClasses()} focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-current placeholder-opacity-50`}
            />
          </ComponentCard>

          <ComponentCard title="Card" description="Pixel-perfect content containers">
            <div className={`p-4 ${getGlassyClasses()}`}>
              Card Content
            </div>
          </ComponentCard>

          <ComponentCard title="ProgressBar" description="Nostalgic progress indicators">
            <div className={`w-full h-4 ${getGlassyClasses()} overflow-hidden`}>
              <div className={`bg-purple-500 h-full ${getGlassyClasses()} bg-opacity-50`} style={{ width: '60%' }}></div>
            </div>
          </ComponentCard>

          <ComponentCard title="Textarea" description="Multi-line input with Glassy charm">
            <textarea
              placeholder="Enter multiple lines..."
              className={`w-full px-3 py-2 ${getGlassyClasses()} focus:ring-2 focus:ring-opacity-50 focus:outline-none placeholder-current placeholder-opacity-50`}
              rows={3}
            ></textarea>
          </ComponentCard>

          <ComponentCard title="Popup" description="Glassy-inspired modal dialogs">
            <button
              onClick={() => setShowPopup(true)}
              className={`px-4 py-2 ${getGlassyClasses()} bg-blue-500 bg-opacity-50`}
            >
              Open Popup
            </button>
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
                <div className={`${getGlassyClasses()} p-6 max-w-sm mx-auto`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Popup</h3>
                    <button onClick={() => setShowPopup(false)} className="text-current hover:text-opacity-75">✕</button>
                  </div>
                  <p>Popup content goes here</p>
                </div>
              </div>
            )}
          </ComponentCard>
        </div>
      </main>
    </div>
  );
};

const ComponentCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
  <div className="relative overflow-hidden group">
    <div className="absolute inset-0 bg-current opacity-5 rounded-xl"></div>
    <div className="relative border border-current border-opacity-30 rounded-xl p-6 shadow-xl transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:translate-y-[-5px] h-80 flex flex-col overflow-hidden">
      <div className="glassy-shine"></div>
      <h3 className="text-2xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="mb-4 opacity-80 relative z-10">{description}</p>
      <div className="mt-auto relative z-10">
        {children}
      </div>
    </div>
  </div>
);

export default GlassyUIComponentsPage;