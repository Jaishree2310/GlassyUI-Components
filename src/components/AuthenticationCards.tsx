import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
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

const AuthenticationCardDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [currentTheme, setCurrentTheme] = useState<string>('yellow');
  const [customColors, setCustomColors] = useState<ThemeColors>(themes.custom);
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
      className='absolute top-2 right-2 p-1 bg-white bg-opacity-30 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-lg shadow-lg hover:bg-opacity-40 transition-all duration-300'
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
          background: 'linear-gradient(to right bottom, #ffffff, #cccccc)',
        }}
      >
        <div
          style={getGlassmorphismStyle(colors)}
          className='p-6 rounded-lg relative z-10'
        >
          <h2 className='text-2xl font-bold mb-4'>Login</h2>
          <form>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium mb-2'>
                Email:
              </label>
              <input
                type='email'
                id='email'
                className='w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm'
                placeholder='Enter your email'
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block text-sm font-medium mb-2'
              >
                Password:
              </label>
              <input
                type='password'
                id='password'
                className='w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm'
                placeholder='Enter your password'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200'
            >
              Login
            </button>
          </form>
        </div>
        <div className='absolute inset-0 bg-white opacity-30 backdrop-filter backdrop-blur-sm z-0'></div>
      </div>
    );
  };

  const updateCustomCode = () => {
    const colors =
      currentTheme === 'custom' ? customColors : themes[currentTheme];
    return ` <div
      className="relative p-8 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(to right bottom, #ffffff, #cccccc)',
      }}
    >
      <div
         style={{
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: 'black',
        }}
        className="p-6 rounded-lg relative z-10"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
      <div className="absolute inset-0 bg-white opacity-30 backdrop-filter backdrop-blur-sm z-0"></div>
    </div>`;
  };

  const SignUpCardExample: React.FC = () => (
    <div
      className='relative p-8 rounded-xl overflow-hidden'
      style={{
        background: 'linear-gradient(to right bottom, #ffffff, #cccccc)',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: 'black',
        }}
        className='p-6 rounded-lg relative z-10'
      >
        <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
        <form>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              className='w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium mb-2'
            >
              Password:
            </label>
            <input
              type='password'
              id='password'
              className='w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm'
              placeholder='Enter your password'
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium mb-2'
            >
              Confirm Password:
            </label>
            <input
              type='password'
              id='password'
              className='w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200'
          >
            Sign up
          </button>
        </form>
      </div>
      <div className='absolute inset-0 bg-white opacity-30 backdrop-filter backdrop-blur-sm z-0'></div>
    </div>
  );

  const LoginCardExample: React.FC = () => (
    <div
      className='relative p-8 rounded-xl overflow-hidden'
      style={{
        background: 'linear-gradient(to right bottom, #ffffff, #cccccc)',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: 'black',
        }}
        className='p-6 rounded-lg relative z-10'
      >
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              className='w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium mb-2'
            >
              Password:
            </label>
            <input
              type='password'
              id='password'
              className='w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200'
          >
            Login
          </button>
        </form>
      </div>
      <div className='absolute inset-0 bg-white opacity-30 backdrop-filter backdrop-blur-sm z-0'></div>
    </div>
  );

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <button
        onClick={() => navigate(-1)}
        className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-opacity-40 transition-all duration-300  text-gray-100`}
      >
        <ArrowLeft size={20} className='mr-2' />
        Back to Components
      </button>

      <h1 className='text-6xl font-bold mb-8 text-white'>
        Authentication Card Component
      </h1>
      <p className='text-xl mb-8 text-gray-100'>
        A customizable, glassmorphism-styled Authentication component.
      </p>

      {/* Props */}
      <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>Props</h2>
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
                <td className='p-2'>Additional CSS classes</td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
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
      </section>

      <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-3xl font-bold mb-6 text-white'>
          Login Card Example
        </h2>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* <div className="lg:w-1/3 flex justify-center items-center bg-gradient-to-br from-purple-400 to-blue-300 p-8 rounded-xl"> */}
          <LoginCardExample />
          {/* </div> */}
          <div className='lg:w-2/3'>
            <h3 className='text-xl font-semibold mb-4 text-white'>Code</h3>
            <div className='relative'>
              <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm max-h-[400px] whitespace-pre-wrap break-words'>
                <code>
                  {` const LoginCardExample: React.FC = () => (
    <div
      className="relative p-8 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(to right bottom, #ffffff, #cccccc)',
      }}
    >
      <div
         style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: 'black',
          }}
        className="p-6 rounded-lg relative z-10"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
      <div className="absolute inset-0 bg-white opacity-30 backdrop-filter backdrop-blur-sm z-0"></div>
    </div>
  );`}
                </code>
              </pre>
              <CopyButton
                text={`const LoginCardExample: React.FC = () => (
    <div
      className="relative p-8 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(to right bottom, #ffffff, #cccccc)',
      }}
    >
      <div
         style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: 'black',
          }}
        className="p-6 rounded-lg relative z-10"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="absolute inset-0 bg-white opacity-30 backdrop-filter backdrop-blur-sm z-0"></div>
    </div>
);`}
                codeKey='LoginCardExample'
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-2xl font-bold mb-6 text-white'>
          Sign Up Card Example
        </h2>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* <div className="lg:w-1/3 flex justify-center items-center bg-gradient-to-br from-purple-400 to-blue-300 p-8 rounded-xl"> */}
          <SignUpCardExample />
          {/* </div> */}
          <div className='lg:w-2/3'>
            <h3 className='text-xl font-semibold mb-4 text-white'>Code</h3>
            <div className='relative'>
              <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm max-h-[400px] whitespace-pre-wrap break-words'>
                <code>
                  {` const SignUpCardExample: React.FC = () => (
    <div
      className="relative p-8 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(to right bottom, #ffffff, #cccccc)',
      }}
    >
      <div
         style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: 'black',
          }}
        className="p-6 rounded-lg relative z-10"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="absolute inset-0 bg-white opacity-30 backdrop-filter backdrop-blur-sm z-0"></div>
    </div>
  );`}
                </code>
              </pre>
              <CopyButton
                text={`const SignUpCardExample: React.FC = () => (
    <div
      className="relative p-8 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(to right bottom, #ffffff, #cccccc)',
      }}
    >
      <div
         style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: 'black',
          }}
        className="p-6 rounded-lg relative z-10"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="absolute inset-0 bg-white opacity-30 backdrop-filter backdrop-blur-sm z-0"></div>
    </div>
);`}
                codeKey='SignUpCardExample'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthenticationCardDetailsPage;
