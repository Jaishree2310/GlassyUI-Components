import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

type Theme = 'pink' | 'brown' | 'white' | 'black' | 'pop';

interface ProgressBarProps {
  progress: number;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  theme: Theme;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color, size = 'md', theme }) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 max-sm:px-0';
  };

  return (
    <div className={`w-full ${sizeClasses[size]} ${getGlassyClasses()} overflow-hidden relative`}>
      <div
        className={`absolute top-0 left-0 h-full bg-opacity-50 transition-all duration-300 ease-out ${getGlassyClasses()}`}
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent),
            linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)
          `,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
};

const ProgressBarDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [customProgress, setCustomProgress] = useState(57);
  const [customColor, setCustomColor] = useState("#fcfc00");
  const [progressBarTheme] = useState<Theme>('pop');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300';
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
    });
  };

  const CopyButton: React.FC<{ text: string, codeKey: string }> = ({ text, codeKey }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-opacity-40 transition-all duration-300`}
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? <Check size={16} className="text-green-600" /> : <Copy size={16} className=" text-gray-100" />}
    </button>
  );

  const AnimatedProgressBar: React.FC<{ theme: Theme }> = ({ theme }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) return 0;
          return Math.min(oldProgress + 1, 100);
        });
      }, 50);

      return () => {
        clearInterval(timer);
      };
    }, []);

    return <ProgressBar progress={progress} color="cyan" theme={theme} />;
  };

  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative">
      <BackToTopButton />
      <button
        onClick={() => navigate(-1)}
        className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-40 transition-all duration-300  text-gray-100`}
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Components
      </button>

      <h1 className="text-4xl font-bold mb-8 text-white">ProgressBar Component</h1>

      <p className="mb-8  text-gray-100">A customizable, mesh frosted glass styled progress bar component with a glassmorphism effect.</p>

      {/* Basic Usage */}
      <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>

        <h2 className="text-2xl font-bold mb-4  text-gray-100">Basic Usage</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          {`import { ProgressBar } from 'glassy-ui';

function App() {
  return (
    <ProgressBar
      size="md"
      color="white"
      progress={50}
      theme="pop"
    />
  );
}`}
        </pre>
        <CopyButton text={`import { ProgressBar } from 'glassy-ui';

function App() {
  return (
    <ProgressBar
      size="md"
      color="white"
      progress={50}
      theme="pop"
    />
  );
}`} codeKey="basicUsage" />
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Preview:</h3>
          <ProgressBar progress={50} color="purple" theme={progressBarTheme} />
        </div>
      </div>

      {/* Props */}
      <div className={`${getGlassyClasses()} p-6 mb-8`}>
        <h2 className="text-2xl font-bold mb-4  text-gray-100">Props</h2>
        <div className='overflow-x-auto'>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Prop</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Default</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">size</td>
                <td className="p-2">'sm' | 'md' | 'lg'</td>
                <td className="p-2">'md'</td>
                <td className="p-2">Size of the progress bar</td>
              </tr>
              <tr>
                <td className="p-2">color</td>
                <td className="p-2">string</td>
                <td className="p-2">'pink'</td>
                <td className="p-2">Color of the progress indicator</td>
              </tr>
              <tr>
                <td className="p-2">progress</td>
                <td className="p-2">number</td>
                <td className="p-2">0</td>
                <td className="p-2">Progress value (0-100)</td>
              </tr>
              <tr>
                <td className="p-2">theme</td>
                <td className="p-2">'pink' | 'brown' | 'white' | 'black' | 'pop'</td>
                <td className="p-2">'pink'</td>
                <td className="p-2">Theme of the progress bar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom ProgressBar */}
      <div className={`${getGlassyClasses()} p-6 mb-8`}>
        <h2 className="text-2xl font-bold mb-4  text-gray-100">Custom ProgressBar</h2>
        <p className="mb-4">Customize your progress bar's appearance by selecting a preset theme or creating your own color scheme.</p>

        <div className="flex items-center mb-4">
          <label htmlFor="colorPicker" className="mr-2">Choose Color:</label>
          <input
            type="color"
            id="colorPicker"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="rounded-md cursor-pointer"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="progressSlider" className="block mb-2">Adjust Progress: {customProgress}%</label>
          <input
            type="range"
            id="progressSlider"
            min="0"
            max="100"
            value={customProgress}
            onChange={(e) => setCustomProgress(parseInt(e.target.value))}
            className="w-80"
          />
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-bold mb-2">Preview:</h4>
          <ProgressBar progress={customProgress} color={customColor} theme={progressBarTheme} />
        </div>

        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4 relative max-sm:text-[0.55rem]">
          {`<ProgressBar
  size="md"
  color="${customColor}"
  progress={${customProgress}}
  theme="${progressBarTheme}"
/>`}
        </pre>
        <CopyButton text={`<ProgressBar
  size="md"
  color="${customColor}"
  progress={${customProgress}}
  theme="${progressBarTheme}"
/>`} codeKey="customProgressBar" />
      </div>

      {/* Examples */}
      <div className={`${getGlassyClasses()} p-6 mt-8`}>

        <h2 className="text-2xl font-bold mb-4  text-gray-100">Examples for mesh morphism</h2>

        {/* Different Sizes */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Different Sizes</h3>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mb-4 relative max-sm:text-[0.55rem]">
            {`<ProgressBar size="sm" color="gray" progress={25} theme="${progressBarTheme}" />
<ProgressBar size="md" color="blue" progress={50} theme="${progressBarTheme}" />
<ProgressBar size="lg" color="green" progress={75} theme="${progressBarTheme}" />`}
            <CopyButton text={`<ProgressBar size="sm" color="gray" progress={25} theme="${progressBarTheme}" />
<ProgressBar size="md" color="blue" progress={50} theme="${progressBarTheme}" />
<ProgressBar size="lg" color="green" progress={75} theme="${progressBarTheme}" />`} codeKey="differentSizes" />
          </pre>

          <div className="mt-4">
            <h4 className="text-lg font-bold mb-2">Preview:</h4>
            <div className="space-y-4">
              <ProgressBar size="sm" progress={25} color="gray" theme={progressBarTheme} />
              <ProgressBar size="md" progress={50} color="blue" theme={progressBarTheme} />
              <ProgressBar size="lg" progress={75} color="green" theme={progressBarTheme} />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Progress */}
      <div className={`${getGlassyClasses()} p-6 mt-8`}>
        <h2 className="text-2xl font-bold mb-4  text-gray-100">Other Examples</h2>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Animated Progress</h2>
          <p className="mb-4">You can animate the progress by updating the progress prop over time:</p>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mb-4 relative max-sm:text-[0.55rem]">
            {`const AnimatedProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) return 0;
        return Math.min(oldProgress + 1, 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <ProgressBar progress={progress} color="cyan" theme="${progressBarTheme}" />;
};`}
            <CopyButton text={`import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'pixel-retroui';

const AnimatedProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) return 0;
        return Math.min(oldProgress + 1, 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <ProgressBar progress={progress} color="cyan" theme="${progressBarTheme}" />;
};`} codeKey="animatedProgress" />
          </pre>

          <div className="mt-4">
            <h4 className="text-lg font-bold mb-2">Preview:</h4>
            <AnimatedProgressBar theme={progressBarTheme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarDetailPage;
