import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import GoogleTranslate from './GoogleTranslator';
import { FaGithub } from 'react-icons/fa'; // Assuming you use react-icons based on previous code

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
    <footer className='w-full bg-gray-900 bg-opacity-60 backdrop-blur-xl border-t border-gray-800 text-gray-300 py-12 mt-auto relative z-10'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12'>
        {/* Section 1: Brand & Translator */}
        <div className='flex flex-col space-y-4'>
          <h2 className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
            GlassyUI
          </h2>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Elevate your web applications with modern, sleek, and customizable
            glassmorphism React components.
          </p>
          <div className='pt-2'>
            <GoogleTranslate />
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className='flex flex-col space-y-4 md:items-center'>
          <h3 className='text-xl font-bold text-white mb-2'>Quick Links</h3>
          <ul className='space-y-3 flex flex-col'>
            <li>
              <Link
                to='/'
                className='hover:text-blue-400 transition-colors duration-300 relative group'
              >
                Home
                <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full'></span>
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='hover:text-blue-400 transition-colors duration-300 relative group'
              >
                About Us
                <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full'></span>
              </Link>
            </li>
            <li>
              <Link
                to='/stories'
                className='hover:text-blue-400 transition-colors duration-300 relative group'
              >
                Stories
                <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full'></span>
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='hover:text-blue-400 transition-colors duration-300 relative group'
              >
                Contact
                <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full'></span>
              </Link>
            </li>
            <li>
              <Link
                to='/donate'
                className='hover:text-blue-400 transition-colors duration-300 relative group'
              >
                Donate
                <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full'></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Newsletter */}
        <div className='flex flex-col space-y-4'>
          <h3 className='text-xl font-bold text-white mb-2'>
            Subscribe to Newsletter
          </h3>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
            <input
              type='text'
              placeholder='Your Name'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className='w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            />
            <input
              type='email'
              placeholder='Your Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className='w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            />
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg shadow-blue-900/20'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className='max-w-7xl mx-auto px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
        <p className='text-sm text-gray-500'>
          &copy; {new Date().getFullYear()} GlassyUI-Components. All rights
          reserved.
        </p>
        <a
          href='https://github.com/Jaishree2310/GlassyUI-Components'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-400 hover:text-white transition-transform transform hover:scale-110 duration-300'
          aria-label='GitHub Repository'
        >
          <FaGithub size={28} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
