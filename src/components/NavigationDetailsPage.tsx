import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Menu, Home } from 'lucide-react';

import BackToTopButton from './BackToTop';

const getGlassyClasses = (darkMode: boolean, opacity = 20) => {
  return `backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} bg-opacity-${opacity} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
};

const NavigationDetailsPage: React.FC<{ darkMode: boolean }> = ({
  darkMode,
}) => {
  const navigate = useNavigate();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('Home');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const CopyButton: React.FC<{
    text: string;
    codeKey: string;
    darkMode: boolean;
  }> = ({ text, codeKey, darkMode }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses(darkMode)} p-2 ${darkMode ? 'text-white hover:bg-white/40' : 'text-black hover:bg-black/30'} transition-all duration-300 z-10`}
      title='Copy to clipboard'
    >
      {copiedText ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className={darkMode ? 'text-gray-100' : 'text-black'} />
      )}
    </button>
  );

  const handleBackToComponents = () => {
    navigate('/components');
  };

  function getNavigationCode() {
    const selectedClass = (item: string) => {
      return selected === item ? 'bg-pink-300 text-pink-600' : '';
    };

    return `
  <nav className="${getGlassyClasses(darkMode)} flex justify-around flex-col md:flex-row mt-4 py-2">
    <button 
      className="md:hidden flex items-center justify-start p-3"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <Menu size={20} className="mr-2" />
    </button>
    <div className="${`w-full md:w-auto ${menuOpen ? 'block' : 'hidden'} md:block`}">
      <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 p-3 m-2">
        <li>
          <a href="#home" className="hover:bg-white/20 hover:text-pink-600 rounded flex justify-center ">
            <button onClick={() => setSelected('Home')} className="hover:text-pink-600 px-2 py-1 rounded ${selectedClass('Home')}">
              Home
            </button>
          </a>
        </li>
        <li>
          <a href="#about" className="hover:bg-white/20 hover:text-pink-600 rounded flex justify-center">
            <button onClick={() => setSelected('About')} className="hover:text-pink-600 px-2 py-1 rounded ${selectedClass('About')}">
              About
            </button>
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:bg-white/20 hover:text-pink-600 rounded flex justify-center">
            <button onClick={() => setSelected('Contact')} className="hover:text-pink-600 px-2 py-1 rounded ${selectedClass('Contact')}">
              Contact
            </button>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  `;
  }

  const navigationCode = getNavigationCode();

  return (
    <div
      className={`min-h-screen p-8 font-sans bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'} relative`}
    >
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={handleBackToComponents}
          className={`mb-8 flex items-center ${getGlassyClasses(darkMode)} px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'} transition-all duration-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1
          className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Navigation Component
        </h1>
        <p
          className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          A customizable, glassmorphism styled Navigation component.
        </p>

        {/* Basic Usage */}
        <section className={`${getGlassyClasses(darkMode)} p-6 mb-14`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Basic Usage
          </h2>
          <pre
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
          >
            {navigationCode}
          </pre>
          <CopyButton
            text={navigationCode}
            codeKey='basicUsage'
            darkMode={darkMode}
          />
        </section>

        {/* Props */}
        <section className={`${getGlassyClasses(darkMode)} p-6 mb-14`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Props
          </h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-20`}
                >
                  <th className='text-left p-2'> Prop</th>
                  <th className='text-left p-2'>Type</th>
                  <th className='text-left p-2'>Default</th>
                  <th className='text-left p-2'>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2'>className</td>
                  <td className='p-2'>string</td>
                  <td className='p-2'>''</td>
                  <td className='p-2'>Additional CSS classes</td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className='p-2'>children</td>
                  <td className='p-2'>ReactNode</td>
                  <td className='p-2'>-</td>
                  <td className='p-2'>Navigation links</td>
                </tr>
                <tr>
                  <td className='p-2'>onClick</td>
                  <td className='p-2'>function</td>
                  <td className='p-2'>-</td>
                  <td className='p-2'>
                    Function to handle click events on navigation items
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className='p-2'>menuOpen</td>
                  <td className='p-2'>boolean</td>
                  <td className='p-2'>false</td>
                  <td className='p-2'>
                    Whether the navigation menu is open or not shown when open
                    in small screen devices
                  </td>
                </tr>
                <tr>
                  <td className='p-2'>selected</td>
                  <td className='p-2'>string</td>
                  <td className='p-2'>''</td>
                  <td className='p-2'>
                    The currently selected navigation item
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className='p-2'>onSelect</td>
                  <td className='p-2'>function</td>
                  <td className='p-2'>-</td>
                  <td className='p-2'>
                    Function to handle selection of navigation items
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation Example */}
        <section className={`${getGlassyClasses(darkMode)} p-6 mb-14`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Navigation Example
          </h2>
          <div className={`${getGlassyClasses(true, 10)} p-6 mb-6`}>
            <nav
              className={`${getGlassyClasses(true)} flex justify-around flex-col md:flex-row mt-4 py-2`}
            >
              <button
                className='md:hidden flex items-center justify-start p-3'
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu size={20} className='mr-2' />
              </button>
              <div
                className={`w-full md:w-auto ${menuOpen ? 'block' : 'hidden'} md:block`}
              >
                <ul className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 p-3 m-2'>
                  <a
                    href='#home'
                    className='hover:bg-white/50 hover:text-pink-600 rounded flex justify-center '
                  >
                    <button
                      onClick={() => setSelected('Home')}
                      className={` hover:text-pink-600 px-2 py-1 rounded ${selected === 'Home' ? 'bg-pink-300 text-pink-600' : ''}`}
                    >
                      Home
                    </button>
                  </a>
                  <a
                    href='#about'
                    className='hover:bg-white/50 hover:text-pink-600 rounded flex justify-center'
                  >
                    <button
                      onClick={() => setSelected('About')}
                      className={` hover:text-pink-600 px-2 py-1 rounded ${selected === 'About' ? 'bg-pink-300 text-pink-600' : ''}`}
                    >
                      About
                    </button>
                  </a>
                  <a
                    href='#contact'
                    className='hover:bg-white/50 hover:text-pink-600 rounded flex justify-center'
                  >
                    <button
                      onClick={() => setSelected('Contact')}
                      className={` hover:text-pink-600 px-2 py-1 rounded ${selected === 'Contact' ? 'bg-pink-300 text-pink-600' : ''}`}
                    >
                      Contact
                    </button>
                  </a>
                </ul>
              </div>
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NavigationDetailsPage;
