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
    return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg';
  };

  return (
    <div className={`${getGlassyClasses()} mb-4 overflow-hidden`}>
      <button
        onClick={toggleAccordion}
        className='w-full text-left px-4 py-3 focus:outline-none transition-all duration-300 ease-in-out hover:bg-white/10 hover:scale-[1.01]'
      >
        <h3 className='text-lg font-semibold'>{title}</h3>
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='px-4 pb-4'>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
