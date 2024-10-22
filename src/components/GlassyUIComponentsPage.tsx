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
  AlignStartVertical,
  GalleryThumbnails,
} from 'lucide-react';
import Accordion from './Accordion';

// Define the ComponentCardProps interface
interface ComponentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  status?: string; // Optional status prop
  children?: React.ReactNode; // Include the children prop
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
}) => (
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

const GlassyUIComponentsPage: React.FC = () => {
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

  const componentsData = [
    {
      title: 'Login',
      description: 'User login component.',
      icon: null,
      onClick: () => navigate('/login'),
    },
    {
      title: 'Sign Up',
      description: 'User registration component.',
      icon: null,
      onClick: () => navigate('/signup'),
    },
    {
      title: 'Toast',
      description: 'Glassmorphic Toast Component. Click the button below to try it out!',
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
      title: 'Contact Form',
      description: 'Contact Form component with glassmorphic styling.',
      icon: <Contact size={24} />,
      onClick: () => navigate('/contact-details'),
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
      title: 'Spinner',
      description: 'Design and customize CSS spinners for your projects.',
      icon: <HiOutlineWrenchScrewdriver size={24} />,
      onClick: () => navigate('/spinner'),
    },
  ];

  const [filteredData, setFilteredData] = useState(componentsData);

  useEffect(() => {
    const data = componentsData.filter(component => {
      if (searchFilter) {
        return component.title.toLowerCase().includes(searchFilter.trim().toLowerCase());
      }
      return true;
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

  return (
    <div className='min-h-screen font-sans bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'>
      <BackToTopButton />
      <div className='container mx-auto px-4 py-8 lg:py-12'>
        <header className='flex justify-between items-center mb-16 px-6 py-4 rounded-lg pl-0'>
          <div
            className='text-3xl lg:text-4xl font-extrabold tracking-tight cursor-pointer hover:text-pink-300 transition-colors duration-300 text-white'
            onClick={() => navigate('/')}
          >
            GlassyUI
          </div>

          <div className='flex items-center bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white w-2/5 rounded-lg shadow-lg overflow-hidden'>
            <input
              className='w-full px-6 py-3 bg-transparent text-white outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300'
              placeholder='Search Components...'
              onChange={e => setSearchFilter(e.target.value)}
            />
            <Search className='mx-4 cursor-pointer text-pink-300 hover:text-pink-400 transition-all duration-300' />
          </div>
        </header>

        <main>
          <h1 className='text-4xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200'>
            Glassmorphic Components
          </h1>
          <p className='text-lg lg:text-xl mb-12 max-w-2xl leading-relaxed'>
            Elevate your UI with our collection of beautifully crafted, glassmorphic components. Perfect for creating modern, sleek interfaces with depth and style.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {currentComponents.map((component, index) => (
              <ComponentCard
                key={index}
                title={component.title}
                description={component.description}
                icon={component.icon}
                onClick={component.onClick}
              />
            ))}
            {filteredData.length === 0 && (
              <section className='bg-white dark:bg-gray-900'>
                <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
                  <div className='mx-auto max-w-screen-sm text-center'>
                    <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-primary-500'>
                      404
                    </h1>
                    <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
                      Something&apos;s missing.
                    </p>
                    <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
                      Sorry, we can&apos;t find that component. You&apos;ll find lots to explore on the home page.
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

          <div className='flex justify-between items-center mt-12'>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`py-2 px-4 text-lg font-bold bg-transparent text-pink-300 rounded-lg hover:bg-pink-200 hover:bg-opacity-30 hover:text-pink-200 transition-all duration-300 ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Prev
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`py-2 px-4 text-lg font-bold bg-transparent text-pink-300 rounded-lg hover:bg-pink-200 hover:bg-opacity-30 hover:text-pink-200 transition-all duration-300 ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
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
