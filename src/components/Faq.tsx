import React, { useState } from 'react';
import styled from 'styled-components';

const FAQContainer = styled.div`
  max-width: 900px; // Maximum width of the container
  margin: 80px auto; // Center the container horizontally
  padding: 40px 20px; // Padding around the container
  background: rgba(
    255,
    255,
    255,
    0.15
  ); // Light gray background with transparency
  border-radius: 15px; // Rounded corners
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5); // Shadow for depth
  position: relative; // For pseudo-element positioning
  backdrop-filter: blur(15px); // Stronger background blur effect

  @media (max-width: 600px) {
    padding: 20px; // Adjust padding for smaller screens
  }

  h2 {
    font-size: 2em; // Increase font size for subheadings
    margin-bottom: 20px; // Space below the heading

    background: linear-gradient(270deg, #ff9ff3, #54a0ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
    padding-bottom: 10px;
  }
`;

const FAQItem = styled.div`
  margin-bottom: 15px; // Space below each FAQ item

  .faq-header {
    display: flex; // Flexbox for layout
    justify-content: space-between; // Space between question and icon
    align-items: center; // Align vertically center
    cursor: pointer; // Change cursor on hover
    padding: 20px; // Padding for clickable area
    border-radius: 10px; // Rounded corners
    background: rgba(255, 255, 255, 0.2); // Light background with transparency
    transition: background 0.3s; // Transition for hover effect

    &:hover {
      background: rgba(255, 255, 255, 0.25); // Change background on hover
    }
  }

  .faq-answer {
    padding: 10px; // Padding for answer
    background: rgba(255, 255, 255, 0.1); // Background for the answer
    border-radius: 5px; // Rounded corners
    margin-top: 5px; // Space above answer
    color: #e1e1e1; // Answer text color
  }
`;

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is GlassyUI-Components?',
      answer:
        'GlassyUI-Components is a sleek UI library that implements glassmorphism design principles, providing beautiful, modern components for your React applications.',
    },
    {
      question: 'What is glassmorphism?',
      answer:
        'Glassmorphism is a design trend that creates a frosted glass-like effect, characterized by a blurred background and transparency, giving a sense of depth and layering.',
    },
    {
      question: 'How can I use the components in my React project?',
      answer:
        'You can easily integrate GlassyUI-Components into your React project by installing it via npm and importing the desired components into your application.',
    },
    {
      question: 'What components are included in GlassyUI-Components?',
      answer:
        'The library includes various components such as buttons, cards, input fields, modals, and more, all designed with glassmorphism in mind.',
    },
    {
      question: 'Are the components customizable?',
      answer:
        "Yes, all components in GlassyUI-Components are highly customizable, allowing you to tailor their appearance and behavior to fit your project's needs.",
    },
    {
      question: 'Can I contribute to the GlassyUI-Components project?',
      answer:
        'Absolutely! We welcome contributions from the community. Please check the contribution guidelines on our GitHub repository.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <FAQContainer>
        <h2 className='font-bold text-center px-6'>
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <div className='faq-header' onClick={() => handleToggle(index)}>
              <span>{faq.question}</span>
              <span className='text-blue-400 font-bold'>
                {openIndex === index ? '-' : '+'}
              </span>
            </div>
            {openIndex === index && (
              <div className='faq-answer'>{faq.answer}</div>
            )}
          </FAQItem>
        ))}
      </FAQContainer>
    </div>
  );
};

export default Faq;
