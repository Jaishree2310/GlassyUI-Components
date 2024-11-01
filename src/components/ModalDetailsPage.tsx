import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, X } from 'lucide-react';
import React, { useState } from 'react';

const getGlassyClasses = (opacity = 20) => {
  return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} 
border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
};

type ModalProps = {
  imageUrl?: string;
  heading: string;
  paragraph: string;
  CTA: { text: string; color: string }; // button text and colors
  unmount: () => void;
  onCtaClick?: (props: any) => void;
};

const ExampleComponent = () => {
  const [basicModal, setBasicModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [customCTAModal, setCustomCTAModal] = useState(false);
  const [bgColorModal, setBgColorModal] = useState(false);

  return (
    <div className={`${getGlassyClasses()} p-6 mb-14`}>
      <h2 className='text-3xl font-bold mb-6 text-gray-100'>Examples</h2>

      {/* Basic Example */}
      <div className='mb-8'>
        <h3 className='text-2xl font-semibold mb-4'>Basic Example</h3>
        <p className='mb-4 text-gray-100'>
          This example demonstrates the basic usage of the modal with a heading,
          paragraph, and a simple call-to-action button.
        </p>
        <button
          onClick={() => setBasicModal(true)}
          className={`mb-4 ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100`}
        >
          Open Basic Modal
        </button>
        {basicModal && (
          <Modal
            heading='Basic Modal'
            paragraph='This is a simple modal with a CTA button.'
            CTA={{ text: 'Save', color: '#00dd43' }}
            imageUrl=''
            unmount={() => setBasicModal(false)}
          />
        )}
      </div>

      {/* Modal with Image */}
      <div className='mb-8'>
        <h3 className='text-2xl font-semibold mb-4'>Modal with Image</h3>
        <p className='mb-4 text-gray-100'>
          This example shows how you can include an image in the modal by
          providing the <code>imageUrl</code> prop.
        </p>
        <button
          onClick={() => setImageModal(true)}
          className={`mb-4 ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100`}
        >
          Open Modal with Image
        </button>
        {imageModal && (
          <Modal
            heading='Modal with Image'
            paragraph='This modal includes an image.'
            CTA={{ text: 'Save', color: '#ff5a5f' }}
            imageUrl='https://via.placeholder.com/150'
            unmount={() => setImageModal(false)}
          />
        )}
      </div>

      {/* Modal with Custom CTA */}
      <div className='mb-8'>
        <h3 className='text-2xl font-semibold mb-4'>Modal with Custom CTA</h3>
        <p className='mb-4 text-gray-100'>
          You can customize the text and background color of the CTA button
          using the <code>CTA</code> prop.
        </p>
        <button
          onClick={() => setCustomCTAModal(true)}
          className={`mb-4 ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100`}
        >
          Open Modal with Custom CTA
        </button>
        {customCTAModal && (
          <Modal
            heading='Custom CTA Modal'
            paragraph='This modal has a custom CTA button.'
            CTA={{ text: 'Confirm', color: '#007bff' }}
            imageUrl=''
            unmount={() => setCustomCTAModal(false)}
          />
        )}
      </div>

      {/* Modal with Custom Background Color */}
      <div className='mb-8'>
        <h3 className='text-2xl font-semibold mb-4'>
          Modal with Custom Background Color
        </h3>
        <p className='mb-4 text-gray-100'>
          This example showcases how to change the modal background color using
          the <code>bgColor</code> prop.
        </p>
        <button
          onClick={() => setBgColorModal(true)}
          className={`mb-4 ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100`}
        >
          Open Modal with Custom Background Color
        </button>
        {bgColorModal && (
          <Modal
            heading='Custom Background Modal'
            paragraph='This modal has a custom background color.'
            CTA={{ text: 'Submit', color: '#ff9800' }}
            imageUrl=''
            unmount={() => setBgColorModal(false)}
          />
        )}
      </div>
    </div>
  );
};

interface CustomModalProps {
  heading: string;
  paragraph: string;
  CTA: {
    text: string;
    color: string;
  };
  imageUrl?: string;
  bgColor?: string; // Make this optional
  unmount: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  heading,
  paragraph,
  CTA,
  imageUrl,
  bgColor = 'white',
  unmount,
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
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
      {copiedText ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className='text-gray-100' />
      )}
    </button>
  );

  const customUsageCode = `
  const getGlassyClasses = (opacity = 20) => { return \`backdrop-filter backdrop-blur-lg bg-white bg-opacity-$\{opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300\`; };

    <div
       className={\`${getGlassyClasses()} p-6 mb-14\`}
      onClick=${unmount}
    >
      <div
        className='relative p-6 rounded-lg shadow-lg'
        style={{ backgroundColor: ${bgColor}, maxWidth: '500px', width: '100%' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
      >
        <h2 className='text-2xl font-bold mb-4'>${heading}</h2>
        {imageUrl && (
          <div className='mb-4'>
            <img src=${imageUrl} alt={heading} className='w-full h-auto' />
          </div>
        )}
        <p className='mb-4'>${paragraph}</p>
        <button
          className='px-4 py-2 rounded text-white'
          style={{ backgroundColor: CTA.color }}
          onClick=${unmount}
        >
          ${CTA.text}
        </button>
        <button
          className='absolute top-2 right-2 text-black'
          onClick=${unmount}
        >
          &#x2715;
        </button>
      </div>
    </div>  
  
  `;

  return (
    <>
      <div className={`${getGlassyClasses()} p-6 mb-14`} onClick={unmount}>
        <div
          className='relative p-6 rounded-lg shadow-lg'
          style={{ backgroundColor: bgColor, maxWidth: '500px', width: '100%' }}
          onClick={e => e.stopPropagation()} // Prevent closing on modal click
        >
          <h2 className='text-2xl font-bold mb-4'>{heading}</h2>
          {imageUrl && (
            <div className='mb-4'>
              <img src={imageUrl} alt={heading} className='w-full h-auto' />
            </div>
          )}
          <p className='mb-4'>{paragraph}</p>
          <button
            className='px-4 py-2 rounded text-white'
            style={{ backgroundColor: CTA.color }}
            onClick={unmount}
          >
            {CTA.text}
          </button>
          <button
            className='absolute top-2 right-2 text-black'
            onClick={unmount}
          >
            &#x2715;
          </button>
        </div>
      </div>

      <div className='relative'>
        <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
          {customUsageCode}
        </pre>
        <CopyButton text={customUsageCode} codeKey='customUsage' />
      </div>
    </>
  );
};

