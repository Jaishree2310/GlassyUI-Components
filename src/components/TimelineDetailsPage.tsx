import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Check,
  Briefcase,
  Award,
  GraduationCap,
} from 'lucide-react';
import PageShell from './PageShell';
import Timeline, { TimelineEvent } from './Timeline';

export const TimelineDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Playground Sandbox State
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>(
    'vertical',
  );
  const [alignment, setAlignment] = useState<'left' | 'right' | 'alternate'>(
    'alternate',
  );
  const [opacity, setOpacity] = useState(0.12);
  const [lineStyle, setLineStyle] = useState<'solid' | 'dashed' | 'gradient'>(
    'solid',
  );

  const getGlassyClasses = (op = 20) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${op} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
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
      className={`absolute top-2 right-2 ${getGlassyClasses(10)} p-2 hover:bg-opacity-40 transition-all duration-300 z-10`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-emerald-400' />
      ) : (
        <Copy size={16} className='text-gray-100' />
      )}
    </button>
  );

  const sandboxEvents: TimelineEvent[] = [
    {
      title: 'Senior UX Architect',
      subtitle: 'Innovision Studios',
      date: '2024 - Present',
      description:
        'Led a design team of 8 executing premium glassmorphism interfaces and UI kit architectures.',
      icon: <Briefcase size={16} />,
      color: '#EC4899',
    },
    {
      title: 'BSc Computer Science',
      subtitle: 'Design College London',
      date: '2020 - 2023',
      description:
        'Graduated with First Class Honors specializing in Human Computer Interaction and web architecture.',
      icon: <GraduationCap size={16} />,
      color: '#3B82F6',
    },
    {
      title: 'Rising Star Award',
      subtitle: 'Web Creative Awards',
      date: '2022',
      description:
        'Honored for outstanding implementation of environment-aware adaptive layouts.',
      icon: <Award size={16} />,
      color: '#10B981',
    },
  ];

  const basicUsageCode = `import Timeline from './Timeline';
import { Briefcase, GraduationCap } from 'lucide-react';

const events = [
  {
    title: 'Senior UX Architect',
    subtitle: 'Innovision Studios',
    date: '2024 - Present',
    description: 'Led design teams executing responsive glassmorphism kit frameworks.',
    icon: <Briefcase size={16} />,
    color: '#EC4899'
  },
  {
    title: 'BSc Computer Science',
    subtitle: 'Design College London',
    date: '2020 - 2023',
    description: 'Graduated specializing in Human Computer Interaction.',
    icon: <GraduationCap size={16} />,
    color: '#3B82F6'
  }
];

function App() {
  return (
    <Timeline 
      events={events} 
      orientation="vertical" 
      alignment="alternate" 
    />
  );
}`;

  const dynamicCode = `<Timeline
  events={[
    {
      title: 'Senior UX Architect',
      subtitle: 'Innovision Studios',
      date: '2024 - Present',
      description: 'Led a design team of 8 executing premium glassmorphism interfaces.',
      icon: <Briefcase size={16} />,
      color: '#EC4899'
    },
    {
      title: 'BSc Computer Science',
      subtitle: 'Design College London',
      date: '2020 - 2023',
      description: 'Graduated specializing in Human Computer Interaction.',
      icon: <GraduationCap size={16} />,
      color: '#3B82F6'
    },
    {
      title: 'Rising Star Award',
      subtitle: 'Web Creative Awards',
      date: '2022',
      description: 'Honored for outstanding adaptive layouts design.',
      icon: <Award size={16} />,
      color: '#10B981'
    }
  ]}
  orientation="${orientation}"
  alignment="${alignment}"
  glassOpacity={${opacity}}
  lineStyle="${lineStyle}"
/>`;

  return (
    <PageShell>
      <button
        onClick={() => navigate('/components')}
        className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-opacity-40 transition-all duration-300 text-gray-100`}
      >
        <ArrowLeft size={20} className='mr-2' />
        Back to Components
      </button>

      <div className='mb-12'>
        <h1 className='text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200'>
          Timeline Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A premium responsive timeline for events, projects, and delivery
          history.
        </p>
      </div>

      {/* Basic Usage */}
      <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-2xl font-bold mb-4 text-gray-100'>Basic Usage</h2>
        <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto'>
          <CopyButton text={basicUsageCode} codeKey='basicUsage' />
          {basicUsageCode}
        </pre>
      </div>

      {/* Props */}
      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>Props</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-white bg-opacity-20 text-left'>
                <th className='p-2'>Prop</th>
                <th className='p-2'>Type</th>
                <th className='p-2'>Default</th>
                <th className='p-2'>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-white/10'>
                <td className='p-2'>events</td>
                <td className='p-2 font-mono text-pink-200'>TimelineEvent[]</td>
                <td className='p-2 font-mono text-red-300'>Required</td>
                <td className='p-2'>
                  Array of events with title, subtitle, date, description, and
                  color.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>orientation</td>
                <td className='p-2 font-mono text-pink-200'>
                  'vertical' | 'horizontal'
                </td>
                <td className='p-2 font-mono'>'vertical'</td>
                <td className='p-2'>
                  Direction of the timeline connector paths.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>alignment</td>
                <td className='p-2 font-mono text-pink-200'>
                  'left' | 'right' | 'alternate'
                </td>
                <td className='p-2 font-mono'>'alternate'</td>
                <td className='p-2'>
                  Content placement side. Alternate only functions on vertical
                  layouts.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>glassOpacity</td>
                <td className='p-2 font-mono text-pink-200'>number</td>
                <td className='p-2 font-mono'>0.12</td>
                <td className='p-2'>Translucent background white opacity.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>lineStyle</td>
                <td className='p-2 font-mono text-pink-200'>
                  'solid' | 'dashed' | 'gradient'
                </td>
                <td className='p-2 font-mono'>'solid'</td>
                <td className='p-2'>Connector trail line style definition.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sandbox Playground */}
      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>
          Interactive Sandbox
        </h2>
        <p className='text-xl mb-6 text-gray-300'>
          Customize properties and view alterations live.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Controls */}
          <div className='space-y-6'>
            <div>
              <label className='block mb-2 font-semibold'>Orientation</label>
              <div className='flex gap-2'>
                {(['vertical', 'horizontal'] as const).map(o => (
                  <button
                    key={o}
                    onClick={() => setOrientation(o)}
                    className={`flex-1 py-1 rounded text-xs font-bold capitalize transition-all ${
                      orientation === o
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {orientation === 'vertical' && (
              <div>
                <label className='block mb-2 font-semibold'>Alignment</label>
                <div className='flex gap-2'>
                  {(['left', 'right', 'alternate'] as const).map(a => (
                    <button
                      key={a}
                      onClick={() => setAlignment(a)}
                      className={`flex-1 py-1 rounded text-xs font-bold capitalize transition-all ${
                        alignment === a
                          ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                          : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className='block mb-2 font-semibold'>
                Connector Line Style
              </label>
              <div className='flex gap-2'>
                {(['solid', 'dashed', 'gradient'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setLineStyle(l)}
                    className={`flex-1 py-1 rounded text-xs font-bold capitalize transition-all ${
                      lineStyle === l
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className='block mb-1 font-semibold'>
                Glass Opacity: {opacity.toFixed(2)}
              </label>
              <input
                type='range'
                min='0.05'
                max='0.40'
                step='0.05'
                value={opacity}
                onChange={e => setOpacity(parseFloat(e.target.value))}
                className='w-full accent-white cursor-pointer'
              />
            </div>
          </div>

          {/* Preview & Code */}
          <div className='lg:col-span-2 space-y-6 flex flex-col justify-between'>
            <div
              className={`${getGlassyClasses(5)} p-6 rounded-xl flex-grow flex flex-col justify-center min-h-[300px]`}
            >
              <h3 className='text-sm font-semibold mb-4 text-gray-400'>
                Live Preview
              </h3>
              <div className='p-2'>
                <Timeline
                  events={sandboxEvents}
                  orientation={orientation}
                  alignment={alignment}
                  glassOpacity={opacity}
                  lineStyle={lineStyle}
                />
              </div>
            </div>

            <div className='relative'>
              <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-xs'>
                <CopyButton text={dynamicCode} codeKey='sandbox' />
                {dynamicCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default TimelineDetailsPage;
