import React, { useState, useEffect } from 'react';
import { Star, Code, Package, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './GlassyUILandingPage.css'; // Create this CSS file in the same directory
import gsap from 'gsap';
import Footer from './Footer';

const GlassyUILandingPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const githubRepoUrl = 'https://github.com/Jaishree2310/GlassyUI-Components';

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.homeGSap',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'sine.inOut' },
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center pt-10 font-mono relative overflow-hidden bg-gradient-to-br ${darkMode ? 'from-gray-800 via-gray-900 to-black' : 'from-white via-gray-100 to-gray-200'}`}
    >
      <div
        className='absolute inset-0 w-full h-full opacity-20'
        style={{
          backgroundImage: darkMode
            ? `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `
            : ` linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className='homeGSap relative z-10 w-full max-w-4xl'>
        <header className='w-full flex justify-between items-center mb-4'>
          {' '}
          {/* Adjusted mb-8 to mb-4 */}
          <div
            className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}
          >
            <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>
              Glassy
            </span>
            UI
          </div>
          <a
            href={githubRepoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-white' : 'text-black'} hover:text-yellow-300 transition-colors duration-300`}
          >
            <Star size={18} />
            <span>Star the repo</span>
          </a>
        </header>

        <main
          className={`fade-in text-center p-12 rounded-xl backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-lg border ${darkMode ? 'border-white bg-white' : 'border-black bg-gray-100'} border-opacity-20 relative transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ marginTop: '20px' }} // Added marginTop for spacing
        >
          <h1
            className={`text-7xl mb-4 font-bold ${darkMode ? 'text-white' : 'text-black'}`}
          >
            <span className='animated-glossy-text'>Glassy UI</span>
          </h1>
          <p
            className={`text-2xl mb-8 ${darkMode ? 'text-white' : 'text-black'}`}
          >
            A sleek glassmorphism UI library for modern web applications.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
            <FeatureCard
              icon={<Code size={24} />}
              title='Easy to Use'
              description='Simple API for quick integration'
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Package size={24} />}
              title='Customizable'
              description='Tailor components to your needs'
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title='Performant'
              description='Optimized for smooth interactions'
              darkMode={darkMode}
            />
          </div>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <Link to='/components'>
              <GlassmorphismButton darkMode={darkMode}>
                Explore Components
              </GlassmorphismButton>
            </Link>
            <Link to='/contributors'>
              <GlassmorphismButton variant='secondary' darkMode={darkMode}>
                Our Contributors
              </GlassmorphismButton>
            </Link>
            <GlassmorphismButton
              variant='secondary'
              as='a'
              href={githubRepoUrl}
              target='_blank'
              rel='noopener noreferrer'
              darkMode={darkMode}
            >
              GitHub Repository
            </GlassmorphismButton>
          </div>
        </main>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  darkMode: boolean;
}> = ({ icon, title, description, darkMode }) => (
  <div
    className={`p-6 rounded-lg backdrop-filter backdrop-blur-sm ${darkMode ? 'bg-white border-white' : 'bg-black/10 border-black/10'} bg-opacity-5 border border-opacity-10 transition-all duration-300 hover:bg-opacity-10 hover:scale-105`}
  >
    <div className={`${darkMode ? 'text-blue-400' : 'text-blue-500'} mb-4`}>
      {icon}
    </div>
    <h3
      className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-2`}
    >
      {title}
    </h3>
    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
      {description}
    </p>
  </div>
);

const GlassmorphismButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  darkMode: boolean;
}> = ({ children, darkMode, variant = 'primary', as = 'button', ...props }) => {
  const className = `
    px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out
    ${darkMode ? 'text-white border-white focus:ring-white' : 'text-black border-black focus:ring-black'}
    backdrop-filter backdrop-blur-sm bg-opacity-20 border border-opacity-20
    hover:bg-opacity-30 hover:shadow-lg hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-opacity-50
    ${variant === 'primary' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'}
  `;

  return React.createElement(as, { className, ...props }, children);
};

export default GlassyUILandingPage;
