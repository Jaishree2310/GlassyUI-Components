import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';

const ProductCardDetailsPage: React.FC<{ darkMode: boolean }> = ({
  darkMode,
}) => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getGlassyClasses = (opacity = 5) => {
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

  const svgs = {
    star: (
      <svg
        fill='currentColor'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className='w-4 h-4 text-blue-400'
        viewBox='0 0 24 24'
      >
        <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
      </svg>
    ),
    facebook: (
      <svg
        fill='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className='w-5 h-5'
        viewBox='0 0 24 24'
      >
        <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
      </svg>
    ),
    twitter: (
      <svg
        fill='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className='w-5 h-5'
        viewBox='0 0 24 24'
      >
        <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
      </svg>
    ),
    chat: (
      <svg
        fill='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className='w-5 h-5'
        viewBox='0 0 24 24'
      >
        <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
      </svg>
    ),
    heart: (
      <svg
        fill='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className='w-5 h-5'
        viewBox='0 0 24 24'
      >
        <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z'></path>
      </svg>
    ),
    dropdownArrow: (
      <svg
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className='w-4 h-4'
        viewBox='0 0 24 24'
      >
        <path d='M6 9l6 6 6-6'></path>
      </svg>
    ),
  };

  const productCardCode = `const getGlassyClasses = (opacity = 5) => { return \`backdrop-filter backdrop-blur-lg bg-white bg-opacity-$\{opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300\`; };

     <section className={\`$\{getGlassyClasses()} p-6 mb-14 relative\`}>
            <div className="container px-5 py-16 mx-auto">
                <div className="lg:w-full mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full  h-[430px] object-cover object-top rounded-[25px]" src="https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/y/3/3/10-mexico-11-10-asian-lgrey-black-original-imah5agrpzsagpy2.jpeg?q=70&crop=false" />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-300 tracking-widest">ASIAN</h2>
                        <h1 className="text-white text-3xl title-font font-medium mb-1">Casual Sneakers Shoes For Men Mexico-11</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {Array(4).fill(svgs.star)}
                                {svgs.star} {/* Non-filled star */}
                                <span className="ml-3">15 Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-[#535d6a] text-gray-500 space-x-2">
                                <a>{svgs.facebook}</a>
                                <a>{svgs.twitter}</a>
                                <a>{svgs.chat}</a>
                            </span>
                        </div>
                        <p className="leading-relaxed">These casual Mexico-11 sneakers offer ultimate comfort and style for your everyday use. Crafted with a breathable mesh upper and durable sole, they are perfect for walks, runs, or casual outings. The versatile grey color goes well with various outfits, making it a wardrobe staple.</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-[#535d6a] mb-5">
                            <div className="flex">
                                <span className="mr-3 text-gray-300">Color</span>
                                <button className="border-2 border-[#535d6a] rounded-full w-6 h-6 focus:outline-none"></button>
                                <button className="border-2 border-[#535d6a] ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                <button className="border-2 border-[#535d6a] ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3 text-gray-300">Size</span>
                                <div className="relative">
                                    <select className="rounded border cursor-pointer bg-gray-300 text-black border-gray-700 focus:ring-2 focus:ring-blue-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-blue-500 pl-3 pr-10">
                                        <option className='bg-gray-300 cursor-pointer'>8</option>
                                        <option className='bg-gray-300 cursor-pointer'>9</option>
                                        <option className='bg-gray-300 cursor-pointer'>10</option>
                                        <option className='bg-gray-300 cursor-pointer'>11</option>
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        {svgs.dropdownArrow}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex items-center">
                                <span className="title-font font-medium text-2xl text-white">₹846.00</span>
                                <span className="ml-4 text-gray-500 line-through text-lg">₹1499.00</span>
                                <span className="ml-4 text-green-500 text-lg">43% off</span>
                            </div>
                            <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Add to Cart</button>
                            <button className="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                {svgs.heart}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  `;

  const svgUsed = `const svgs = {
            star: (
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            ),
            facebook: (
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
            ),
            twitter: (
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
            ),
            chat: (
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
            ),
            heart: (
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"></path>
                </svg>
            ),
            dropdownArrow: (
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6"></path>
                </svg>
            )
        };`;

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
          Product Card
        </h1>
        <p
          className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          A simple product card to showcase an item for sale.
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
              {productCardCode}
            </pre>
            <CopyButton
              text={productCardCode}
              codeKey='productCard'
              darkMode={darkMode}
            />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            SVG&apos;s Used
          </h2>
          <div className='relative'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {svgUsed}
            </pre>
            <CopyButton text={svgUsed} codeKey='svgUsed' darkMode={darkMode} />
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
                  <td className={tableDataStyles}>product</td>
                  <td className={tableDataStyles}>object</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    An object containing product details such as name, original
                    price, discounted price, and discount percentage.
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>product.name</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>The name of the product.</td>
                </tr>
                <tr>
                  <td className={tableDataStyles}>product.originalPrice</td>
                  <td className={tableDataStyles}>number</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    The original price of the product before discount.
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>product.discountedPrice</td>
                  <td className={tableDataStyles}>number</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    The price after applying the discount.
                  </td>
                </tr>
                <tr>
                  <td className={tableDataStyles}>
                    product.discountPercentage
                  </td>
                  <td className={tableDataStyles}>number</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    The discount percentage applied to the product.
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
            Product Card Example
          </h2>
          <p
            className={`mb-6 text-lg ${darkMode ? 'text-white' : 'text-black'}`}
          >
            Customize the card&apos;s style through the className prop or inline
            styles.
          </p>
          <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
            <div className='container px-5 py-16 mx-auto'>
              <div className='lg:w-full mx-auto flex flex-wrap'>
                <img
                  alt='ecommerce'
                  className='lg:w-1/2 w-full  h-[430px] object-cover object-top rounded-[25px]'
                  src='https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/y/3/3/10-mexico-11-10-asian-lgrey-black-original-imah5agrpzsagpy2.jpeg?q=70&crop=false'
                />
                <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
                  <h2 className='text-sm title-font text-gray-300 tracking-widest'>
                    ASIAN
                  </h2>
                  <h1 className='text-white text-3xl title-font font-medium mb-1'>
                    Casual Sneakers Shoes For Men Mexico-11
                  </h1>
                  <div className='flex mb-4'>
                    <span className='flex items-center'>
                      {Array(4).fill(svgs.star)}
                      {svgs.star} {/* Non-filled star */}
                      <span className='ml-3'>15 Reviews</span>
                    </span>
                    <span className='flex ml-3 pl-3 py-2 border-l-2 border-[#535d6a] text-gray-500 space-x-2'>
                      <a>{svgs.facebook}</a>
                      <a>{svgs.twitter}</a>
                      <a>{svgs.chat}</a>
                    </span>
                  </div>
                  <p className='leading-relaxed'>
                    These casual Mexico-11 sneakers offer ultimate comfort and
                    style for your everyday use. Crafted with a breathable mesh
                    upper and durable sole, they are perfect for walks, runs, or
                    casual outings. The versatile grey color goes well with
                    various outfits, making it a wardrobe staple.
                  </p>
                  <div className='flex mt-6 items-center pb-5 border-b-2 border-[#535d6a] mb-5'>
                    <div className='flex'>
                      <span className='mr-3 text-gray-300'>Color</span>
                      <button className='border-2 border-[#535d6a] rounded-full w-6 h-6 focus:outline-none'></button>
                      <button className='border-2 border-[#535d6a] ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none'></button>
                      <button className='border-2 border-[#535d6a] ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none'></button>
                    </div>
                    <div className='flex ml-6 items-center'>
                      <span className='mr-3 text-gray-300'>Size</span>
                      <div className='relative'>
                        <select className='rounded border cursor-pointer bg-gray-300 text-black border-gray-700 focus:ring-2 focus:ring-blue-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-blue-500 pl-3 pr-10'>
                          <option className='bg-gray-300 cursor-pointer'>
                            8
                          </option>
                          <option className='bg-gray-300 cursor-pointer'>
                            9
                          </option>
                          <option className='bg-gray-300 cursor-pointer'>
                            10
                          </option>
                          <option className='bg-gray-300 cursor-pointer'>
                            11
                          </option>
                        </select>
                        <span className='absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center'>
                          {svgs.dropdownArrow}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex'>
                    <div className='flex items-center'>
                      <span className='title-font font-medium text-2xl text-white'>
                        ₹846.00
                      </span>
                      <span className='ml-4 text-gray-500 line-through text-lg'>
                        ₹1499.00
                      </span>
                      <span className='ml-4 text-green-500 text-lg'>
                        43% off
                      </span>
                    </div>
                    <button className='flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded'>
                      Add to Cart
                    </button>
                    <button className='rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                      {svgs.heart}
                    </button>
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

export default ProductCardDetailsPage;
