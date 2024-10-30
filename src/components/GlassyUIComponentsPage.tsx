import React, { useEffect, useState } from 'react';
import BackToTopButton from './BackToTop';
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
  Search,
  ShoppingCart,
  GalleryThumbnails,
  AlignStartVertical,
  Wrench,
  Calendar,
} from 'lucide-react';
import { date } from 'zod'; 
import Accordion from './Accordion';
import { HiOutlineArchiveBoxArrowDown } from 'react-icons/hi2';
import AOS from 'aos';
import 'aos/dist/aos.css';
 
// Define the ComponentCardProps interface

interface ComponentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  status?: string; // Optional status prop
  children?: React.ReactNode; // Include the children prop
  darkMode: boolean; //darkMode prop
}
const getGlassyClasses = (darkMode: boolean) => {
  return `backdrop-filter backdrop-blur-md ${darkMode ? 'bg-white/10 border-white/20' : 'bg-black/10 border-black/20'} border rounded-2xl shadow-lg transition-all duration-300`;
};

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  description,
  icon,
  onClick,
  status,
  children,
  darkMode,
}) => {
  return (
    <div
      className={`${getGlassyClasses(darkMode)} p-6 flex flex-col h-full cursor-pointer group transition-all duration-300 ${darkMode ? 'hover:bg-white/20' : 'hover:bg-black/20'} hover:scale-105 hover:shadow-xl`}
      onClick={onClick}
    >
      <div className='flex items-center mb-4'>
        <div
          className={`p-2 ${darkMode ? 'bg-white/20' : 'bg-black/20'}rounded-lg mr-4`}
        >
          {icon}
        </div>
        <h3 className='text-xl font-bold'>{title}</h3>
        {status && (
          <span className='ml-2 px-2 py-1 bg-green-200 text-green-700 text-xs font-medium rounded'>
            {status}
          </span>
        )}
      </div>
      <p className='text-sm opacity-80 mb-4 flex-grow'>{description}</p>
      {children}
      <div
        className={`flex items-center text-sm font-medium ${darkMode ? 'text-pink-200' : 'text-pink-300'} mt-4`}
      >
        <div className='flex justify-center items-center'>
          <span>Learn more</span>
          <ArrowUp className='ml-2 w-6 pt-1 group-hover:translate-x-1 transition-transform duration-300' />
        </div>
      </div>
    </div>
  );
};

