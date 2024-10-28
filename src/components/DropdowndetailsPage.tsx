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
        <ul className='absolute mt-2 bg-gray-800 rounded-md shadow-lg z-10'>
          {options.map(option => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className='p-2 hover:bg-gray-600 cursor-pointer'
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DropdownMenuDetailsPage: React.FC<{ darkMode: boolean }> = ({
  darkMode,
}) => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [selectedOption, setSelectedOption] = useState<string>('Option 1');

  const getGlassyClasses = (opacity = 20) => {
    return `backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} bg-opacity-${opacity} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
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

  const CopyButton: React.FC<{
    text: string;
    codeKey: string;
    darkMode: boolean;
  }> = ({ text, codeKey, darkMode }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 ${darkMode ? 'text-white hover:bg-white/40' : 'text-black hover:bg-black/30'} transition-all duration-300`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className={darkMode ? 'text-gray-100' : 'text-black'} />
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

  const tableHeadingStyles = `text-left p-2 ${darkMode ? 'text-gray-100' : 'text-black'}`;
  const tableDataStyles = `p-2 ${darkMode ? 'text-gray-200' : 'text-black/80'}`;

  return (
    <div
      className={`min-h-screen p-8 font-sans bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'} relative`}
    >
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'} transition-all duration-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1
          className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Dropdown Menu
        </h1>
        <p
          className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          A customizable dropdown menu component.
        </p>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Basic Usage
          </h2>
          <div className='relative'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {basicUsageCode}
            </pre>
            <CopyButton
              text={basicUsageCode}
              codeKey='basicUsage'
              darkMode={darkMode}
            />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Example Dropdown Menu
          </h2>
          <p
            className={`mb-6 text-lg ${darkMode ? 'text-white' : 'text-black'}`}
          >
            An example implementation of a dropdown menu.
          </p>
          <DropdownMenu
            options={['Option 1', 'Option 2', 'Option 3']}
            onSelect={option => setSelectedOption(option)}
          />
          <p className='mt-4'>Selected: {selectedOption}</p>
          <div className='relative mt-8'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {dropdownExampleCode}
            </pre>
            <CopyButton
              text={dropdownExampleCode}
              codeKey='dropdownExample'
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Props */}
        <section
          className={`${getGlassyClasses()} p-6 mb-14 text-white relative z-10`}
        >
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Props
          </h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-20`}
                >
                  <th className={tableHeadingStyles}>Prop</th>
                  <th className={tableHeadingStyles}>Type</th>
                  <th className={tableHeadingStyles}>Default</th>
                  <th className={tableHeadingStyles}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tableDataStyles}>options</td>
                  <td className={tableDataStyles}>array</td>
                  <td className={tableDataStyles}>[ ]</td>
                  <td className={tableDataStyles}>Items in the dropdown</td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>onSelect</td>
                  <td className={tableDataStyles}>function</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
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
