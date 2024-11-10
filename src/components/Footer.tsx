import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleTranslate from './GoogleTranslator';
import { FormEvent } from 'react';
const Footer: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:5000/api/newsletter/subscribe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
        },
      );

      if (response.ok) {
        alert('Subscription successful!');
        setName('');
        setEmail('');
      } else {
        alert('Failed to subscribe.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
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
            <Link to='/donation' className='footer-link'>
              Donation
            </Link>
            <Link to='/about' className='footer-link'>
              About
            </Link>
            <Link to='/termsOfUse' className='footer-link'>
              Terms Of Use
            </Link>
            <GoogleTranslate />
          </div>
        </div>
        <div className='footer-bottom flex flex-col'>
          {/* Newsletter Section */}
          <div className='p-6 w-full flex flex-col items-center justify-center'>
            <form
              onSubmit={handleSubmit}
              className='w-full flex flex-col items-center md:flex-row'
            >
              <input
                type='text'
                placeholder='Your Name'
                value={name}
                onChange={e => setName(e.target.value)}
                className='mb-4 md:mb-0 md:mr-2 px-4 py-2 w-full md:w-1/2 text-black rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
              />
              <input
                type='email'
                placeholder='Your Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='mb-4 md:mb-0 md:mr-2 px-4 py-2 w-full md:w-1/2 text-black rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
              />
              <button
                type='submit'
                className='px-6 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-200'
              >
                Subscribe
              </button>
            </form>
          </div>
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
            background-color: rgb(12, 17, 29);
            width: 100vw;
            padding: 40px 20px;
            text-align: center;
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
        <div>
          <div
            style={{
              fontSize: '14px',
              color: '#fff',
              position: 'relative',
              right: '-300px',
              top: '10px',
            }}
          >
            <GoogleTranslate />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
