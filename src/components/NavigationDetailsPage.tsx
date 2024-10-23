import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Menu, Home } from 'lucide-react';

import BackToTopButton from './BackToTop';

const getGlassyClasses = (opacity = 20) => {
  return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} 
border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
};

const NavigationDetailsPage: React.FC = () => {
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

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
      title='Copy to clipboard'
    >
      {copiedText ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className='text-gray-800' />
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

    return `<Navigation 
  items={[
      { label: 'Home', href: '/', className: '${selectedClass('Home')}' },
      { label: 'About', href: '/about', className: '${selectedClass('About')}' },
      { label: 'Contact', href: '/contact', className: '${selectedClass('Contact')}' },
  ]}
  initialSelected='Home'        
/>`;
  }

  const navigationCode = getNavigationCode();

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={handleBackToComponents}
          className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-6xl font-bold mb-8 text-white'>
          Navigation Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A customizable, glassmorphism styled Navigation component.
        </p>

        {/* Basic Usage */}
        <section className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-gray-100'>Basic Usage</h2>
          <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto relative'>
            {navigationCode}
          </pre>
          <CopyButton text={navigationCode} codeKey='basicUsage' />
        </section>

        {/* Props */}
        <section className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-gray-100'>Props</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-white bg-opacity-20'>
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
                <tr className='bg-white bg-opacity-10'>
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
                <tr className='bg-white bg-opacity-10'>
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
                <tr className='bg-white bg-opacity-10'>
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
        <section className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-gray-100'>
            Navigation Example
          </h2>
          <div className={`${getGlassyClasses(10)} p-6 mb-6`}>
            <nav
              className={`${getGlassyClasses()} flex justify-around flex-col md:flex-row mt-4 py-2`}
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
