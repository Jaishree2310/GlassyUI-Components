import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../login/contexts/authContext/index';
import UserAccount from '../login/UserAccount';
import { useTheme } from '../contexts/ThemeContext';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.navbar-item',
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.05,
        clearProps: 'all',
      },
    );

    return () => {
      tl.kill();
    };
  }, []);

  const { currentUser, userLoggedIn } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className='fixed top-0 left-0 right-0 z-[10000] backdrop-blur-md bg-black/40 border-b border-white/10 shadow-lg px-6 md:px-12 py-4'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link to='/' className='flex items-center no-underline'>
          <h1 className='text-white text-2xl font-bold m-0'>
            <span className='text-blue-400'>Glass</span>UI
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className='hidden lg:flex items-center gap-8 list-none m-0 p-0'>
          <li className='navbar-item'>
            <Link
              to='/'
              className='text-white no-underline font-medium hover:text-yellow-300 transition-colors duration-200'
            >
              Home
            </Link>
          </li>
          <li className='navbar-item'>
            <Link
              to='/donate'
              className='text-white no-underline font-medium hover:text-yellow-300 transition-colors duration-200'
            >
              Sponsor
            </Link>
          </li>
          <li className='navbar-item'>
            <Link
              to='/about'
              className='text-white no-underline font-medium hover:text-yellow-300 transition-colors duration-200'
            >
              About Us
            </Link>
          </li>
          <li className='navbar-item'>
            <Link
              to='/contact'
              className='text-white no-underline font-medium hover:text-yellow-300 transition-colors duration-200'
            >
              Contact Us
            </Link>
          </li>
          <li className='navbar-item'>
            <Link
              to='/stories'
              className='text-white no-underline font-medium hover:text-yellow-300 transition-colors duration-200'
            >
              Stories
            </Link>
          </li>
        </ul>

        {/* Actions (Theme Toggle & Auth) */}
        <div className='flex items-center gap-4'>
          <button
            onClick={toggleTheme}
            className='navbar-item p-2 bg-white/10 hover:bg-white/20 text-yellow-300 rounded-lg transition-all duration-200 border border-white/10'
            title='Toggle dark/light mode'
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <div className='hidden lg:block'>
            {userLoggedIn && currentUser ? (
              <UserAccount
                email={currentUser.email ?? ''}
                username={currentUser.displayName ?? ''}
              />
            ) : (
              <Link
                to='/signin'
                className='navbar-item text-white no-underline font-medium hover:text-yellow-300 transition-colors duration-200'
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className='lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors'
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-white/10 py-6 px-6 shadow-2xl animate-fade-in'>
          <ul className='flex flex-col gap-6 list-none m-0 p-0 text-center'>
            <li>
              <Link
                to='/'
                className='text-white text-lg no-underline font-medium hover:text-yellow-300'
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/donate'
                className='text-white text-lg no-underline font-medium hover:text-yellow-300'
                onClick={toggleMenu}
              >
                Sponsor
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='text-white text-lg no-underline font-medium hover:text-yellow-300'
                onClick={toggleMenu}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='text-white text-lg no-underline font-medium hover:text-yellow-300'
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to='/stories'
                className='text-white text-lg no-underline font-medium hover:text-yellow-300'
                onClick={toggleMenu}
              >
                Stories
              </Link>
            </li>
            <li className='border-t border-white/10 pt-6'>
              {userLoggedIn && currentUser ? (
                <div onClick={toggleMenu}>
                  <UserAccount
                    email={currentUser.email ?? ''}
                    username={currentUser.displayName ?? ''}
                  />
                </div>
              ) : (
                <Link
                  to='/signin'
                  className='text-white text-lg no-underline font-medium hover:text-yellow-300'
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
