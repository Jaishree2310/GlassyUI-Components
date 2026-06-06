import React from 'react';
import { X } from 'lucide-react';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  width?: string; // Sidebar width (e.g. '300px', '80vw')
  glassOpacity?: number;
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  showOverlay?: boolean;
}

const blurMap = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  position = 'left',
  width = '320px',
  glassOpacity = 0.2,
  blurIntensity = 'xl',
  children,
  showOverlay = true,
}) => {
  const blurClass = blurMap[blurIntensity];
  const isLeft = position === 'left';

  const sidebarStyle = {
    width: width,
    backgroundColor: `rgba(15, 23, 42, calc(0.3 + ${glassOpacity}))`,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    transform: isOpen
      ? 'translateX(0)'
      : isLeft
        ? 'translateX(-100%)'
        : 'translateX(100%)',
    boxShadow: isOpen
      ? isLeft
        ? '10px 0 30px rgba(0, 0, 0, 0.4)'
        : '-10px 0 30px rgba(0, 0, 0, 0.4)'
      : 'none',
  };

  return (
    <>
      {/* Overlay Backdrop */}
      {showOverlay && isOpen && (
        <div
          onClick={onClose}
          className='fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto'
        />
      )}

      {/* Drawer Container Panel */}
      <div
        style={sidebarStyle}
        className={`fixed top-0 bottom-0 z-50 flex flex-col border-y-0 backdrop-filter ${blurClass} transition-transform duration-300 ease-in-out ${
          isLeft ? 'left-0 border-r border-l-0' : 'right-0 border-l border-r-0'
        }`}
      >
        {/* Header toolbar */}
        <div className='flex items-center justify-between p-5 border-b border-white/10'>
          <div className='flex-1' />
          <button
            onClick={onClose}
            className='p-1.5 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200'
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic content scroll wrapper */}
        <div className='flex-1 overflow-y-auto p-6 scrollbar-thin'>
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