const GlassyUIComponentsPage: React.FC<{ darkMode: boolean }> = ({
  darkMode,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const componentsPerPage = 9;

  const scrollToNextSection = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

 
  useEffect(() => {
    // Initialize AOS if it hasn't been initialized
    if (AOS.init) {
      AOS.init({
        duration: 1000,
        once: true,
      });
    }

    // Refresh AOS on currentPage change
    AOS.refresh();
  }, [currentPage]);

 
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
        title: 'E-Commerce Product Card',
      description: 'E-Commerce Product Card component with glassmorphic styling.',
      icon: <ShoppingCart size={24} />,
      onClick: () => navigate('/product-details'),
    },
    {
      title: 'Statistic',
      description: 'Statistic component with glassmorphic styling.',
       icon: <AlignStartVertical size={24} />,
      onClick: () => navigate('/statistic-details'),
    },
    {
      title: 'Gallery',
      description: 'Gallery component with glassmorphic styling.',
      icon: <GalleryThumbnails size={24} />,
      onClick: () => navigate('/gallery-details'),
    },
    {
      title: 'Glassmorphism Effect Generator',
      description: 'Create stunning Glassmorphic effects with ease.',

      onClick: () => navigate('/generator'),
    },
    {
      title: 'Calendar',
      description: 'Calendar component with glassmorphic styling.',
      icon: <Calendar size={24} />,
      onClick: () => navigate('/calendar-details'),
    },
    {
      title: 'Checkbox',
      description: 'Checkbox component with glassmorphic styling.',
      icon: <Layout size={24} />,
      onClick: () => navigate('/checkbox'),
    },
    {
      title: 'Spinner',
      description: 'Design and customize CSS spinners for your projects.',
      icon: <Wrench size={24} />,
      onClick: () => navigate('/spinner'),
    },
  ];

  const [filteredData, setFilteredData] = useState(componentsData);

  useEffect(() => {
    const data = componentsData.filter(component => {
      if (searchFilter) {
        return component.title
          .toLowerCase()
          .includes(searchFilter.trim().toLowerCase());
      }
      return true; // return all components if no filter is set
    });
    setFilteredData(data);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchFilter]);

  const totalPages = Math.ceil(filteredData.length / componentsPerPage);

  const currentComponents = filteredData.slice(
    (currentPage - 1) * componentsPerPage,
    currentPage * componentsPerPage,
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getGlassyClasses = (darkMode: boolean) => {
    return `backdrop-filter backdrop-blur-md ${darkMode ? 'bg-white/10 border-white/20' : 'bg-black/10 border-black/20'} border rounded-2xl shadow-lg transition-all duration-300`;
  };

  const ComponentCard: React.FC<ComponentCardProps> = ({
    title,
    description,
    icon,
    onClick,
    status,
    children,
    darkMode,
  }) => {
    return (
      <div
        className={`${getGlassyClasses(darkMode)} p-6 flex flex-col h-full cursor-pointer group transition-all duration-300 ${darkMode ? 'hover:bg-white/20' : 'hover:bg-black/20'} hover:scale-105 hover:shadow-xl`}
        onClick={onClick}
      >
        <div className='flex items-center mb-4'>
          <div
            className={`p-2 ${darkMode ? 'bg-white/20' : 'bg-black/20'} rounded-lg mr-4`}
          >
            {icon}
          </div>
          <h3 className='text-xl font-bold'>{title}</h3>
          {status && (
            <span className='ml-2 px-2 py-1 bg-green-200 text-green-700 text-xs font-medium rounded'>
              {status}
            </span>
          )}
        </div>
        <p className='text-sm opacity-80 mb-4 flex-grow'>{description}</p>
        {children}
        <div
          className={`flex items-center text-sm font-medium ${darkMode ? 'text-pink-200' : 'text-pink-400'} mt-4`}
        >
          <div className='flex justify-center items-center'>
            <span>Learn more</span>
            <ArrowUp className='ml-2 w-6 pt-1 group-hover:translate-x-1 transition-transform duration-300' />
          </div>

        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen font-sans bg-gradient-to-br ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'}`}
    >
      <BackToTopButton />
      <div className='container mx-auto px-4 py-8 lg:py-12'>
        <header className='flex justify-between items-center mb-16 px-6 py-4 rounded-lg pl-0'>
          <div
            className={`text-3xl lg:text-4xl font-extrabold tracking-tight cursor-pointer transition-colors duration-300 ${darkMode ? 'text-white hover:text-pink-300' : 'text-black hover:text-pink-400'}`}
            onClick={() => navigate('/')}
            data-aos='fade-right'
          >
            GlassyUI
          </div>
          <div
            data-aos='fade-left'
            className={`flex items-center bg-gradient-to-r ${darkMode ? 'from-slate-800 via-slate-700 to-slate-900 text-white' : 'from-white/80 via-black/10 to-white/90 text-black'} w-2/5 rounded-lg shadow-lg overflow-hidden`}
          >
            <input
              className={`w-full px-6 py-3 bg-transparent outline-none focus:ring-2 ${darkMode ? 'focus:ring-gray-500 text-white' : 'focus:ring-neutral-400 text-black'} transition-all duration-300`}

              placeholder='Search Components...'
              onChange={e => setSearchFilter(e.target.value)}
            />
            <Search
              className={`mx-4 cursor-pointer ${darkMode ? 'text-pink-300 hover:text-pink-400' : 'text-pink-400 hover:text-pink-500'} transition-all duration-300`}
            />
          </div>
        </header>
        <main>
          <h1
            className={`text-4xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-white to-pink-200' : 'from-black to-pink-400'}`}
            data-aos='fade-right'
            data-aos-delay='400'
            data-aos-duration='1300'
          >
            Glassmorphic Components
          </h1>
          <p
            className='text-lg lg:text-xl mb-12 max-w-2xl leading-relaxed'
            data-aos='fade-right'
            data-aos-delay='600'
            data-aos-duration='1500'
          >
            Elevate your UI with our collection of beautifully crafted,
            glassmorphic components. Perfect for creating modern, sleek
            interfaces with depth and style.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {currentComponents.map((component, index) => (
              <ComponentCard
                key={index}
                title={component.title}
                description={component.description}
                icon={component.icon}
                onClick={component.onClick}
                darkMode={darkMode}
              />
            ))}
            {filteredData.length === 0 && (

              <section className={darkMode ? 'bg-gray-900' : 'bg-black/10'}
                       data-aos-duration='2000'
              >
                <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
                  <div className='mx-auto max-w-screen-sm text-center'>
                    <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-primary-500'>
                      404
                    </h1>
                    <p
                      className={`mb-4 text-3xl tracking-tight font-bold md:text-4xl ${darkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                      Something&apos;s missing.
                    </p>
                    <p
                      className={`mb-4 text-lg font-light ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      Sorry, we can&apos;t find that component. You&apos;ll find
                      lots to explore on the home page.{' '}
                    </p>
                    <button
                      className='mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md transition-all duration-300'
                      onClick={() => navigate('/')}
                    >
                      Back to Homepage
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className='flex justify-center items-center mt-8'>
            <button
              onClick={prevPage}
              className={`px-4 py-2 mx-2 rounded-lg ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : `${darkMode ? 'hover:bg-white/20' : 'hover:bg-black/20'}`
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className='text-lg'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              className={`px-4 py-2 mx-2 rounded-lg ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : `${darkMode ? 'hover:bg-white/20' : 'hover:bg-black/20'}`
              }`}
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

// dropdown menu, accordian, contact us,
