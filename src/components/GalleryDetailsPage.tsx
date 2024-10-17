import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

const GalleryDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
        {},
    );

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

    const galleryCode = `
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container p-5 mx-auto flex flex-wrap">
            <div className="flex flex-wrap md:-m-2 -m-1">
                <div className="flex flex-wrap w-1/2">
                    <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://dummyimage.com/500x300" />
                    </div>
                    <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://dummyimage.com/501x301" />
                    </div>
                    <div className="md:p-2 p-1 w-full">
                        <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://dummyimage.com/600x360" />
                    </div>
                </div>
                <div className="flex flex-wrap w-1/2">
                    <div className="md:p-2 p-1 w-full">
                        <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://dummyimage.com/601x361" />
                    </div>
                    <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://dummyimage.com/502x302" />
                    </div>
                    <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://dummyimage.com/503x303" />
                    </div>
                </div>
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

                <h1 className='text-6xl font-bold mb-8 text-white'>Gallery</h1>
                <p className='text-xl mb-8 text-white'>
                    A simple gallery to display images in a grid layout.
                </p>

                <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
                    <h2 className='text-3xl font-bold mb-6 text-white'>Basic Usage</h2>
                    <div className='relative'>
                        <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
                            {galleryCode}
                        </pre>
                        <CopyButton text={galleryCode} codeKey='gallery' />
                    </div>
                </div>

                <div className={`${getGlassyClasses()} p-8 mb-8`}>
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
                                    <td className='p-2 text-gray-200'>images</td>
                                    <td className='p-2 text-gray-200'>array</td>
                                    <td className='p-2 text-gray-200'>[]</td>
                                    <td className='p-2 text-gray-200'>
                                        Array of image objects with `src` and `alt` properties
                                    </td>
                                </tr>
                                <tr className='bg-white bg-opacity-10'>
                                    <td className='p-2 text-gray-200'>className</td>
                                    <td className='p-2 text-gray-200'>string</td>
                                    <td className='p-2 text-gray-200'>-</td>
                                    <td className='p-2 text-gray-200'>
                                        Custom classes to style the gallery or images
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={`${getGlassyClasses()} p-8 mb-8`}>
                    <h2 className='text-3xl font-bold mb-6 text-white'>Gallery  Example</h2>

                    <p className='mb-6 text-lg text-white'>
                        Customize the gallery layout or image styles using custom CSS or
                        Tailwind classes.
                    </p>
                    <section className="text-gray-400 bg-gray-900 body-font">
                        <div className="container p-5 mx-auto flex flex-wrap">
                            <div className="flex flex-wrap md:-m-2 -m-1">
                                <div className="flex flex-wrap w-1/2">
                                    <div className="md:p-2 p-1 w-1/2">
                                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg" />
                                    </div>
                                    <div className="md:p-2 p-1 w-1/2">
                                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=600" />
                                    </div>
                                    <div className="md:p-2 p-1 w-full">
                                        <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://images.pexels.com/photos/262347/pexels-photo-262347.jpeg?auto=compress&cs=tinysrgb&w=600" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap w-1/2">
                                    <div className="md:p-2 p-1 w-full">
                                        <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=600" />
                                    </div>
                                    <div className="md:p-2 p-1 w-1/2">
                                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.pexels.com/photos/257699/pexels-photo-257699.jpeg?auto=compress&cs=tinysrgb&w=600" />
                                    </div>
                                    <div className="md:p-2 p-1 w-1/2">
                                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.pexels.com/photos/36487/above-adventure-aerial-air.jpg?auto=compress&cs=tinysrgb&w=600" />
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
