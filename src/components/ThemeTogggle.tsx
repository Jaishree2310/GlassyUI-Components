// ThemeToggle.tsx
import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light',
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <button
      onClick={toggleTheme}
      className='p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded'
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

export default ThemeToggle;
