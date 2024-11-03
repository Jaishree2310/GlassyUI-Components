import React, { useState } from 'react';

interface TabProps {
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'ghost';
  disabled?: boolean;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='tabs'>
      <div className='tab-list flex border-b border-gray-600'>
        {children.map((tab, index) => {
          const isDisabled = tab.props.disabled;
          return (
            <button
              key={index}
              className={`tab flex-1 text-center py-2 px-4 transition-colors duration-300 ease-in-out rounded-t-lg 
                ${isDisabled ? 'cursor-not-allowed opacity-50' : ''} 
                ${
                  activeTab === index
                    ? tab.props.variant === 'outlined'
                      ? 'bg-transparent border-b-2 border-white-600 text-white-600'
                      : tab.props.variant === 'ghost'
                        ? 'bg-transparent text-white-600'
                        : 'bg-gray-800 text-white font-semibold'
                    : tab.props.variant === 'outlined'
                      ? 'bg-transparent text-gray-300 hover:bg-gray-600'
                      : tab.props.variant === 'ghost'
                        ? 'bg-transparent text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              onClick={() => !isDisabled && setActiveTab(index)} // Disable click if tab is disabled
              disabled={isDisabled}
            >
              {tab.props.icon && <span className='mr-2'>{tab.props.icon}</span>}
              {tab.props.label}
            </button>
          );
        })}
      </div>
      <div className='tab-content mt-4 p-4 bg-gray-800 rounded-lg shadow-md transition-all duration-300'>
        {children[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;
