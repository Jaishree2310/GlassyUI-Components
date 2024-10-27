import React from 'react';
import { Link } from 'react-router-dom';
import GoogleTranslate from './GoogleTranslator';

const Footer: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <footer className='glass-footer'>
      <div className='footer-content'>
        <p className='footer-description'>
          Elevate your UI with beautifully crafted, glassmorphic components.
          Perfect for creating modern, sleek interfaces.
        </p>
        <div className='footer-links'>
          <Link to='/components' className='footer-link'>
            Components
          </Link>
          <Link to='/contributors' className='footer-link'>
            Contributors
          </Link>
          <Link to='/donate' className='footer-link'>
            Donation
          </Link>
          <Link to='/about' className='footer-link'>
            About
          </Link>
          <GoogleTranslate />
        </div>
      </div>
      <div className='footer-bottom'>
        <a
          href='https://github.com/Jaishree2310/GlassyUI-Components'
          target='_blank'
          rel='noopener noreferrer'
          className='github-link'
        >
          <i className='fa-brands fa-github'></i>
        </a>
        <p>&copy; 2023 GlassyUI. All rights reserved.</p>
      </div>

      <style jsx>{`
        .glass-footer {
          backdrop-filter: blur(10px) saturate(180%);
          -webkit-backdrop-filter: blur(10px) saturate(180%);
          background-color: rgba(43, 48, 60, 0.7);
          width: 100vw;
          padding: 40px 20px;
          border-radius: 15px;
          text-align: center;
          margin-top: 0px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .footer-description {
          color: #fff;
          font-size: 16px;
          max-width: 500px;
        }

        .footer-links {
          display: flex;
          gap: 20px;
        }

        .footer-link {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          padding: 5px 10px;
          transition: all 0.3s ease;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background-color: #48dbfb;
          transition: width 0.3s;
        }

        .footer-link:hover::after {
          width: 100%;
        }

        .footer-bottom {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          color: #fff;
        }

        .github-link {
          font-size: 24px;
          color: #fff;
          transition: transform 0.3s;
        }

        .github-link:hover {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .glass-footer {
            flex-direction: column;
            padding: 20px;
          }

          .footer-links {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
