import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}

          className='z-50 fixed bottom-12 right-8 bg-gray-500 bg-opacity-75 hover:bg-opacity-90 transition-all text-white w-12 h-12 rounded-full shadow-lg shadow-white/50 hover:shadow-white/70 transition-shadow duration-300 flex items-center justify-center text-2xl' // Increase font size here

        >
          ↑
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
