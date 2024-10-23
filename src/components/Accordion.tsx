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

  return (
    <div className='rounded-2xl border border-black overflow-hidden'>
      <button
        onClick={toggleAccordion}
        className={`w-full text-left p-4 transition-all duration-100 ${
          isOpen
            ? 'bg-purple/30 text-black'
            : 'bg-purple-300 text-black hover:bg-purple-200'
        } font-semibold text-lg flex justify-between items-center`}
      >
        {title}
        <span
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          ⌄
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-screen p-4 bg-purple-100 text-black' : 'max-h-0'
        }`}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Accordion;
