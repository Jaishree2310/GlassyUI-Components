import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

interface DropdownMenuProps {
  options: string[];
  onSelect: (option: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-blue-500 text-white p-2 rounded-md'
      >
        Select an option
      </button>
      {isOpen && (
        <ul className='absolute mt-2 bg-sky-200  rounded-md shadow-lg z-10'>
          {options.map(option => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className='p-2 hover:bg-rose-200 cursor-pointer'
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DropdownMenuDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [selectedOption, setSelectedOption] = useState<string>('Option 1');

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
        <Copy size={16} className='text-black' />
      )}
    </button>
  );

  const basicUsageCode = `const DropdownMenu = ({ options, onSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    options = ['Option 1' , 'Option 2' , 'Option 3']
    
    return (
        <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-500 text-white p-2 rounded-md"
                >
                    Select an option
                </button>
                {isOpen && (
                    <ul className="absolute mt-2 bg-gray-800 rounded-md shadow-lg z-10">
                        {options.map(option => (
                            <li
                                key={option}
                                onClick={() => { onSelect(option); setIsOpen(false); }}
                                className="p-2 hover:bg-gray-600 cursor-pointer"
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };`;

  const dropdownExampleCode = `<DropdownMenu
  options={['Option 1', 'Option 2', 'Option 3']}
  onSelect={(option) => console.log('Selected:', option)}
/>`;

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-br from-pink-300 to-pink-300 text-gray-800 relative'>
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center bg-yellow-200 border border-white/20 rounded-xl shadow-lg  max-sm:px-0 px-4 py-2 hover:bg-white/40 transition-all duration-300 text-black`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-6xl font-bold mb-8 text-black'>Dropdown Menu</h1>
        <p className='text-xl mb-8 text-black'>
          A customizable dropdown menu component.
        </p>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-black'>Basic Usage</h2>
          <div className='relative'>
            <pre className='bg-zinc-400 text-black p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {basicUsageCode}
            </pre>
            <CopyButton text={basicUsageCode} codeKey='basicUsage' />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className='text-3xl font-bold mb-6 text-black'>
            Example Dropdown Menu
          </h2>
          <p className='mb-6 text-lg text-black'>
            An example implementation of a dropdown menu.
          </p>
          <DropdownMenu
            options={['Option 1', 'Option 2', 'Option 3']}
            onSelect={option => setSelectedOption(option)}
          />
          <p className='mt-4 text-black font-medium'>
            Selected: {selectedOption}
          </p>
          <div className='relative mt-8'>
            <pre className='bg-zinc-400 text-black p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {dropdownExampleCode}
            </pre>
            <CopyButton text={dropdownExampleCode} codeKey='dropdownExample' />
          </div>
        </div>

        {/* Props */}
        <section
          className={`${getGlassyClasses()} p-6 mb-14 text-white relative z-10`}
        >
          <h2 className='text-3xl font-bold mb-4 text-black'>Props</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-white bg-opacity-20'>
                  <th className='text-left p-2 text-black'>Prop</th>
                  <th className='text-left p-2 text-black'>Type</th>
                  <th className='text-left p-2 text-black'>Default</th>
                  <th className='text-left p-2 text-black'>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2 text-black'>options</td>
                  <td className='p-2 text-black'>array</td>
                  <td className='p-2 text-black'>[ ]</td>
                  <td className='p-2 text-black'>Items in the dropdown</td>
                </tr>
                <tr className='bg-white bg-opacity-20'>
                  <td className='p-2 text-black'>onSelect</td>
                  <td className='p-2 text-black'>function</td>
                  <td className='p-2 text-black'>-</td>
                  <td className='p-2 text-black'>
                    Task to do after selecting the option
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DropdownMenuDetailsPage;
