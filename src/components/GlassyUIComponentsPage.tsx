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
  Calendar,
  AlignStartVertical,
  ShoppingCart,
  GalleryThumbnails,
  PanelTop, // icon for Tabs
  Sparkles,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState('');
  const componentsPerPage = 9;

  const componentsData = [
    {
      title: 'Tooltip',
      description:
        'A context-linked hover popover component featuring a frosted glass background aesthetic.',
      icon: <MessageSquare size={24} />,
      onClick: () => navigate('/tooltip-details'),
    },
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
      icon: <Box size={22} />,
      onClick: () => navigate('/button-details'),
    },
    {
      title: 'Cards',
      description: 'Versatile content containers with a frosted glass effect.',
      icon: <Layout size={22} />,
      onClick: () => navigate('/card-details'),
    },
    {
      title: 'Inputs',
      description: 'Elegant input fields with a glass-like appearance.',
      icon: <Type size={22} />,
      onClick: () => navigate('/input-details'),
    },
    {
      title: 'Modals',
      description: 'Eye-catching dialog boxes with glassmorphism effects.',
      icon: <MessageSquare size={22} />,
      onClick: () => navigate('/modal-details'),
    },
    {
      title: 'Toast',
      description: 'Glassmorphic Toast notifications. Click to try them out!',
      icon: <MessageSquare size={22} />,
      onClick: () => navigate('/toast-page/'),
    },
    {
      title: 'Sliders',
      description: 'Elegant sliders with glassmorphic styling.',
      icon: <Sliders size={22} />,
      onClick: () => navigate('/slider-details'),
    },
    {
      title: 'Progress Bars',
      description: 'Stylish progress indicators with a glass-like finish.',
      icon: <Sliders size={22} />,
      onClick: () => navigate('/progress-bar-details'),
    },
    {
      title: 'Tooltip',
      description: 'Accessible tooltips with glassmorphic styling.',
      icon: <Info size={22} />,
      onClick: () => navigate('/tooltip-details'),
    },
    {
      title: 'Speed Dial',
      description: 'Speed dial with glassmorphism effect.',
      icon: <Info size={22} />,
      onClick: () => navigate('/speed-dial-details'),
    },
    {
      title: 'Navigation',
      description: 'Sleek navigation components with a frosted glass look.',
      icon: <ArrowRight size={22} />,
      onClick: () => navigate('/navigation-details'),
    },
    {
      title: 'Popups',
      description:
        'Attention-grabbing popup notifications with glassmorphic styling.',
      icon: <MessageSquare size={22} />,
      onClick: () => navigate('/popup-details'),
    },
    {
      title: 'Textarea',
      description: 'Multi-line input fields with elegant glassmorphic design.',
      icon: <AlignLeft size={22} />,
      onClick: () => navigate('/textarea-details'),
    },
    {
      title: 'Back to Top',
      description: 'A button that scrolls the page back to the top smoothly.',
      icon: <ArrowUp size={22} />,
      onClick: () => navigate('/back-to-top-details'),
    },
    {
      title: 'Pricing Plans',
      description: 'Choose a pricing plan that suits your needs.',
      icon: <DollarSign size={22} />,
      onClick: () => navigate('/pricing-details'),
    },
    {
      title: 'Dropdown Menu',
      description: 'Select an option from the dropdown menu.',
      icon: <AlignLeft size={22} />,
      onClick: () => navigate('/dropdown-details'),
    },
    {
      title: 'Authentication Cards',
      description: 'Sign-in and sign-up cards with frosted glass effect.',
      icon: <Layout size={22} />,
      onClick: () => navigate('/authentication-card'),
    },
    {
      title: 'Accordion',
      description: 'Collapsible content sections with glassmorphic styling.',
      icon: <Layout size={22} />,
      onClick: () => navigate('/accordion-details'),
    },
    {
      title: 'Pagination',
      description: 'Pagination component with glassmorphic styling.',
      icon: <Layout size={22} />,
      onClick: () => navigate('/pagination-details'),
    },
    {
      title: 'Testimonial',
      description: 'Beautiful testimonial cards with glassmorphic styling.',
      icon: <ThumbsUpIcon size={22} />,
      onClick: () => navigate('/testimonial-details'),
    },
    {
      title: 'Contact Form',
      description: 'Contact form component with glassmorphic styling.',
      icon: <Contact size={22} />,
      onClick: () => navigate('/contact-details'),
    },
    {
      title: 'Product Card',
      description:
        'E-Commerce product card component with glassmorphic styling.',
      icon: <ShoppingCart size={22} />,
      onClick: () => navigate('/product-details'),
    },
    {
      title: 'Statistic',
      description: 'Display key metrics with glassmorphic statistic cards.',
      icon: <AlignStartVertical size={22} />,
      onClick: () => navigate('/statistic-details'),
    },
    {
      title: 'Gallery',
      description: 'Image gallery component with glassmorphic styling.',
      icon: <GalleryThumbnails size={22} />,
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
      icon: <Calendar size={22} />,
      onClick: () => navigate('/calendar-details'),
    },
    {
      title: 'Checkbox',
      description: 'Checkbox component with glassmorphic styling.',
      icon: <Layout size={22} />,
      onClick: () => navigate('/checkbox'),
    },
    {
      title: 'Spinner',
      description: 'Design and customize CSS spinners for your projects.',
      icon: <HiOutlineWrenchScrewdriver size={22} />,
      onClick: () => navigate('/spinner'),
    },
    // ── NEW ──
    {
      title: 'Tabs',
      description:
        'Flexible tab switcher with default, pill, underline, and vertical variants — all with a frosted glass look.',
      icon: <PanelTop size={24} />,
      onClick: () => navigate('/tabs-details'),
    {
      title: 'Stepper',
      description:
        'A customizable, responsive multi-step wizard and progress indicator styled with premium glassmorphism.',
      icon: <AlignStartVertical size={22} />,
      onClick: () => navigate('/stepper-details'),
    },
    {
      title: 'Glass Generator',
      description: 'Create stunning glassmorphic effects with a visual editor.',
      icon: <Sparkles size={22} />,
      onClick: () => navigate('/generator'),
    },
    {
      title: 'Adaptive Intelligence',
      description:
        'Live environment-aware glass styling with real-time contrast and glow adaptation.',
      icon: <Sparkles size={22} />,
      onClick: () => navigate('/adaptive-background-intelligence'),
    },
  ];

  const [filteredData, setFilteredData] = useState(componentsData);

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
      setCurrentPage(1);
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
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
