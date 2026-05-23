import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}
    >
      <div className='header-inner'>
        {/* Logo */}
        <Link to='/' className='header-logo'>
          <div className='logo-mark'>G</div>
          <span className='logo-wordmark'>
            <span className='logo-accent'>Glassy</span>UI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className='header-nav' aria-label='Main navigation'>
          <NavItem to='/' label='Home' active={isActive('/')} />
          <NavItem
            to='/components'
            label='Components'
            active={isActive('/components')}
          />
          <NavItem to='/about' label='About' active={isActive('/about')} />
          <NavItem
            to='/contributors'
            label='Contributors'
            active={isActive('/contributors')}
          />
          <NavItem
            to='/stories'
            label='Stories'
            active={isActive('/stories')}
          />
        </nav>

        {/* Right actions */}
        <div className='header-actions'>
          
            href={githubRepoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='github-pill'
            aria-label='Star on GitHub'
          >
            <GithubIcon />
            <span>Star</span>
            <span className='github-star-badge'>★ {stars}</span>
          </a>

          {userLoggedIn && currentUser && (
            <UserAccount
              email={currentUser.email ?? ''}
              username={currentUser.displayName ?? ''}
            />
          )}

          {/* Mobile hamburger */}
          <button
            className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label='Toggle menu'
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? ' mobile-drawer--open' : ''}`}>
        <nav className='mobile-nav' aria-label='Mobile navigation'>
          <MobileNavItem to='/' label='Home' active={isActive('/')} />
          <MobileNavItem
            to='/components'
            label='Components'
            active={isActive('/components')}
          />
          <MobileNavItem
            to='/about'
            label='About'
            active={isActive('/about')}
          />
          <MobileNavItem
            to='/contributors'
            label='Contributors'
            active={isActive('/contributors')}
          />
          <MobileNavItem
            to='/stories'
            label='Stories'
            active={isActive('/stories')}
          />
        </nav>
        
          href={githubRepoUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='mobile-github-btn'
        >
          <GithubIcon /> Star on GitHub
        </a>
      </div>
    </header>
  );
};

/* ─── Sub-components ─────────────────────────── */

const NavItem: React.FC<{ to: string; label: string; active: boolean }> = ({
  to,
  label,
  active,
}) => (
  <Link to={to} className={`nav-item${active ? ' nav-item--active' : ''}`}>
    {label}
    {active && <span className='nav-indicator' aria-hidden='true' />}
  </Link>
);

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