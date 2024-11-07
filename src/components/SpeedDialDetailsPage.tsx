import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import SpeedDial from './SpeedDial';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

import { FaXTwitter } from 'react-icons/fa6';

import BackToTopButton from './BackToTop';
import { date } from 'zod';

// Utility function for reusable glassy class styles
const getGlassyClasses = (darkMode: boolean, opacity = 10) => {
  return `backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white' : 'bg-black/10 border-black/20'} bg-opacity-${opacity} 
border border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
};

// Function to copy text to clipboard and handle feedback
const copyToClipboard = (
  text: string,
  key: string,
  setCopiedStates: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >,
) => {
  navigator.clipboard.writeText(text).then(() => {
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(
      () => setCopiedStates(prev => ({ ...prev, [key]: false })),
      2000,
    );
  });
};

// CopyButton component for code blocks, handles copy action
const CopyButton: React.FC<{
  text: string;
  codeKey: string;
  darkMode: boolean;
}> = ({ text, codeKey, darkMode }) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  return (
    <button
      onClick={() => copyToClipboard(text, codeKey, setCopiedStates)}
      className={`absolute top-2 right-2 ${getGlassyClasses(darkMode)} p-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'} transition-all duration-300 z-10`}
      aria-label='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className={darkMode ? 'text-gray-100' : 'text-black'} />
      )}
    </button>
  );
};

type IconKey = 'facebook' | 'twitter' | 'linkedin' | 'instagram';

interface IconOption {
  label: string;
  value: IconKey;
}

interface SpeedDialProps {
  direction?: 'right' | 'left' | 'up' | 'down';
  selectedIcons: IconKey[];
  darkMode: boolean;
}

