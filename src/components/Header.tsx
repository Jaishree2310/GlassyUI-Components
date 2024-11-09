import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Header: React.FC = () => {
  useEffect(() => {
    // GSAP animation for the navbar
    const tl = gsap.timeline();
    tl.fromTo(
      '.navbar-item', // Targeting elements with this class
      {
        y: -100, // Initial position (from)
        opacity: 0, // Initial opacity (from)
      },
      {
        y: 0, // Final position (to)
        opacity: 1, // Final opacity (to)
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.5, // Stagger for smooth effect
      },
    );

    return () => {
      // Cleanup GSAP animations
      tl.kill();
    };
  }, []);

  return (
    <nav style={navStyle}> 
      <div className='flex items-center space-x-2'>
      <Link to='/'> {/* This will redirect to the home page */}
        <img
          src='../glassy logo.jpeg'
          alt='Glass UI Logo'
          className='h-8 w-8' // Adjust size as needed
        />
         </Link>
         <Link to='/'>
        <h1
          className={`${darkMode ? 'text-white' : 'text-black'} text-[20px] font-bold`}
        >
          <span className='text-blue-400'>Glass</span>UI
        </h1>
        </Link>
      </div> 
      <ul style={ulStyle}>
        <li style={liStyle} className='navbar-item'>
          <Link
            to='/'
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          >
            Home
          </Link>
        </li>
        <li style={liStyle} className='navbar-item'>
          <Link
            to='/donate'
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          >
            Donate
          </Link>
        </li>
        <li style={liStyle} className='navbar-item'>
          <Link
            to='/about'
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
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

const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
};

export default Header;
