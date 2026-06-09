import React, { useState } from 'react';
import { useGlassyTheme } from './GlassyProvider';
import {
  Palette,
  X,
  Sun,
  Moon,
  RefreshCw,
  Sliders,
  Settings2,
} from 'lucide-react';

const ThemeCustomizer: React.FC = () => {
  const {
    settings,
    setTheme,
    setGlobalBlur,
    setGlobalBgOpacity,
    setGlobalBorderOpacity,
    resetSettings,
  } = useGlassyTheme();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='fixed bottom-6 left-6 z-[2000] font-sans'>
      {/* Expanded Control Panel */}
      {isOpen && (
        <div className='mb-4 w-80 p-5 rounded-2xl border transition-all duration-300 shadow-2xl backdrop-blur-xl bg-slate-900/80 dark:bg-slate-900/80 bg-white/80 border-slate-200/20 dark:border-white/10 text-slate-900 dark:text-white'>
          {/* Header */}
          <div className='flex items-center justify-between pb-3 mb-4 border-b border-slate-200/20 dark:border-white/10'>
            <div className='flex items-center gap-2'>
              <Palette className='w-5 h-5 text-violet-500' />
              <h3 className='font-bold text-sm tracking-wide'>
                Glassy Customizer
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='p-1 rounded-full hover:bg-slate-200/30 dark:hover:bg-white/10 text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors'
              aria-label='Close Customizer'
            >
              <X size={16} />
            </button>
          </div>

          {/* Controls */}
          <div className='space-y-4'>
            {/* Mode Switcher */}
            <div>
              <label className='block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50 mb-2'>
                Theme Mode
              </label>
              <div className='grid grid-cols-2 gap-2 bg-slate-200/40 dark:bg-black/30 p-1 rounded-xl border border-slate-200/20 dark:border-white/5'>
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    settings.theme === 'light'
                      ? 'bg-white text-violet-600 shadow-sm'
                      : 'text-slate-600 dark:text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Sun size={14} />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    settings.theme === 'dark'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Moon size={14} />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Blur Slider */}
            <div>
              <div className='flex justify-between text-xs mb-1.5'>
                <span className='font-semibold text-slate-500 dark:text-white/60'>
                  Backdrop Blur
                </span>
                <span className='font-bold text-violet-500'>
                  {settings.globalBlur}px
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <Sliders
                  size={14}
                  className='text-slate-400 dark:text-white/40'
                />
                <input
                  type='range'
                  min='0'
                  max='40'
                  step='1'
                  value={settings.globalBlur}
                  onChange={e => setGlobalBlur(Number(e.target.value))}
                  className='flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-white/10 accent-violet-500'
                />
              </div>
            </div>

            {/* Background Opacity */}
            <div>
              <div className='flex justify-between text-xs mb-1.5'>
                <span className='font-semibold text-slate-500 dark:text-white/60'>
                  Glass Opacity
                </span>
                <span className='font-bold text-violet-500'>
                  {Math.round(settings.globalBgOpacity * 100)}%
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <Settings2
                  size={14}
                  className='text-slate-400 dark:text-white/40'
                />
                <input
                  type='range'
                  min='0.05'
                  max='0.9'
                  step='0.05'
                  value={settings.globalBgOpacity}
                  onChange={e => setGlobalBgOpacity(Number(e.target.value))}
                  className='flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-white/10 accent-violet-500'
                />
              </div>
            </div>

            {/* Border Opacity */}
            <div>
              <div className='flex justify-between text-xs mb-1.5'>
                <span className='font-semibold text-slate-500 dark:text-white/60'>
                  Border Opacity
                </span>
                <span className='font-bold text-violet-500'>
                  {Math.round(settings.globalBorderOpacity * 100)}%
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <Settings2
                  size={14}
                  className='text-slate-400 dark:text-white/40'
                />
                <input
                  type='range'
                  min='0.05'
                  max='0.9'
                  step='0.05'
                  value={settings.globalBorderOpacity}
                  onChange={e => setGlobalBorderOpacity(Number(e.target.value))}
                  className='flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-white/10 accent-violet-500'
                />
              </div>
            </div>
          </div>

          {/* Reset Action */}
          <button
            onClick={resetSettings}
            className='w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all border border-slate-200/50 dark:border-white/10 hover:bg-slate-200/30 dark:hover:bg-white/5 active:scale-95 text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white'
          >
            <RefreshCw size={12} />
            <span>Reset Defaults</span>
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative group'
        aria-label='Toggle Glass Customizer'
        title='Glass Customizer'
      >
        <Palette
          size={24}
          className={
            isOpen
              ? 'rotate-45 transition-transform duration-300'
              : 'transition-transform duration-300'
          }
        />
        {!isOpen && (
          <span className='absolute left-full ml-3 px-2.5 py-1 rounded bg-slate-900 dark:bg-slate-900 bg-white border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none'>
            Customize Theme
          </span>
        )}
      </button>
    </div>
  );
};

export default ThemeCustomizer;
