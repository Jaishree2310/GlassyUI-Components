import React, { useEffect, useState } from 'react';
import BackToTopButton from './BackToTop';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import {
  AlignLeft,
  AlignStartVertical,
  ArrowRight,
  ArrowUp,
  Box,
  Calendar,
  Contact,
  DollarSign,
  GalleryThumbnails,
  Info,
  Layout,
  MessageSquare,
  Search,
  ShoppingCart,
  Sliders,
  Sparkles,
  ThumbsUpIcon,
  Type,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import BackToTopButton from './BackToTop';

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
      title: 'Toast',
      description: 'Glassmorphic Toast notifications. Click to try them out!',
      icon: <MessageSquare size={22} />,
      onClick: () =>
        navigate('/toast-page/', { state: { fromPage: currentPage } }),
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
      title: 'Glass Shockwave Reveal',
      description: 'Click-to-reveal glass with ripple shockwave animation.',
      icon: <Sparkles size={22} />,
      onClick: () => navigate('/glass-shockwave'),
    },
    {
      title: 'Glass Memory Trail',
      description: 'Interactive glass that remembers cursor movement.',
      icon: <Sparkles size={22} />,
      onClick: () => navigate('/glass-memory-trail'),
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
    <div className='cp-root'>
      {/* Background orbs */}
      <div className='cp-orb cp-orb-1' />
      <div className='cp-orb cp-orb-2' />
      <div className='cp-grid' />

      <BackToTopButton />

      <div className='cp-container'>
        {/* Page header */}
        <div className='cp-hero'>
          <span className='cp-badge'>
            <span className='cp-badge-dot' />
            {filteredData.length} Components
          </span>
          <h1 className='cp-title'>Glassmorphic Components</h1>
          <p className='cp-subtitle'>
            Elevate your UI with beautifully crafted, glass-effect components.
            Modern, sleek, and endlessly customizable.
          </p>

          {/* Search */}
          <div className='cp-search-wrap'>
            <Search size={16} className='cp-search-icon' />
            <input
              className='cp-search'
              placeholder='Search components…'
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
            />
            {searchFilter && (
              <button
                className='cp-search-clear'
                onClick={() => setSearchFilter('')}
              >
                ✕
              </button>
            )}
          </div>
          {searchFilter.trim() && filteredData.length > 0 && (
            <p className='cp-search-result-count'>
              {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}{' '}
              for &quot;{searchFilter.trim()}&quot;
            </p>
          )}
        </div>

        {/* Grid */}
        {filteredData.length === 0 ? (
          <div className='cp-empty'>
            <div className='cp-empty-icon'>◇</div>
            <h2 className='cp-empty-title'>No components found</h2>
            <p className='cp-empty-desc'>Try a different search term.</p>
            <button
              className='cp-empty-btn'
              onClick={() => setSearchFilter('')}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className='cp-grid-layout'>
            {currentComponents.map((comp, i) => (
              <ComponentCard key={i} {...comp} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='cp-pagination'>
            <button
              className='cp-page-btn'
              onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>
            <div className='cp-page-nums'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`cp-page-num${n === currentPage ? ' cp-page-num--active' : ''}`}
                  onClick={() => setCurrentPage(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              className='cp-page-btn'
              onClick={() =>
                setCurrentPage((p: number) => Math.min(totalPages, p + 1))
              }
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
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className='cp-card'
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={
        hovered
          ? {
              transform: 'translateY(-6px)',
              borderColor: 'rgba(124,58,237,0.35)',
              boxShadow:
                '0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.2)',
            }
          : undefined
      }
    >
      <div className='cp-card-shimmer' />
      <div className='cp-card-icon'>{icon}</div>
      <h3 className='cp-card-title'>{title}</h3>
      <p className='cp-card-desc'>{description}</p>
      <div className='cp-card-footer'>
        <span>View component</span>
        <ArrowRight
          size={15}
          className={`cp-card-arrow${hovered ? ' cp-card-arrow--active' : ''}`}
        />
      </div>
    </div>
  );
};

export default GlassyUIComponentsPage;
