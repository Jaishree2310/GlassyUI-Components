import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../login/contexts/authContext/index';
import UserAccount from '../login/UserAccount';

const Header: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.navbar-item',
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.5,
      },
    );

    return () => {
      tl.kill();
    };
  }, []);

  const { currentUser, userLoggedIn } = useAuth();

  return (
    <nav style={navStyle}>
      <h1 className='text-white text-[20px] font-bold'>
        <span className='text-blue-400'>Glass</span>UI
      </h1>
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
        <li style={liStyle} className='navbar-item'>
          <Link
            to='/contact'
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          >
            Contact Us
          </Link>
        </li>
      </ul>
      {userLoggedIn && currentUser ? (
        <UserAccount
          email={currentUser.email ?? ''}
          username={currentUser.displayName ?? ''}
        />
      ) : (
        <ul className='text-white flex gap-12 justify-center items-center'>
          <li
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
            className='cursor-pointer'
          >
            <Link
              to='/signin'
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
              onMouseLeave={e => (e.currentTarget.style.color = 'white')}
            >
              Sign in
            </Link>
          </li>
          <li
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
            className='cursor-pointer'
          >
            <Link
              to='/signup'
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
              onMouseLeave={e => (e.currentTarget.style.color = 'white')}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

const navStyle: React.CSSProperties = {
  padding: '10px',
  position: 'fixed',
  top: '0',
  width: '100%',
  zIndex: 1000,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
