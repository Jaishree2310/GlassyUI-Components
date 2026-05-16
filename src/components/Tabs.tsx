import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Profile', content: 'Your profile information and settings.' },
    { label: 'Dashboard', content: 'Overview of your recent activity.' },
    { label: 'Settings', content: 'Manage your preferences and account.' },
  ];

  const getGlassyClasses = (opacity = 20) =>
    `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;

  return (
    <div className={`${getGlassyClasses(10)} p-4 w-full max-w-md`}>
      {/* Tab Headers */}
      <div className='flex gap-1 mb-4 bg-white/10 rounded-lg p-1'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 text-white
              ${
                activeTab === index
                  ? 'bg-white/30 shadow-md backdrop-blur-md'
                  : 'hover:bg-white/10'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className={`${getGlassyClasses(10)} p-4 text-white text-sm min-h-[80px] flex items-center`}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
