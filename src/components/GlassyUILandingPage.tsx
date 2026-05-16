import React, { useState, useEffect } from 'react';
import { Star, Code, Package, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './GlassyUILandingPage.css';
import gsap from 'gsap';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqData = [
  {
    question: 'What is GlassyUI-Components?',
    answer:
      'GlassyUI-Components is a collection of modern, sleek UI elements built with a glassmorphism aesthetic. It provides developers with ready-to-use React components that feature frosted-glass effects, transparency, and elegant blur backgrounds.',
  },
  {
    question: 'What is glassmorphism?',
    answer:
      'Glassmorphism is a design trend characterized by translucent objects that look like frosted glass. It relies on a multi-layered approach with highlights and shadows, background blur (backdrop-filter), and subtle borders to create depth and hierarchy.',
  },
  {
    question: 'What components are included in GlassyUI-Components?',
    answer:
      'The library includes a wide range of components such as Buttons, Cards, Inputs, Modals, Progress Bars, Sliders, Speed Dials, Navigation bars, and specialized generators like the Glassmorphism Effect Generator.',
  },
  {
    question: 'How can I use the components in my React project?',
    answer:
      "To use a component, navigate to its specific page on the GlassyUI site, copy the provided JSX/React code and the corresponding SCSS/CSS styles, and paste them into your project's component directory.",
  },
  {
    question: 'How do I add a component to my project?',
    answer:
      'Since this is not an npm package, you manually add components by creating a new file in your project, pasting the code from the documentation, and importing it where needed. This gives you full ownership and ease of customization over the code.',
  },
  {
    question: 'How do I handle external dependencies?',
    answer:
      "Some components may require external libraries like Lucide-React for icons or Framer Motion for animations. These dependencies are usually listed in the component's documentation or import statements; you simply need to install them via npm or yarn in your project.",
  },
];

const GlassyUILandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const githubRepoUrl = 'https://github.com/Jaishree2310/GlassyUI-Components';

  useEffect(() => {
    setIsVisible(true);
    if (AOS.init) {
      AOS.init({
        duration: 1000,
        once: true,
      });
    }
    AOS.refresh();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.homeGSap',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'sine.inOut' },
    );
    return () => {
      tl.kill();
    };
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    /* Increased pt-24 to push content below the navbar */
    <div className='min-h-screen flex flex-col items-center justify-center pt-20 font-mono relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black'>
      <div
        className='absolute inset-0 w-full h-full opacity-20'
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Increased mt-12 to provide extra breathing room for the header area shown in image_3bae78.png */}
      <div className='homeGSap relative z-10 w-full max-w-4xl mt-4'>
        <header className='w-full flex justify-between items-center mb-6'>
          <div className='text-2xl font-bold text-white'>
            <span className='text-blue-400'>Glassy</span>UI
          </div>
          <a
            href={githubRepoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2 text-sm text-white hover:text-yellow-300 transition-colors duration-300'
          >
            <Star size={18} />
            <span>Star the repo</span>
          </a>
        </header>

        <main
          className='text-center p-12 rounded-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 shadow-lg border border-white border-opacity-20 relative'
          data-aos='flip-up'
          data-aos-duration='2500'
        >
          <h1 className='text-7xl font-bold mb-4 text-white'>
            <span className='animated-glossy-text'>Glassy UI</span>
          </h1>
          <p className='text-2xl mb-8 text-white'>
            A sleek glassmorphism UI library for modern web applications.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
            <FeatureCard
              icon={<Code size={24} />}
              title='Easy to Use'
              description='Simple API for quick integration'
            />
            <FeatureCard
              icon={<Package size={24} />}
              title='Customizable'
              description='Tailor components to your needs'
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title='Performant'
              description='Optimized for smooth interactions'
            />
          </div>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <Link to='/components'>
              <GlassmorphismButton>Explore Components</GlassmorphismButton>
            </Link>
            <Link to='/contributors'>
              <GlassmorphismButton variant='secondary'>
                Our Contributors
              </GlassmorphismButton>
            </Link>
            <GlassmorphismButton
              variant='secondary'
              as='a'
              href={githubRepoUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub Repository
            </GlassmorphismButton>
          </div>
        </main>
      </div>

      <section className='relative z-10 w-full max-w-3xl mx-auto py-24 px-4'>
        <h2
          className='text-3xl font-bold text-white text-center mb-10 tracking-tight'
          data-aos='fade-up'
        >
          Frequently Asked Questions
        </h2>

        <div className='space-y-4'>
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`overflow-hidden transition-all duration-500 rounded-xl border border-white/10 backdrop-blur-md ${
                activeIndex === index
                  ? 'bg-white/10 border-white/30'
                  : 'bg-white/5'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className='w-full px-6 py-5 text-left flex justify-between items-center text-white focus:outline-none group'
              >
                <span className='text-lg font-medium group-hover:text-blue-300 transition-colors'>
                  {item.question}
                </span>
                <span
                  className={`transform transition-transform duration-500 text-2xl ${activeIndex === index ? 'rotate-45 text-pink-400' : 'rotate-0 text-white'}`}
                >
                  +
                </span>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  activeIndex === index
                    ? 'max-h-[1000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className='mx-6 p-1 border-t-2 border-white/10' />

                <div className='px-6 py-6 text-white/80 leading-relaxed text-base'>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className='p-6 rounded-lg backdrop-filter backdrop-blur-sm bg-white bg-opacity-5 border border-white border-opacity-10 transition-all duration-300 hover:bg-opacity-10 hover:scale-105'>
    <div className='text-blue-400 mb-4'>{icon}</div>
    <h3 className='text-xl font-semibold text-white mb-2'>{title}</h3>
    <p className='text-gray-300'>{description}</p>
  </div>
);

const GlassmorphismButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}> = ({ children, variant = 'primary', as = 'button', ...props }) => {
  const className = `px-6 py-3 rounded-full text-white font-semibold backdrop-filter backdrop-blur-sm bg-opacity-20 border border-white border-opacity-20 transition-all duration-300 ease-in-out hover:bg-opacity-30 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${variant === 'primary' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'}`;
  return React.createElement(as, { className, ...props }, children);
};

export default GlassyUILandingPage;
