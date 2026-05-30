import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../login/contexts/authContext/index';
import UserAccount from '../login/UserAccount';
import './Header.css';
import { useGitHubStars } from '../hooks/useGitHubStars';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, userLoggedIn } = useAuth();
  const stars = useGitHubStars();
  const githubRepoUrl = 'https://github.com/Jaishree2310/GlassyUI-Components';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

const MobileNavItem: React.FC<{
  to: string;
  label: string;
  active: boolean;
}> = ({ to, label, active }) => (
  <Link
    to={to}
    className={`mobile-nav-item${active ? ' mobile-nav-item--active' : ''}`}
  >
    {label}
  </Link>
);

const GithubIcon: React.FC = () => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    width='15'
    height='15'
    aria-hidden='true'
  >
    <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
  </svg>
);

export default Header;
