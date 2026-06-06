import React from 'react';
import { X } from 'lucide-react';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  themeColor?: string; // highlight selection color (e.g. #a855f7)
  icon?: React.ReactNode;
  glassOpacity?: number;
}

const sizeMap = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-1.5 text-base gap-2',
};

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onSelect,
  onDelete,
  size = 'md',
  themeColor = '#a855f7',
  icon,
  glassOpacity = 0.12,
}) => {
  const isClickable = typeof onSelect === 'function';
  const isDeleteable = typeof onDelete === 'function';

  const getStyle = () => {
    if (selected) {
      return {
        backgroundColor: themeColor,
        borderColor: themeColor,
        boxShadow: `0 4px 12px ${themeColor}40`,
        color: '#ffffff',
      };
    }
    return {
      backgroundColor: `rgba(255, 255, 255, ${glassOpacity})`,
      borderColor: 'rgba(255, 255, 255, 0.15)',
      color: 'rgba(255, 255, 255, 0.8)',
    };
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    if (isClickable) {
      e.stopPropagation();
      onSelect!();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    if (isDeleteable) {
      e.stopPropagation();
      onDelete!();
    }
  };

  return (
    <div
      onClick={handleSelectClick}
      style={getStyle()}
      className={`inline-flex items-center border font-semibold rounded-full select-none backdrop-filter backdrop-blur-md transition-all duration-300 ${
        sizeMap[size]
      } ${isClickable ? 'cursor-pointer hover:bg-white/20 hover:scale-102 hover:text-white' : ''}`}
    >
      {/* Icon node */}
      {icon && <span className='flex items-center justify-center'>{icon}</span>}

      {/* Label Text */}
      <span className='truncate'>{label}</span>

      {/* Dismiss cross action */}
      {isDeleteable && (
        <button
          onClick={handleDeleteClick}
          className='p-0.5 rounded-full hover:bg-white/20 text-white/50 hover:text-white transition-all cursor-pointer'
        >
          <X size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
        </button>
      )}
    </div>
  );
};

export default Chip;
