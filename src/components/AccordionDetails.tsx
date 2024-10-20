import React, { useState } from 'react';
import Accordion from '../components/Accordion';
import BackToTopButton from './BackToTop';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// CollapsibleAccordion component where only one accordion can be open at a time
const CollapsibleAccordion: React.FC<{
  items: { title: string; content: string }[];
}> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='space-y-4'>
      {items.map((item, index) => (
        <div
          key={index}
          className='rounded-2xl border border-gray-600 overflow-hidden'
        >
          {/* Accordion Button */}
          <button
            className={`w-full text-left p-4 transition-all duration-300 ${
              activeIndex === index
                ? 'bg-white/30 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            } font-semibold text-lg flex justify-between items-center`}
            onClick={() => toggleAccordion(index)}
          >
            {item.title}
            <span
              className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
            >
              ⌄
            </span>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              activeIndex === index
                ? 'max-h-screen p-4 bg-gray-800 text-gray-200'
                : 'max-h-0'
            }`}
          >
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const AccordionDetails: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getGlassyClasses = (opacity = 20) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} 
  border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(
        () => setCopiedStates(prev => ({ ...prev, [key]: false })),
        2000,
      );
    });
  };

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className='text-white' />
      )}
    </button>
  );

  // Example code for basic Accordion component
  const basicUsageCode = `const Accordion = ({ title, content }) => (
  <div>
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);`;

  const accordionUsageCode = `<Accordion
  title='Accordion Title 1'
  content='This is the content of the first accordion.'
/>
<Accordion
  title='Accordion Title 2'
  content='This is the content of the second accordion.'
/>`;

  // Example code for collapsible accordion
  const collapsibleAccordionCode = `const CollapsibleAccordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => toggleAccordion(index)}>{item.title}</button>
          {activeIndex === index && <div>{item.content}</div>}
        </div>
      ))}
    </div>
  );
};`;

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <div className='relative z-10'>
          <h1 className='text-6xl font-bold mb-8 text-white'>
            Accordion Details
          </h1>
          <p className='text-xl mb-8 text-white'>
            A customizable accordion component.
          </p>

          {/* Basic Usage Section */}
          <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
            <h2 className='text-3xl font-bold mb-6 text-white'>Basic Usage</h2>
            <div className='relative'>
              <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
                {basicUsageCode}
              </pre>
              <CopyButton text={basicUsageCode} codeKey='basicUsage' />
            </div>
          </div>

          {/* Accordion Example Section */}
          <div className={`${getGlassyClasses()} p-6 mb-14`}>
            <h2 className='text-3xl font-bold mb-6 text-white'>
              Accordion Example
            </h2>
            <p className='mb-6 text-lg text-white'>
              An example implementation of an accordion.
            </p>
            <div className='space-y-4'>
              <Accordion
                title='Accordion Title 1'
                content='This is the content of the first accordion.'
              />
              <Accordion
                title='Accordion Title 2'
                content='This is the content of the second accordion.'
              />
              <Accordion
                title='Accordion Title 3'
                content='This is the content of the third accordion.'
              />
            </div>

            {/* Usage Code Section */}
            <div className='relative mt-8'>
              <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
                {accordionUsageCode}
              </pre>
              <CopyButton text={accordionUsageCode} codeKey='accordionUsage' />
            </div>
          </div>

          {/* Collapsible Accordion Example Section */}
          <div className={`${getGlassyClasses()} p-6 mb-14`}>
            <h2 className='text-3xl font-bold mb-6 text-white'>
              Collapsible Accordion
            </h2>
            <p className='mb-6 text-lg text-white'>
              An accordion where only one item remains open at a time.
            </p>
            <CollapsibleAccordion
              items={[
                {
                  title: 'Collapsible Title 1',
                  content:
                    'This is the content of the first collapsible accordion.',
                },
                {
                  title: 'Collapsible Title 2',
                  content:
                    'This is the content of the second collapsible accordion.',
                },
                {
                  title: 'Collapsible Title 3',
                  content:
                    'This is the content of the third collapsible accordion.',
                },
              ]}
            />

            {/* Collapsible Usage Code Section */}
            <div className='relative mt-8'>
              <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
                {collapsibleAccordionCode}
              </pre>
              <CopyButton
                text={collapsibleAccordionCode}
                codeKey='collapsibleAccordion'
              />
            </div>
          </div>

          {/* Props */}
          <section
            className={`${getGlassyClasses()} p-6 mb-14 text-white relative z-10`}
          >
            <h2 className='text-3xl font-bold mb-4 text-gray-100'>Props</h2>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-white bg-opacity-20'>
                    <th className='text-left p-2 text-gray-100'>Prop</th>
                    <th className='text-left p-2 text-gray-100'>Type</th>
                    <th className='text-left p-2 text-gray-100'>Default</th>
                    <th className='text-left p-2 text-gray-100'>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='p-2 text-gray-200'>title</td>
                    <td className='p-2 text-gray-200'>string</td>
                    <td className='p-2 text-gray-200'>''</td>
                    <td className='p-2 text-gray-200'>
                      Title of the accordian
                    </td>
                  </tr>
                  <tr className='bg-white bg-opacity-10'>
                    <td className='p-2 text-gray-200'>content</td>
                    <td className='p-2 text-gray-200'>string</td>
                    <td className='p-2 text-gray-200'>''</td>
                    <td className='p-2 text-gray-200'>
                      Content to be shown in the accordian
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccordionDetails;
