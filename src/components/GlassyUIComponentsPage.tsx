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
  Search,
  Calendar,
  AlignStartVertical,
  ShoppingCart,
  GalleryThumbnails,
} from 'lucide-react';
import BackToTopButton from './BackToTop';

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

// Component Card component
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
    // ...additional components
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
            Elevate your UI with our collection of beautifully crafted,
            glassmorphic components. Perfect for creating sleek and modern
            interfaces.
          </p>

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {currentComponents.map((component, index) => (
              <ComponentCard
                key={index}
                title={component.title}
                description={component.description}
                icon={component.icon}
                onClick={component.onClick}
              />
            ))}
          </div>

          <div className='flex justify-center mt-8'>
            <button
              className='px-4 py-2 mx-2 bg-pink-300 text-gray-900 rounded-lg hover:bg-pink-400'
              disabled={currentPage === 1}
              onClick={prevPage}
            >
              Previous
            </button>
            <button
              className='px-4 py-2 mx-2 bg-pink-300 text-gray-900 rounded-lg hover:bg-pink-400'
              disabled={currentPage === totalPages}
              onClick={nextPage}
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
