import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

// Tabs component (inline for demo)
const TabsComponent = ({
  tabs,
  variant = 'default',
}: {
  tabs: { label: string; content: React.ReactNode }[];
  variant?: 'default' | 'pill' | 'underline' | 'vertical';
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const getGlassyClasses = (opacity = 20) =>
    `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;

  if (variant === 'vertical') {
    return (
      <div className='flex gap-4 w-full'>
        {/* Vertical tab headers */}
        <div className='flex flex-col gap-1 bg-white/10 rounded-lg p-1 min-w-[140px]'>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 text-white text-left
                ${
                  activeTab === index
                    ? 'bg-white/30 shadow-md backdrop-blur-md'
                    : 'hover:bg-white/10'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className={`${getGlassyClasses(10)} p-4 text-white text-sm flex-1 min-h-[120px] flex items-start`}
        >
          {tabs[activeTab].content}
        </div>
      </div>
    );
  }

  if (variant === 'underline') {
    return (
      <div className='w-full'>
        <div className='flex gap-0 border-b border-white/20 mb-4'>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-2 px-5 text-sm font-medium transition-all duration-300 text-white relative
                ${activeTab === index ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
            >
              {tab.label}
              {activeTab === index && (
                <span className='absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-t-full' />
              )}
            </button>
          ))}
        </div>
        <div
          className={`${getGlassyClasses(10)} p-4 text-white text-sm min-h-[80px] flex items-center`}
        >
          {tabs[activeTab].content}
        </div>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div className='w-full'>
        <div className='flex flex-wrap gap-2 mb-4'>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-1.5 px-4 rounded-full text-sm font-medium transition-all duration-300 text-white border
                ${
                  activeTab === index
                    ? 'bg-white/30 border-white/40 shadow-md backdrop-blur-md'
                    : 'border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className={`${getGlassyClasses(10)} p-4 text-white text-sm min-h-[80px] flex items-center`}
        >
          {tabs[activeTab].content}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className='w-full'>
      <div className='flex gap-1 mb-4 bg-white/10 rounded-lg p-1'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 text-white
              ${
                activeTab === index
                  ? 'bg-white/30 shadow-md backdrop-blur-md'
                  : 'hover:bg-white/10'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className={`${getGlassyClasses(10)} p-4 text-white text-sm min-h-[80px] flex items-center`}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

const TabsDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getGlassyClasses = (opacity = 20) =>
    `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;

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
        <Check size={16} className='text-white' />
      ) : (
        <Copy size={16} className='text-white' />
      )}
    </button>
  );

  const basicUsageCode = `import React, { useState } from 'react';

function ExampleTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Profile', content: 'Your profile information.' },
    { label: 'Dashboard', content: 'Overview of your activity.' },
    { label: 'Settings', content: 'Manage your preferences.' },
  ];

  return (
    <div>
      <div className='flex gap-1 mb-4 bg-white/10 rounded-lg p-1'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={\`flex-1 py-2 px-3 rounded-md text-sm font-medium
              transition-all duration-300 text-white
              \${activeTab === index
                ? 'bg-white/30 shadow-md backdrop-blur-md'
                : 'hover:bg-white/10'}\`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className='backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg p-4 text-white text-sm'>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}`;

  const pillVariantCode = `// Pill variant — rounded full tab buttons
<div className='flex flex-wrap gap-2 mb-4'>
  {tabs.map((tab, index) => (
    <button
      key={index}
      onClick={() => setActiveTab(index)}
      className={\`py-1.5 px-4 rounded-full text-sm font-medium
        transition-all duration-300 text-white border
        \${activeTab === index
          ? 'bg-white/30 border-white/40 shadow-md backdrop-blur-md'
          : 'border-white/10 hover:bg-white/10'}\`}
    >
      {tab.label}
    </button>
  ))}
</div>`;

  const underlineVariantCode = `// Underline variant — border-bottom indicator
<div className='flex gap-0 border-b border-white/20 mb-4'>
  {tabs.map((tab, index) => (
    <button
      key={index}
      onClick={() => setActiveTab(index)}
      className={\`py-2 px-5 text-sm font-medium transition-all duration-300
        text-white relative
        \${activeTab === index ? 'text-white' : 'text-white/50 hover:text-white/80'}\`}
    >
      {tab.label}
      {activeTab === index && (
        <span className='absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-t-full' />
      )}
    </button>
  ))}
</div>`;

  const verticalVariantCode = `// Vertical variant — side-by-side layout
<div className='flex gap-4 w-full'>
  <div className='flex flex-col gap-1 bg-white/10 rounded-lg p-1 min-w-[140px]'>
    {tabs.map((tab, index) => (
      <button
        key={index}
        onClick={() => setActiveTab(index)}
        className={\`py-2 px-4 rounded-md text-sm font-medium
          transition-all duration-300 text-white text-left
          \${activeTab === index
            ? 'bg-white/30 shadow-md backdrop-blur-md'
            : 'hover:bg-white/10'}\`}
      >
        {tab.label}
      </button>
    ))}
  </div>
  <div className='backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg p-4 text-white flex-1'>
    {tabs[activeTab].content}
  </div>
</div>`;

  const demoTabs = [
    {
      label: 'Profile',
      content: 'Your profile information and account details.',
    },
    {
      label: 'Dashboard',
      content: 'Overview of your recent activity and stats.',
    },
    {
      label: 'Settings',
      content: 'Manage preferences, notifications, and security.',
    },
  ];

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
          <td className='p-2 text-white'>tabs</td>
          <td className='p-2 text-white'>
            {'{ label: string; content: ReactNode }[]'}
          </td>
          <td className='p-2 text-white'>required</td>
          <td className='p-2 text-white'>
            Array of tab objects with label and content
          </td>
        </tr>
        <tr className='bg-white bg-opacity-10'>
          <td className='p-2 text-white'>variant</td>
          <td className='p-2 text-white'>
            'default' | 'pill' | 'underline' | 'vertical'
          </td>
          <td className='p-2 text-white'>'default'</td>
          <td className='p-2 text-white'>Visual style variant of the tabs</td>
        </tr>
        <tr>
          <td className='p-2 text-white'>defaultIndex</td>
          <td className='p-2 text-white'>number</td>
          <td className='p-2 text-white'>0</td>
          <td className='p-2 text-white'>Index of the initially active tab</td>
        </tr>
        <tr className='bg-white bg-opacity-10'>
          <td className='p-2 text-white'>onChange</td>
          <td className='p-2 text-white'>(index: number) =&gt; void</td>
          <td className='p-2 text-white'>-</td>
          <td className='p-2 text-white'>
            Callback fired when active tab changes
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

        <h1 className='text-6xl font-bold mb-8 text-white'>Tabs</h1>
        <p className='text-xl mb-8 text-white'>
          A flexible, glassmorphism-styled tabs component with multiple variants
          for horizontal, pill, underline, and vertical layouts.
        </p>

        {/* Basic Usage */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Basic Usage</h2>
          <div className='mb-6'>
            <TabsComponent tabs={demoTabs} variant='default' />
          </div>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {basicUsageCode}
            </pre>
            <CopyButton text={basicUsageCode} codeKey='basicUsage' />
          </div>
        </div>

        {/* Props */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Props</h2>
          <div className='overflow-x-auto'>{propsTable}</div>
        </div>

        {/* Pill Variant */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Pill Variant</h2>
          <p className='mb-6 text-lg text-white'>
            Rounded pill-shaped tab buttons with a glass-bordered active state.
          </p>
          <div className='mb-6'>
            <TabsComponent tabs={demoTabs} variant='pill' />
          </div>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {pillVariantCode}
            </pre>
            <CopyButton text={pillVariantCode} codeKey='pillVariant' />
          </div>
        </div>

        {/* Underline Variant */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Underline Variant
          </h2>
          <p className='mb-6 text-lg text-white'>
            Classic underline indicator for a clean, minimal tab style.
          </p>
          <div className='mb-6'>
            <TabsComponent tabs={demoTabs} variant='underline' />
          </div>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {underlineVariantCode}
            </pre>
            <CopyButton
              text={underlineVariantCode}
              codeKey='underlineVariant'
            />
          </div>
        </div>

        {/* Vertical Variant */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Vertical Variant
          </h2>
          <p className='mb-6 text-lg text-white'>
            Side navigation layout — tabs stack vertically on the left with
            content on the right.
          </p>
          <div className='mb-6'>
            <TabsComponent tabs={demoTabs} variant='vertical' />
          </div>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {verticalVariantCode}
            </pre>
            <CopyButton text={verticalVariantCode} codeKey='verticalVariant' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsDetailsPage;
