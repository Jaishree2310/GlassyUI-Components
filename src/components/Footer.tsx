import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className='w-full relative z-20 mt-16 backdrop-filter backdrop-blur-md bg-white/5 border-t border-white/10 shadow-[0_-8px_32px_0_rgba(31,38,135,0.15)] text-white'>
      <div className='max-w-7xl mx-auto px-6 py-12 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12'>
          {/* Logo & Description */}
          <div className='col-span-1 md:col-span-4 flex flex-col space-y-4'>
            <Link
              to='/'
              className='text-2xl font-bold tracking-wider hover:text-pink-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md inline-block w-fit'
            >
              <span className='text-blue-400'>Glass</span>UI
            </Link>
            <p className='text-slate-300 text-sm leading-relaxed max-w-sm'>
              Elevate your web interfaces with beautifully crafted, modern
              glassmorphic components. Perfect for creating sleek and polished
              user experiences.
            </p>
          </div>

          {/* Quick Links: Explore */}
          <div className='col-span-1 md:col-span-2 flex flex-col space-y-4'>
            <h2 className='text-sm font-semibold tracking-wider text-pink-300 uppercase'>
              Explore
            </h2>
            <nav aria-label='Explore Navigation'>
              <ul className='space-y-2 text-sm text-slate-300'>
                <li>
                  <Link
                    to='/components'
                    className='hover:text-pink-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
                  >
                    Components
                  </Link>
                </li>
                <li>
                  <Link
                    to='/generator'
                    className='hover:text-pink-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
                  >
                    Generator
                  </Link>
                </li>
                <li>
                  <Link
                    to='/contributors'
                    className='hover:text-pink-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
                  >
                    Contributors
                  </Link>
                </li>
                <li>
                  <Link
                    to='/donate'
                    className='hover:text-pink-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
                  >
                    Sponsor
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Quick Links: Company */}
          <div className='col-span-1 md:col-span-2 flex flex-col space-y-4'>
            <h2 className='text-sm font-semibold tracking-wider text-pink-300 uppercase'>
              Company
            </h2>
            <nav aria-label='Company Navigation'>
              <ul className='space-y-2 text-sm text-slate-300'>
                <li>
                  <Link
                    to='/about'
                    className='hover:text-pink-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to='/contact'
                    className='hover:text-pink-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to='/termsOfUse'
                    className='hover:text-pink-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
                  >
                    Terms & Privacy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Connect & Newsletter */}
          <div className='col-span-1 md:col-span-4 flex flex-col space-y-4'>
            <h2 className='text-sm font-semibold tracking-wider text-pink-300 uppercase'>
              Subscribe
            </h2>
            <p className='text-slate-300 text-xs leading-relaxed'>
              Stay updated with our latest glassmorphic releases.
            </p>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col space-y-2'
              aria-label='Newsletter Subscription Form'
            >
              <div className='flex flex-col sm:flex-row gap-2'>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='e.g. alex@example.com…'
                  spellCheck={false}
                  required
                  className='flex-grow px-3 py-2 text-sm text-white bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md transition-colors duration-200'
                />
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 disabled:opacity-50 text-white rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 flex justify-center items-center min-w-[100px]'
                >
                  {isSubmitting ? 'Submitting…' : 'Subscribe'}
                </button>
              </div>
            </form>

            <div className='flex space-x-4 pt-2'>
              <a
                href='https://github.com/Jaishree2310/GlassyUI-Components'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Visit our GitHub'
                className='text-slate-300 hover:text-white transition-[color,transform] duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
              >
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
                  <path d='M9 18c-4.51 2-5-2-7-2' />
                </svg>
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Visit our LinkedIn'
                className='text-slate-300 hover:text-white transition-[color,transform] duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
              >
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
                  <rect width='4' height='12' x='2' y='9' />
                  <circle cx='4' cy='4' r='2' />
                </svg>
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Visit our Twitter profile'
                className='text-slate-300 hover:text-white transition-[color,transform] duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
              >
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </a>
              <a
                href='https://discord.com'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Join our Discord server'
                className='text-slate-300 hover:text-white transition-[color,transform] duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
              >
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 127.14 96.36'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path d='M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c2.62-1.91,5.2-4,7.6-6.19a73.18,73.18,0,0,0,62.81,0c2.4,2.23,5,4.28,7.6,6.19a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,123.5,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z' />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 space-y-4 md:space-y-0'>
          <p>© 2026 GlassyUI. All rights reserved.</p>
          <div className='flex space-x-6'>
            <Link
              to='/termsOfUse'
              className='hover:text-pink-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
            >
              Terms of Use
            </Link>
            <Link
              to='/termsOfUse'
              className='hover:text-pink-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md'
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
