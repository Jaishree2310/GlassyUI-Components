import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Info,
  Box,
  Type,
  Sliders,
  MessageSquare,
  Layout,
  AlignLeft,
  ArrowUp,
  DollarSign,
  ThumbsUpIcon,
  Contact,
} from 'lucide-react';

import Accordion from './Accordion';
import BackToTopButton from './BackToTop';
import Tooltip from './Tooltip';

interface ComponentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  status?: string;
  children?: React.ReactNode;
}
const getGlassyClasses = () => {
  return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300';
};

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  description,
  icon,
  onClick,
  status,
  children,
}) => {
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
        <div className='flex justify-center items-center'>
          <span>Learn more</span>
          <ArrowUp className='ml-2 w-6 pt-1 group-hover:translate-x-1 transition-transform duration-300' />
        </div>
      </div>
    </div>
  );
};

const GlassyUIComponentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState<string | null>('');
  const componentsPerPage = 9;
  const componentsData = [
    {
      title: 'Toast',
      description:
        'Glassmorphic Toast Component. Click the button below to try it out!',
      icon: <MessageSquare size={24} />,
      onClick: () => navigate('/toast-page/'),
    },
    {
      title: 'Sliders',
      description: 'Elegant sliders with glassmorphic styling.',
      icon: <Sliders size={24} />,
      onClick: () => navigate('/slider-details'),
    },
    {
      title: 'Speed Dial',
      description: 'Speed dial with glassmorphism effect.',
      icon: <Info size={24} />,
      onClick: () => navigate('/speed-dial-details'),
    },
    {
      title: 'Buttons',
      description: 'Sleek, customizable buttons with glassmorphic styling.',
      icon: <Box size={24} />,
      onClick: () => navigate('/button-details'),
    },
    {
      title: 'Cards',
      description: 'Versatile content containers with a frosted glass effect.',
      icon: <Layout size={24} />,
      onClick: () => navigate('/card-details'),
    },
    {
      title: 'Inputs',
      description: 'Elegant input fields with a glass-like appearance.',
      icon: <Type size={24} />,
      onClick: () => navigate('/input-details'),
    },
    {
      title: 'Progress Bars',
      description: 'Stylish progress indicators with a glass-like finish.',
      icon: <Sliders size={24} />,
      onClick: () => navigate('/progress-bar-details'),
    },
    {
      title: 'Modals',
      description: 'Eye-catching dialog boxes with glassmorphism effects.',
      icon: <MessageSquare size={24} />,
      onClick: () => navigate('/modal-details'),
    },
    {
      title: 'Navigation',
      description: 'Sleek navigation components with a frosted glass look.',
      icon: <ArrowRight size={24} />,
      onClick: () => navigate('/navigation-details'),
    },
    {
      title: 'Popups',
      description:
        'Attention-grabbing popup notifications with glassmorphic styling.',
      icon: <MessageSquare size={24} />,
      onClick: () => navigate('/popup-details'),
    },
    {
      title: 'Textarea',
      description: 'Multi-line input fields with elegant glassmorphic design.',
      icon: <AlignLeft size={24} />,
      onClick: () => navigate('/textarea-details'),
    },
    {
      title: 'Tool Tip',
      description:
        'Tooltip component support different positions, and be responsive and accessible.',
      icon: <Info size={24} />,
      onClick: () => navigate('/tooltip-details'),
    },
    {
      title: 'Back to Top',
      description:
        'A button that scrolls the page back to the top, improving user navigation.',
      icon: <ArrowUp size={24} />,
      onClick: () => navigate('/back-to-top-details'),
    },
    {
      title: 'Pricing Plans',
      description:
        'Choose a pricing plan that suits your needs. Affordable and flexible.',
      icon: <DollarSign size={24} />,
      onClick: () => navigate('/pricing-details'),
    },
    {
      title: 'Dropdown Menu',
      description: 'Select an option from the dropdown menu.',
      icon: <AlignLeft size={24} />,
      onClick: () => navigate('/dropdown-details'),
    },
    {
      title: 'Authentication Cards',
      description: 'Versatile content containers with a frosted glass effect.',
      icon: <Layout size={24} />,
      onClick: () => navigate('/authentication-card'),
    },
    {
      title: 'Accordion',
      description: 'Accordion component with glassmorphic styling.',
      icon: <Layout size={24} />,
      onClick: () => navigate('/accordion-details'),
    },
    {
      title: 'Pagination',
      description: 'Pagination component with glassmorphic styling.',
      icon: <Layout size={24} />,
      onClick: () => navigate('/pagination-details'),
    },

    {
      title: 'Testimonial',
      description: 'Testimonial component with glassmorphic styling.',
      icon: <ThumbsUpIcon size={24} />,
      onClick: () => navigate('/testimonial-details'),
    },
    {
      title: 'Contact Form',
      description: 'Contact Form component with glassmorphic styling.',
      icon: <Contact size={24} />,
      onClick: () => navigate('/contact-details'),
    },
    {
      title: 'Glassmorphism Effect Generator',
      description: 'Create stunning Glassmorphic effects with ease.',

      onClick: () => navigate('/generator'),
    },
    {
      title: 'Checkbox',
      description: 'Checkbox component with glassmorphic styling.',
      icon: <Layout size={24} />,
      onClick: () => navigate('/checkbox'),
    },
  ];
  const [filteredData, setFilteredData] = useState(componentsData);
  useEffect(() => {
    const data = componentsData.filter(component => {
      if (searchFilter != null) {
        return component.title
          .replace(/ /g, '')
          .toLowerCase()
          .includes(searchFilter.trim().replace(/ /g, '').toLowerCase());
      }
      return component;
    });
    setFilteredData(data);
  }, [searchFilter]);

  const totalPages = Math.ceil(componentsData.length / componentsPerPage);

  const currentComponents = componentsData.slice(
    (currentPage - 1) * componentsPerPage,
    currentPage * componentsPerPage,
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className='min-h-screen font-sans bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'>
      <BackToTopButton />
      <div className='container mx-auto px-4 py-8 lg:py-12'>
        <header className='grid grid-cols-3 mb-16'>
          <div
            className='text-3xl lg:text-4xl font-bold tracking-tight cursor-pointer hover:text-pink-200 transition-colors duration-300'
            onClick={() => navigate('/')}
          >
            GlassyUI
          </div>
          <input
            className='rounded-full text-black p-2'
            placeholder='Search Component'
            onChange={e => {
              setSearchFilter(e.target.value);
            }}
          />
        </header>

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
            {filteredData.map((component, index) => (
              <ComponentCard
                key={index}
                title={component.title}
                description={component.description}
                icon={component.icon}
                onClick={component.onClick}
              />
            ))}

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
          </div>

          <div className='flex justify-center mt-8'>
            <button
              onClick={prevPage}
              className={`px-4 py-2 mx-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className='px-4 py-2'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              className={`px-4 py-2 mx-2 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GlassyUIComponentsPage;
