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
        <footer
          style={{
            textAlign: 'center',
            padding: '20px',

            color: '#fff',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          {/* <hr style={{ border: '1px solid #444', marginBottom: '20px' }} /> */}

          {/* <div className='footer-bottom flex flex-col'>
            
            <p>2025 GlassyUI. All rights reserved.</p>
          </div> */}
        </footer>

        <style jsx>{`
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
    </>
  );
};

export default Footer;
