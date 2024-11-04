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
  ThumbsUp,
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

interface ComponentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;

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
      data-aos='fade-up'
      data-aos-duration='2000'
    >
      <div className='flex items-center mb-4'>

        <div
          className={`p-2 ${darkMode ? 'bg-white/20' : 'bg-black/20'}rounded-lg mr-4`}
        >
          {icon}
        </div>

        <h3 className='text-xl font-bold text-white group-hover:text-pink-300 transition-all duration-300'>
          {title}
        </h3>
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
          <span className='group-hover:underline'>Learn more</span>
          <ArrowUp className='ml-2 w-6 pt-1 group-hover:translate-x-1 group-hover:text-pink-400 transition-transform duration-300' />
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

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, [currentPage]);

  const componentsData = [
    {
      title: 'Toast',
      description: 'Glassmorphic Toast Component. Try it out!',
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
      title: 'Alert Box',
      description: 'Customizable alert boxes for notifications.',
      icon: <Info size={24} />,
      onClick: () => navigate('/alert-box'),
    },
    {
      title: 'Modal',
      description: 'Beautiful glassmorphic modal popup windows.',
      icon: <Box size={24} />,
      onClick: () => navigate('/modal-window'),
    },
    {
      title: 'Typography',
      description: 'Stylish fonts and text effects.',
      icon: <Type size={24} />,
      onClick: () => navigate('/typography'),
    },
    {
      title: 'Navigation Bar',
      description: 'Glassmorphic navbar with smooth animations.',
      icon: <Layout size={24} />,
      onClick: () => navigate('/navbar'),
    },
    {
      title: 'Dropdown',
      description: 'Stylish dropdown menus for navigation.',
      icon: <AlignLeft size={24} />,
      onClick: () => navigate('/dropdown-menu'),
    },
    {
      title: 'Pricing Card',
      description: 'Eye-catching pricing cards for showcasing plans.',
      icon: <DollarSign size={24} />,
      onClick: () => navigate('/pricing-card'),
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
      title: 'Like Button',
      description: 'Interactive like button with animations.',
      icon: <ThumbsUp size={24} />,
      onClick: () => navigate('/like-button'),
    },
    {
      title: 'Calendar',
      description: 'A sleek, responsive calendar component.',
      icon: <Calendar size={24} />,
      onClick: () => navigate('/calendar'),
    },
    {
      title: 'Shopping Cart',
      description: 'Functional shopping cart with glassmorphic styling.',
      icon: <ShoppingCart size={24} />,
      onClick: () => navigate('/shopping-cart'),
    },
    {
      title: 'Spinner',
      description: 'Design and customize CSS spinners for your projects.',
      icon: <Wrench size={24} />,
      onClick: () => navigate('/spinner'),
    },
    {
      title: 'Image Gallery',
      description: 'Stylish glassmorphic gallery for images.',
      icon: <GalleryThumbnails size={24} />,
      onClick: () => navigate('/image-gallery'),
    },
    // Add more components here...
  ];

  const [filteredData, setFilteredData] = useState(componentsData);

  useEffect(() => {
    const data = componentsData.filter(component => {
      return searchFilter
        ? component.title
            .toLowerCase()
            .includes(searchFilter.trim().toLowerCase())
        : true;
    });
    setFilteredData(data);
    setCurrentPage(1);
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
          >Glassmorphic Components
          </h1>
          <p className='text-lg lg:text-xl mb-12 max-w-2xl leading-relaxed'>
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
