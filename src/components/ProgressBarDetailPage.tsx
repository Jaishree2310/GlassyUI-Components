import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

type Theme = 'pink' | 'brown' | 'white' | 'black' | 'pop';

const ProgressBarDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTheme, setCurrentTheme] = useState<Theme>((location.state as { currentTheme?: Theme })?.currentTheme || 'pink');
  const [customProgress, setCustomProgress] = useState(57);
  const [customColor, setCustomColor] = useState("#fcfc00");
  const [progressBarTheme, setProgressBarTheme] = useState<Theme>('pop');

  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const getThemeClasses = (theme: Theme) => {
    switch (theme) {
      case 'white':
        return 'bg-gradient-to-br from-gray-50 to-white text-gray-800';
      case 'black':
        return 'bg-gradient-to-br from-gray-900 to-black text-white';
      case 'brown':
        return 'bg-gradient-to-br from-yellow-800 to-yellow-600 text-white';
      case 'pop':
        return 'bg-gradient-to-br from-pink-400 to-purple-500 text-white';
      default:
        return 'bg-gradient-to-br from-pink-400 to-purple-500 text-white';
    }
  };

  const getGlassyClasses = (theme: Theme) => {
    const baseClasses = 'backdrop-filter backdrop-blur-md bg-opacity-20 border border-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300';
    switch (theme) {
      case 'white':
        return `${baseClasses} bg-gray-500 border-gray-300 text-gray-800`;
      case 'black':
        return `${baseClasses} bg-white border-gray-600 text-white`;
      case 'brown':
        return `${baseClasses} bg-white border-yellow-300 text-white`;
      case 'pop':
        return `${baseClasses} bg-white border-pink-300 text-white`;
      default:
        return `${baseClasses} bg-white border-pink-300 text-white`;
    }
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
      className={`absolute top-2 right-2 ${getGlassyClasses(currentTheme)} p-2 hover:bg-opacity-30 transition-all duration-300`}
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );

  const ComponentCard: React.FC<{ title: string; description: string; onClick: () => void; children: React.ReactNode }> = ({
    title,
    description,
    onClick,
    children
  }) => (
    <div className={`${getGlassyClasses(currentTheme)} p-6 mb-8 cursor-pointer`} onClick={onClick}>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      {children}
    </div>
  );

  const ProgressBar: React.FC<{ progress: number; color: string; size?: 'sm' | 'md' | 'lg'; theme: Theme }> = ({ progress, color, size = 'md', theme }) => {
    const sizeClasses = {
      sm: 'h-2',
      md: 'h-4',
      lg: 'h-6'
    };

    return (
      <div className={`w-full ${sizeClasses[size]} ${getGlassyClasses(theme)} overflow-hidden relative`}>
        <div 
          className={`absolute top-0 left-0 h-full bg-opacity-50 transition-all duration-300 ease-out ${getGlassyClasses(theme)}`}
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

  const ThemeSelector: React.FC<{ onChange: (theme: Theme) => void, selectedTheme: Theme }> = ({ onChange, selectedTheme }) => (
    <div className="flex space-x-2 mb-4">
      {(['pop', 'pink', 'brown', 'white', 'black'] as Theme[]).map((theme) => (
        <button
          key={theme}
          className={`w-8 h-8 rounded-full ${getThemeClasses(theme)} border-2 ${selectedTheme === theme ? 'border-blue-500' : 'border-transparent'}`}
          onClick={() => onChange(theme)}
        />
      ))}
    </div>
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
    <div className={`min-h-screen p-8 font-mono transition-colors duration-300 ${getThemeClasses(currentTheme)}`}>
      <button 
        onClick={() => navigate(-1)} 
        className={`mb-8 flex items-center ${getGlassyClasses(currentTheme)} px-4 py-2 hover:bg-opacity-30 transition-all duration-300`}
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Components
      </button>

      {/* <ComponentCard
        title="ProgressBar"
        description="Nostalgic progress indicators with glassmorphism effect"
        onClick={() => {}}
      >
        <ProgressBar progress={60} color="purple" theme={progressBarTheme} />
      </ComponentCard> */}

      <h1 className="text-4xl font-bold mb-8">ProgressBar Component</h1>

      <p className="mb-8">A customizable, mesh frosted glass styled progress bar component with a glassmorphism effect.</p>

      {/* Basic Usage */}
      <div className={`${getGlassyClasses(currentTheme)} p-6 mb-8 relative`}>
        <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
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
      <div className={`${getGlassyClasses(currentTheme)} p-6 mb-8`}>
        <h2 className="text-2xl font-bold mb-4">Props</h2>
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

      {/* Custom ProgressBar */}
      <div className={`${getGlassyClasses(currentTheme)} p-6 mb-8`}>
        <h2 className="text-2xl font-bold mb-4">Custom ProgressBar</h2>
        <p className="mb-4">Customize your progress bar's appearance by selecting a preset theme or creating your own color scheme.</p>
        
        {/* <div className="flex items-center mb-4">
          <label htmlFor="themeSelector" className="mr-2">Progress Bar Theme:</label>
          <ThemeSelector onChange={setProgressBarTheme} selectedTheme={progressBarTheme} />
        </div> */}
        
        <div className="flex items-center mb-4">
          <label htmlFor="colorPicker" className="mr-2">Choose Color:</label>
          <input
            type="color"
            id="colorPicker"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className=" rounded-md cursor-pointer"
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

        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4 relative">
          {`<ProgressBar
  size="md"
  color="${customColor}"
  progress={${customProgress}}
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
      <div className={`${getGlassyClasses(currentTheme)} p-6 mt-8`}>
        <h2 className="text-2xl font-bold mb-4">Examples</h2>
        
        {/* Different Sizes */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Different Sizes</h3>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mb-4 relative">
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

        {/* Different Themes */}
        {/* <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Different Themes</h3>
          <pre className="bg-gray-800 text-white p-4 rounde
          d-lg overflow-x-auto mb-4 relative">
            {`<ProgressBar progress={60} color="purple" theme="pop" />
<ProgressBar progress={60} color="orange" theme="brown" />
<ProgressBar progress={60} color="blue" theme="white" />
<ProgressBar progress={60} color="green" theme="black" />`}
            <CopyButton text={`<ProgressBar progress={60} color="purple" theme="pop" />
<ProgressBar progress={60} color="orange" theme="brown" />
<ProgressBar progress={60} color="blue" theme="white" />
<ProgressBar progress={60} color="green" theme="black" />`} codeKey="differentThemes" />
          </pre>
          
          <div className="mt-4">
            <h4 className="text-lg font-bold mb-2">Preview:</h4>
            <div className="space-y-4">
              <ProgressBar progress={60} color="purple" theme="pop" />
              <ProgressBar progress={60} color="orange" theme="brown" />
              <ProgressBar progress={60} color="blue" theme="white" />
              <ProgressBar progress={60} color="green" theme="black" />
            </div>
          </div>
        </div> */}
{/* </div> */}
</div>
        {/* Animated Progress */}
        <div className={`${getGlassyClasses(currentTheme)} p-6 mt-8`}>
        <h2 className="text-2xl font-bold mb-4"> Other Examples</h2>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Animated Progress</h2>
          <p className="mb-4">You can animate the progress by updating the progress prop over time:</p>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mb-4 relative">
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















