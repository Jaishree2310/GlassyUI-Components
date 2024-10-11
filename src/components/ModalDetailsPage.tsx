import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, X } from "lucide-react";
import React, { useState } from "react";

const getGlassyClasses = () => {
  return "backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300 max-sm:px-1";
};

type ModalProps = {
  imageUrl?: string
  heading: string
  paragraph: string
  CTA: { text: string; color: string } // button text and colors
  unmount: () => void
  onCtaClick?: (props: any) => void
};

const Modal: React.FC<ModalProps> = (props) => {
    const { imageUrl, heading, paragraph, CTA, unmount, onCtaClick } = props
  return (
    <div className=" w-[100vw] h-[100vh] fixed z-10 top-0 left-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center bg-black/20">
      <div className=" min-w-[30vw] relative h-auto min-h-[30vh] flex flex-col items-center justify-center gap-6 p-4 backdrop-filter backdrop-blur-xl bg-white/50 border border-white/20 rounded-xl shadow-lg transition-all duration-300">
        <X className="absolute top-4 right-4 hover:bg-white/80 transition-colors p-1 cursor-pointer" onClick={unmount} />
        <h1 className="text-black text-2xl font-bold">{heading}</h1>
        {imageUrl && <img src={props.imageUrl} alt="" className="w-[80%] h-[20vw] object-cover" />}
        <p className="text-gray-800">{paragraph}</p>
          <button onClick={onCtaClick} className={`px-3 py-1 rounded hover:bg-opacity-50 font-medium text-gray-800 transition-colors duration-300`} style={{backgroundColor: CTA.color}}>
            {CTA.text}
          </button>
      </div>
    </div>
  );
};

const ModalDetail: React.FC = () => {
  const navigate = useNavigate();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [modal, setModal] = useState(false)

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
          <p className="text-gray-800">{paragraph}</p>
            <button onClick={onCtaClick} className={\`px-3 py-1 rounded hover:bg-opacity-50 font-medium text-gray-800 transition-colors duration-300\`} style={{backgroundColor: CTA.color}}>
              {CTA.text}
            </button>
        </div>
      </div>
    );
};


function Example() {
    const [modal, setModal] = useState(false)
    return(
      <>
        <button onClick={() => setModal(true)}>Open Modal</button>
        {modal && <Modal
           heading="This is a heading"
           paragraph="This is a paragraph"
           CTA={{text: "Save", color: "#00dd43"}}
           imageUrl=""
           unmount={() => setModal(false)}
        />}
      </>
    )
  }
`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text)
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
      title="Copy to clipboard"
    >
      {copiedText ? (
        <Check size={16} className="text-green-600" />
      ) : (
        <Copy size={16} className="text-gray-800" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-r from-[#ffc6c6] via-[#ffc6e5] to-[#e7c6ff] relative">
      <button
        onClick={() => navigate(-1)}
        className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-800`}
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Components
      </button>
      <h1 className="text-6xl font-bold mb-8 text-gray-900">Glassy Modal</h1>
      <p className="text-xl mb-8 text-gray-800">
        A customizable, glassmorphism styled Modal component.
      </p>

      <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Basic Usage</h2>
        <button onClick={() => setModal(true)} className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-800`}>Open Modal</button>
        <div className="relative">
          <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]">
            {basicUsageCode}
          </pre>
          <CopyButton text={basicUsageCode} codeKey="basicUsage" />
        </div>
      </div>

      <div className={`${getGlassyClasses()} p-8 mb-8`}>

        <h2 className="text-3xl font-bold mb-6 text-gray-100">Props</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="text-left p-2 text-gray-100">Prop</th>
              <th className="text-left p-2 text-gray-100">Type</th>
              <th className="text-left p-2 text-gray-100">Default</th>
              <th className="text-left p-2 text-gray-100">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="p-2 text-gray-200">heading</td>
              <td className="p-2 text-gray-200">string</td>
              <td className="p-2 text-gray-200">-</td>
              <td className="p-2 text-gray-200">The heading of the modal</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-2 text-gray-200">paragraph</td>
              <td className="p-2 text-gray-200">string</td>
              <td className="p-2 text-gray-200">-</td>
              <td className="p-2 text-gray-200">The paragraph of the modal</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-2 text-gray-200">CTA</td>
              <td className="p-2 text-gray-200">object</td>
              <td className="p-2 text-gray-200">-</td>
              <td className="p-2 text-gray-200">The call to action button with text and color to be displayed</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-2 text-gray-200">unmount</td>
              <td className="p-2 text-gray-200">function</td>
              <td className="p-2 text-gray-200">-</td>
              <td className="p-2 text-gray-200">The method to unmount the modal or change the state of the parent component</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-2 text-gray-200">bgColor</td>
              <td className="p-2 text-gray-200">string</td>
              <td className="p-2 text-gray-200">-</td>
              <td className="p-2 text-gray-200">The background color of the modal</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-2 text-gray-200">imageUrl</td>
              <td className="p-2 text-gray-200">string</td>
              <td className="p-2 text-gray-200">-</td>
              <td className="p-2 text-gray-200">Optional. The url for the image to be displayed</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-2 text-gray-200">onCtaClick</td>
              <td className="p-2 text-gray-200">function</td>
              <td className="p-2 text-gray-200">-</td>
              <td className="p-2 text-gray-200">Optional. Function that invokes when someone clicks CTA</td>
            </tr>
          </tbody>
        </table>
      </div>

      {
        modal && <Modal
        heading="This is a heading"
        paragraph="This is a paragraph"
        CTA={{text: "Save", color: "#00dd43"}}
        imageUrl=""
        unmount={() => setModal(false)}
    />
      }
    </div>
  );
};

export default ModalDetail;