const SpeedDialComponent: React.FC<SpeedDialProps> = ({
  direction = 'right',
  selectedIcons,
  darkMode,
}) => {
  const allIcons: Record<
    IconKey,
    { icon: JSX.Element; label: string; action: () => void }
  > = {
    facebook: {
      icon: <FaFacebookF size={20} />,
      label: 'Facebook',
      action: () => window.open('https://www.facebook.com', '_blank'),
    },
    twitter: {
      icon: <FaXTwitter size={20} />,
      label: 'Twitter',
      action: () => window.open('https://www.twitter.com', '_blank'),
    },
    linkedin: {
      icon: <FaLinkedinIn size={20} />,
      label: 'LinkedIn',
      action: () => window.open('https://www.linkedin.com', '_blank'),
    },
    instagram: {
      icon: <FaInstagram size={20} />,
      label: 'Instagram',
      action: () => window.open('https://www.instagram.com', '_blank'),
    },
  };

  // Generate action buttons in the desired format
  const actionButtons = selectedIcons.map(iconKey => ({
    icon: allIcons[iconKey].icon as React.ReactNode, // Ensure JSX.Element is cast to ReactNode
    label: allIcons[iconKey].label,
    key: iconKey as string, // Explicitly cast key to string
    action: allIcons[iconKey].action, // Use action instead of onClick
  }));

  const customSpeed = `
  const getGlassyClasses = () => 'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

  function Example () {
  return 
   <SpeedDial
      direction="right"
      actionButtons={[
        {
          icon: <FaFacebookF size={20} />,
          label: "Facebook",
          key: "facebook",
          action: () => {
            window.open("https://www.facebook.com", "_blank");
          },
        },
        {
        other icons objects of your wish...
        }
      ]}
    />
  
  }
  `;

  return (
    <>
      <div>
        <div className='flex w-full h-[300px] justify-center items-center'>
          <SpeedDial
            direction={direction}
            actionButtons={actionButtons} // Pass the formatted actionButtons array
          />
        </div>

        <div>
          <div
            className={`${getGlassyClasses(darkMode, 20)} p-6 mb-14 relative`}
          >
            <h2 className='text-3xl font-bold mb-4 text-gray-100'>
              Customize Speed Dial
            </h2>
            {/* Basic Usage Code Block */}
            <div className='relative mb-4'>
              <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
                {customSpeed}
              </pre>
              <CopyButton text={customSpeed} codeKey='customSpeed' darkMode />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
interface CustomizableSpeedDialProps {
  darkMode: boolean;
}

const CustomizableSpeedDial: React.FC<CustomizableSpeedDialProps> = ({
  darkMode,
}) => {
  const [direction, setDirection] = useState<'right' | 'left' | 'up' | 'down'>(
    'right',
  );
  const [selectedIcons, setSelectedIcons] = useState<IconKey[]>([]);

  // Options for icons
  const iconOptions: IconOption[] = [
    { label: 'Facebook', value: 'facebook' },
    { label: 'Twitter', value: 'twitter' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'Instagram', value: 'instagram' },
  ];

  // Handle icon selection
  const handleIconChange = (icon: IconKey) => {
    if (selectedIcons.includes(icon)) {
      setSelectedIcons(selectedIcons.filter(i => i !== icon));
    } else {
      setSelectedIcons([...selectedIcons, icon]);
    }
  };

  return (
    <div className={`${getGlassyClasses(darkMode, 20)} p-6 mb-14 relative`}>
      <h2 className='text-3xl font-bold mb-6 text-white'>
        Customize Your SpeedDial
      </h2>

      <div className='flex w-full justify-evenly'>
        {/* Direction Selection */}

        <div className={`${getGlassyClasses(darkMode, 10)} p-6 w-[30%]`}>
          <label className='mb-2 font-semibold text-lg text-white'>
            Choose Direction :
          </label>
          <div className='flex items-center space-x-4 justify-between pt-3'>
            {['right', 'left', 'up', 'down'].map(dir => (
              <label key={dir} className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='direction'
                  value={dir}
                  checked={direction === dir}
                  onChange={e =>
                    setDirection(
                      e.target.value as 'right' | 'left' | 'up' | 'down',
                    )
                  }
                  className='form-radio h-5 w-5 text-blue-600'
                />
                <span className='capitalize text-gray-200'>{dir}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Icon Selection */}
        <div className={`${getGlassyClasses(darkMode, 10)} p-6 w-[30%]`}>
          <label className='block mb-2 font-semibold text-lg text-white'>
            Select Icons:{' '}
          </label>
          <div className='flex justify-between'>
            {iconOptions.map(icon => (
              <div key={icon.value}>
                <input
                  type='checkbox'
                  id={icon.value}
                  value={icon.value}
                  checked={selectedIcons.includes(icon.value)}
                  onChange={() => handleIconChange(icon.value)}
                />
                <label htmlFor={icon.value}>{icon.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Render SpeedDial with selected values */}

      <SpeedDialComponent
        direction={direction}
        selectedIcons={selectedIcons}
        darkMode
      />
    </div>
  );
};

// Main component displaying SpeedDial usage details
const SpeedDialDetailsPage: React.FC<{ darkMode: boolean }> = ({
  darkMode,
}) => {
  const navigate = useNavigate();

  const basicUsage = `
  const getGlassyClasses = () => 'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

  function Example () {
  return 
   <SpeedDial
      direction="right"
      actionButtons={[
        {
          icon: <FaFacebookF size={20} />,
          label: "Facebook",
          key: "facebook",
          action: () => {
            window.open("https://www.facebook.com", "_blank");
          },
        },
        {
        other icons objects of your wish...
        }
      ]}
    />
  
  }
  `;

  const speedDialRight = `
             <SpeedDial
                direction="right"
                actionButtons={[
                  {
                    icon: <FaFacebookF size={20} />,
                    label: "Facebook",
                    key: "facebook",
                    action: () => {
                      window.open("https://www.facebook.com", "_blank");
                    },
                  },
                  {
                    icon: <FaXTwitter size={20} />,
                    label: "Twitter",
                    key: "twitter",
                    action: () => {
                      window.open("https://www.twitter.com", "_blank");
                    },
                  },
                  {
                    icon: <FaLinkedinIn size={20} />,
                    label: "LinkedIn",
                    key: "linkedin",
                    action: () => {
                      window.open("https://www.linkedin.com", "_blank");
                    },
                  },
                  {
                    icon: <FaInstagram size={20} />,
                    label: "Instagram",
                    key: "instagram",
                    action: () => {
                      window.open("https://www.instagram.com", "_blank");
                    },
                  },
                ]}
              />

  `;

  const speedDialUp = `
              <SpeedDial
                direction="up"
                actionButtons={[
                  {
                    icon: <FaFacebookF size={20} />,
                    label: "Facebook",
                    key: "facebook",
                    action: () => {
                      window.open("https://www.facebook.com", "_blank");
                    },
                  },
                  {
                    icon: <FaXTwitter size={20} />,
                    label: "Twitter",
                    key: "twitter",
                    action: () => {
                      window.open("https://www.twitter.com", "_blank");
                    },
                  },
                  {
                    icon: <FaLinkedinIn size={20} />,
                    label: "LinkedIn",
                    key: "linkedin",
                    action: () => {
                      window.open("https://www.linkedin.com", "_blank");
                    },
                  },
                  {
                    icon: <FaInstagram size={20} />,
                    label: "Instagram",
                    key: "instagram",
                    action: () => {
                      window.open("https://www.instagram.com", "_blank");
                    },
                  },
                ]}
              />`;

  const tableHeadingStyles = `text-left p-2 ${darkMode ? 'text-gray-100' : 'text-black'}`;
  const tableDataStyles = `p-2 ${darkMode ? 'text-gray-200' : 'text-black/80'}`;

  return (
    <div
      className={`min-h-screen p-8 font-sans bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'} relative`}
    >
      <BackToTopButton />
      <div className='relative z-10'>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center mb-8 ${getGlassyClasses(darkMode, 10)} px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'} transition-all duration-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        {/* Page Title and Description */}
        <h1
          className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Speed Dial
        </h1>
        <p
          className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          A customizable, glassmorphism-styled Speed Dial component.
        </p>

        {/* Speed Dial Demo and Code Section */}
        <div className={`${getGlassyClasses(darkMode, 20)} p-6 mb-14 relative`}>
          <h2
            className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Basic Usage
          </h2>
          {/* Basic Usage Code Block */}
          <div className='relative mb-4'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {basicUsage}
            </pre>
            <CopyButton
              text={basicUsage}
              codeKey='basicUsage'
              darkMode={darkMode}
            />
          </div>
        </div>

        <div className={`${getGlassyClasses(darkMode, 20)} p-6 mb-14`}>
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
                  <td className={tableDataStyles}>direction</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    The direction of the speed dial. Can be up, down, left, or
                    right
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>actionButtons</td>
                  <td className={tableDataStyles}>array</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    An array of objects containing the icon, label, key, and
                    action.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${getGlassyClasses(darkMode, 20)} p-6 mb-14 relative`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            <CustomizableSpeedDial darkMode />
            Speed Dial: Right
          </h2>
          {/* Basic Usage Code Block */}
          <div className='relative mb-4'>
            <SpeedDial
              direction='right'
              actionButtons={[
                {
                  icon: <FaFacebookF size={20} />,
                  label: 'Facebook',
                  key: 'facebook',
                  action: () => {
                    window.open('https://www.facebook.com', '_blank');
                  },
                },
                {
                  icon: <FaXTwitter size={20} />,
                  label: 'Twitter',
                  key: 'twitter',
                  action: () => {
                    window.open('https://www.twitter.com', '_blank');
                  },
                },
                {
                  icon: <FaLinkedinIn size={20} />,
                  label: 'LinkedIn',
                  key: 'linkedin',
                  action: () => {
                    window.open('https://www.linkedin.com', '_blank');
                  },
                },
                {
                  icon: <FaInstagram size={20} />,
                  label: 'Instagram',
                  key: 'instagram',
                  action: () => {
                    window.open('https://www.instagram.com', '_blank');
                  },
                },
              ]}
            ></SpeedDial>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {speedDialRight}
            </pre>
            <CopyButton
              text={speedDialRight}
              codeKey='speedDialRight'
              darkMode={darkMode}
            />
          </div>
        </div>

        <div className={`${getGlassyClasses(darkMode, 20)} p-6 mb-8 relative`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Speed Dial: Up
          </h2>
          {/* Basic Usage Code Block */}
          <div className='relative mb-4'>
            <SpeedDial
              direction='up'
              actionButtons={[
                {
                  icon: <FaFacebookF size={20} />,
                  label: 'Facebook',
                  key: 'facebook',
                  action: () => {
                    window.open('https://www.facebook.com', '_blank');
                  },
                },
                {
                  icon: <FaXTwitter size={20} />,
                  label: 'Twitter',
                  key: 'twitter',
                  action: () => {
                    window.open('https://www.twitter.com', '_blank');
                  },
                },
                {
                  icon: <FaLinkedinIn size={20} />,
                  label: 'LinkedIn',
                  key: 'linkedin',
                  action: () => {
                    window.open('https://www.linkedin.com', '_blank');
                  },
                },
                {
                  icon: <FaInstagram size={20} />,
                  label: 'Instagram',
                  key: 'instagram',
                  action: () => {
                    window.open('https://www.instagram.com', '_blank');
                  },
                },
              ]}
            ></SpeedDial>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {speedDialUp}
            </pre>
            <CopyButton
              text={speedDialUp}
              codeKey='speedDialRight'
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedDialDetailsPage;
