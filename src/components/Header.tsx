import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav style={navStyle}>
      <h1 className='text-white text-[20px] font-bold'>
        <span className='text-blue-400'>Glass</span>UI
      </h1>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link
            to='/'
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          >
            Home
          </Link>
        </li>
        <li style={liStyle}>
          <Link
            to='/donate'
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          >
            Donate
          </Link>
        </li>
        <li style={liStyle}>
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
  backgroundColor: '#2b303c',
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
