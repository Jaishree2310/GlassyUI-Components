import React, { useState } from 'react';
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
} from 'lucide-react';
import BackToTopButton from './BackToTop';

interface ComponentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  status?: string;
  children?: React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  description,
  icon,
  onClick,
  status,
  children,
}) => {
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
      title: 'Testimonial',
      description: 'Testimonial component with glassmorphic styling.',
      icon: <ThumbsUpIcon size={24} />,
      onClick: () => navigate('/testimonial-details'),
    },
  ];

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
        <header className='flex justify-between items-center mb-16'>
          <div
            className='text-3xl lg:text-4xl font-bold tracking-tight cursor-pointer hover:text-pink-200 transition-colors duration-300'
            onClick={() => navigate('/')}
          >
            GlassyUI
          </div>
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
