import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NotFoundPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/');
  };

  const getGlassyClasses = () => {
    return `backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  };

  return (
    <div
      className={`min-h-screen font-sans bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'} flex items-center justify-center px-4 py-8 lg:py-12`}
    >
      <div className={`${getGlassyClasses()} p-6 max-w-md w-full text-center`}>
        <h1
          className={`text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-white via-pink-100 to-pink-200' : 'from-black via-black/50 to-pink-300'}`}
        >
          404 - OOPs !
        </h1>
        <p className='text-lg lg:text-xl mb-8'>
          Sorry, we couldn't find the page you are looking for.
        </p>
        <button
          onClick={navigateToLandingPage}
          className={`flex items-center justify-center space-x-2 ${getGlassyClasses()} px-4 py-2 mx-auto hover:bg-white/20 transition-colors duration-300`}
        >
          <span>Go to Home</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
