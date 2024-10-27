import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, X } from 'lucide-react';
import React, { useState } from 'react';

const getGlassyClasses = (darkMode: boolean, opacity = 20) => {
  return `backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} bg-opacity-${opacity} border border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
};

type ModalProps = {
  imageUrl?: string;
  heading: string;
  paragraph: string;
  CTA: { text: string; color: string }; // button text and colors
  unmount: () => void;
  onCtaClick?: (props: any) => void;
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

const ModalDetail: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [modal, setModal] = useState(false);

  const basicUsageCode = `type ModalProps = {
  imageUrl?: string
  heading: string
  paragraph: string
  bgColor?: string
  CTA: { text: string; color: string } // button text and colors
  unmount: () => void
  onCtaClick?: (props: any) => void
};

const Modal: React.FC<ModalProps> = (props) => {
    const { imageUrl, heading, paragraph, CTA, unmount, onCtaClick, bgColor } = props
    return (
      <div className=" w-[100vw] h-[100vh] fixed z-10 top-0 left-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center bg-black/20">
        <div className=" min-w-[30vw] relative h-auto min-h-[30vh] flex flex-col items-center justify-center gap-6 p-4 backdrop-filter backdrop-blur-xl bg-white/50 border border-white/20 rounded-xl shadow-lg transition-all duration-300" style:{{backgroundColor: bgColor}}>
          <X className="absolute top-4 right-4 hover:bg-white/80 transition-colors p-1 cursor-pointer" onClick={unmount} />
          <h1 className="text-black text-2xl font-bold">{heading}</h1>
          {imageUrl && <img src={props.imageUrl} alt="image" className="w-[80%] h-[20vw] object-cover" />}
          <p className="text-gray-100">{paragraph}</p>
            <button onClick={onCtaClick} className={\`px-3 py-1 rounded hover:bg-opacity-50 font-medium text-gray-100 transition-colors duration-300\`} style={{backgroundColor: CTA.color}}>
              {CTA.text}
            </button>
        </div>
      </div>
    );
};
`;

  function Example() {
    const [modal, setModal] = useState(false);
    return (
      <>
        <button onClick={() => setModal(true)}>Open Modal</button>
        {modal && (
          <Modal
            heading='This is a heading'
            paragraph='This is a paragraph'
            CTA={{ text: 'Save', color: '#00dd43' }}
            imageUrl=''
            unmount={() => setModal(false)}
          />
        )}
      </>
    );
  }

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const CopyButton: React.FC<{
    text: string;
    codeKey: string;
    darkMode: boolean;
  }> = ({ text, codeKey, darkMode }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses(darkMode)} p-2 ${darkMode ? 'text-white hover:bg-white/40' : 'text-black hover:bg-black/30'} transition-all duration-300`}
      title='Copy to clipboard'
    >
      {copiedText ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className={darkMode ? 'text-gray-100' : 'text-black'} />
      )}
    </button>
  );

  const tableHeadingStyles = `text-left p-2 ${darkMode ? 'text-gray-100' : 'text-black'}`;
  const tableDataStyles = `p-2 ${darkMode ? 'text-gray-200' : 'text-black/80'}`;

  return (
    <div
      className={`min-h-screen p-8 font-sans bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'} relative`}
    >
      <button
        onClick={() => navigate(-1)}
        className={`mb-8 flex items-center ${getGlassyClasses(darkMode, 10)} px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'} transition-all duration-300`}
      >
        <ArrowLeft size={20} className='mr-2' />
        Back to Components
      </button>
      <h1
        className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}
      >
        Glassy Modal
      </h1>
      <p
        className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
      >
        A customizable, glassmorphism styled Modal component.
      </p>

      <div className={`${getGlassyClasses(darkMode)} p-6 mb-14 relative`}>
        <h2
          className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          Basic Usage
        </h2>
        <button
          onClick={() => setModal(true)}
          className={`mb-8 flex items-center ${getGlassyClasses(darkMode)} px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-white' : 'hover:bg-black/30 text-black'} transition-all duration-300`}
        >
          Open Modal
        </button>
        <div className='relative'>
          <pre
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
          >
            {basicUsageCode}
          </pre>
          <CopyButton
            text={basicUsageCode}
            codeKey='basicUsage'
            darkMode={darkMode}
          />
        </div>
      </div>

      <div className={`${getGlassyClasses(darkMode)} p-6 mb-14`}>
        <h2
          className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          Props
        </h2>
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
              <td className={tableDataStyles}>heading</td>
              <td className={tableDataStyles}>string</td>
              <td className={tableDataStyles}>-</td>
              <td className={tableDataStyles}>The heading of the modal</td>
            </tr>
            <tr
              className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
            >
              <td className={tableDataStyles}>paragraph</td>
              <td className={tableDataStyles}>string</td>
              <td className={tableDataStyles}>-</td>
              <td className={tableDataStyles}>The paragraph of the modal</td>
            </tr>
            <tr>
              <td className={tableDataStyles}>CTA</td>
              <td className={tableDataStyles}>object</td>
              <td className={tableDataStyles}>-</td>
              <td className={tableDataStyles}>
                The call to action button with text and color to be displayed
              </td>
            </tr>
            <tr
              className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
            >
              <td className={tableDataStyles}>unmount</td>
              <td className={tableDataStyles}>function</td>
              <td className={tableDataStyles}>-</td>
              <td className={tableDataStyles}>
                The method to unmount the modal or change the state of the
                parent component
              </td>
            </tr>
            <tr>
              <td className={tableDataStyles}>bgColor</td>
              <td className={tableDataStyles}>string</td>
              <td className={tableDataStyles}>-</td>
              <td className={tableDataStyles}>
                The background color of the modal
              </td>
            </tr>
            <tr
              className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
            >
              <td className={tableDataStyles}>imageUrl</td>
              <td className={tableDataStyles}>string</td>
              <td className={tableDataStyles}>-</td>
              <td className={tableDataStyles}>
                Optional. The url for the image to be displayed
              </td>
            </tr>
            <tr>
              <td className={tableDataStyles}>onCtaClick</td>
              <td className={tableDataStyles}>function</td>
              <td className={tableDataStyles}>-</td>
              <td className={tableDataStyles}>
                Optional. Function that invokes when someone clicks CTA
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* {modal && (
        <Modal
          heading='This is a heading'
          paragraph='This is a paragraph'
          CTA={{ text: 'Save', color: '#00dd43' }}
          imageUrl=''
          unmount={() => setModal(false)}
        />
      )}  */}

      <div className={`${getGlassyClasses(darkMode)} p-6 mb-16`}>
        <Example />
      </div>

      <div>
        <div className='h-14'></div>
        <div className='h-14'></div>
        <div className='h-14'></div>
      </div>
    </div>
  );
};

export default ModalDetail;
