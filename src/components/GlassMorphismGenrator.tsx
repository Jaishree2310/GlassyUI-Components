import React, { useState } from 'react';
import '../index.css';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const GlassmorphismGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState<number>(0.5);
  const [blur, setBlur] = useState<number>(10);
  const [bgColor, setBgColor] = useState<string>('rgba(255, 255, 255, 0.25)');
  const [shadowBlur, setShadowBlur] = useState<number>(10);
  const [shadowOffsetX, setShadowOffsetX] = useState<number>(0);
  const [shadowOffsetY, setShadowOffsetY] = useState<number>(4);
  const [shadowColor, setShadowColor] = useState<string>('rgba(0, 0, 0, 0.5)');
  const [borderRadius, setBorderRadius] = useState<number>(15);
  const [activeTab, setActiveTab] = useState<'custom' | 'tailwind'>('custom');
  const [copied, setCopied] = useState<boolean>(false);

  const glassStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    backdropFilter: `blur(${blur}px)`,
    opacity: opacity,
    borderRadius: `${borderRadius}px`,
    padding: '20px',
    boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`,
  };

  const cssCode = `
.glassmorphism {
  background: ${bgColor};
  backdrop-filter: blur(${blur}px);
  opacity: ${opacity};
  border-radius: ${borderRadius}px;
  box-shadow: ${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor};
}`;

  const tailwindCode = `
<div class="bg-white bg-opacity-25 backdrop-blur-[${blur}px] opacity-[${opacity}] rounded-[${borderRadius}px] shadow-[${shadowOffsetX}px_${shadowOffsetY}px_${shadowBlur}px_${shadowColor}]">
  <!-- Your content here -->
