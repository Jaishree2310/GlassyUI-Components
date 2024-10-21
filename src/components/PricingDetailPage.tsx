import React, { ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';
import ReactDOMServer from 'react-dom/server';

const PricingDetailPage: React.FC = () => {
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

  const [customComponentData, setcustomComponentData] = useState({
    titleColor: '#ffffff',
    fullBodyTextColor: '#e9d5ff',
    tagColor: '#f3e8ff',
    tagTextColor: '#6b21a8',
    buttonBackgroundColor: '#9333ea',
    buttonBackgroundSecondColor: '#4f46e5',
  });

  interface PricingDetailsProps {
    title?: string;
    tag?: string;
    tagColor?: string;
    tagTextColor?: string;
    desciption?: string;
    price?: string;
    features?: Array<string>;
    buttonText?: string;
    buttonLink?: string;
    buttonBackgroundColor?: string;
    buttonBackgroundSecondColor?: string;
    titleColor?: string;
    fullBodyTextColor?: string;
  }
  const PricingPage: React.FC<PricingDetailsProps> = ({
    title = 'Basic Plan',
    tag = 'Basic',
    tagColor = '#f3e8ff',
    tagTextColor = '#6b21a8',
    desciption = 'Perfect for individuals and small teams.',
    price = '$10',
    features = ['10 user accounts', 'Basic support', '5 GB storage'],
    buttonText = 'Get Started',
    buttonLink = '#',
    buttonBackgroundColor = '#9333ea',
    buttonBackgroundSecondColor = '#4f46e5',
    titleColor = '#fff',
    fullBodyTextColor = '#e9d5ff',
  }) => {
    return (
      <div className='bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden max-w-[500px]'>
        <div className='absolute top-0 right-0 m-4'>
          <span
            style={{
              backgroundColor: tagColor,
              color: tagTextColor,
            }}
            className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium'
          >
            {tag}
          </span>
        </div>
        <div className='mb-8'>
          <h3
            style={{ color: titleColor }}
            className='text-2xl font-semibold text-white'
          >
            {title}
          </h3>
          <p style={{ color: fullBodyTextColor }} className='mt-4 '>
            {desciption}
          </p>
        </div>
        <div className='mb-8'>
          <span className='text-5xl font-extrabold text-white'>{price}</span>
          <span
            style={{ color: fullBodyTextColor }}
            className='text-xl font-medium '
          >
            /mo
          </span>
        </div>
        <ul style={{ color: fullBodyTextColor }} className='mb-8 space-y-4 '>
          {features.map(el => (
            <li
              key={Math.floor(Math.random() * 999) + el}
              className='flex items-center'
            >
              <svg
                className='h-6 w-6 text-green-400 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M5 13l4 4L19 7'
                />
              </svg>
              <span>{el}</span>
            </li>
          ))}
        </ul>
        <a
          href={buttonLink}
          style={{
            backgroundImage: `linear-gradient(90deg,${buttonBackgroundColor},${buttonBackgroundSecondColor || buttonBackgroundColor})`,
          }}
          className='block w-full py-3 px-6 text-center rounded-md text-white font-medium hover:text-white'
        >
          {buttonText}
        </a>
      </div>
    );
  };

  const basicUsageCode = `<!-- Basic Plan -->
  <PricingPage
    title='Starter Pack'
    titleColor='#fff'
    desciption='Perfect for individuals and small teams.'
    features={[
      '10 user accounts',
      '100 transactions per month',
      'Basic reporting',
    ]}
    price='$49'
    buttonBackgroundColor='#9333ea'
    buttonBackgroundSecondColor='#4f46e5'
    fullBodyTextColor='#e9d5ff'
    tagTextColor='#6b21a8'
    tag='Basic'
    tagColor='#f3e8ff'
    buttonText='Get Started'
  />`;
  const StandardUsageCode = `<!-- Standard Plan -->
  <PricingPage
    title='Standard Plan'
    titleColor='#fff'
    desciption='Ideal for growing teams and small businesses.'
    features={[
      '50 user accounts',
      '500 transactions per month',
      'Advanced reporting & analytics',
    ]}
    price='$99'
    buttonBackgroundColor='#2563eb'
    buttonBackgroundSecondColor='#0d9488'
    fullBodyTextColor='#e9d5ff'
    tagTextColor='#6b21a8'
    tag='Standard'
    tagColor='#f3e8ff'
    buttonText='Choose Standard'
  />
  `;
  const PremiumUsageCode = `<!-- Premium Plan -->
  <PricingPage
    title='Premium Plan'
    titleColor='#fff'
    desciption='Best for large teams and businesses with advanced needs.'
    features={[
      'Unlimited user accounts',
      'Unlimited transactions per month',
      'Premium support & advanced analytics',
    ]}
    price='$199'
    buttonBackgroundColor='#ca8a04'
    buttonBackgroundSecondColor='#ea580c'
    fullBodyTextColor='#fef08a'
    tagTextColor='#6b21a8'
    tag='Premium'
    tagColor='#fef9c3'
    buttonText='Choose Premium'
  />
  `;

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-6xl font-bold mb-8 text-white'>Pricing Plan</h1>
        <p className='text-xl mb-8 text-white'>
          A customizable, glassmorphism styled Pricing Plan component.
        </p>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Basic Plan</h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {basicUsageCode}
            </pre>
            <CopyButton text={basicUsageCode} codeKey='basicUsage' />
          </div>
          <h2 className='text-3xl font-bold my-6 text-white'>Standard Plan</h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {StandardUsageCode}
            </pre>
            <CopyButton text={StandardUsageCode} codeKey='StandardUsage' />
          </div>
          <h2 className='text-3xl font-bold my-6 text-white'>Premium Plan</h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {PremiumUsageCode}
            </pre>
            <CopyButton text={PremiumUsageCode} codeKey='PremiumUsage' />
          </div>
        </div>

        {/* Add more sections similar to your ButtonDetailsPage here */}
        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Props</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-white bg-opacity-20'>
                  <th className='text-left p-2 text-gray-200'>Prop</th>
                  <th className='text-left p-2 text-gray-200'>Type</th>
                  <th className='text-left p-2 text-gray-200'>Default</th>
                  <th className='text-left p-2 text-gray-200'>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2 text-gray-300'>title</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"Basic Plan"</td>
                  <td className='p-2 text-gray-300'>
                    The title of the pricing plan
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>titleColor</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#fff"</td>
                  <td className='p-2 text-gray-300'>
                    The colour of title of the pricing plan
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>tag</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"Basic"</td>
                  <td className='p-2 text-gray-300'>
                    The text of tag of the pricing plan
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>tagColor</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#f3e8ff"</td>
                  <td className='p-2 text-gray-300'>
                    The background color of tag on the pricing plan
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>tagTextColor</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#6b21a8"</td>
                  <td className='p-2 text-gray-300'>
                    The text color of tag on the pricing plan
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>desciption</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>
                    "Perfect for individuals and small teams."
                  </td>
                  <td className='p-2 text-gray-300'>
                    The desciption of the plan
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>price</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"$10"</td>
                  <td className='p-2 text-gray-300'>The price of the plan</td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>features</td>
                  <td className='p-2 text-gray-300'>array of strings</td>
                  <td className='p-2 text-gray-300'>
                    ["10 user accounts", "Basic support", "5 GB storage"]
                  </td>
                  <td className='p-2 text-gray-300'>
                    A list of features for the plan
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>buttonText</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"Get Started"</td>
                  <td className='p-2 text-gray-300'>
                    The text for the action button
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>buttonLink</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#"</td>
                  <td className='p-2 text-gray-300'>
                    The redirect link after submission of the pricing card
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>buttonBackgroundColor</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#9333ea"</td>
                  <td className='p-2 text-gray-300'>
                    The background color of button of the pricing card
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>
                    buttonBackgroundSecondColor
                  </td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#0d9488"</td>
                  <td className='p-2 text-gray-300'>
                    {`The second background color(gradient) of button of the pricing card`}
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>fullBodyTextColor</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#e9d5ff"</td>
                  <td className='p-2 text-gray-300'>
                    The text color for the title and main elements
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Custom theme</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Title Color
              </label>
              <div className='flex items-center'>
                <input
                  type='color'
                  value={customComponentData?.titleColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      titleColor: e.target.value,
                    }))
                  }
                  className='w-8 h-8 rounded-full border-2 border-white shadow-lg mr-4'
                />
                <input
                  type='text'
                  value={customComponentData?.titleColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      titleColor: e.target.value,
                    }))
                  }
                  className='bg-transparent border-b border-gray-400 w-full py-1 px-2 text-white'
                />
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    titleColor: '#ffffff',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Tag Text Color
              </label>
              <div className='flex items-center'>
                <input
                  type='color'
                  value={customComponentData?.tagTextColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      tagTextColor: e.target.value,
                    }))
                  }
                  className='w-8 h-8 rounded-full border-2 border-white shadow-lg mr-4'
                />
                <input
                  type='text'
                  value={customComponentData?.tagTextColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      tagTextColor: e.target.value,
                    }))
                  }
                  className='bg-transparent border-b border-gray-400 w-full py-1 px-2 text-white'
                />
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    tagTextColor: '#6b21a8',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Tag Background Color
              </label>
              <div className='flex items-center'>
                <input
                  type='color'
                  value={customComponentData?.tagColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      tagColor: e.target.value,
                    }))
                  }
                  className='w-8 h-8 rounded-full border-2 border-white shadow-lg mr-4'
                />
                <input
                  type='text'
                  value={customComponentData?.tagColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      tagColor: e.target.value,
                    }))
                  }
                  className='bg-transparent border-b border-gray-400 w-full py-1 px-2 text-white'
                />
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    tagColor: '#f3e8ff',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Text color of title and main elements
              </label>
              <div className='flex items-center'>
                <input
                  type='color'
                  value={customComponentData?.fullBodyTextColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      fullBodyTextColor: e.target.value,
                    }))
                  }
                  className='w-8 h-8 rounded-full border-2 border-white shadow-lg mr-4'
                />
                <input
                  type='text'
                  value={customComponentData?.fullBodyTextColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      fullBodyTextColor: e.target.value,
                    }))
                  }
                  className='bg-transparent border-b border-gray-400 w-full py-1 px-2 text-white'
                />
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    fullBodyTextColor: '#e9d5ff',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Background color of button
              </label>
              <div className='flex items-center'>
                <input
                  type='color'
                  value={customComponentData?.buttonBackgroundColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      buttonBackgroundColor: e.target.value,
                    }))
                  }
                  className='w-8 h-8 rounded-full border-2 border-white shadow-lg mr-4'
                />
                <input
                  type='text'
                  value={customComponentData?.buttonBackgroundColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      buttonBackgroundColor: e.target.value,
                    }))
                  }
                  className='bg-transparent border-b border-gray-400 w-full py-1 px-2 text-white'
                />
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    buttonBackgroundColor: '#9333ea',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                2nd background color(gradient) of button
              </label>
              <div className='flex items-center'>
                <input
                  type='color'
                  value={customComponentData?.buttonBackgroundSecondColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      buttonBackgroundSecondColor: e.target.value,
                    }))
                  }
                  className='w-8 h-8 rounded-full border-2 border-white shadow-lg mr-4'
                />
                <input
                  type='text'
                  value={customComponentData?.buttonBackgroundSecondColor}
                  onChange={e =>
                    setcustomComponentData(el => ({
                      ...el,
                      buttonBackgroundSecondColor: e.target.value,
                    }))
                  }
                  className='bg-transparent border-b border-gray-400 w-full py-1 px-2 text-white'
                />
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    buttonBackgroundSecondColor: '#4f46e5',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
          </div>

          <div className='relative flex justify-between'>
            <div>
              <h2 className='text-3xl font-bold my-6 text-white'>Output</h2>
              <PricingPage
                title='Starter Pack'
                desciption='Perfect for individuals and small teams.'
                features={[
                  '10 user accounts',
                  '100 transactions per month',
                  'Basic reporting',
                ]}
                price='$49'
                tag='Basic'
                buttonText='Get Started'
                {...customComponentData}
              />
            </div>
            <div className='w-[73%]'>
              <h2 className='text-3xl font-bold my-6 text-white'>Code</h2>
              <div className='relative'>
                <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
                  {`  <PricingPage
    title='Starter Pack'
    titleColor='${customComponentData.titleColor}'
    desciption='Perfect for individuals and small teams.'
    features={[
      '10 user accounts',
      '100 transactions per month',
      'Basic reporting',
    ]}
    price='$49'
    buttonBackgroundColor='${customComponentData.buttonBackgroundColor}'
    buttonBackgroundSecondColor='${customComponentData.buttonBackgroundSecondColor}'
    fullBodyTextColor='${customComponentData.fullBodyTextColor}'
    tagTextColor='${customComponentData.tagTextColor}'
    tag='Basic'
    tagColor='${customComponentData.tagColor}'
    buttonText='Get Started'
  />`}
                </pre>
                <CopyButton
                  text={`  <PricingPage
    title='Starter Pack'
    titleColor='${customComponentData.titleColor}'
    desciption='Perfect for individuals and small teams.'
    features={[
      '10 user accounts',
      '100 transactions per month',
      'Basic reporting',
    ]}
    price='$49'
    buttonBackgroundColor='${customComponentData.buttonBackgroundColor}'
    buttonBackgroundSecondColor='${customComponentData.buttonBackgroundSecondColor}'
    fullBodyTextColor='${customComponentData.fullBodyTextColor}'
    tagTextColor='${customComponentData.tagTextColor}'
    tag='Basic'
    tagColor='${customComponentData.tagColor}'
    buttonText='Get Started'
  />`}
                  codeKey='basicUsage'
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Example Plans</h2>
          <div className='relative flex justify-between'>
            <PricingPage
              title='Starter Pack'
              titleColor='#fff'
              desciption='Perfect for individuals and small teams.'
              features={[
                '10 user accounts',
                '100 transactions per month',
                'Basic reporting',
              ]}
              price='$49'
              buttonBackgroundColor='#9333ea'
              buttonBackgroundSecondColor='#4f46e5'
              fullBodyTextColor='#e9d5ff'
              tagTextColor='#6b21a8'
              tag='Basic'
              tagColor='#f3e8ff'
              buttonText='Get Started'
            />
            <PricingPage
              title='Standard Plan'
              titleColor='#fff'
              desciption='Ideal for growing teams and small businesses.'
              features={[
                '50 user accounts',
                '500 transactions per month',
                'Advanced reporting & analytics',
              ]}
              price='$99'
              buttonBackgroundColor='#2563eb'
              buttonBackgroundSecondColor='#0d9488'
              fullBodyTextColor='#e9d5ff'
              tagTextColor='#6b21a8'
              tag='Standard'
              tagColor='#f3e8ff'
              buttonText='Choose Standard'
            />
            <PricingPage
              title='Premium Plan'
              titleColor='#fff'
              desciption='Best for large teams and businesses with advanced needs.'
              features={[
                'Unlimited user accounts',
                'Unlimited transactions per month',
                'Premium support & advanced analytics',
              ]}
              price='$199'
              buttonBackgroundColor='#ca8a04'
              buttonBackgroundSecondColor='#ea580c'
              fullBodyTextColor='#fef08a'
              tagTextColor='#6b21a8'
              tag='Premium'
              tagColor='#fef9c3'
              buttonText='Choose Premium'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetailPage;
