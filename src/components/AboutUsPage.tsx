import React from 'react';
import BackToTopButton from './BackToTop';
import { FaGithub } from 'react-icons/fa';

const AboutUsPage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black p-10 justify-center'>
      <BackToTopButton />

      {/* Main Container with Glassmorphism */}
      <div className='w-full max-w-4xl p-10 bg-opacity-40 bg-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-opacity-30 border-gray-300'>
        {/* Header Section */}
        <div className='text-center space-y-4 mb-10'>
          <h1 className='text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
            About Us
          </h1>
          <p className='text-xl text-gray-200 leading-relaxed'>
            Your journey to beautiful, glassy UI components starts here!
          </p>
        </div>

        {/* Content Section */}
        <div className='space-y-8 text-left'>
          <div>
            <h2 className='text-3xl font-bold text-purple-300 mb-3'>
              Our Mission
            </h2>
            <p className='text-lg text-gray-300 leading-relaxed p-5 bg-gray-800 bg-opacity-50 rounded-2xl border border-gray-700 hover:bg-gray-700 transition-colors duration-300'>
              At <strong>GlassyUI-Components</strong>, we are more than just a
              library. We are a community-driven organization dedicated to
              making a meaningful impact in the world of web development. Our
              mission is clear: to unite creators, foster collaboration, and
              pave the way for a brighter future through innovation.
            </p>
          </div>

          <div>
            <h2 className='text-3xl font-bold text-purple-300 mb-3'>
              Who We Welcome
            </h2>
            <ul className='space-y-4 text-lg text-gray-300'>
              <li className='p-4 bg-gray-800 bg-opacity-50 rounded-2xl border border-gray-700 hover:bg-gray-700 transition-colors duration-300'>
                <strong className='text-blue-400'>Developers:</strong> Whether
                you're just starting out or a seasoned expert, your skills can
                help shape our offerings.
              </li>
              <li className='p-4 bg-gray-800 bg-opacity-50 rounded-2xl border border-gray-700 hover:bg-gray-700 transition-colors duration-300'>
                <strong className='text-blue-400'>Designers:</strong> Bring your
                unique vision and creativity to enhance our beautiful
                glassmorphism components.
              </li>
              <li className='p-4 bg-gray-800 bg-opacity-50 rounded-2xl border border-gray-700 hover:bg-gray-700 transition-colors duration-300'>
                <strong className='text-blue-400'>Contributors:</strong> If you
                share our passion for building stunning user experiences, we
                invite you to join our journey.
              </li>
            </ul>
          </div>

          <div className='text-center mt-10'>
            <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-3'>
              Together, we can achieve incredible things!
            </h2>
            <p className='text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto'>
              Let's collaborate, innovate, and transform ideas into reality.
              Join us in crafting a more beautiful and functional web for
              everyone.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className='text-center mt-12 pt-8 border-t border-gray-700'>
          <p className='text-lg text-gray-300 font-semibold mb-4'>
            Follow us on social media to stay updated with the latest releases
            and updates!
          </p>
          <div className='flex justify-center'>
            <a
              href='https://github.com/Jaishree2310/GlassyUI-Components'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 hover:text-purple-400 transition-transform transform hover:scale-125 duration-300'
            >
              <FaGithub size={32} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
