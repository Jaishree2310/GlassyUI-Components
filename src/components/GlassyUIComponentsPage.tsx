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
  Calendar,
  ShoppingCart,
  GalleryThumbnails,
} from 'lucide-react';

import Accordion from './Accordion';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface ComponentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  status?: string;
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
}) => {
  return (
    <div
      className={`${getGlassyClasses()} p-6 flex flex-col h-full cursor-pointer group transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl transform hover:-translate-y-2`}
      onClick={onClick}
      data-aos='fade-up'
      data-aos-duration='2000'
    >
      <div className='flex items-center mb-4'>
        <div className='p-2 bg-white/20 rounded-lg mr-4 group-hover:bg-pink-200 transition-all duration-300'>
          <div className='text-white group-hover:text-pink-600 transform group-hover:scale-110 transition-transform'>
            {icon}
          </div>
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
      <p className='text-sm opacity-80 mb-4 flex-grow text-white group-hover:text-pink-100 transition-all duration-300'>
        {description}
      </p>
      <div className='flex items-center text-sm font-medium text-pink-200 mt-4'>
        <div className='flex justify-center items-center'>
          <span className='group-hover:underline'>Learn more</span>
          <ArrowUp className='ml-2 w-6 pt-1 group-hover:translate-x-1 group-hover:text-pink-400 transition-transform duration-300' />
        </div>
      </div>
    </div>
  );
};

const GlassyUIComponentsPage: React.FC = () => {
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

  return (
    <div className='min-h-screen font-sans bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'>
      <BackToTopButton />
      <div className='container mx-auto px-4 py-8 lg:py-12'>
        <header className='flex justify-between items-center mb-16 px-6 py-4 rounded-lg pl-0'>
          <div
            className='text-3xl lg:text-4xl font-extrabold tracking-tight cursor-pointer hover:text-pink-300 transition-colors duration-300 text-white'
            onClick={() => navigate('/')}
            data-aos='fade-right'
          >
            GlassyUI
          </div>

          <div
            className='flex items-center bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white w-2/5 rounded-lg shadow-lg overflow-hidden'
            data-aos='fade-left'
          >
            <input
              className='w-full px-6 py-2 text-white bg-transparent outline-none'
              placeholder='Search components...'
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
            />
            <Search className='w-6 h-6 mx-4 text-gray-400' />
          </div>
        </header>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {currentComponents.map((component, index) => (
            <ComponentCard key={index} {...component} />
          ))}
        </div>

        <div className='flex justify-center mt-12'>
          <button
            className='px-4 py-2 mx-2 text-white bg-pink-500 rounded-lg shadow-md hover:bg-pink-400 focus:outline-none transition-all duration-300'
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className='px-4 py-2 mx-2 text-white bg-pink-500 rounded-lg shadow-md hover:bg-pink-400 focus:outline-none transition-all duration-300'
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlassyUIComponentsPage;
