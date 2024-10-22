import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

const StatisticDetails: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getGlassyClasses = (opacity = 5) => {
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

  const statsData = [
    {
      iconColor: 'text-red-400',
      iconPath1: 'M8 17l4 4 4-4m-4-5v9',
      iconPath2: 'M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29',
      number: '2.7K',
      label: 'Downloads',
    },
    {
      iconColor: 'text-red-400',
      iconPath1: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2',
      iconPath2: 'M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75',
      number: '1.3K',
      label: 'Users',
    },
    {
      iconColor: 'text-red-400',
      iconPath1: 'M3 18v-6a9 9 0 0118 0v6',
      iconPath2:
        'M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z',
      number: '74',
      label: 'Files',
    },
    {
      iconColor: 'text-red-400',
      iconPath1: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
      number: '46',
      label: 'Places',
    },
  ];

  const exampleProps = `
      const statsData = [
        {
          iconColor: "text-red-400",
          iconPath1: "M8 17l4 4 4-4m-4-5v9",
          iconPath2: "M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29",
          number: "2.7K",
          label: "Downloads",
        },
        {
          iconColor: "text-red-400",
          iconPath1: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2",
          iconPath2: "M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75",
          number: "1.3K",
          label: "Users",
        },
        {
          iconColor: "text-red-400",
          iconPath1: "M3 18v-6a9 9 0 0118 0v6",
          iconPath2: "M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z",
          number: "74",
          label: "Files",
        },
        {
          iconColor: "text-red-400",
          iconPath1: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
          number: "46",
          label: "Places",
        },
      ];
  `;

  const statisticCode = `
        const getGlassyClasses = (opacity = 5) => { return \`backdrop-filter backdrop-blur-lg bg-white bg-opacity-$\{opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300\`; };

        <section className={\`$\{ getGlassyClasses()} p-6 mb - 14\`}>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            {statsData.map((stat, index) => (
              <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-300 px-4 py-6 rounded-lg">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className={\`$\{stat.iconColor} w-12 h-12 mb-3 inline-block\`}
                    viewBox="0 0 24 24"
                  >
                    <path d={stat.iconPath1}></path>
                    {stat.iconPath2 && <path d={stat.iconPath2}></path>}
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-white">
                    {stat.number}
                  </h2>
                  <p className="leading-relaxed">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    `;

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
          Statistic Component
        </h1>
        <p className='text-xl mb-8 text-white'>
          A simple component to display user statistic.
        </p>

        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Basic Usage</h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {statisticCode}
            </pre>
            <CopyButton text={statisticCode} codeKey='statistic' />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-6 mb-14`}>
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
                  <td className='p-2 text-gray-200'>downloads</td>
                  <td className='p-2 text-gray-200'>number</td>
                  <td className='p-2 text-gray-200'>2700</td>
                  <td className='p-2 text-gray-200'>
                    The number of downloads to display
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-200'>users</td>
                  <td className='p-2 text-gray-200'>number</td>
                  <td className='p-2 text-gray-200'>1300</td>
                  <td className='p-2 text-gray-200'>
                    The number of users to display
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-200'>files</td>
                  <td className='p-2 text-gray-200'>number</td>
                  <td className='p-2 text-gray-200'>74</td>
                  <td className='p-2 text-gray-200'>
                    The number of files to display
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-200'>places</td>
                  <td className='p-2 text-gray-200'>number</td>
                  <td className='p-2 text-gray-200'>46</td>
                  <td className='p-2 text-gray-200'>
                    The number of places to display
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Example Props Array
          </h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {exampleProps}
            </pre>
            <CopyButton text={exampleProps} codeKey='props' />
          </div>
        </div>

        <section className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-2xl font-bold mb-4 text-white'>
            Statistic Example
          </h2>
          <section className={`${getGlassyClasses()} p-6 mb-14`}>
            <div className='container px-5 py-24 mx-auto'>
              <div className='flex flex-wrap -m-4 text-center'>
                {statsData.map((stat, index) => (
                  <div
                    key={index}
                    className='p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer'
                  >
                    <div className='border-2 border-gray-300 px-4 py-6 rounded-lg'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className={`${stat.iconColor} w-12 h-12 mb-3 inline-block`}
                        viewBox='0 0 24 24'
                      >
                        <path d={stat.iconPath1}></path>
                        {stat.iconPath2 && <path d={stat.iconPath2}></path>}
                      </svg>
                      <h2 className='title-font font-medium text-3xl text-white'>
                        {stat.number}
                      </h2>
                      <p className='leading-relaxed'>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default StatisticDetails;