const CustomExample: React.FC = () => {
  const [modalConfig, setModalConfig] = useState<{
    heading: string;
    paragraph: string;
    CTA: { text: string; color: string };
    imageUrl?: string;
    bgColor?: string;
  } | null>(null);

  const [heading, setHeading] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [ctaColor, setCtaColor] = useState('#ffffff'); // Default color
  const [bgColor, setBgColor] = useState('#000000'); // Default color
  const [imageUrl, setImageUrl] = useState('');

  const closeModal = () => setModalConfig(null);

  const openModal = () => {
    setModalConfig({
      heading,
      paragraph,
      CTA: { text: ctaText, color: ctaColor },
      imageUrl,
      bgColor,
    });
  };

  return (
    <div className={`${getGlassyClasses()} p-6 mb-14`}>
      <h2 className='text-3xl font-bold mb-6 text-gray-100'>
        Customizable Modal Form
      </h2>

      <div className=' p-6 rounded-lg'>
        <input
          type='text'
          placeholder='Modal Heading'
          value={heading}
          onChange={e => setHeading(e.target.value)}
          className='border border-gray-600 bg-gray-700 text-gray-100 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <textarea
          placeholder='Modal Paragraph'
          value={paragraph}
          onChange={e => setParagraph(e.target.value)}
          className='border border-gray-600 bg-gray-700 text-gray-100 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <input
          type='text'
          placeholder='CTA Button Text'
          value={ctaText}
          onChange={e => setCtaText(e.target.value)}
          className='border border-gray-600 bg-gray-700 text-gray-100 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <div className='flex items-center mb-4'>
          <label className='text-gray-100 mr-2'>CTA Button Color:</label>
          <input
            type='color'
            value={ctaColor}
            onChange={e => setCtaColor(e.target.value)}
            className='border border-gray-600 p-2 rounded'
          />
        </div>

        <div className='flex items-center mb-4'>
          <label className='text-gray-100 mr-2'>Background Color:</label>
          <input
            type='color'
            value={bgColor}
            onChange={e => setBgColor(e.target.value)}
            className='border border-gray-600 p-2 rounded'
          />
        </div>
        <input
          type='text'
          placeholder='Image URL (optional)'
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className='border border-gray-600 bg-gray-700 text-gray-100 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={openModal}
          className='mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition duration-300'
        >
          Open Modal
        </button>
      </div>

      {/* Render the modal if modalConfig is not null */}
      {modalConfig && <CustomModal {...modalConfig} unmount={closeModal} />}
    </div>
  );
};

