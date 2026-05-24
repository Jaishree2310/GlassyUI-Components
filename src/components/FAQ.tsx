import React, { useState } from 'react';
import './FAQ.scss';

const faqs = [
  {
    question: 'What is GlassyUI?',
    answer: 'It is a glassmorphism-based UI component library.',
  },
  {
    question: 'How do I use it?',
    answer: 'Import components and use them in your React project.',
  },
  {
    question: 'Is it responsive?',
    answer: 'Yes, it is fully responsive on all devices.',
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='faq-container'>
      <h2>Frequently Asked Questions</h2>

      {faqs.map((item, index) => (
        <div key={index} className='faq-item'>
          <div className='question' onClick={() => toggle(index)}>
            {item.question}
          </div>

          {activeIndex === index && <div className='answer'>{item.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
