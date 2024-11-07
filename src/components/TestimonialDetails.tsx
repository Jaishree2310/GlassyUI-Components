import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

const TestimonialDetails: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getGlassyClasses = (opacity = 20) => {
    return `backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} bg-opacity-${opacity} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
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

  const CopyButton: React.FC<{
    text: string;
    codeKey: string;
    darkMode: boolean;
  }> = ({ text, codeKey, darkMode }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 ${darkMode ? 'text-white hover:bg-white/40' : 'text-black hover:bg-black/30'} transition-all duration-300`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className={darkMode ? 'text-gray-100' : 'text-black'} />
      )}
    </button>
  );

  const testimonialCode = `
        const getGlassyClasses = () => {
            return 'backdrop-filter backdrop-blur-xl bg-white/20 border border-white/20 rounded-xl shadow-lg transition-all duration-300 max-sm:px-0';
        };

    <div className="lg:w-[30%] max-sm:mx-2 max-sm:px-0  w-full testimonialBox  rounded-3xl">
        <div className="h-full bg-gray-950 text-white z-30 bg-opacity-40 p-8 max-sm:py-7 max-sm:px-4 rounded-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5  mb-4 text-yellow-500" viewBox="0 0 975.036 975.036">
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed mb-6">GlassyUI has transformed my approach to web design. I can’t imagine going back to plain styles!</p>
            <a className="inline-flex items-center">
                <img alt="testimonial" src="https://dummyimage.com/106x106" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-white">Ayush Sharma</span>
                    <span className="text-gray-500 text-sm">Third-year Student</span>
                </span>
            </a>
        </div>
    </div>
    `;

  const tableHeadingStyles = `text-left p-2 ${darkMode ? 'text-gray-100' : 'text-black'}`;
  const tableDataStyles = `p-2 ${darkMode ? 'text-gray-200' : 'text-black/80'}`;

  return (
    <div
      className={`min-h-screen p-8 font-sans bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'} relative`}
    >
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'} transition-all duration-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1
          className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Testimonial Component
        </h1>
        <p
          className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          A simple component to display user testimonials.
        </p>

        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Basic Usage
          </h2>
          <div className='relative'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {testimonialCode}
            </pre>
            <CopyButton
              text={testimonialCode}
              codeKey='testimonial'
              darkMode={darkMode}
            />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-6 mb-14`}>
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
                  <td className={tableDataStyles}>name</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    Name of the person giving the testimonial
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>message</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    The testimonial message from the user
                  </td>
                </tr>
                <tr>
                  <td className={tableDataStyles}>imageSrc</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    URL of the testimonial image
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <section className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2
            className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Testimonial Example
          </h2>
          <div className='flex justify-between'>
            <div className='lg:w-[30%] max-sm:mx-2 max-sm:px-0  w-full testimonialBox  rounded-3xl'>
              <div className='h-full bg-gray-950 text-white z-30 bg-opacity-40 p-8 max-sm:py-7 max-sm:px-4 rounded-3xl'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='block w-5 h-5  mb-4 text-yellow-500'
                  viewBox='0 0 975.036 975.036'
                >
                  <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
                </svg>
                <p className='leading-relaxed mb-6'>
                  GlassyUI has transformed my approach to web design. I can’t
                  imagine going back to plain styles!
                </p>
                <a className='inline-flex items-center'>
                  <img
                    alt='testimonial'
                    src='https://dummyimage.com/106x106'
                    className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
                  />
                  <span className='flex-grow flex flex-col pl-4'>
                    <span className='title-font font-medium text-white'>
                      Ayush Sharma
                    </span>
                    <span className='text-gray-500 text-sm'>
                      Second-year Student
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <div className='lg:w-[30%] max-sm:mx-2 max-sm:px-0  w-full testimonialBox  rounded-3xl'>
              <div className='h-full bg-gray-950 text-white z-30 bg-opacity-40 p-8 max-sm:py-7 max-sm:px-4 rounded-3xl'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='block w-5 h-5  mb-4 text-red-500'
                  viewBox='0 0 975.036 975.036'
                >
                  <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
                </svg>
                <p className='leading-relaxed mb-6'>
                  Working with GlassyUI has been a breath of fresh air. It
                  inspires creativity in my designs!
                </p>
                <a className='inline-flex items-center'>
                  <img
                    alt='testimonial'
                    src='https://media.licdn.com/dms/image/v2/D4D03AQExi2L1iZoycg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1713621091204?e=1734566400&v=beta&t=V765paSmxipOO47auCPoBLzdgFKnnT3dEiYdh0Sp-Oo'
                    className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
                  />
                  <span className='flex-grow flex flex-col pl-4'>
                    <span className='title-font font-medium text-white'>
                      Sawan Kushwah
                    </span>
                    <span className='text-gray-500 text-sm'>
                      Third-year Student
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className='lg:w-[30%] max-sm:mx-2 max-sm:px-0  w-full testimonialBox  rounded-3xl'>
              <div className='h-full bg-gray-950 text-white z-30 bg-opacity-40 p-8 max-sm:py-7 max-sm:px-4 rounded-3xl'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='block w-5 h-5  mb-4 text-green-500'
                  viewBox='0 0 975.036 975.036'
                >
                  <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
                </svg>
                <p className='leading-relaxed mb-6'>
                  Using GlassyUI has simplified my design process. The
                  components are intuitive and straightforward.
                </p>
                <a className='inline-flex items-center'>
                  <img
                    alt='testimonial'
                    src='https://dummyimage.com/106x106'
                    className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
                  />
                  <span className='flex-grow flex flex-col pl-4'>
                    <span className='title-font font-medium text-white'>
                      Jaishree
                    </span>
                    <span className='text-gray-500 text-sm'>
                      Third-year Student
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestimonialDetails;