</div>`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setColorFunction: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const hexColor = e.target.value; // Get the hex value from the input
    // Convert hex to rgba format with current opacity
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    setColorFunction(`rgba(${r}, ${g}, ${b}, ${opacity})`); // Keep opacity as is
  };
  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300';
  };
  return (
    <div className='min-h-screen flex flex-col gap-6 justify-center items-center px-6 bg-gradient-to-br from-pink-300 to-white text-gray-800 p-8'>
      <div className='w-full mb-0 pb-0'>
        <button
          onClick={() => navigate(-1)}
          className={` flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-40 transition-all duration-300 text-gray-800`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </div>
      <h1 className='text-4xl font-bold text-white  '>
        Glassmorphism Generator{' '}
      </h1>
      <h2 className='text-xl font-bold text-white  '>
        create your own effect with eadge
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-flow-col gap-4'>
        <div className='glassmorphism p-2 rounded-md'>
          <label
            htmlFor='opacity'
            className='block text-sm font-medium text-white mb-1'
          >
            Opacity: {opacity}
          </label>
          <input
            type='range'
            id='opacity'
            min='0'
            max='1'
            step='0.01'
            value={opacity}
            onChange={e => setOpacity(parseFloat(e.target.value))}
            className='w-full'
          />
        </div>
        <div className='glassmorphism p-2 rounded-md'>
          <label
            htmlFor='blur'
            className='block text-sm font-medium text-white mb-1'
          >
            Blur: {blur}px
          </label>
          <input
            type='range'
            id='blur'
            min='0'
            max='50'
            step='1'
            value={blur}
            onChange={e => setBlur(parseInt(e.target.value))}
            className='w-full'
          />
        </div>
        <div className='glassmorphism p-2 rounded-md flex gap-2 items-start h-auto  '>
          <label
            htmlFor='bgColor'
            className='block text-sm font-medium text-white mb-1'
          >
            Background Color
          </label>
          <input
            type='color'
            id='colorPicker'
            value={`#${(
              (1 << 24) +
              (parseInt(bgColor.slice(5, 8)) << 16) +
              (parseInt(bgColor.slice(10, 13)) << 8) +
              parseInt(bgColor.slice(15, 18))
            )
              .toString(16)
              .slice(1)}`}
            onChange={e => handleColorChange(e, setBgColor)}
            className='w-8 h-8 rounded-sm border border-white mb-2'
          />
        </div>
        <div className='glassmorphism p-2 rounded-md'>
          <label
            htmlFor='borderRadius'
            className='block text-sm font-medium text-white mb-1'
          >
            Border Radius: {borderRadius}px
          </label>
          <input
            type='range'
            id='borderRadius'
            min='0'
            max='50'
            step='1'
            value={borderRadius}
            onChange={e => setBorderRadius(parseInt(e.target.value))}
            className='w-full'
          />
        </div>
        <div className='glassmorphism p-2 rounded-md'>
          <label
            htmlFor='shadowBlur'
            className='block text-sm font-medium text-white mb-1'
          >
            Shadow Blur: {shadowBlur}px
          </label>
          <input
            type='range'
            id='shadowBlur'
            min='0'
            max='50'
            step='1'
            value={shadowBlur}
            onChange={e => setShadowBlur(parseInt(e.target.value))}
            className='w-full'
          />
        </div>
        <div className='glassmorphism p-2 rounded-md'>
          <label
            htmlFor='shadowOffsetX'
            className='block text-sm font-medium text-white mb-1'
          >
            Shadow Offset X: {shadowOffsetX}px
          </label>
          <input
            type='range'
            id='shadowOffsetX'
            min='-50'
            max='50'
            step='1'
            value={shadowOffsetX}
            onChange={e => setShadowOffsetX(parseInt(e.target.value))}
            className='w-full'
          />
        </div>
        <div className='glassmorphism p-2 rounded-md'>
          <label
            htmlFor='shadowOffsetY'
            className='block text-sm font-medium text-white mb-1'
          >
            Shadow Offset Y: {shadowOffsetY}px
          </label>
          <input
            type='range'
            id='shadowOffsetY'
            min='-50'
            max='50'
            step='1'
            value={shadowOffsetY}
            onChange={e => setShadowOffsetY(parseInt(e.target.value))}
            className='w-full'
          />
        </div>

        {/* Shadow Color Picker */}
        <div className='glassmorphism p-2 rounded-md flex gap-2 items-start h-auto  '>
          <label
            htmlFor='shadowColor'
            className='block text-sm font-medium text-white mb-1'
          >
            Shadow Color
          </label>

          <input
            type='color'
            id='colorPicker'
            value={`#${(
              (1 << 24) +
              (parseInt(bgColor.slice(5, 8)) << 16) +
              (parseInt(bgColor.slice(10, 13)) << 8) +
              parseInt(bgColor.slice(15, 18))
            )
              .toString(16)
              .slice(1)}`}
            onChange={e => handleColorChange(e, setShadowColor)}
            className='w-8 h-8 rounded-sm border border-white mb-2'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[1200px]'>
        <div className='flex flex-col items-center justify-center'>
          <div
            style={glassStyle}
            className='w-[100vw] h-[50vh] max-w-md text-center'
          >
            {/* Preview Content */}
            <h2 className='text-2xl font-bold text-white'>
              Glassmorphism Effect Preview
            </h2>
            <p className='text-white'>
              This is a preview of the glassmorphism effect.
            </p>
          </div>
        </div>

        <div className='flex flex-col justify-end bg-black bg-opacity-70 p-6 rounded-lg shadow-lg'>
          {/* Code Preview Section */}
          <div className='relative mt-auto'>
            {/* Copy Button */}
            <button
              onClick={() =>
                handleCopy(activeTab === 'custom' ? cssCode : tailwindCode)
              }
              className='absolute top-2 right-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              title='Copy to clipboard'
            >
              {copied ? <FaClipboardCheck /> : <FaClipboard />}
            </button>

            {/* Tab Buttons */}
            <div className='flex space-x-4 mb-4'>
              <button
                onClick={() => setActiveTab('custom')}
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  activeTab === 'custom'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Custom CSS
              </button>

              <button
                onClick={() => setActiveTab('tailwind')}
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  activeTab === 'tailwind'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Tailwind CSS
              </button>
            </div>

            {/* Code Preview */}
            <pre className='bg-blue-900 h-[35vh] p-4 rounded-md overflow-x-auto mt-4 border border-gray-300 shadow-inner'>
              <code className='text-sm text-gray-100'>
                {activeTab === 'custom' ? cssCode : tailwindCode}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismGenerator;
