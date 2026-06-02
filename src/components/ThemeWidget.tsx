import React, { useState } from 'react';
import { useGlassyTheme } from './GlassyProvider';

const ThemeWidget: React.FC = () => {
  const {
    theme,
    globalBlur,
    globalBgOpacity,
    globalBorderOpacity,
    setTheme,
    setGlobalBlur,
    setGlobalBgOpacity,
    setGlobalBorderOpacity,
    resetToDefaults,
  } = useGlassyTheme();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-72 p-6 rounded-2xl bg-glass backdrop-blur-glassy border border-glass-border shadow-xl text-black dark:text-white transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Theme Settings</h3>
            <button 
              onClick={resetToDefaults}
              className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="mb-6 flex justify-between items-center">
            <span className="text-sm font-medium">Mode</span>
            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setTheme('light')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  theme === 'light' ? 'bg-white shadow text-black' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  theme === 'dark' ? 'bg-gray-800 shadow text-white' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          {/* Blur Slider */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <label htmlFor="blur-range">Blur Radius</label>
              <span>{globalBlur}px</span>
            </div>
            <input
              id="blur-range"
              type="range"
              min="0"
              max="40"
              step="1"
              value={globalBlur}
              onChange={(e) => setGlobalBlur(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Background Opacity Slider */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <label htmlFor="bg-opacity-range">Bg Opacity</label>
              <span>{globalBgOpacity.toFixed(2)}</span>
            </div>
            <input
              id="bg-opacity-range"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={globalBgOpacity}
              onChange={(e) => setGlobalBgOpacity(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Border Opacity Slider */}
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <label htmlFor="border-opacity-range">Border Opacity</label>
              <span>{globalBorderOpacity.toFixed(2)}</span>
            </div>
            <input
              id="border-opacity-range"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={globalBorderOpacity}
              onChange={(e) => setGlobalBorderOpacity(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-glass backdrop-blur-glassy border border-glass-border shadow-lg hover:scale-105 transition-transform text-black dark:text-white"
        aria-label="Toggle Theme Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          )}
          {!isOpen && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
        </svg>
      </button>
    </div>
  );
};

export default ThemeWidget;
