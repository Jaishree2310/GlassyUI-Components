import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

const SearchBarDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [searchValue, setSearchValue] = useState('');
  const [customPlaceholder, setCustomPlaceholder] = useState('Search...');
  const [customBgColor, setCustomBgColor] = useState('#ffffff');
  const [customTextColor, setCustomTextColor] = useState('#000000');
  const [customCode, setCustomCode] = useState('');

  // Update customCode whenever the search input value or styles change
  useEffect(() => {
    const code = `<input
  type="text"
  value={${searchValue}}
  placeholder="${customPlaceholder}"
  onChange={handleSearchChange}
  className="search-input ${getGlassyClasses()}"
  style={{
    backgroundColor: '${customBgColor}',
    color: '${customTextColor}',
  }} />`;
    setCustomCode(code);
  }, [searchValue, customPlaceholder, customBgColor, customTextColor]);

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300';
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
      className={`absolute top-4 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-20 text-white`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  const handleBackToComponents = () => {
    navigate('/components');
  };

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <nav className='mb-8 flex items-center justify-between relative z-10'>
        <button
          onClick={handleBackToComponents}
          className={`flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 text-white`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </nav>

      <h1 className='text-4xl font-bold mb-8 text-white relative z-10'>
        Glassmorphic Search Bar Component
      </h1>

      {/* Basic Usage */}
      <section className={`${getGlassyClasses()} p-6 mb-12 relative z-10`}>
        <h2 className='text-2xl font-bold mb-4'>Basic Usage</h2>
        <div className={`${getGlassyClasses()} p-4 mb-4`}>
          <input
            type='text'
            value={searchValue}
            placeholder={customPlaceholder}
            onChange={handleSearchChange}
            className={`w-full px-4 py-2 rounded-lg ${getGlassyClasses()} text-black`}
            style={{
              backgroundColor: customBgColor,
              color: customTextColor,
            }}
          />
        </div>
        <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto relative'>
          {customCode}
          <CopyButton text={customCode} codeKey='basicUsage' />
        </pre>
      </section>

      {/* Props Section */}
      <section className={`${getGlassyClasses()} p-6 mb-12 relative z-10`}>
        <h2 className='text-2xl font-bold mb-4'>Props</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-white bg-opacity-20'>
                <th className='text-left p-2'>Prop</th>
                <th className='text-left p-2'>Type</th>
                <th className='text-left p-2'>Default</th>
                <th className='text-left p-2'>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2'>className</td>
                <td className='p-2'>string</td>
                <td className='p-2'>''</td>
                <td className='p-2'>
                  Additional CSS classes to style the search bar
                </td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>placeholder</td>
                <td className='p-2'>string</td>
                <td className='p-2'>Search...</td>
                <td className='p-2'>Placeholder text for the search bar</td>
              </tr>
              <tr>
                <td className='p-2'>value</td>
                <td className='p-2'>string</td>
                <td className='p-2'>''</td>
                <td className='p-2'>The current value of the search input</td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>onChange</td>
                <td className='p-2'>function</td>
                <td className='p-2'>-</td>
                <td className='p-2'>Function to handle input changes</td>
              </tr>
              <tr>
                <td className='p-2'>backgroundColor</td>
                <td className='p-2'>string</td>
                <td className='p-2'>#ffffff</td>
                <td className='p-2'>The background color of the search bar</td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>textColor</td>
                <td className='p-2'>string</td>
                <td className='p-2'>#000000</td>
                <td className='p-2'>The text color of the search input</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Custom Styling */}
      <section className={`${getGlassyClasses()} p-6 mb-8 relative z-10`}>
        <h2 className='text-2xl font-bold mb-4'>Custom Styling</h2>
        <div className='space-y-6'>
          <div className='flex items-center'>
            <label className='block text-sm font-medium mr-4'>
              Placeholder Text
            </label>
            <input
              type='text'
              value={customPlaceholder}
              onChange={e => setCustomPlaceholder(e.target.value)}
              className='px-3 py-1 border border-gray-500 rounded-md'
            />
          </div>

          <div className='flex items-center'>
            <label className='block text-sm font-medium mr-4'>
              Background Color
            </label>
            <input
              type='color'
              value={customBgColor}
              onChange={e => setCustomBgColor(e.target.value)}
              className='w-8 h-8 cursor-pointer border-none'
            />
            <span className='ml-2'>{customBgColor}</span>
          </div>

          <div className='flex items-center'>
            <label className='block text-sm font-medium mr-4'>Text Color</label>
            <input
              type='color'
              value={customTextColor}
              onChange={e => setCustomTextColor(e.target.value)}
              className='w-8 h-8 cursor-pointer border-none'
            />
            <span className='ml-2'>{customTextColor}</span>
          </div>

          <div className='mt-8'>
            <h4 className='text-xl font-semibold mb-4'>Generated Code</h4>
            <div className='relative'>
              <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto'>
                {customCode}
              </pre>
              <CopyButton text={customCode} codeKey='customStyling' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchBarDetailsPage;
