import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Star } from 'lucide-react';
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
  const githubRepoUrl = 'https://github.com/Jaishree2310/GlassyUI-Components';

  return (
    <nav style={navStyle}>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <h1 className='text-white text-[20px] font-bold cursor-pointer hover:opacity-90 transition-opacity'>
          <span className='text-blue-400'>Glassy</span>UI
        </h1>
      </Link>
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
      <div className='flex items-center gap-4 navbar-item'>
        <a
          href={githubRepoUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center space-x-2 text-sm text-white hover:text-yellow-300 transition-colors duration-300 px-4 py-1.5 rounded-full border border-white border-opacity-20 bg-white bg-opacity-10 backdrop-blur-sm'
        >
          <Star size={16} className='text-yellow-300' />
          <span>Star the repo</span>
        </a>
        {userLoggedIn && currentUser && (
          <UserAccount
            email={currentUser.email ?? ''}
            username={currentUser.displayName ?? ''}
          />
        )}
      </div>
    </nav>
  );
};

const navStyle: React.CSSProperties = {
  padding: '12px 24px',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  zIndex: 1000,
  background: 'rgba(15, 23, 42, 0.45)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const ulStyle: React.CSSProperties = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '24px',
};

const liStyle: React.CSSProperties = {
  margin: 0,
};

const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  fontWeight: 500,
};

export default Header;
