import React, { useState, useRef } from 'react';

interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  bgColor?: string;
  textColor?: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = 'top',
  delay = 200,
  bgColor = 'bg-white/10',
  textColor = 'text-black',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-3';

      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-3';

      case 'left':
        return 'top-1/2 right-full transform -translate-y-1/2 mr-3';

      case 'right':
        return 'top-1/2 left-full transform -translate-y-1/2 ml-3';

      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-3';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'absolute left-1/2 top-full -translate-x-1/2 w-3 h-3 rotate-45';

      case 'bottom':
        return 'absolute left-1/2 bottom-full -translate-x-1/2 w-3 h-3 rotate-45';

      case 'left':
        return 'absolute left-full top-1/2 -translate-y-1/2 w-3 h-3 rotate-45';

      case 'right':
        return 'absolute right-full top-1/2 -translate-y-1/2 w-3 h-3 rotate-45';

      default:
        return '';
    }
  };

  const getGlassyClasses = () => {
    return `
      backdrop-blur-md
      ${bgColor}
      ${textColor}
      border border-white/20
      rounded-xl
      shadow-xl
      transition-all duration-300
      animate-fadeIn
    `;
  };

  return (
    <div
      className='relative inline-block'
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={0}
      aria-describedby='tooltip'
    >
      {children}

      {isVisible && (
        <div
          role='tooltip'
          id='tooltip'
          className={`absolute z-50 px-4 py-2 text-sm whitespace-nowrap ${getPositionClasses()} ${getGlassyClasses()}`}
        >
          {text}

          <div className={`${getArrowClasses()} ${bgColor}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
