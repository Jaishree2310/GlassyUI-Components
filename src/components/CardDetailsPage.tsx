import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, CreditCard, Wifi } from 'lucide-react';
import BackToTopButton from './BackToTop';

interface ThemeColors {
  bg: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
}

const themes: Record<string, ThemeColors> = {
  yellow: {
    bg: '#fefcd0',
    textColor: 'black',
    borderColor: 'black',
    shadowColor: '#c38105',
  },
  brown: {
    bg: '#d2b48c',
    textColor: 'white',
    borderColor: '#8b4513',
    shadowColor: '#654321',
  },
  white: {
    bg: '#ffffff',
    textColor: 'black',
    borderColor: 'black',
    shadowColor: '#cccccc',
  },
  black: {
    bg: '#333333',
    textColor: 'white',
    borderColor: 'white',
    shadowColor: '#000000',
  },
  custom: {
    bg: '#fefcd0',
    textColor: 'black',
    borderColor: 'black',
    shadowColor: '#c38105',
  },
};

const CardDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [currentTheme, setCurrentTheme] = useState<string>('yellow');
  const [customColors, setCustomColors] = useState<ThemeColors>(themes.custom);

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
      className='absolute top-2 right-2 p-1 bg-black bg-opacity-30 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-lg shadow-lg hover:bg-opacity-40 transition-all duration-300'
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className='text-gray-800' />
      )}
    </button>
  );

  const getGlassmorphismStyle = (colors: ThemeColors) => {
    return {
      background: `rgba(${hexToRgb(colors.bg)}, 0.4)`,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`,
      border: `1px solid rgba(255, 255, 255, 0.18)`,
      color: colors.textColor,
    };
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '255, 255, 255';
  };

  const CustomCardPreview: React.FC = () => {
    const colors =
      currentTheme === 'custom' ? customColors : themes[currentTheme];
    return (
      <div
        className='relative p-8 rounded-xl overflow-hidden'
        style={{
          background: `linear-gradient(to right bottom, ${colors.bg}, ${colors.shadowColor})`,
        }}
      >
        <div
          style={getGlassmorphismStyle(colors)}
          className='p-6 rounded-lg relative z-10'
        >
          <h2 className='text-2xl font-bold mb-2'>Card Title</h2>
          <p>This is the card content with frosted glass effect.</p>
        </div>
        <div className='absolute inset-0 bg-white opacity-30 backdrop-filter backdrop-blur-sm z-0'></div>
      </div>
    );
  };

  const updateCustomCode = () => {
    const colors =
      currentTheme === 'custom' ? customColors : themes[currentTheme];
    return `<div className="relative p-8 rounded-xl overflow-hidden" style={{ background: 'linear-gradient(to right bottom, ${colors.bg}, ${colors.shadowColor})' }}>
  <Card
    style={{
      background: 'rgba(${hexToRgb(colors.bg)}, 0.4)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      color: '${colors.textColor}',
    }}
    className="p-6 rounded-lg relative z-10"
  >
    <h2 className="text-2xl font-bold mb-2">Card Title</h2>
    <p>This is the card content with frosted glass effect.</p>
  </Card>
  <div className="absolute inset-0 bg-white opacity-30 backdrop-filter backdrop-blur-sm z-0"></div>
</div>`;
  };

  const CreditCardExample: React.FC = () => (
    <div className='w-96 h-56 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl overflow-hidden relative p-8 text-white shadow-xl'>
      <div className='absolute inset-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm'></div>
      <div className='relative z-10 flex flex-col h-full'>
        <div className='flex justify-between items-center mb-8'>
          <Wifi className='w-8 h-8 rotate-90' />
          <span className='text-lg font-medium'>Glassmorphic Bank</span>
        </div>
        <div className='text-2xl font-bold tracking-wider mb-4'>
          1234 5678 9012 3456
        </div>
        <div className='mt-auto flex justify-between items-end'>
          <div>
            <div className='text-xs uppercase'>Card Holder</div>
            <div className='font-medium'>John Doe</div>
          </div>
          <div>
            <div className='text-xs uppercase'>Expires</div>
            <div className='font-medium'>12/25</div>
          </div>
          <CreditCard className='w-12 h-12' />
        </div>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-br from-pink-300 to-pink-300 text-gray-800 relative'>
      <BackToTopButton />
      <button
        onClick={() => navigate(-1)}
        className='mb-8 flex items-center px-4 py-2 bg-yellow-500 bg-opacity-30 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-lg shadow-lg hover:bg-opacity-40 transition-all duration-300 text-gray-800'
      >
        <ArrowLeft size={20} className='mr-2' />
        Back to Components
      </button>

      <h1 className='text-4xl font-bold mb-8 text-gray-900'>Card Component</h1>

      {/* Basic Usage */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Basic Usage</h2>
        <div className='bg-white bg-opacity-30 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-lg p-6 max-sm:px-1'>
          <pre className='bg-green-300 text-black p-4 rounded-lg overflow-x-auto relative max-sm:text-[0.55rem]'>
            {`import { Card } from './components/Card';

function Example() {
  return (
    <Card className="p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-md">
      <h2 className="text-xl font-bold mb-2">Card Title</h2>
      <p>This is the basic card content.</p>
    </Card>
  );
}`}
          </pre>
          <CopyButton
            text={`import { Card } from './components/Card';

function Example() {
  return (
    <Card className="p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-md">
      <h2 className="text-xl font-bold mb-2">Card Title</h2>
      <p>This is the basic card content.</p>
    </Card>
  );
}`}
            codeKey='basicUsage'
          />
        </div>
      </section>

      {/* Props */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Props</h2>
        <div className='bg-white bg-opacity-30 backdrop-filter backdrop-blur-md border border-black border-opacity-20 rounded-lg p-6 max-sm:px-1'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr>
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
                  <td className='p-2'>Additional CSS classes</td>
                </tr>
                <tr>
                  <td className='p-2'>style</td>
                  <td className='p-2'>object</td>
                  <td className='p-2'>{'{}'}</td>
                  <td className='p-2'>Inline styles for the card</td>
                </tr>
                <tr>
                  <td className='p-2'>children</td>
                  <td className='p-2'>ReactNode</td>
                  <td className='p-2'>-</td>
                  <td className='p-2'>Card content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Custom Card Section */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Custom Card</h2>
        <p className='mb-4 text-black'>
          Customize your card's appearance by selecting a preset theme or
          creating your own color scheme.
        </p>
        <div className='bg-white bg-opacity-30 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-lg p-6 max-sm:px-1'>
          <div className='mb-4'>
            <span className='text-sm font-bold mr-2'>Theme:</span>
            {Object.keys(themes).map(theme => (
              <button
                key={theme}
                onClick={() => setCurrentTheme(theme)}
                className={`w-6 h-6 rounded-full border-2 mr-2 ${
                  currentTheme === theme ? 'border-blue-500' : 'border-gray-300'
                }`}
                style={{ backgroundColor: themes[theme].bg }}
              />
            ))}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <CustomCardPreview />
            <div className='relative'>
              <pre className='bg-emerald-200 text-black p-4 rounded-lg overflow-x-auto text-sm  max-sm:text-[0.55rem]'>
                {updateCustomCode()}
              </pre>
              <CopyButton text={updateCustomCode()} codeKey='customStyling' />
            </div>
          </div>
        </div>
      </section>

      {/* Credit Card Example */}
      {/* Credit Card Example */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>
          Credit Card Example
        </h2>
        <div className='bg-white bg-opacity-30 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-lg p-6 max-sm:px-1'>
          <div className='flex flex-col lg:flex-row gap-8'>
            <div className='lg:w-1/3 flex justify-center items-center bg-gradient-to-br from-purple-400 to-blue-300 p-8 rounded-xl'>
              <CreditCardExample />
            </div>
            <div className='lg:w-2/3'>
              <h3 className='text-xl font-semibold mb-4 text-gray-800'>Code</h3>
              <div className='relative'>
                <pre className='bg-lime-200 text-black p-4 rounded-lg overflow-x-auto text-sm max-h-[400px] whitespace-pre-wrap break-words max-sm:text-[0.55rem]'>
                  <code>
                    {`const GlassmorphicCreditCard: React.FC = () => (
  <div className="w-96 h-56 bg-gradient-to-br from-purple-100 
    to-blue-300 rounded-xl overflow-hidden relative p-8 
    text-white shadow-xl">
    <div className="absolute inset-0 bg-black bg-opacity-30 
      backdrop-filter backdrop-blur-sm"></div>
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <Wifi className="w-8 h-8 rotate-90" />
        <span className="text-lg font-medium">
          Glassmorphic Bank
        </span>
      </div>
      <div className="text-2xl font-bold tracking-wider mb-4">
        1234 5678 9012 3456
      </div>
      <div className="mt-auto flex justify-between items-end">
        <div>
          <div className="text-xs uppercase">Card Holder</div>
          <div className="font-medium">John Doe</div>
        </div>
        <div>
          <div className="text-xs uppercase">Expires</div>
          <div className="font-medium">12/25</div>
        </div>
        <CreditCard className="w-12 h-12" />
      </div>
    </div>
  </div>
);`}
                  </code>
                </pre>
                <CopyButton
                  text={`const GlassmorphicCreditCard: React.FC = () => (
  <div className="w-96 h-56 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl overflow-hidden relative p-8 text-white shadow-xl">
    <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm"></div>
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <Wifi className="w-8 h-8 rotate-90" />
        <span className="text-lg font-medium">Glassmorphic Bank</span>
      </div>
      <div className="text-2xl font-bold tracking-wider mb-4">
        1234 5678 9012 3456
      </div>
      <div className="mt-auto flex justify-between items-end">
        <div>
          <div className="text-xs uppercase">Card Holder</div>
          <div className="font-medium">John Doe</div>
        </div>
        <div>
          <div className="text-xs uppercase">Expires</div>
          <div className="font-medium">12/25</div>
        </div>
        <CreditCard className="w-12 h-12" />
      </div>
    </div>
  </div>
);`}
                  codeKey='creditCardExample'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardDetailsPage;
