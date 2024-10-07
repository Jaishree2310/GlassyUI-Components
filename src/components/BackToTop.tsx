import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Show button when the user scrolls down 300px
  const toggleVisibility = (): void => {
    if (window.scrollY > 300) {
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
          className="z-50 fixed bottom-12 right-8 bg-indigo-500 hover:bg-purple-500 transition-all text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
