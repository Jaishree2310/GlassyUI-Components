import React from 'react';

export interface TabItem {
  label: string;
  id: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onChange: (tabId: string) => void;
  variant?: 'pill' | 'underline' | 'glass';
  glassOpacity?: number; // base white background opacity (0.05 to 0.4)
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl';
  activeColor?: string; // active highlight color (e.g. #a855f7)
  fullWidth?: boolean;
}

const blurMap = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId,
  onChange,
  variant = 'glass',
  glassOpacity = 0.15,
  blurIntensity = 'lg',
  activeColor = '#a855f7',
  fullWidth = false,
}) => {
  const blurClass = blurMap[blurIntensity];

  const getContainerStyle = () => {
    if (variant === 'glass') {
      return {
        backgroundColor: `rgba(255, 255, 255, ${glassOpacity})`,
        borderColor: 'rgba(255, 255, 255, 0.15)',
      };
    }
    return {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    };
  };

  return (
    <div
      style={getContainerStyle()}
      className={`inline-flex items-center p-1.5 rounded-xl border backdrop-filter ${blurClass} ${
        fullWidth ? 'w-full flex' : ''
      } transition-all duration-300`}
    >
      {tabs.map(tab => {
        const isActive = tab.id === activeTabId;

        const getTabStyle = () => {
          if (isActive) {
            if (variant === 'pill') {
              return {
                backgroundColor: activeColor,
                color: '#ffffff',
                boxShadow: `0 4px 14px ${activeColor}50`,
              };
            }
            if (variant === 'underline') {
              return {
                color: '#ffffff',
                borderBottomColor: activeColor,
              };
            }
            // glass variant active style
            return {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
            };
          }
          return {
            color: 'rgba(255, 255, 255, 0.6)',
          };
        };

        const getTabClasses = () => {
          const base =
            'flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer select-none';
          const underlineVariant =
            variant === 'underline'
              ? 'border-b-2 rounded-none hover:text-white'
              : '';
          const pillOrGlassVariant =
            variant === 'pill' || variant === 'glass'
              ? 'border border-transparent hover:bg-white/10 hover:text-white'
              : '';
          const alignment = fullWidth ? 'flex-1' : '';
          return `${base} ${underlineVariant} ${pillOrGlassVariant} ${alignment}`;
        };

        return (
          <div
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={getTabStyle()}
            className={getTabClasses()}
          >
            {tab.icon && <span className='flex items-center'>{tab.icon}</span>}
            <span>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
