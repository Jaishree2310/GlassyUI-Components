import React, { useEffect, useState } from 'react';
import BackToTopButton from './BackToTop';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

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
  Sparkles,
  MousePointer,
} from 'lucide-react';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';

interface ComponentCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const GlassyUIComponentsPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() => {
    return Number(searchParams.get('page')) || 1;
  });

  const [searchFilter, setSearchFilter] = useState('');
  const componentsPerPage = 9;

  const componentsData = [
    {
      title: 'Tooltip',
      description:
        'A context-linked hover popover component featuring a frosted glass background aesthetic.',
      icon: <MessageSquare size={24} />,
      onClick: () =>
        navigate('/tooltip-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Toast',
      description:
        'Glassmorphic Toast Component. Click the button below to try it out!',
      icon: <MessageSquare size={24} />,
      onClick: () =>
        navigate('/toast-page/', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Sliders',
      description: 'Elegant sliders with glassmorphic styling.',
      icon: <Sliders size={24} />,
      onClick: () =>
        navigate('/slider-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Speed Dial',
      description: 'Speed dial with glassmorphism effect.',
      icon: <Info size={24} />,
      onClick: () =>
        navigate('/speed-dial-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Buttons',
      description: 'Sleek, customizable buttons with glassmorphic styling.',
      icon: <Box size={22} />,
      onClick: () =>
        navigate('/button-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Cards',
      description: 'Versatile content containers with a frosted glass effect.',
      icon: <Layout size={22} />,
      onClick: () =>
        navigate('/card-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Inputs',
      description: 'Elegant input fields with a glass-like appearance.',
      icon: <Type size={22} />,
      onClick: () =>
        navigate('/input-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Modals',
      description: 'Eye-catching dialog boxes with glassmorphism effects.',
      icon: <MessageSquare size={22} />,
      onClick: () =>
        navigate('/modal-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Sliders',
      description: 'Elegant sliders with glassmorphic styling.',
      icon: <Sliders size={22} />,
      onClick: () =>
        navigate('/slider-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Progress Bars',
      description: 'Stylish progress indicators with a glass-like finish.',
      icon: <Sliders size={22} />,
      onClick: () =>
        navigate('/progress-bar-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Tooltip',
      description: 'Accessible tooltips with glassmorphic styling.',
      icon: <Info size={22} />,
      onClick: () =>
        navigate('/tooltip-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Speed Dial',
      description: 'Speed dial with glassmorphism effect.',
      icon: <Info size={22} />,
      onClick: () =>
        navigate('/speed-dial-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Navigation',
      description: 'Sleek navigation components with a frosted glass look.',
      icon: <ArrowRight size={22} />,
      onClick: () =>
        navigate('/navigation-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Popups',
      description:
        'Attention-grabbing popup notifications with glassmorphic styling.',
      icon: <MessageSquare size={22} />,
      onClick: () =>
        navigate('/popup-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Textarea',
      description: 'Multi-line input fields with elegant glassmorphic design.',
      icon: <AlignLeft size={22} />,
      onClick: () =>
        navigate('/textarea-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Back to Top',
      description: 'A button that scrolls the page back to the top smoothly.',
      icon: <ArrowUp size={22} />,
      onClick: () =>
        navigate('/back-to-top-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Pricing Plans',
      description: 'Choose a pricing plan that suits your needs.',
      icon: <DollarSign size={22} />,
      onClick: () =>
        navigate('/pricing-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Dropdown Menu',
      description: 'Select an option from the dropdown menu.',
      icon: <AlignLeft size={22} />,
      onClick: () =>
        navigate('/dropdown-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Authentication Cards',
      description: 'Sign-in and sign-up cards with frosted glass effect.',
      icon: <Layout size={22} />,
      onClick: () =>
        navigate('/authentication-card', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Accordion',
      description: 'Collapsible content sections with glassmorphic styling.',
      icon: <Layout size={22} />,
      onClick: () =>
        navigate('/accordion-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Pagination',
      description: 'Pagination component with glassmorphic styling.',
      icon: <Layout size={22} />,
      onClick: () =>
        navigate('/pagination-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Testimonial',
      description: 'Beautiful testimonial cards with glassmorphic styling.',
      icon: <ThumbsUpIcon size={22} />,
      onClick: () =>
        navigate('/testimonial-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Contact Form',
      description: 'Contact form component with glassmorphic styling.',
      icon: <Contact size={22} />,
      onClick: () =>
        navigate('/contact-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Product Card',
      description:
        'E-Commerce product card component with glassmorphic styling.',
      icon: <ShoppingCart size={22} />,
      onClick: () =>
        navigate('/product-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Statistic',
      description: 'Display key metrics with glassmorphic statistic cards.',
      icon: <AlignStartVertical size={22} />,
      onClick: () =>
        navigate('/statistic-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Gallery',
      description: 'Image gallery component with glassmorphic styling.',
      icon: <GalleryThumbnails size={22} />,
      onClick: () =>
        navigate('/gallery-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Calendar',
      description: 'Calendar component with glassmorphic styling.',
      icon: <Calendar size={22} />,
      onClick: () =>
        navigate('/calendar-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Checkbox',
      description: 'Checkbox component with glassmorphic styling.',
      icon: <Layout size={22} />,
      onClick: () =>
        navigate('/checkbox', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Spinner',
      description: 'Design and customize CSS spinners for your projects.',
      icon: <HiOutlineWrenchScrewdriver size={22} />,
      onClick: () => navigate('/spinner', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Stepper',
      description:
        'A customizable, responsive multi-step wizard and progress indicator styled with premium glassmorphism.',
      icon: <AlignStartVertical size={22} />,
      onClick: () =>
        navigate('/stepper-details', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Glass Generator',
      description: 'Create stunning glassmorphic effects with a visual editor.',
      icon: <Sparkles size={22} />,
      onClick: () =>
        navigate('/generator', { state: { fromPage: currentPage } }),
    },
    {
      title: 'Adaptive Intelligence',
      description:
        'Live environment-aware glass styling with real-time contrast and glow adaptation.',
      icon: <Sparkles size={22} />,
      onClick: () =>
        navigate('/adaptive-background-intelligence', {
          state: { fromPage: currentPage },
        }),
    },
    {
      title: 'Animated Cursor',
      description:
        'A customizable animated cursor that smoothly follows the pointer with hover animations and glassmorphic styling.',
      icon: <MousePointer size={22} />,
      onClick: () =>
        navigate('/animated-cursor', { state: { fromPage: currentPage } }),
    },
  ];
  const [filteredData, setFilteredData] = useState(componentsData);

  useEffect(() => {
    const pageInUrl = Number(searchParams.get('page')) || 1;
    if (pageInUrl !== currentPage) {
      setSearchParams({ page: String(currentPage) }, { replace: true });
    }
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const q = searchFilter.trim().toLowerCase();
      setFilteredData(
        q
          ? componentsData.filter(
              c =>
                c.title.toLowerCase().includes(q) ||
                c.description.toLowerCase().includes(q),
            )
          : componentsData,
      );
      if (q) setCurrentPage(1);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchFilter]);

  const totalPages = Math.ceil(filteredData.length / componentsPerPage);
  const currentComponents = filteredData.slice(
    (currentPage - 1) * componentsPerPage,
    currentPage * componentsPerPage,
  );

  return (
    <div className='relative min-h-screen pt-32 pb-20 px-6 sm:px-10 lg:px-16 w-full max-w-7xl mx-auto'>
      {/* Background orbs */}
      <div className='cp-orb cp-orb-1' />
      <div className='cp-orb cp-orb-2' />
      <div className='cp-grid' />

      <BackToTopButton />

      <div className='relative z-10 w-full'>
        {/* Page header */}
        <div className='text-center mb-16 relative z-10'>
          <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-semibold text-purple-300 mb-6'>
            <span className='w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse' />
            {filteredData.length} Components
          </span>
          <h1 className='text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent leading-[1.1] pb-2'>
            Glassmorphic Components
          </h1>
          <p className='text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed'>
            Elevate your UI with beautifully crafted, glass-effect components.
            Modern, sleek, and endlessly customizable.
          </p>

          {/* Search */}
          <div className='relative max-w-md mx-auto'>
            <Search
              size={18}
              className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
            />
            <input
              className='w-full py-3.5 pl-11 pr-11 bg-white/5 border border-white/10 rounded-2xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/40 focus:bg-white/10 transition-all shadow-lg backdrop-blur-md'
              placeholder='Search components…'
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
            />
            {searchFilter && (
              <button
                className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors'
                onClick={() => setSearchFilter('')}
              >
                ✕
              </button>
            )}
          </div>
          {searchFilter.trim() && filteredData.length > 0 && (
            <p className='text-sm text-slate-400/80 mt-3'>
              {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}{' '}
              for &quot;{searchFilter.trim()}&quot;
            </p>
          )}
        </div>

        {/* Grid */}
        {filteredData.length === 0 ? (
          <div className='text-center py-20 px-6'>
            <div className='text-6xl text-slate-800 mb-6'>◇</div>
            <h2 className='text-2xl font-bold text-slate-300 mb-2'>
              No components found
            </h2>
            <p className='text-slate-500 mb-8'>Try a different search term.</p>
            <button
              className='px-6 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-300 font-semibold hover:bg-purple-500/20 transition-colors'
              onClick={() => setSearchFilter('')}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10'>
            {currentComponents.map((comp, i) => (
              <ComponentCard key={i} {...comp} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-3 mt-16 relative z-10'>
            <button
              className='px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold transition-all hover:bg-purple-500/15 hover:border-purple-500/30 hover:text-purple-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:hover:text-slate-300'
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>
            <div className='hidden sm:flex gap-1.5'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`w-9 h-9 rounded-lg border text-sm font-semibold transition-all flex items-center justify-center ${
                    n === currentPage
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-100'
                  }`}
                  onClick={() => setCurrentPage(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              className='px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold transition-all hover:bg-purple-500/15 hover:border-purple-500/30 hover:text-purple-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:hover:text-slate-300'
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <div
      className='relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col gap-4 group hover:-translate-y-1.5 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.3)]'
      onClick={onClick}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />

      <div className='w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all duration-300'>
        {icon}
      </div>
      <h3 className='text-lg font-bold text-slate-100 m-0'>{title}</h3>
      <p className='text-sm text-slate-400 leading-relaxed m-0 flex-1'>
        {description}
      </p>

      <div className='flex items-center gap-1.5 text-sm font-semibold text-purple-400 mt-2'>
        <span>View component</span>
        <ArrowRight
          size={15}
          className='group-hover:translate-x-1 transition-transform duration-300'
        />
      </div>
    </div>
  );
};

export default GlassyUIComponentsPage;
