import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

const BackToTopDetailsPage: React.FC = () => {
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

  const backToTopCode = `
    const getGlassyClasses = () => {
        return 'backdrop-filter backdrop-blur-xl bg-white/20 border border-white/20 rounded-xl shadow-lg transition-all duration-300 max-sm:px-0';
    };

    function BackToTopButton() {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScroll}
      className="fixed bottom-5 right-5 py-3 px-5 bg-blue-500 rounded-full text-white shadow-lg transition-transform hover:scale-105"
      title="Back to Top"
    >
      ↑
    </button>
  );
}`;

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-6xl font-bold mb-8 text-white'>
          Back to Top Button
        </h1>
        <p className='text-xl mb-8 text-white'>
          A simple button to scroll back to the top of the page.
        </p>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Basic Usage</h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {backToTopCode}
            </pre>
            <CopyButton text={backToTopCode} codeKey='backToTop' />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Props</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-white bg-opacity-20'>
                  <th className='text-left p-2 text-gray-300'>Prop</th>
                  <th className='text-left p-2 text-gray-300'>Type</th>
                  <th className='text-left p-2 text-gray-300'>Default</th>
                  <th className='text-left p-2 text-gray-300'>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2 text-gray-200'>onClick</td>
                  <td className='p-2 text-gray-200'>function</td>
                  <td className='p-2 text-gray-200'>-</td>
                  <td className='p-2 text-gray-200'>
                    Function to execute when the button is clicked
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-200'>title</td>
                  <td className='p-2 text-gray-200'>string</td>
                  <td className='p-2 text-gray-200'>"Back to Top"</td>
                  <td className='p-2 text-gray-200'>
                    Tooltip text when hovering over the button
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Customization</h2>
          <p className='mb-6 text-lg text-white'>
            Customize the button's style through the className prop or inline
            styles.
          </p>
          <button
            className={`fixed bottom-5 right-5 py-3 px-5 bg-blue-500 rounded-full text-white shadow-lg transition-transform hover:scale-105`}
            title='Back to Top'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackToTopDetailsPage;
