import React from 'react';
import { Link } from 'react-router-dom';
import GoogleTranslate from './GoogleTranslator';

const Footer: React.FC = () => {
  return (
    <>
      <footer
        style={{
          backgroundColor: 'rgba(43, 48, 60, 0.85)',
          color: '#fff',
          borderTop: '1px solid #fff',
          padding: '20px',
          textAlign: 'center',
          height: '180px',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: '300px',
            position: 'relative',
            left: '100px',
            top: '20px',
          }}
        >
          <p>
            Elevate your UI with our collection of beautifully crafted,
            glassmorphic components. Perfect for creating modern, sleek
            interfaces with depth and style.
          </p>
        </div>
        <div
          className='footer_container'
          style={{
            display: 'flex',
            width: '500px',
            justifyContent: 'space-evenly',
            position: 'relative',
            left: '300px',
          }}
        >
          <div className='Social_media_links'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '130px',
                position: 'relative',
                top: '30px',
              }}
            >
              <div>
                {' '}
                <p>Social</p>
              </div>
              <div
                style={{
                  width: '130px',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  fontSize: '20px',
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
          <div className='address_container'>
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
          <div className='address_container'>
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

        <div>
          <p
            style={{
              fontSize: '14px',
              color: '#fff',
              position: 'relative',
              right: '-300px',
            }}
          >
            &copy; 2023 GlassyUI. All rights reserved.
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
