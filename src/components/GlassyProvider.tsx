import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface GlassyThemeSettings {
  theme: ThemeMode;
  globalBlur: number;
  globalBgOpacity: number;
  globalBorderOpacity: number;
}

interface GlassyContextProps {
  settings: GlassyThemeSettings;
  setTheme: (theme: ThemeMode) => void;
  setGlobalBlur: (blur: number) => void;
  setGlobalBgOpacity: (opacity: number) => void;
  setGlobalBorderOpacity: (opacity: number) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: GlassyThemeSettings = {
  theme: 'dark',
  globalBlur: 16,
  globalBgOpacity: 0.2,
  globalBorderOpacity: 0.15,
};

const GlassyContext = createContext<GlassyContextProps | undefined>(undefined);

export const GlassyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<GlassyThemeSettings>(() => {
    const saved = localStorage.getItem('glassy-theme-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          theme: parsed.theme === 'light' ? 'light' : 'dark',
          globalBlur:
            typeof parsed.globalBlur === 'number'
              ? parsed.globalBlur
              : DEFAULT_SETTINGS.globalBlur,
          globalBgOpacity:
            typeof parsed.globalBgOpacity === 'number'
              ? parsed.globalBgOpacity
              : DEFAULT_SETTINGS.globalBgOpacity,
          globalBorderOpacity:
            typeof parsed.globalBorderOpacity === 'number'
              ? parsed.globalBorderOpacity
              : DEFAULT_SETTINGS.globalBorderOpacity,
        };
      } catch (e) {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Apply Theme selectors
    if (settings.theme === 'dark') {
      root.classList.add('dark');
      body.classList.remove('light-theme');
      root.style.setProperty('--glass-bg-rgb', '15, 23, 42'); // slate-900 for dark mode glass
      root.style.setProperty('--glass-border-rgb', '255, 255, 255');
    } else {
      root.classList.remove('dark');
      body.classList.add('light-theme');
      root.style.setProperty('--glass-bg-rgb', '255, 255, 255'); // white for light mode glass
      root.style.setProperty('--glass-border-rgb', '255, 255, 255');
    }

    // Apply Numeric values to CSS variables
    root.style.setProperty('--glass-blur', `${settings.globalBlur}px`);
    root.style.setProperty('--glass-bg-opacity', `${settings.globalBgOpacity}`);
    root.style.setProperty(
      '--glass-border-opacity',
      `${settings.globalBorderOpacity}`,
    );

    // Persist to local storage
    localStorage.setItem('glassy-theme-settings', JSON.stringify(settings));
    localStorage.setItem('theme', settings.theme); // Sync legacy theme key if used
  }, [settings]);

  const setTheme = (theme: ThemeMode) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const setGlobalBlur = (globalBlur: number) => {
    setSettings(prev => ({ ...prev, globalBlur }));
  };

  const setGlobalBgOpacity = (globalBgOpacity: number) => {
    setSettings(prev => ({ ...prev, globalBgOpacity }));
  };

  const setGlobalBorderOpacity = (globalBorderOpacity: number) => {
    setSettings(prev => ({ ...prev, globalBorderOpacity }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <GlassyContext.Provider
      value={{
        settings,
        setTheme,
        setGlobalBlur,
        setGlobalBgOpacity,
        setGlobalBorderOpacity,
        resetSettings,
      }}
    >
      {children}
    </GlassyContext.Provider>
  );
};

export const useGlassyTheme = () => {
  const context = useContext(GlassyContext);
  if (!context) {
    throw new Error('useGlassyTheme must be used within a GlassyProvider');
  }
  return context;
};
