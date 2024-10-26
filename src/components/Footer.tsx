import React from 'react';
import { Link } from 'react-router-dom';
import GoogleTranslate from './GoogleTranslator';


const Footer: React.FC = () => {
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
          <Link to='/donation' className='footer-link'>
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
          margin-top: 50px;
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



    <footer
      style={{
        backgroundColor: 'rgba(43, 48, 60, 0.85)',
        color: '#fff',
        borderTop: '1px solid #fff',
        padding: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '200px', // Adjust the height as needed
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            width: '300px',
            marginLeft: '100px',
            marginTop: '20px',

          }}
        >
          <p>
            Elevate your UI with our collection of beautifully crafted,
            glassmorphic components. Perfect for creating modern, sleek
            interfaces with depth and style.
          </p>

          <p>
            <Link
              to={'/terms'}
              style={{ textDecoration: 'none', color: 'skyblue' }}
            >
              Terms and Conditions
            </Link>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '40px', marginRight: '100px' }}>
          <div className='social_media_links'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>Social</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  fontSize: '20px',
                  gap: '10px',
                }}
              >
                <a href=''>
                  <i className='fa-brands fa-instagram'></i>
                </a>
                <a href=''>
                  <i className='fa-brands fa-facebook'></i>
                </a>
                <a href=''>
                  <i className='fa-brands fa-youtube'></i>
                </a>
                <a href=''>
                  <i className='fa-brands fa-x-twitter'></i>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              width: '2px',
              height: '120px',
              backgroundColor: '#fff',
            }}
          ></div>
          <div className='links_container'>
            <Link
              to='/slider-details'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <p>Sliders</p>
            </Link>
            <Link
              to='/speed-dial-details'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <p>Speed Dial</p>
            </Link>
            <Link
              to='/button-details'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <p>Buttons</p>
            </Link>
            <Link
              to='/input-details'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <p>Inputs</p>
            </Link>
            <Link
              to='/card-details'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <p>Cards</p>
            </Link>
          </div>
          <div className='links_container'>
            <Link
              to='/progress-bar-details'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <p>Progress Bar</p>
            </Link>
            <Link
              to='/modal-details'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <p>Modals</p>
            </Link>
            <Link
              to='/navigation-details'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <p>Navigation</p>
            </Link>
            <Link
              to='/popup-details'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <p>Popups</p>
            </Link>
            <Link
              to='/textarea-details'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <p>Textarea</p>
            </Link>
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: '14px',
          color: '#fff',
          marginTop: '20px', // Ensure enough space between content
        }}
      >
        &copy; 2023 GlassyUI. All rights reserved.
      </p>


    </footer>

          .footer-links {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
        <div>
          <p
            style={{
              fontSize: '14px',
              color: '#fff',
              position: 'relative',
              right: '-300px',
            }}
          >
            &copy; 2024 GlassyUI. All rights reserved.
          </p>
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
