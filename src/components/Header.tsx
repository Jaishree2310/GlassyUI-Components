import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Sun, Moon } from 'react-feather';

const Header: React.FC<{ darkMode: boolean; toggleDarkMode: () => void }> = ({
  darkMode,
  toggleDarkMode,
}) => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.navbar-item',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.inOut', stagger: 0.5 },
    );

    return () => {
      tl.kill(); // Cleanup GSAP animation
    };
  }, []);

  // Conditional styles based on darkMode
  const navStyle: React.CSSProperties = {
    backgroundColor: darkMode ? '#1f2937' : '#efefef', // Darker color for dark mode
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle: React.CSSProperties = {
    color: darkMode ? 'white' : 'black', // White text in dark mode, black otherwise
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };

  return (
    <nav style={navStyle} className='flex justify-center items-center'>
      <h1
        className={`${darkMode ? 'text-white' : 'text-black'} text-[20px] font-bold`}
      >
        <span className='text-blue-400'>Glassy</span>UI
      </h1>
      <ul className='text-white flex gap-12 justify-center items-center '>
        <li style={liStyle} className='navbar-item'>
          <Link
            to='/'
            style={linkStyle}
            onMouseEnter={e =>
              (e.currentTarget.style.color = darkMode ? '#fde047' : '#1f2937')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.color = darkMode ? 'white' : 'black')
            }
          >
            Home
          </Link>
        </li>
        <li style={liStyle} className='navbar-item'>
          <Link
            to='/donate'
            style={linkStyle}
            onMouseEnter={e =>
              (e.currentTarget.style.color = darkMode ? '#fde047' : '#1f2937')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.color = darkMode ? 'white' : 'black')
            }
          >
            Donate
          </Link>
        </li>
        <li style={liStyle} className='navbar-item'>
          <Link
            to='/about'
            style={linkStyle}
            onMouseEnter={e =>
              (e.currentTarget.style.color = darkMode ? '#fde047' : '#1f2937')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.color = darkMode ? 'white' : 'black')
            }
          >
            About Us
          </Link>
        </li>
      </ul>
      <ul className='text-white flex gap-12 justify-center items-center '>
        <li
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
          onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          className='cursor-pointer'
        >
          Login
        </li>
        <li
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
          onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          className='cursor-pointer'
        >
          Signup
        </li>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className={`transition-colors duration-300 focus:outline-none ${darkMode ? 'text-white hover:text-yellow-300' : 'text-gray-900 hover:text-yellow-500'}`}
          style={darkModeToggleStyle}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </ul>
    </nav>
  );
};

// Inline styles for the nav bar
const navStyle: React.CSSProperties = {
  //backgroundColor: '#2b303c',
  padding: '10px',
  position: 'fixed', // Fix the navbar
  top: '0', // Align it to the top of the page
  width: '100%', // Ensure it spans the width of the page
  zIndex: 1000, // Ensure it stays above other elements
  backdropFilter: 'blur(10px)', // Apply the blur effect
  WebkitBackdropFilter: 'blur(10px)', // For Safari compatibility
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for better contrast
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const ulStyle: React.CSSProperties = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '50px',
  gap: '20px',
};

const liStyle: React.CSSProperties = {
  margin: '0 10px',
};

const darkModeToggleStyle: React.CSSProperties = {
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  marginLeft: '0px',
  marginRight: '10px',
};

export default Header;
