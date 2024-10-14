import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

import { FaXTwitter } from 'react-icons/fa6';

import {
  Star,
  ArrowRight,
  Info,
  Box,
  Type,
  Sliders,
  MessageSquare,
  Menu,
  X,
  Layout,
  AlignLeft,
  ArrowUp,
  DollarSign,
} from 'lucide-react';
import Tooltip from './Tooltip';
import SpeedDial from './SpeedDial';
import BackToTopButton from './BackToTop';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import Accordion from './Accordion';

const GlassyUIComponentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const githubRepoUrl = 'https://github.com/Jaishree2310/GlassyUI-Components';

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300';
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigateToLandingPage = () => {
    navigate('/');
  };
  const [selectedOption, setSelectedOption] = useState<string>(''); // Track the selected option

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    console.log('Selected option:', option);
    setIsPopupOpen2(false); // Close the dropdown after selection
  };

  return (
    <div className='min-h-screen font-sans text-white bg-gradient-to-br from-gray-800 via-gray-900 to-black'>
      <BackToTopButton />
      <div className='container px-4 py-8 mx-auto lg:py-12'>
        <header className='flex items-center justify-between mb-16'>
          <div
            className='text-3xl font-bold tracking-tight transition-colors duration-300 cursor-pointer lg:text-4xl hover:text-pink-200'
            onClick={navigateToLandingPage}
          >
            GlassyUI
          </div>
          <div className='flex gap-4'>
            <div className='items-center hidden space-x-4 md:flex'>
              <a
                href='/generator'
                rel='noopener noreferrer'
                className={`flex items-center space-x-2 ${getGlassyClasses()} px-4 py-2 hover:bg-white/20 transition-colors duration-300`}
              >
                <HiOutlineWrenchScrewdriver />
                <span className='text-sm font-medium'>
                  Generate Glass effect
                </span>
              </a>
            </div>
            <div className='items-center hidden space-x-4 md:flex'>
              <a
                href={githubRepoUrl}
                target='_blank'
                rel='noopener noreferrer'
                className={`flex items-center space-x-2 ${getGlassyClasses()} px-4 py-2 hover:bg-white/20 transition-colors duration-300`}
              >
                <Star size={18} />
                <span className='text-sm font-medium'>Star on GitHub</span>
              </a>
            </div>
          </div>
          <button className='md:hidden' onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {isMenuOpen && (
          <div className='mb-8 md:hidden'>
            <a
              href={githubRepoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={`flex items-center justify-center space-x-2 ${getGlassyClasses()} px-4 py-2 hover:bg-white/20 transition-colors duration-300 w-full`}
            >
              <Star size={18} />
              <span className='text-sm font-medium'>Star on GitHub</span>
            </a>
          </div>
        )}

        <main>
          <h1 className='mb-6 text-4xl font-extrabold text-transparent lg:text-6xl bg-clip-text bg-gradient-to-r from-white to-pink-200'>
            Glassmorphic Components
          </h1>
          <p className='max-w-2xl mb-12 text-lg leading-relaxed lg:text-xl'>
            Elevate your UI with our collection of beautifully crafted,
            glassmorphic components. Perfect for creating modern, sleek
            interfaces with depth and style.
          </p>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <ComponentCard
              title='Toast'
              description='Glassmorphic Toast Component. Click the button below to try it out!'
              icon={<MessageSquare size={24} />}
              status='New'
              onClick={() => navigate('/toast-page/')}
            >
              <button
                className={`${getGlassyClasses()} px-4 py-2 hover:bg-white/20`}
              >
                Try out!
              </button>
            </ComponentCard>
            <ComponentCard
              title='Sliders'
              description='Elegant sliders with glassmorphic styling.'
              icon={<Sliders size={24} />}
              onClick={() => navigate('/slider-details')}
            >
              <div className='flex flex-col mt-4 space-y-4'>
                <input
                  type='range'
                  min='0'
                  max='100'
                  defaultValue={75}
                  onChange={e => {
                    const value = e.target.value;
                    e.target.style.background = `linear-gradient(90deg, rgba(255, 255, 255, 0.3) ${value}%, rgba(255, 255, 255, 0.1) ${value}%)`;
                  }}
                  className={`${getGlassyClasses()} w-full h-2 rounded-lg appearance-none cursor-pointer`}
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(255, 255, 255, 0.3) 75%, rgba(255, 255, 255, 0.1) 75%)',
                  }}
                />
              </div>
            </ComponentCard>

            <ComponentCard
              title='Speed Dial'
              description='Speed dial with glassmorphism effect. Hover on me to see the actions.'
              icon={<Info size={24} />}
              onClick={() => navigate('/speed-dial-details')}
            >
              <SpeedDial
                direction='right'
                actionButtons={[
                  {
                    icon: <FaFacebookF size={20} />,
                    label: 'Facebook',
                    key: 'facebook',
                    action: () => {
                      window.open('https://www.facebook.com', '_blank');
                    },
                  },
                  {
                    icon: <FaXTwitter size={20} />,
                    label: 'Twitter',
                    key: 'twitter',
                    action: () => {
                      window.open('https://www.twitter.com', '_blank');
                    },
                  },
                  {
                    icon: <FaLinkedinIn size={20} />,
                    label: 'LinkedIn',
                    key: 'linkedin',
                    action: () => {
                      window.open('https://www.linkedin.com', '_blank');
                    },
                  },
                  {
                    icon: <FaInstagram size={20} />,
                    label: 'Instagram',
                    key: 'instagram',
                    action: () => {
                      window.open('https://www.instagram.com', '_blank');
                    },
                  },
                ]}
              />
            </ComponentCard>
            <ComponentCard
              title='Buttons'
              description='Sleek, customizable buttons with glassmorphic styling.'
              icon={<Box size={24} />}
              onClick={() => navigate('/button-details')}
            >
              <div className='flex mt-4 space-x-2'>
                <button
                  className={`${getGlassyClasses()} px-4 py-2 hover:bg-white/20`}
                >
                  Click me
                </button>
                <button
                  className={`${getGlassyClasses()} px-4 py-2 bg-white/20 hover:bg-white/30`}
                >
                  Accent
                </button>
              </div>
            </ComponentCard>

            <ComponentCard
              title='Inputs'
              description='Elegant input fields with a glass-like appearance.'
              icon={<Type size={24} />}
              onClick={() => navigate('/input-details')}
            >
              <input
                type='text'
                placeholder='Type here...'
                className={`${getGlassyClasses()} w-full px-4 py-2 mt-4 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50`}
              />
            </ComponentCard>

            <ComponentCard
              title='Cards'
              description='Versatile content containers with a frosted glass effect.'
              icon={<Layout size={24} />}
              onClick={() => navigate('/card-details')}
            >
              <div className={`${getGlassyClasses()} p-4 mt-4`}>
                <h4 className='font-semibold'>Card Title</h4>
                <p className='text-sm opacity-80'>Card content goes here.</p>
              </div>
            </ComponentCard>

            <ComponentCard
              title='Progress Bars'
              description='Stylish progress indicators with a glass-like finish.'
              icon={<Sliders size={24} />}
              onClick={() => navigate('/progress-bar-details')}
            >
              <div className={`${getGlassyClasses()} w-full h-4 mt-4`}>
                <div
                  className='h-full bg-white/30 rounded-2xl'
                  style={{ width: '60%' }}
                ></div>
              </div>
            </ComponentCard>

            <ComponentCard
              title='Modals'
              description='Eye-catching dialog boxes with glassmorphism effects.'
              icon={<MessageSquare size={24} />}
              onClick={() => navigate('/modal-details')}
            >
              <button
                onClick={e => {
                  e.stopPropagation();
                  alert('Modal would open here');
                }}
                className={`${getGlassyClasses()} px-4 py-2 mt-4 hover:bg-white/20`}
              >
                Open Modal
              </button>
            </ComponentCard>

            <ComponentCard
              title='Navigation'
              description='Sleek navigation components with a frosted glass look.'
              icon={<ArrowRight size={24} />}
              onClick={() => navigate('/navigation-details')}
            >
              <nav
                className={`${getGlassyClasses()} flex justify-around mt-4 py-2`}
              >
                <a href='#' className='px-2 py-1 rounded hover:bg-white/20'>
                  Home
                </a>
                <a href='#' className='px-2 py-1 rounded hover:bg-white/20'>
                  About
                </a>
                <a href='#' className='px-2 py-1 rounded hover:bg-white/20'>
                  Contact
                </a>
              </nav>
            </ComponentCard>

            <ComponentCard
              title='Popups'
              description='Attention-grabbing popup notifications with glassmorphic styling.'
              icon={<MessageSquare size={24} />}
              onClick={() => navigate('/popup-details')}
            >
              <button
                onClick={e => {
                  e.stopPropagation();
                  setIsPopupOpen(true);
                }}
                className={`${getGlassyClasses()} px-4 py-2 mt-4 hover:bg-white/20`}
              >
                Show Popup
              </button>
              {isPopupOpen && (
                <div
                  className='fixed inset-0 z-50 flex items-center justify-center'
                  onClick={() => setIsPopupOpen(false)}
                >
                  <div
                    className={`${getGlassyClasses()} p-6 max-w-sm mx-auto`}
                    onClick={e => e.stopPropagation()}
                  >
                    <h3 className='mb-2 text-xl font-bold'>Popup Title</h3>
                    <p className='mb-4'>
                      This is a sample popup with glassmorphism effect.
                    </p>
                    <button
                      onClick={() => setIsPopupOpen(false)}
                      className={`${getGlassyClasses()} px-4 py-2 hover:bg-white/20`}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </ComponentCard>

            <ComponentCard
              title='Textarea'
              description='Multi-line input fields with elegant glassmorphic design.'
              icon={<AlignLeft size={24} />}
              onClick={() => navigate('/textarea-details')}
            >
              <textarea
                placeholder='Enter your message...'
                className={`${getGlassyClasses()} w-full px-4 py-2 mt-4 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none`}
                rows={3}
              />
            </ComponentCard>

            <ComponentCard
              title='Tool Tip'
              description='Tooltip component support different positions, and be responsive and accessible.'
              icon={<Info size={24} />}
              onClick={() => navigate('/tooltip-details')}
            >
              <div className='flex justify-around mt-1 mb-4'>
                <Tooltip text='Tooltip' position='left'>
                  <button className={`${getGlassyClasses()} px-4 py-2`}>
                    Left
                  </button>
                </Tooltip>
                <Tooltip text='Tooltip' position='bottom'>
                  <button className={`${getGlassyClasses()} px-4 py-2`}>
                    Bottom
                  </button>
                </Tooltip>
                <Tooltip text='Tooltip' position='right'>
                  <button className={`${getGlassyClasses()} px-4 py-2`}>
                    Right
                  </button>
                </Tooltip>
              </div>
            </ComponentCard>

            <ComponentCard
              title='Back to Top'
              description='A button that scrolls the page back to the top, improving user navigation.'
              icon={<ArrowUp size={24} />}
              onClick={() => navigate('/back-to-top-details')}
            >
              <div className='flex justify-around mt-1 mb-4'>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  className={`${getGlassyClasses()} px-4 py-2`}
                >
                  Back to Top
                </button>
              </div>
            </ComponentCard>

            <ComponentCard
              title='Pricing Plans'
              description='Choose a pricing plan that suits your needs. Affordable and flexible.'
              icon={<DollarSign size={24} />}
              onClick={() => navigate('/pricing-details')}
            >
              <div className='flex justify-around mt-1 mb-4'>
                <div className='text-center'>
                  <h3 className='text-lg font-semibold'>Basic</h3>
                  <button className={`${getGlassyClasses()} px-4 py-2 mt-2`}>
                    Select
                  </button>
                </div>
                <div className='text-center'>
                  <h3 className='text-lg font-semibold'>Standard</h3>
                  <button className={`${getGlassyClasses()} px-4 py-2 mt-2`}>
                    Select
                  </button>
                </div>
                <div className='text-center'>
                  <h3 className='text-lg font-semibold'>Premium</h3>
                  <button className={`${getGlassyClasses()} px-4 py-2 mt-2`}>
                    Select
                  </button>
                </div>
              </div>
            </ComponentCard>
            <ComponentCard
              title='Dropdown Menu'
              description='Select an option from the dropdown menu.'
              icon={<AlignLeft size={24} />}
              onClick={() => navigate('/dropdown-details')}
            >
              <div className='relative p-4 pt-0 rounded-lg shadow-lg bg-white/10'>
                <div
                  className='flex items-center mt-4 cursor-pointer rounded-3xl'
                  onClick={e => {
                    e.stopPropagation();
                    setIsPopupOpen2(prev => !prev); // Toggle dropdown visibility
                  }}
                >
                  <span className='w-full px-4 py-2 mt-2 bg-transparent border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    {selectedOption || 'Select an option'}
                  </span>
                </div>

                {isPopupOpen2 && (
                  <div className='absolute z-10 w-full mt-1 text-white bg-gray-800 rounded shadow-lg'>
                    {['options1', 'options2', 'options3'].map(
                      (option, index) => (
                        <div
                          key={option}
                          className='px-4 py-2 cursor-pointer hover:bg-gray-700'
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </ComponentCard>

            <ComponentCard
              title='Authentication Cards'
              description='Versatile content containers with a frosted glass effect.'
              icon={<Layout size={24} />}
              onClick={() => navigate('/authentication-card')}
            >
              <div className='flex justify-around mt-1 mb-4'>
                <button className={`${getGlassyClasses()} px-4 py-2`}>
                  Login
                </button>
                <button className={`${getGlassyClasses()} px-4 py-2`}>
                  Sign Up
                </button>
              </div>
            </ComponentCard>
            <ComponentCard
              title='Accordion'
              description='Accordion component with glassmorphic styling.'
              icon={<Layout size={24} />}
              onClick={() => navigate('/accordion-details')}
            >
              <Accordion
                title='Accordion Title 1'
                content='This is the content of the first accordion.'
              />
              <Accordion
                title='Accordion Title 2'
                content='This is the content of the second accordion.'
              />
            </ComponentCard>
          </div>
        </main>
      </div>
    </div>
  );
};

const ComponentCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  status?: string;
  children?: React.ReactNode;
}> = ({ title, description, icon, onClick, children, status }) => {
  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300';
  };

  return (
    <div
      className={`${getGlassyClasses()} p-6 flex flex-col h-full cursor-pointer group transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl`}
      onClick={onClick}
    >
      <div className='flex items-center mb-4'>
        <div className='p-2 mr-4 rounded-lg bg-white/20'>{icon}</div>
        <h3 className='text-xl font-bold'>{title}</h3>
        {status && (
          <span className='px-2 py-1 ml-2 text-xs font-medium text-green-700 bg-green-200 rounded'>
            {status}
          </span>
        )}
      </div>
      <p className='flex-grow mb-4 text-sm opacity-80'>{description}</p>
      {children}
      <div className='flex items-center mt-4 text-sm font-medium text-pink-200'>
        <div className='flex items-center justify-center '>
          <span>Learn more</span>
          <ArrowRight className='w-6 pt-1 ml-2 transition-transform duration-300 group-hover:translate-x-1' />
        </div>
      </div>
    </div>
  );
};

export default GlassyUIComponentsPage;