const Modal: React.FC<ModalProps> = props => {
  const { imageUrl, heading, paragraph, CTA, unmount, onCtaClick } = props;
  return (
    <div className=' w-[35vw] h-[40vh] fixed z-10 mt-9 top-15 left-10 bg-opacity-50 backdrop-blur-sm flex items-center justify-center bg-black/20'>
      <div className=' min-w-[30vw] relative h-auto min-h-[30vh] flex flex-col items-center justify-center gap-6 p-4 backdrop-filter backdrop-blur-xl bg-white/50 border border-white/20 rounded-xl shadow-lg transition-all duration-300'>
        <X
          className='absolute top-4 right-4 hover:bg-white/80 transition-colors p-1 cursor-pointer'
          onClick={unmount}
        />
        <h1 className='text-black text-2xl font-bold'>{heading}</h1>
        {imageUrl && (
          <img
            src={props.imageUrl}
            alt=''
            className='w-[80%] h-[20vw] object-cover'
          />
        )}
        <p className='text-black'>{paragraph}</p>
        <button
          onClick={onCtaClick}
          className={`px-3 py-1 rounded hover:bg-opacity-50 font-medium text-gray-100 transition-colors duration-300`}
          style={{ backgroundColor: CTA.color }}
        >
          {CTA.text}
        </button>
      </div>
    </div>
  );
};

