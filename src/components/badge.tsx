import React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  content?: string | number;
  variant?: 'dot' | 'count' | 'pill';
  themeColor?: 'blue' | 'green' | 'red' | 'purple' | 'rainbow' | string;
  pulse?: boolean;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'inline';
  glassEffect?: boolean;
  glassOpacity?: number;
}

const themeColorMap = {
  blue: '#3B82F6',
  green: '#10B981',
  red: '#EF4444',
  purple: '#8B5CF6',
  rainbow: 'linear-gradient(45deg, #ff007f, #7f00ff, #00f0ff, #00ff7f)',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  variant = 'count',
  themeColor = 'red',
  pulse = false,
  position = 'top-right',
  glassEffect = true,
  glassOpacity = 0.25,
}) => {
  const isInline = position === 'inline';

  // Get matching style for theme color
  const getThemeBackground = () => {
    if (themeColor in themeColorMap) {
      return themeColorMap[themeColor as keyof typeof themeColorMap];
    }
    return themeColor; // Custom HEX, RGB or Gradient
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3';
      case 'top-left':
        return 'absolute top-0 left-0 transform -translate-x-1/3 -translate-y-1/3';
      case 'bottom-right':
        return 'absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3';
      case 'bottom-left':
        return 'absolute bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3';
      case 'inline':
      default:
        return 'relative inline-flex ml-2';
    }
  };

  const badgeStyle = {
    background: getThemeBackground(),
    boxShadow: `0 2px 10px rgba(0, 0, 0, 0.2), 0 0 8px ${
      themeColor in themeColorMap
        ? themeColorMap[themeColor as keyof typeof themeColorMap]
        : themeColor
    }60`,
  };

  const getGlassyStyles = () => {
    if (glassEffect) {
      return {
        backgroundColor: `rgba(255, 255, 255, ${glassOpacity})`,
        border: '1px solid rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      };
    }
    return badgeStyle;
  };

  const renderBadge = () => {
    if (variant === 'dot') {
      return (
        <span className={`flex h-3 w-3 relative`}>
          {pulse && (
            <span
              className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75'
              style={{ background: getThemeBackground() }}
            />
          )}
          <span
            style={getGlassyStyles()}
            className={`relative inline-flex rounded-full h-3 w-3 border border-slate-950/20`}
          />
        </span>
      );
    }

    const paddingClasses =
      variant === 'pill'
        ? 'px-2 py-0.5 text-[0.68rem]'
        : 'px-1.5 py-0.5 text-[0.62rem] min-w-[1.25rem] h-5 justify-center';

    return (
      <span
        style={getGlassyStyles()}
        className={`inline-flex items-center font-bold leading-none rounded-full text-white border border-white/10 select-none ${paddingClasses}`}
      >
        {content}
      </span>
    );
  };

  if (isInline) {
    return renderBadge();
  }

  return (
    <div className='relative inline-block'>
      {children}
      <div className={`z-10 ${getPositionClasses()}`}>{renderBadge()}</div>
    </div>
  );
};

export default Badge;
