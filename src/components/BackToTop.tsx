import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

let globalMountedCount = 0;

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

  // Show button when the user scrolls down 100px
  const toggleVisibility = (): void => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll to the top
    });
  };

  useEffect(() => {
    globalMountedCount++;
    if (globalMountedCount === 1) {
      setShouldRender(true);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      globalMountedCount--;
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='z-50 fixed lg:bottom-[90px] lg:right-6 bottom-[168px] right-4 p-4 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] hover:from-[#7c3aed] hover:to-[#2563eb] text-white shadow-lg border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center'
          style={isMobile ? { bottom: '168px', right: '16px' } : undefined}
          title='Back to Top'
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
