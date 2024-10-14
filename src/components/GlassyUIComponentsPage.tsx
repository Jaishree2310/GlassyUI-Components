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
  PanelRightInactive,
  SlidersHorizontalIcon,
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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10; // Set your total number of pages
  const maxVisiblePages = 2; // Maximum number of visible pages

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      console.log(`Page changed to: ${page}`);
    }
  };

  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className='min-h-screen font-sans bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'>
      <BackToTopButton />
      <div className='container mx-auto px-4 py-8 lg:py-12'>
        <header className='flex justify-between items-center mb-16'>
          <div
            className='text-3xl lg:text-4xl font-bold tracking-tight cursor-pointer hover:text-pink-200 transition-colors duration-300'
            onClick={navigateToLandingPage}
          >
            GlassyUI
          </div>
          <div className='flex gap-4'>
            <div className='hidden md:flex items-center space-x-4'>
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
            <div className='hidden md:flex items-center space-x-4'>
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
          <div className='md:hidden mb-8'>
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
          <h1 className='text-4xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200'>
            Glassmorphic Components
          </h1>
          <p className='text-lg lg:text-xl mb-12 max-w-2xl leading-relaxed'>
            Elevate your UI with our collection of beautifully crafted,
            glassmorphic components. Perfect for creating modern, sleek
            interfaces with depth and style.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
              <div className='flex flex-col space-y-4 mt-4'>
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
              <div className='flex space-x-2 mt-4'>
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
                  className='bg-white/30 h-full rounded-2xl'
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
                <a href='#' className='hover:bg-white/20 px-2 py-1 rounded'>
                  Home
                </a>
                <a href='#' className='hover:bg-white/20 px-2 py-1 rounded'>
                  About
                </a>
                <a href='#' className='hover:bg-white/20 px-2 py-1 rounded'>
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
                  className='fixed inset-0 flex items-center justify-center z-50'
                  onClick={() => setIsPopupOpen(false)}
                >
                  <div
                    className={`${getGlassyClasses()} p-6 max-w-sm mx-auto`}
                    onClick={e => e.stopPropagation()}
                  >
                    <h3 className='text-xl font-bold mb-2'>Popup Title</h3>
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
              <div className='mt-1 mb-4 flex justify-around'>
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
              <div className='mt-1 mb-4 flex justify-around'>
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
              <div className='mt-1 mb-4 flex justify-around'>
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
              <div className='relative p-4 rounded-lg shadow-lg bg-white/10 pt-0'>
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
                  <div className='absolute z-10 mt-1 w-full bg-gray-800 text-white rounded shadow-lg'>
                    {['options1', 'options2', 'options3'].map(
                      (option, index) => (
                        <div
                          key={option}
                          className='px-4 py-2 hover:bg-gray-700 cursor-pointer'
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
              <div className='mt-1 mb-4 flex justify-around'>
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
            <ComponentCard
              title='Pagination'
              description='Custom pagination component for navigating through pages.'
              icon={<SlidersHorizontalIcon size={24} />}
              onClick={() => navigate('/pagination-details')}
            >
              <div
                className='flex justify-center items-center space-x-2'
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 ${
                    currentPage === 1
                      ? 'bg-gray-600 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  {'<<'}
                </button>

                {/* Conditionally show first page and ellipsis */}
                {currentPage > 2 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className='px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 bg-gray-600 text-white hover:bg-gray-700'
                    >
                      1
                    </button>
                    {currentPage > Math.floor(maxVisiblePages / 2) + 1 && (
                      <span className='px-3 text-gray-400'>...</span>
                    )}
                  </>
                )}

                {/* Render visible pages */}
                {getVisiblePages().map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-600 text-white hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Conditionally show last page and ellipsis */}
                {currentPage < totalPages - Math.floor(maxVisiblePages / 2) && (
                  <>
                    {currentPage <
                      totalPages - Math.floor(maxVisiblePages / 2) - 1 && (
                      <span className='px-3 text-gray-400'>...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className='px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 bg-gray-600 text-white hover:bg-gray-700'
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 ${
                    currentPage === totalPages
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  {'>>'}
                </button>
              </div>
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
        <div className='p-2 bg-white/20 rounded-lg mr-4'>{icon}</div>
        <h3 className='text-xl font-bold'>{title}</h3>
        {status && (
          <span className='ml-2 px-2 py-1 bg-green-200 text-green-700 text-xs font-medium rounded'>
            {status}
          </span>
        )}
      </div>
      <p className='text-sm opacity-80 mb-4 flex-grow'>{description}</p>
      {children}
      <div className='flex items-center text-sm font-medium text-pink-200 mt-4'>
        <div className='flex justify-center items-center '>
          <span>Learn more</span>
          <ArrowRight className='ml-2 w-6 pt-1 group-hover:translate-x-1 transition-transform duration-300' />
        </div>
      </div>
    </div>
  );
};

export default GlassyUIComponentsPage;
