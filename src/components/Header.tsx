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
            Sponsor
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
        <li style={liStyle} className='navbar-item'>
          <Link
            to='/stories'
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          >
            Stories
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
            {/* <Link
              to='/signin'
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
              onMouseLeave={e => (e.currentTarget.style.color = 'white')}
            >
              Sign in
            </Link> */}
          </li>
          <li
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
            className='cursor-pointer'
          >
            {/* <Link
              to='/signup'
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#fde047')}
              onMouseLeave={e => (e.currentTarget.style.color = 'white')}
            >
              Sign Up
            </Link> */}
          </li>
        </ul>
      )}
    </nav>
  );
};

//
const navStyle: React.CSSProperties = {
  padding: '12px 24px',
  position: 'fixed',
  top: '15px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '85%',
  maxWidth: '1200px',

  background: 'rgba(255, 255, 255, 0.08)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '18px',

  zIndex: 1000,

  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',

  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',

  display: 'flex',
  justifyContent: 'space-between',
  paddingLeft: '30px',
  paddingRight: '30px',
  alignItems: 'center',
};

const ulStyle: React.CSSProperties = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '20px',
  gap: '35px',
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
