import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300';
  };

  return (
    <div className={`${getGlassyClasses()} mb-4`}>
      <button
        onClick={toggleAccordion}
        className='w-full text-left px-4 py-2 focus:outline-none'
      >
        <h3 className='text-lg font-semibold'>{title}</h3>
      </button>
      {isOpen && (
        <div className='px-4 py-2'>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;