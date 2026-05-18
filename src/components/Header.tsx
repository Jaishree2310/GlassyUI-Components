import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const menuIconRef = useRef<HTMLButtonElement | null>(null);

  return (
    <nav style={navStyle}>
      <h1 className='text-white text-[20px] font-bold z-50'>
        <span className='text-blue-400'>Glass</span>UI
      </h1>
      {/* Hamburger Button */}
      <button
        ref={menuIconRef}
        className='md:hidden text-white z-50 relative w-8 h-8'
        onClick={() => {
          if (!menuOpen) {
            setMenuOpen(true);

            gsap.fromTo(
              mobileMenuRef.current,
              {
                opacity: 0,
                y: -20,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: 'power2.out',
              },
            );
          } else {
            gsap.to(mobileMenuRef.current, {
              opacity: 0,
              y: -20,
              duration: 0.3,
              ease: 'power2.in',
            });
            setTimeout(() => {
              setMenuOpen(false);
            }, 350);
          }
        }}
      >
        {/* Menu Icon */}
        <Menu
          size={28}
          className={`absolute inset-0 transition-all duration-300 ${
            menuOpen
              ? 'opacity-0 rotate-90 scale-50'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />

        {/* Close Icon */}
        <X
          size={28}
          className={`absolute inset-0 transition-all duration-300 ${
            menuOpen
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
      </button>
      {/* Desktop Menu */}
      <ul className='hidden md:flex' style={ulStyle}>
        <li style={liStyle} className='navbar-item'>
          <Link to='/' style={linkStyle}>
            Home
          </Link>
        </li>
        <li style={liStyle} className='navbar-item'>
          <Link to='/donate' style={linkStyle}>
            Sponsor
          </Link>
        </li>
        <li style={liStyle} className='navbar-item'>
          <Link to='/about' style={linkStyle}>
            About Us
          </Link>
        </li>
        <li style={liStyle} className='navbar-item'>
          <Link to='/contact' style={linkStyle}>
            Contact Us
          </Link>
        </li>
        <li style={liStyle} className='navbar-item'>
          <Link to='/stories' style={linkStyle}>
            Stories
          </Link>
        </li>
      </ul>
      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`absolute top-full left-0 w-full md:hidden
        bg-black/70
        backdrop-blur-xl
        border border-white/10
        shadow-2xl
        flex flex-col items-center gap-6 py-6
        transition-all duration-300
        ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none hidden'}`}
      >
        <Link to='/' style={linkStyle} onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to='/donate' style={linkStyle} onClick={() => setMenuOpen(false)}>
          Sponsor
        </Link>

        <Link to='/about' style={linkStyle} onClick={() => setMenuOpen(false)}>
          About Us
        </Link>

        <Link
          to='/contact'
          style={linkStyle}
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>

        <Link
          to='/stories'
          style={linkStyle}
          onClick={() => setMenuOpen(false)}
        >
          Stories
        </Link>

        {/* Auth Section Mobile */}
        {userLoggedIn && currentUser ? (
          <UserAccount
            email={currentUser.email ?? ''}
            username={currentUser.displayName ?? ''}
          />
        ) : null}
      </div>

      {/* Desktop Auth */}
      <div className='hidden md:flex'>
        {userLoggedIn && currentUser ? (
          <UserAccount
            email={currentUser.email ?? ''}
            username={currentUser.displayName ?? ''}
          />
        ) : null}
      </div>
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
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '20px',
  paddingRight: '20px',
};

const ulStyle: React.CSSProperties = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
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
