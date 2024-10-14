import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav style={navStyle}>
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
            to='/login'
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')} // Change to yellow on hover
            onMouseLeave={e => (e.currentTarget.style.color = 'white')} // Change back to white when not hovered
          >
            Login
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
    </nav>
  );
};

// Inline styles for the nav bar
const navStyle: React.CSSProperties = {
  backgroundColor: '#2b303c',
  padding: '10px',
};

const ulStyle: React.CSSProperties = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'space-around',
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
