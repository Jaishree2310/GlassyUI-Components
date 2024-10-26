import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop'; // Assuming you have this component

// Avatar Component
const Avatar: React.FC<{
  src: string;
  alt: string;
  size?: number;
  name?: string;
}> = ({ src, alt, size = 50, name }) => {
  return (
    <div className='relative inline-block group'>
      <img
        src={src}
        alt={alt}
        className='rounded-full border-2 border-gray-300'
        style={{ width: size, height: size }}
      />
      {name && (
        <div className='absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 bg-gray-800 text-white text-sm rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          {name}
        </div>
      )}
    </div>
  );
};

const AvatarDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const avatarCode = `const Avatar: React.FC<{
  src: string;
  alt: string;
  size?: number;
  name?: string;
}> = ({ src, alt, size = 50, name }) => {
  return (
    <div className='relative inline-block group'>
      <img
        src={src}
        alt={alt}
        className='rounded-full border-2 border-gray-300'
        style={{ width: size, height: size }}
      />
      {name && (
        <div className='absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 bg-gray-800 text-white text-sm rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          {name}
        </div>
      )}
    </div>
  );
};`;

  const propsTable = (
    <table className='w-full'>
      <thead>
        <tr className='bg-white bg-opacity-20'>
          <th className='text-left p-2 text-white'>Prop</th>
          <th className='text-left p-2 text-white'>Type</th>
          <th className='text-left p-2 text-white'>Default</th>
          <th className='text-left p-2 text-white'>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='p-2 text-white'>src</td>
          <td className='p-2 text-white'>string</td>
          <td className='p-2 text-white'>-</td>
          <td className='p-2 text-white'>The URL of the avatar image</td>
        </tr>
        <tr className='bg-white bg-opacity-10'>
          <td className='p-2 text-white'>alt</td>
          <td className='p-2 text-white'>string</td>
          <td className='p-2 text-white'>-</td>
          <td className='p-2 text-white'>Alt text for the image</td>
        </tr>
        <tr>
          <td className='p-2 text-white'>size</td>
          <td className='p-2 text-white'>number</td>
          <td className='p-2 text-white'>50</td>
          <td className='p-2 text-white'>The size of the avatar in pixels</td>
        </tr>
        <tr className='bg-white bg-opacity-10'>
          <td className='p-2 text-white'>name</td>
          <td className='p-2 text-white'>string</td>
          <td className='p-2 text-white'>-</td>
          <td className='p-2 text-white'>
            Optional name displayed as a tooltip
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-white`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-6xl font-bold mb-8'>Avatar Component</h1>
        <p className='text-xl mb-8'>
          A customizable avatar component with an optional name tooltip.
        </p>

        {/* Example Avatar Usage */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Example Avatar</h2>
          <Avatar
            src='https://via.placeholder.com/150'
            alt='User Avatar'
            size={100}
            name='John Doe'
          />
        </div>

        {/* Code Snippet */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Code Snippet</h2>
          <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto'>
            {avatarCode}
          </pre>
          <button
            onClick={() => copyToClipboard(avatarCode)}
            className='absolute top-2 right-2 p-2 bg-gray-600 rounded hover:bg-gray-700 transition-all duration-300'
            title='Copy to clipboard'
          >
            {copied ? (
              <Check size={16} className='text-white' />
            ) : (
              <Copy size={16} className='text-white' />
            )}
          </button>
        </div>

        {/* Props Table */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Props</h2>
          <div className='overflow-x-auto'>{propsTable}</div>
        </div>
      </div>
    </div>
  );
};

// Glassy Classes for Styling
const getGlassyClasses = (opacity = 20) => {
  return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} 
    border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
};

export default AvatarDetailsPage;
