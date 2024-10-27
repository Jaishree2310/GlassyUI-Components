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
    <nav style={navStyle}>
      <ul style={ulStyle}>
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
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`transition-colors duration-300 focus:outline-none ${darkMode ? 'text-white hover:text-yellow-300' : 'text-gray-900 hover:text-yellow-500'}`}
        style={darkModeToggleStyle}
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </nav>
  );
};

// Inline styles for the nav bar
const ulStyle: React.CSSProperties = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'space-around',
  flex: 1, // To make space for the dark mode button
};

const liStyle: React.CSSProperties = {
  margin: '0 10px',
};

const darkModeToggleStyle: React.CSSProperties = {
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  marginLeft: '20px',
  marginRight: '20px',
};

export default Header;
