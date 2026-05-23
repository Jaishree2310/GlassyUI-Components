import React from 'react';
import { motion } from 'framer-motion';
import BackToTopButton from './BackToTop';
import { FaGithub } from 'react-icons/fa';
import './GlassyUILandingPage.css'; // For .animated-glossy-text

const AboutUsPage: React.FC = () => {
  return (
    <div className='min-h-screen pt-28 pb-16 px-4 md:px-8 flex flex-col items-center justify-center font-sans relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'>
      {/* Background Grid Pattern */}
      <div
        className='absolute inset-0 w-full h-full opacity-20 pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      <BackToTopButton />

      {/* Main Glassmorphic Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='relative z-10 w-full max-w-3xl p-8 md:p-12 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl flex flex-col gap-8'
      >
        <header className='text-center border-b border-white/10 pb-6'>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-3'>
            <span className='animated-glossy-text'>About Us</span>
          </h1>
          <p className='text-lg md:text-xl text-gray-300 font-light'>
            Your journey to beautiful, glassy UI components starts here!
          </p>
        </header>

        <main className='flex flex-col gap-8'>
          <section className='flex flex-col gap-3'>
            <h2 className='text-2xl font-bold text-blue-400'>Our Mission</h2>
            <p className='text-gray-200 leading-relaxed bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300'>
              At <strong>GlassyUI-Components</strong>, we are more than just a
              library. We are a community-driven organization dedicated to
              making a meaningful impact in the world of web development. Our
              mission is clear: to unite creators, foster collaboration, and
              pave the way for a brighter future through innovation.
            </p>
          </section>

          <section className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold text-blue-400'>Who We Welcome</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300'>
                <h3 className='font-bold text-lg text-yellow-300 mb-2'>
                  Developers
                </h3>
                <p className='text-gray-300 text-sm leading-relaxed'>
                  Whether you're just starting out or a seasoned expert, your
                  skills can help shape our offerings.
                </p>
              </div>
              <div className='bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300'>
                <h3 className='font-bold text-lg text-yellow-300 mb-2'>
                  Designers
                </h3>
                <p className='text-gray-300 text-sm leading-relaxed'>
                  Bring your unique vision and creativity to enhance our
                  beautiful glassmorphism components.
                </p>
              </div>
              <div className='bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300'>
                <h3 className='font-bold text-lg text-yellow-300 mb-2'>
                  Contributors
                </h3>
                <p className='text-gray-300 text-sm leading-relaxed'>
                  If you share our passion for building stunning user
                  experiences, we invite you to join our journey.
                </p>
              </div>
            </div>
          </section>

          <section className='flex flex-col gap-3'>
            <h2 className='text-2xl font-bold text-blue-400'>
              Achieving Together
            </h2>
            <p className='text-gray-200 leading-relaxed bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300'>
              Together, we can achieve incredible things! Let's collaborate,
              innovate, and transform ideas into reality. Join us in crafting a
              more beautiful and functional web for everyone.
            </p>
          </section>
        </main>

        <footer className='text-center border-t border-white/10 pt-6 flex flex-col items-center gap-4'>
          <p className='text-gray-300 text-sm'>
            Follow us on social media to stay updated with the latest releases
            and updates!
          </p>
          <a
            href='https://github.com/Jaishree2310/GlassyUI-Components'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:scale-110 text-blue-400 hover:text-blue-300 transition-all duration-300'
            aria-label='GitHub Repository'
          >
            <FaGithub size={24} />
          </a>
        </footer>
      </motion.div>
    </div>
  );
};

export default AboutUsPage;
