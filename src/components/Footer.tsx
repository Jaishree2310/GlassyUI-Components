import React from 'react';
import { Link } from 'react-router-dom';
import GoogleTranslate from './GoogleTranslator';

const Footer: React.FC = () => {
  return (
    <>
      <footer className='glass-footer'>
        <div className='footer-content'>
          <div className='footer-section'>
            <p className='footer-description'>
              Elevate your UI with beautifully crafted, glassmorphic components.
              Perfect for creating modern, sleek interfaces.
            </p>
          </div>
          <div className='footer-section'>
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
          <div className='footer-section'>
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
          <p>&copy; 2024 GlassyUI. All rights reserved.</p>
        </div>

        <style jsx>{`
          .glass-footer {
            backdrop-filter: blur(10px) saturate(180%);
            -webkit-backdrop-filter: blur(10px) saturate(180%);
            background-color: rgba(43, 48, 60, 0.8);
            width: 100vw;
            padding: 40px 20px;
            border-radius: 15px;
            text-align: center;
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          }

          .footer-content {
            display: flex;
            flex-direction: column; /* Arrange sections vertically */
            align-items: center;
            gap: 30px; /* Space between sections */
          }

          .footer-section {
            width: 100%; /* Full width for each section */
            max-width: 600px; /* Limit width for larger screens */
          }

          .footer-description {
            color: #fff;
            font-size: 16px;
            line-height: 1.5;
            text-align: center; /* Center text in the description */
          }

          .footer-links {
            display: flex;
            gap: 30px;
            justify-content: center; /* Center links in the footer section */
            flex-wrap: wrap; /* Allow wrapping for smaller screens */
          }

          .footer-link {
            color: #48dbfb; /* Updated link color */
            text-decoration: none;
            font-weight: 600;
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
            font-size: 28px; /* Increased size for better visibility */
            color: #fff;
            transition: transform 0.3s;
          }

          .github-link:hover {
            transform: scale(1.1);
            color: #48dbfb; /* Change color on hover */
          }

          @media (max-width: 768px) {
            .glass-footer {
              padding: 20px;
            }

            .footer-links {
              flex-direction: column; /* Stack links vertically on smaller screens */
              align-items: center; /* Center links */
              gap: 10px;
            }

            .footer-description {
              font-size: 14px; /* Smaller font for mobile */
            }
          }
        `}</style>
      </footer>
    </>
  );
};

export default Footer;