const ModalDetail: React.FC = () => {
  const navigate = useNavigate();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [modal, setModal] = useState(false);

  const basicUsageCode = ` 
  
  const getGlassyClasses = (opacity = 20) => { return \`backdrop-filter backdrop-blur-lg bg-white bg-opacity-$\{opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300\`; };


  <div className='mb-8'>
        <h3 className='text-2xl font-semibold mb-4'>Basic Example</h3>
        <p className='mb-4 text-gray-100'>
          This example demonstrates the basic usage of the modal with a heading, paragraph, and a simple call-to-action button.
        </p>
        <button
          onClick={() => setBasicModal(true)}
          className={\`mb-4 $\{getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100\`}
        >
          Open Basic Modal
        </button>
        {basicModal && (
          <Modal
            heading='Basic Modal'
            paragraph='This is a simple modal with a CTA button.'
            CTA={{ text: 'Save', color: '#00dd43' }}
            imageUrl=''
            unmount={() => setBasicModal(false)}
          />
        )}
      </div>
 


      const Modal: React.FC<ModalProps> = props => {
          const { imageUrl, heading, paragraph, CTA, unmount, onCtaClick } = props;
          return (
            <div className=' w-[100vw] h-[100vh] fixed z-10 top-0 left-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center bg-black/20'>
              <div className=' min-w-[30vw] relative h-auto min-h-[30vh] flex flex-col items-center justify-center gap-6 p-4 backdrop-filter backdrop-blur-xl bg-white/50 border border-white/20 rounded-xl shadow-lg transition-all duration-300'>
                <X
                  className='absolute top-4 right-4 hover:bg-white/80 transition-colors p-1 cursor-pointer'
                  onClick={unmount}
                />
                <h1 className='text-black text-2xl font-bold'>{heading}</h1>
                {imageUrl && (
                  <img
                    src={props.imageUrl}
                    alt=''
                    className='w-[80%] h-[20vw] object-cover'
                  />
                )}
                <p className='text-gray-100'>{paragraph}</p>
                <button
                  onClick={onCtaClick}
                  className={\`px-3 py-1 rounded hover:bg-opacity-50 font-medium text-gray-100 transition-colors duration-300\`}
                  style={{ backgroundColor: CTA.color }}
                >
                  {CTA.text}
                </button>
              </div>
            </div>
          );

`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
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
      {copiedText ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className='text-gray-100' />
      )}
    </button>
  );

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <button
        onClick={() => navigate(-1)}
        className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100`}
      >
        <ArrowLeft size={20} className='mr-2' />
        Back to Components
      </button>
      <h1 className='text-6xl font-bold mb-8 text-white'>Glassy Modal</h1>
      <p className='text-xl mb-8 text-gray-100'>
        A customizable, glassmorphism styled Modal component.
      </p>

      <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-3xl font-bold mb-6 text-gray-100'>Basic Usage</h2>
        <button
          onClick={() => setModal(true)}
          className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100`}
        >
          Open Modal
        </button>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
            {basicUsageCode}
          </pre>
          <CopyButton text={basicUsageCode} codeKey='basicUsage' />
        </div>
      </div>

      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <h2 className='text-3xl font-bold mb-6 text-gray-100'>Props</h2>
        <table className='w-full'>
          <thead>
            <tr className='bg-white bg-opacity-20'>
              <th className='text-left p-2 text-gray-100'>Prop</th>
              <th className='text-left p-2 text-gray-100'>Type</th>
              <th className='text-left p-2 text-gray-100'>Default</th>
              <th className='text-left p-2 text-gray-100'>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-2 text-gray-200'>heading</td>
              <td className='p-2 text-gray-200'>string</td>
              <td className='p-2 text-gray-200'>-</td>
              <td className='p-2 text-gray-200'>The heading of the modal</td>
            </tr>
            <tr className='bg-white bg-opacity-10'>
              <td className='p-2 text-gray-200'>paragraph</td>
              <td className='p-2 text-gray-200'>string</td>
              <td className='p-2 text-gray-200'>-</td>
              <td className='p-2 text-gray-200'>The paragraph of the modal</td>
            </tr>
            <tr>
              <td className='p-2 text-gray-200'>CTA</td>
              <td className='p-2 text-gray-200'>object</td>
              <td className='p-2 text-gray-200'>-</td>
              <td className='p-2 text-gray-200'>
                The call to action button with text and color to be displayed
              </td>
            </tr>
            <tr className='bg-white bg-opacity-10'>
              <td className='p-2 text-gray-200'>unmount</td>
              <td className='p-2 text-gray-200'>function</td>
              <td className='p-2 text-gray-200'>-</td>
              <td className='p-2 text-gray-200'>
                The method to unmount the modal or change the state of the
                parent component
              </td>
            </tr>
            <tr>
              <td className='p-2 text-gray-200'>bgColor</td>
              <td className='p-2 text-gray-200'>string</td>
              <td className='p-2 text-gray-200'>-</td>
              <td className='p-2 text-gray-200'>
                The background color of the modal
              </td>
            </tr>
            <tr className='bg-white bg-opacity-10'>
              <td className='p-2 text-gray-200'>imageUrl</td>
              <td className='p-2 text-gray-200'>string</td>
              <td className='p-2 text-gray-200'>-</td>
              <td className='p-2 text-gray-200'>
                Optional. The url for the image to be displayed
              </td>
            </tr>
            <tr>
              <td className='p-2 text-gray-200'>onCtaClick</td>
              <td className='p-2 text-gray-200'>function</td>
              <td className='p-2 text-gray-200'>-</td>
              <td className='p-2 text-gray-200'>
                Optional. Function that invokes when someone clicks CTA
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <CustomExample />
      <ExampleComponent />
    </div>
  );
};

export default ModalDetail;
