// src/components/ScrollProgressBar.tsx
import React, { useEffect, useState } from 'react';

const ScrollProgressBar: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [scrollWidth, setScrollWidth] = useState(0);

  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / totalHeight) * 100;
    setScrollWidth(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '5px',
        width: `${scrollWidth}%`,
        backgroundColor: darkMode ? 'white' : 'gray', // Change this color as needed
        transition: 'width 0.2s ease-in-out',
        zIndex: 9999, // High z-index to appear on top of all other elements
      }}
    />
  );
};

export default ScrollProgressBar;
