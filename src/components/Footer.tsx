import React from 'react';
import { Link } from 'react-router-dom';
import GoogleTranslate from './GoogleTranslator';

const Footer: React.FC = () => {
  return (
    <>
      <footer className='glass-footer'>
        <div className='footer-content'>
          <div className='flex items-center space-x-2'>
            <img
              src='../glassy logo.jpeg'
              alt='Glass UI Logo'
              className='h-8 w-8' // Adjust size as needed
            />
            <h1 className='text-white text-[20px] font-bold'>
              <span className='text-blue-400'>Glass</span>UI
            </h1>
          </div>
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
            <Link to='/donation' className='footer-link'>
              Donation
            </Link>
            <Link to='/about' className='footer-link'>
              About
            </Link>
          </div>
        </div>

        {/* Social Media Section */}
        <div className='social-section'>
          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            className='social-icon facebook'
          >
            <i className='fa-brands fa-facebook-f'></i>
          </a>
          <a
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
            className='social-icon twitter'
          >
            <i className='fa-brands fa-x'></i> {/* Updated Twitter icon */}
          </a>
          <a
            href='https://linkedin.com'
            target='_blank'
            rel='noopener noreferrer'
            className='social-icon linkedin'
          >
            <i className='fa-brands fa-linkedin-in'></i>
          </a>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='social-icon instagram'
          >
            <i className='fa-brands fa-instagram'></i>
          </a>
          <a
            href='https://github.com/Jaishree2310/GlassyUI-Components'
            target='_blank'
            rel='noopener noreferrer'
            className='social-icon github'
          >
            <i className='fa-brands fa-github'></i>
          </a>
        </div>

        {/* Google Translate Button aligned to the right */}
        <div className='translate-container'>
          <GoogleTranslate />
        </div>

        {/* Footer Bottom Section */}
        <div className='footer-bottom'>
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
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            position: relative;
          }

          .footer-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .footer-logo {
            height: 50px; /* Adjust size as needed */
            margin-bottom: 10px;
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

          /* Social Media Section */
          .social-section {
            display: flex;
            gap: 20px;
            margin-top: 20px;
          }

          .social-icon {
            font-size: 24px;
            color: #fff;
            transition:
              transform 0.3s,
              color 0.3s;
          }

          .social-icon:hover {
            transform: scale(1.2);
          }

          .facebook:hover {
            color: #1877f2;
          }
          .twitter:hover {
            color: #1da1f2;
          }
          .linkedin:hover {
            color: #0a66c2;
          }
          .instagram:hover {
            color: #e4405f;
          }
          .github:hover {
            color: #4078c0;
          }

          /* Google Translate aligned to the right */
          .translate-container {
            position: absolute;
            top: 20px;
            right: 20px;
          }

          /* Footer Bottom Section */
          .footer-bottom {
            margin-top: 20px;
            color: #fff;
            font-size: 14px;
          }

          @media (max-width: 768px) {
            .glass-footer {
              padding: 20px;
            }

            .footer-links {
              flex-direction: column;
              gap: 10px;
            }

            .social-section {
              flex-direction: column;
              gap: 10px;
            }

            .translate-container {
              top: 10px;
              right: 10px;
            }
          }
        `}</style>
      </footer>
    </>
  );
};

export default Footer;
