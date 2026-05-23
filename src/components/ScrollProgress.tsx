// src/components/ScrollProgressBar.tsx
import React, { useEffect, useState } from 'react';

const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        setScrollProgress(scrolled);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calculation in case the page is already scrolled on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: '100%',
        transform: `scaleX(${scrollProgress})`,
        transformOrigin: 'left',
        background:
          'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.8) 100%)',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
    />
  );
};

export default ScrollProgressBar;
