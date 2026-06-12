import React, { useState } from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string; // Used for fallback initials
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  shape?: 'circle' | 'square' | 'hexagon';
  glassBorder?: boolean;
  glassOpacity?: number;
  glowColor?: string; // color of the glassy glow (e.g. #a855f7)
  status?: 'online' | 'offline' | 'away' | 'busy';
  statusPosition?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-24 h-24 text-xl',
  xxl: 'w-32 h-32 text-3xl',
};

const statusColors = {
  online: '#10B981',
  offline: '#6B7280',
  away: '#F59E0B',
  busy: '#EF4444',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  shape = 'circle',
  glassBorder = true,
  glassOpacity = 0.2,
  glowColor = '#a855f7',
  status,
  statusPosition = 'bottom-right',
}) => {
  const [hasError, setHasError] = useState(false);

  // Get initials from name
  const getInitials = () => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const getShapeClasses = () => {
    if (shape === 'hexagon') {
      return 'clip-hexagon';
    }
    if (shape === 'square') {
      return 'rounded-xl';
    }
    return 'rounded-full';
  };

  const getStatusPositionClasses = () => {
    switch (statusPosition) {
      case 'top-right':
        return 'top-0 right-0 transform translate-x-1/4 -translate-y-1/4';
      case 'top-left':
        return 'top-0 left-0 transform -translate-x-1/4 -translate-y-1/4';
      case 'bottom-left':
        return 'bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4';
      case 'bottom-right':
      default:
        return 'bottom-0 right-0 transform translate-x-1/4 translate-y-1/4';
    }
  };

  const getStatusSize = () => {
    switch (size) {
      case 'sm':
        return 'w-2 h-2';
      case 'lg':
        return 'w-3.5 h-3.5';
      case 'xl':
        return 'w-5 h-5 border-2';
      case 'xxl':
        return 'w-6.5 h-6.5 border-2';
      case 'md':
      default:
        return 'w-3 h-3';
    }
  };

  const renderContent = () => {
    if (src && !hasError) {
      return (
        <img
          src={src}
          alt={alt || name}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${getShapeClasses()}`}
        />
      );
    }

    return (
      <div
        className={`w-full h-full flex items-center justify-center font-bold text-white/90 ${getShapeClasses()}`}
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)`,
        }}
      >
        {getInitials()}
      </div>
    );
  };

  const containerStyle = glassBorder
    ? {
        backgroundColor: `rgba(255, 255, 255, ${glassOpacity})`,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        boxShadow: `0 8px 32px 0 rgba(0,0,0,0.2), 0 0 12px ${glowColor}40`,
      }
    : {};

  return (
    <div className='relative inline-block select-none'>
      {/* Outer glassy ring container */}
      <div
        style={containerStyle}
        className={`${sizeMap[size]} ${getShapeClasses()} ${
          glassBorder ? 'p-1 border backdrop-filter backdrop-blur-md' : ''
        } transition-all duration-300`}
      >
        <div className={`w-full h-full overflow-hidden ${getShapeClasses()}`}>
          {renderContent()}
        </div>
      </div>

      {/* Status Dot */}
      {status && (
        <span
          className={`absolute block rounded-full border border-slate-900 ${getStatusSize()} ${getStatusPositionClasses()} z-10`}
          style={{
            backgroundColor: statusColors[status],
            boxShadow: `0 0 8px ${statusColors[status]}80`,
          }}
        />
      )}

      {/* Styles for hex avatar clip-path */}
      {shape === 'hexagon' && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .clip-hexagon {
            clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          }
        `,
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
