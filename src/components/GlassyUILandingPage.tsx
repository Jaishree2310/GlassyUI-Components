import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const GlassyUILandingPage: React.FC = () => {
  
  const githubRepoUrl = "https://github.com/Jaishree2310/GlassyUI-Components";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-mono relative overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Grid background */}
      <div 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <header className="w-full flex justify-between items-center mb-8">
          <div className="text-xl font-bold text-white">GlassyUI</div>
          <a 
            href={githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-white hover:text-yellow-300 transition-colors duration-300"
          >
            <Star size={16} />
            <span>Star the repo</span>
          </a>
        </header>

        <main className="text-center p-8 rounded-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 shadow-lg border border-white border-opacity-20 relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-20">
          {/* Left icons */}
          <div className="absolute left-4 top-1/4 transform -translate-y-1/2">
            <GlassyIcon />
          </div>
          <div className="absolute left-4 bottom-1/4 transform translate-y-1/2">
            <GlassyIcon />
          </div>
          
          {/* Right icons */}
          <div className="absolute right-4 top-1/4 transform -translate-y-1/2">
            <GlassyIcon />
          </div>
          <div className="absolute right-4 bottom-1/4 transform translate-y-1/2">
            <GlassyIcon />
          </div>

          <h1 className="text-6xl font-bold mb-2 text-white">Glassy UI</h1>
          <p className="text-xl mb-6 text-white">A sleek glassmorphism UI library.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/components">
              <GlassmorphismButton>
                Explore components
              </GlassmorphismButton>
            </Link>
            <GlassmorphismButton 
              variant="secondary"
              as="a"
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </GlassmorphismButton>
          </div>
        </main>
      </div>
    </div>
  );
};

const GlassmorphismButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}> = ({ children, variant = 'primary', as = 'button', ...props }) => {
  const className = `
    px-6 py-3 rounded-full text-white font-semibold
    backdrop-filter backdrop-blur-sm bg-opacity-20 border border-white border-opacity-20
    transition-all duration-300 ease-in-out
    hover:bg-opacity-30 hover:shadow-lg hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
    ${variant === 'primary' ? 'bg-blue-500' : 'bg-purple-500'}
  `;

  return React.createElement(
    as,
    { className, ...props },
    children
  );
};

const GlassyIcon: React.FC = () => (
  <div className="w-12 h-12 relative">
    <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg transform rotate-45"></div>
    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg transform -rotate-45"></div>
  </div>
);

export default GlassyUILandingPage;