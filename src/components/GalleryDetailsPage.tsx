import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

const GalleryDetailsPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
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

  const getImageClasses = () => {
    return `w-full object-cover object-center block rounded-[15px] transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-lg`;
  };

  const images = [
    {
      src: 'https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg',
      alt: 'gallery1',
      extraClasses: 'w-1/2',
    },
    {
      src: 'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'gallery2',
      extraClasses: 'w-1/2',
    },
    {
      src: 'https://images.pexels.com/photos/262347/pexels-photo-262347.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'gallery3',
      extraClasses: 'w-full h-[350px]',
    },
    {
      src: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'gallery4',
      extraClasses: 'w-full h-[350px]',
    },
    {
      src: 'https://images.pexels.com/photos/257699/pexels-photo-257699.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'gallery5',
      extraClasses: 'w-1/2 h-full',
    },
    {
      src: 'https://images.pexels.com/photos/36487/above-adventure-aerial-air.jpg?auto=compress&cs=tinysrgb&w=600',
      alt: 'gallery6',
      extraClasses: 'w-1/2',
    },
  ];

  const galleryCode = `
            const getGlassyClasses = (opacity = 20) => { return \`backdrop-filter backdrop-blur-lg bg-white bg-opacity-$\{opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300\`; };

            const getImageClasses = () => { return \`w-full object-cover object-center block rounded-[15px] transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-lg\`; };

            const images = [
                { src: "https://dummyimage.com/500x300", alt: "gallery1", extraClasses: "w-1/2" },
                { src: "https://dummyimage.com/501x301", alt: "gallery2", extraClasses: "w-1/2" },
                { src: "https://dummyimage.com/600x360", alt: "gallery3", extraClasses: "w-full h-[350px]" },
                { src: "https://dummyimage.com/601x361", alt: "gallery4", extraClasses: "w-full h-[350px]" },
                { src: "https://dummyimage.com/502x302", alt: "gallery5", extraClasses: "w-1/2 h-full" },
                { src: "https://dummyimage.com/503x303", alt: "gallery6", extraClasses: "w-1/2" },
            ];

            <section className={\`$\{getGlassyClasses()} p-6 mb-14\`}>
                <div className="container p-5 mx-auto flex flex-wrap">
                    <div className="flex flex-wrap md:-m-4 -m-2 justify-evenly">
                        <div className="flex flex-wrap w-[45%]">
                            <div className="md:p-4 p-1 w-1/2">
                                <img
                                    alt={images[0].alt}
                                    className={\`$\{getImageClasses()} ${images[0].extraClasses}\`}
                                    src={images[0].src}
                                />
                            </div>
                            <div className="md:p-4 p-1 w-1/2">
                                <img
                                    alt={images[1].alt}
                                    className={\`$\{getImageClasses()} ${images[1].extraClasses}\`}
                                    src={images[1].src}
                                />
                            </div>
                            <div className="md:p-4 p-1 w-full">
                                <img
                                    alt={images[2].alt}
                                    className={\`$\{getImageClasses()} ${images[2].extraClasses}\`}
                                    src={images[2].src}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap w-[45%]">
                            <div className="md:p-4 p-1 w-full">
                                <img
                                    alt={images[3].alt}
                                    className={\`$\{getImageClasses()} ${images[3].extraClasses}\`}
                                    src={images[3].src}
                                />
                            </div>
                            <div className="md:p-4 p-1 w-1/2">
                                <img
                                    alt={images[4].alt}
                                    className={\`$\{getImageClasses()} ${images[4].extraClasses}\`}
                                    src={images[4].src}
                                />
                            </div>
                            <div className="md:p-4 p-1 w-1/2">
                                <img
                                    alt={images[5].alt}
                                    className={\`$\{getImageClasses()} ${images[5].extraClasses}\`}
                                    src={images[5].src}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
          Gallery
        </h1>
        <p
          className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          A simple gallery to display images in a grid layout.
        </p>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Basic Usage
          </h2>
          <div className='relative'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {galleryCode}
            </pre>
            <CopyButton
              text={galleryCode}
              codeKey='gallery'
              darkMode={darkMode}
            />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
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
                  <td className={tableDataStyles}>images</td>
                  <td className={tableDataStyles}>array</td>
                  <td className={tableDataStyles}>[]</td>
                  <td className={tableDataStyles}>
                    Array of image objects with `src` and `alt` properties
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>className</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    Custom classes to style the gallery or images
                  </td>
                </tr>
                <tr>
                  <td className={tableDataStyles}>layout</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>two-column</td>
                  <td className={tableDataStyles}>
                    Defines the layout of the gallery. Options could include
                    two-column, three-column, or grid.
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>hoverEffect</td>
                  <td className={tableDataStyles}>boolean</td>
                  <td className={tableDataStyles}>true</td>
                  <td className={tableDataStyles}>
                    Enables or disables hover effects on images (e.g., scaling,
                    shadow).
                  </td>
                </tr>
                <tr>
                  <td className={tableDataStyles}>spacing</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>normal</td>
                  <td className={tableDataStyles}>
                    Controls spacing between images. Options could include
                    small, normal, large.
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>borderRadius</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>15px</td>
                  <td className={tableDataStyles}>
                    Specifies the border radius for the images (e.g., 10px,
                    20px, 50%).
                  </td>
                </tr>
                <tr>
                  <td className={tableDataStyles}>containerClasses</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    Custom classes to apply to the gallery container.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Gallery Example
          </h2>

          <p
            className={`mb-6 text-lg ${darkMode ? 'text-white' : 'text-black'}`}
          >
            Customize the gallery layout or image styles using custom CSS or
            Tailwind classes.
          </p>
          <section className={`${getGlassyClasses()} p-6 mb-14`}>
            <div className='container p-5 mx-auto flex flex-wrap'>
              <div className='flex flex-wrap md:-m-4 -m-2 justify-evenly'>
                <div className='flex flex-wrap w-[45%]'>
                  <div className='md:p-4 p-1 w-1/2'>
                    <img
                      alt={images[0].alt}
                      className={`${getImageClasses()} ${images[0].extraClasses}`}
                      src={images[0].src}
                    />
                  </div>
                  <div className='md:p-4 p-1 w-1/2'>
                    <img
                      alt={images[1].alt}
                      className={`${getImageClasses()} ${images[1].extraClasses}`}
                      src={images[1].src}
                    />
                  </div>
                  <div className='md:p-4 p-1 w-full'>
                    <img
                      alt={images[2].alt}
                      className={`${getImageClasses()} ${images[2].extraClasses}`}
                      src={images[2].src}
                    />
                  </div>
                </div>
                <div className='flex flex-wrap w-[45%]'>
                  <div className='md:p-4 p-1 w-full'>
                    <img
                      alt={images[3].alt}
                      className={`${getImageClasses()} ${images[3].extraClasses}`}
                      src={images[3].src}
                    />
                  </div>
                  <div className='md:p-4 p-1 w-1/2'>
                    <img
                      alt={images[4].alt}
                      className={`${getImageClasses()} ${images[4].extraClasses}`}
                      src={images[4].src}
                    />
                  </div>
                  <div className='md:p-4 p-1 w-1/2'>
                    <img
                      alt={images[5].alt}
                      className={`${getImageClasses()} ${images[5].extraClasses}`}
                      src={images[5].src}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetailsPage;
