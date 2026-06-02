import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface GlassyContextProps {
  theme: Theme;
  globalBlur: number;
  globalBgOpacity: number;
  globalBorderOpacity: number;
  setTheme: (theme: Theme) => void;
  setGlobalBlur: (blur: number) => void;
  setGlobalBgOpacity: (opacity: number) => void;
  setGlobalBorderOpacity: (opacity: number) => void;
  resetToDefaults: () => void;
}

const GlassyContext = createContext<GlassyContextProps | undefined>(undefined);

export const useGlassyTheme = () => {
  const context = useContext(GlassyContext);
  if (!context) {
    throw new Error('useGlassyTheme must be used within a GlassyProvider');
  }
  return context;
};

const DEFAULT_BLUR = 12;
const DEFAULT_BG_OPACITY = 0.25;
const DEFAULT_BORDER_OPACITY = 0.15;

export const GlassyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });
  
  const [globalBlur, setGlobalBlur] = useState<number>(() => {
    const saved = localStorage.getItem('globalBlur');
    return saved !== null ? parseFloat(saved) : DEFAULT_BLUR;
  });

  const [globalBgOpacity, setGlobalBgOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('globalBgOpacity');
    return saved !== null ? parseFloat(saved) : DEFAULT_BG_OPACITY;
  });

  const [globalBorderOpacity, setGlobalBorderOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('globalBorderOpacity');
    return saved !== null ? parseFloat(saved) : DEFAULT_BORDER_OPACITY;
  });

  const resetToDefaults = () => {
    setGlobalBlur(DEFAULT_BLUR);
    setGlobalBgOpacity(DEFAULT_BG_OPACITY);
    setGlobalBorderOpacity(DEFAULT_BORDER_OPACITY);
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Theme setup
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light-theme'); // Cleaning up old class if exists
    } else {
      root.classList.remove('dark');
      root.classList.add('light-theme'); // Some old styles rely on this
    }
    localStorage.setItem('theme', theme);

    // CSS Variables setup
    root.style.setProperty('--glass-blur', `${globalBlur}px`);
    root.style.setProperty('--glass-bg-opacity', `${globalBgOpacity}`);
    root.style.setProperty('--glass-border-opacity', `${globalBorderOpacity}`);

    localStorage.setItem('globalBlur', globalBlur.toString());
    localStorage.setItem('globalBgOpacity', globalBgOpacity.toString());
    localStorage.setItem('globalBorderOpacity', globalBorderOpacity.toString());

  }, [theme, globalBlur, globalBgOpacity, globalBorderOpacity]);

  return (
    <GlassyContext.Provider
      value={{
        theme,
        globalBlur,
        globalBgOpacity,
        globalBorderOpacity,
        setTheme,
        setGlobalBlur,
        setGlobalBgOpacity,
        setGlobalBorderOpacity,
        resetToDefaults,
      }}
    >
      {children}
    </GlassyContext.Provider>
  );
};
