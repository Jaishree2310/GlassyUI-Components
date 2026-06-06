import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: '/' | '>' | '-' | React.ReactNode;
  glassOpacity?: number;
  showHomeIcon?: boolean;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '>',
  glassOpacity = 0.1,
  showHomeIcon = true,
  onItemClick,
}) => {
  const renderSeparator = () => {
    if (React.isValidElement(separator)) {
      return separator;
    }
    return (
      <span className='text-white/25 mx-2 text-xs select-none'>
        {separator}
      </span>
    );
  };

  const handleItemClick = (
    e: React.MouseEvent,
    item: BreadcrumbItem,
    index: number,
  ) => {
    if (onItemClick) {
      e.preventDefault();
      onItemClick(item, index);
    }
  };

  return (
    <nav
      aria-label='Breadcrumb'
      style={{
        backgroundColor: `rgba(255, 255, 255, ${glassOpacity})`,
        borderColor: 'rgba(255, 255, 255, 0.12)',
      }}
      className='inline-flex items-center px-4 py-2 border rounded-xl backdrop-filter backdrop-blur-md transition-all duration-300'
    >
      <ol className='flex items-center space-x-1 text-sm text-white/60 font-medium'>
        {/* Optional Home Icon node */}
        {showHomeIcon && (
          <li className='flex items-center'>
            <a
              href='/'
              onClick={e => {
                e.preventDefault();
                if (onItemClick) onItemClick({ label: 'Home', href: '/' }, -1);
              }}
              className='flex items-center text-white/50 hover:text-white transition-colors duration-250'
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </a>
            {items.length > 0 && renderSeparator()}
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className='flex items-center'>
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  onClick={e => handleItemClick(e, item, index)}
                  className='flex items-center hover:text-white transition-colors duration-250'
                >
                  {item.icon && (
                    <span className='mr-1.5 flex items-center'>
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span
                  className={`flex items-center ${isLast ? 'text-white font-semibold' : ''}`}
                >
                  {item.icon && (
                    <span className='mr-1.5 flex items-center'>
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </span>
              )}

              {!isLast && renderSeparator()}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
