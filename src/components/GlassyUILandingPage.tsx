import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const GlassyUILandingPage: React.FC = () => {
  const githubRepoUrl = 'https://github.com/Jaishree2310/GlassyUI-Components';

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 font-mono relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black'>
      <div
        className='absolute inset-0 w-full h-full opacity-20'
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      <div className='relative z-10 w-full max-w-4xl'>
        <header className='w-full flex justify-between items-center mb-8'>
          <div className='text-xl font-bold text-white'>GlassyUI</div>
          <a
            href={githubRepoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2 text-sm text-white hover:text-yellow-300 transition-colors duration-300'
          >
            <Star size={18} />
            <span>Star the repo</span>
          </a>
        </header>

        <main className='fade-in text-center p-8 rounded-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 shadow-lg border border-white border-opacity-20 relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-20'>
          <h1 className='text-6xl font-bold mb-2 text-white'>Glassy UI</h1>
          <p className='text-xl mb-6 text-white'>
            A sleek glassmorphism UI library.
          </p>
          <div className='flex justify-center space-x-4'>
            <Link to='/components'>
              <GlassmorphismButton>Explore components</GlassmorphismButton>
            </Link>
            <Link to='/contributors'>
              <GlassmorphismButton variant='secondary'>
                Our Contributors
              </GlassmorphismButton>
            </Link>
            <GlassmorphismButton
              variant='secondary'
              as='a'
              href={githubRepoUrl}
              target='_blank'
              rel='noopener noreferrer'
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
    bg-indigo-600 hover:bg-indigo-700 text-white
    ${variant === 'primary' ? 'bg-blue-500' : 'bg-purple-500'}
  `;

  return React.createElement(as, { className, ...props }, children);
};

export default GlassyUILandingPage;
