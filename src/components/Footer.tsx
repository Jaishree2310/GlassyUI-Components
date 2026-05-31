import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/newsletter/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        },
      );
      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      }
    } catch {
      // silently fail — backend may not be running in dev
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className='footer-root'>
      <div className='footer-glow-left' />
      <div className='footer-glow-right' />

      <div className='footer-inner'>
        {/* Brand */}
        <div className='footer-brand'>
          <Link to='/' className='footer-logo'>
            <div className='footer-logo-mark'>G</div>
            <span className='footer-logo-text'>
              <span className='footer-logo-accent'>Glassy</span>UI
            </span>
          </Link>
          <p className='footer-tagline'>
            Beautifully crafted glassmorphism components for the modern web.
            Open source, free forever.
          </p>
          <div className='footer-social'>
            <SocialLink
              href='https://github.com/Jaishree2310/GlassyUI-Components'
              label='GitHub'
            >
              <svg
                viewBox='0 0 24 24'
                fill='currentColor'
                width='18'
                height='18'
              >
                <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
              </svg>
            </SocialLink>
            <SocialLink href='https://twitter.com' label='Twitter / X'>
              <svg
                viewBox='0 0 24 24'
                fill='currentColor'
                width='18'
                height='18'
              >
                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
              </svg>
            </SocialLink>
            <SocialLink href='https://linkedin.com' label='LinkedIn'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                width='18'
                height='18'
              >
                <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
                <rect width='4' height='12' x='2' y='9' />
                <circle cx='4' cy='4' r='2' />
              </svg>
            </SocialLink>
          </div>
        </div>

        {/* Explore */}
        <div className='footer-col'>
          <h3 className='footer-col-title'>Explore</h3>
          <ul className='footer-links'>
            <li>
              <FooterLink to='/components'>Components</FooterLink>
            </li>
            <li>
              <FooterLink to='/generator'>Generator</FooterLink>
            </li>
            <li>
              <FooterLink to='/contributors'>Contributors</FooterLink>
            </li>
            <li>
              <FooterLink to='/stories'>Stories</FooterLink>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className='footer-col'>
          <h3 className='footer-col-title'>Company</h3>
          <ul className='footer-links'>
            <li>
              <FooterLink to='/about'>About Us</FooterLink>
            </li>
            <li>
              <FooterLink to='/termsOfUse'>Terms &amp; Privacy</FooterLink>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className='footer-col footer-col-wide'>
          <h3 className='footer-col-title'>Stay Updated</h3>
          <p className='footer-newsletter-desc'>
            Get notified about new components and releases.
          </p>
          {submitted ? (
            <div className='footer-subscribed'>
              <span>✓</span> You're subscribed — thanks!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='footer-form' noValidate>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='your@email.com'
                required
                className='footer-input'
              />
              <button
                type='submit'
                disabled={isSubmitting}
                className='footer-submit'
              >
                {isSubmitting ? '…' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className='footer-bottom'>
        <p className='footer-copy'>
          © {new Date().getFullYear()} GlassyUI. All rights reserved.
        </p>
        <div className='footer-bottom-links'>
          <FooterLink to='/termsOfUse'>Terms of Use</FooterLink>
          <FooterLink to='/termsOfUse'>Privacy Policy</FooterLink>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <Link to={to} className='footer-link'>
    {children}
  </Link>
);

const SocialLink: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
}> = ({ href, label, children }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    aria-label={label}
    className='footer-social-btn'
  >
    {children}
  </a>
);

export default Footer;
