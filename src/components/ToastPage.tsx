import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Copy } from 'lucide-react';

import BackToTopButton from './BackToTop';
import ToastGenerator from './ToastGenerator';
import Toast from './Toast';

// Utility function for reusable glassy class styles
const getGlassyClasses = (): string =>
  'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300 max-sm:px-0';

// Function to copy text to clipboard and handle feedback
const copyToClipboard = (
  text: string,
  key: string,
  setCopiedStates: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >,
) => {
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
}) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  return (
    <button
      onClick={() => copyToClipboard(text, codeKey, setCopiedStates)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
      aria-label='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className='text-black' />
      )}
    </button>
  );
};

const ToastPage: React.FC = () => {
  const navigate = useNavigate();
  const [toasts, setToasts] = useState<
    { title: string; message: string; id: number }[]
  >([]);
  const basicUsage = `
  const getGlassyClasses = () => 'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

  function Example () {
  const [toasts, setToasts] = useState<{title: string, message:string, id: number}[]>([]);
  return 
    <div className={"fixed w-screen h-screen flex flex-col gap-4 justify-end items-end z-[51] pointer-events-none bottom-0 right-0 p-4"}>
      {toasts.map((toast)=>{
          return (<Toast title={toast.title} message={toast.message} toaster={setToasts} id={toast.id} key={toast.id}/>)
      })}
  </div>
        `;

  const generatorCode = `         
interface GeneratorProps {
  toaster: React.Dispatch<React.SetStateAction<{
    title: string,
    message: string,
    id: number
  }[]>>,
}

const ToastGenerator: React.FC<GeneratorProps> = ({toaster}) => {
  const addItem = () => {
    // Change Title and Message according to your needs
    const newToast = { id: Date.now(), title: "Update Available", message: "A new version of the application is ready. Please update to enjoy the latest features." }

    // Add new item to the array
    toaster(prevItems => [...prevItems, newToast]);

    // Remove the item after 3 seconds
    setTimeout(() => {
      toaster(prevItems => prevItems.filter(item => item !== newToast));
    }, 10000); // 3000ms = 3 seconds
  };

    const getGlassyClasses = () => {
        return "backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300";
      };
      
  return (
    <>
    <button className={\`\${getGlassyClasses()} px-4 py-2 hover:bg-white/20\`}
    onClick={addItem}>
        Show Toast
    </button>
    </>)
}
        `;

  const toastCode = `
  interface ToastProps {
  id: number,
  title: string,
  message: string,
  autoDismiss?: number,
  toaster: React.Dispatch<React.SetStateAction<{
    title: string,
    message: string,
    id: number,
  }[]>>,
  }
  
const Toast: React.FC<ToastProps> = ({ id, title, message, autoDismiss = 9000, toaster }) => {

  const [hide, setHide] = useState(false);

  useEffect(()=>{
    const timer = setTimeout(() => {
      setHide(true); 
    }, autoDismiss);
    return () => clearTimeout(timer);
  },[])

  const getGlassyClasses = () => {
    return "backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300";
  };

  const removeItem = (id: number) => {
    toaster(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div
      className={\`\${getGlassyClasses()} \${ hide ? "hide-toast" : "" } toast pointer-events-auto p-6 flex max-w-[30rem] gap-6 cursor-pointer group transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl\`}

    >
      <div> 
      <h1>{title}</h1>
      <p className={\`opacity-70\`}>{message}</p>
      </div>
      <button onClick={(e)=>{
        e.currentTarget.parentElement?.classList.add('hide-toast') 
        setTimeout(()=> {removeItem(id)},400);
        }} className={\`\${getGlassyClasses()} w-10 h-10\`} style={{flex: "1 0 auto"}}>
      ❌
      </button>
    </div>
  )
}`;

  const animationCSS = `  
.toast{
  animation: toast-start cubic-bezier(.18,.89,.32,1.28) 800ms forwards;
  opacity: 1;
  overflow: hidden;
  max-height: 400px;
  opacity: 1;
  transform: translateX(0);
}
.hide-toast{
  animation: toast-end cubic-bezier(.18,.89,.32,1.28) 600ms forwards;
}
@keyframes toast-start {
  from{
    opacity: 0;
    transform: translateX(100px);
    max-height: 0;
  }
  to{
    opacity: 1;
    transform: translateX(0);
    max-height: 350px;
  }
}
@keyframes toast-end {
  50%{
    opacity: 0;
    transform: translateX(100px);
  }
  51%{
    opacity: 0;
    transform: translateX(100px);
  }
  100%{
    opacity: 0;
    transform: translateX(100px);
    max-height: 0;
    padding: 0;
  }
}
`;

  return (
    <div className='min-h-screen flex flex-col gap-6 justify-center items-center px-6 bg-gradient-to-br from-pink-300 to-pink-300 text-black p-8'>
      <div
        className={`fixed w-screen h-screen flex flex-col gap-4 justify-end items-end z-[51] pointer-events-none bottom-0 right-0 p-4`}
      >
        {toasts.map(toast => {
          return (
            <Toast
              title={toast.title}
              message={toast.message}
              toaster={setToasts}
              id={toast.id}
              key={toast.id}
            />
          );
        })}
      </div>
      <BackToTopButton />
      <div className='relative z-10'>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center bg-lime-300 border border-black rounded-2xl shadow-lg  px-4 py-2 hover:bg-white/40 transition-all duration-300 text-black`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        {/* Page Title and Description */}
        <h1 className='text-6xl font-bold mb-8 text-black'>
          Glassmorphic Toast
        </h1>
        <p className='text-xl mb-8 text-black'>
          A glassmorphism-styled Toast component.
        </p>

        {/* Speed Dial Demo and Code Section */}
        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <ToastGenerator toaster={setToasts} />
          <h2 className='text-3xl font-bold mt-6 mb-6 text-black'>Main App</h2>
          {/* Basic Usage Code Block */}
          <div className='relative mb-4'>
            <pre className='bg-cyan-100 text-black p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
              {basicUsage}
            </pre>
            <CopyButton text={basicUsage} codeKey='basicUsage' />
          </div>
          <h2 className='text-3xl font-bold mb-6 text-black'>
            Toast Generator Component
          </h2>
          <div className='relative mb-4'>
            <pre className='bg-cyan-100 text-black p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
              {generatorCode}
            </pre>
            <CopyButton text={generatorCode} codeKey='basicUsage' />
          </div>
          <h2 className='text-3xl font-bold mb-6 text-black'>
            Toast Component
          </h2>
          <div className='relative mb-4'>
            <pre className='bg-cyan-100 text-black p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
              {toastCode}
            </pre>
            <CopyButton text={toastCode} codeKey='basicUsage' />
          </div>
          <h2 className='text-3xl font-bold mb-6 text-black'>Aniamtion CSS</h2>
          <div className='relative mb-4'>
            <pre className='bg-cyan-100 text-black p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
              {animationCSS}
            </pre>
            <CopyButton text={animationCSS} codeKey='basicUsage' />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className='text-3xl font-bold mb-6 text-black'>Props</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-gray-800'>
                  <th className='text-left p-2 text-black'>Prop</th>
                  <th className='text-left p-2 text-black'>Type</th>
                  <th className='text-left p-2 text-black'>Default</th>
                  <th className='text-left p-2 text-black'>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b border-gray-800'>
                  <td className='p-2 text-black'>title</td>
                  <td className='p-2 text-black'>string</td>
                  <td className='p-2 text-black'>-</td>
                  <td className='p-2 text-black'>The title of the toast</td>
                </tr>
                <tr className='border-b border-gray-800'>
                  <td className='p-2 text-black'>message</td>
                  <td className='p-2 text-black'>string</td>
                  <td className='p-2 text-black'>-</td>
                  <td className='p-2 text-black'>the message of the toast</td>
                </tr>
                <tr className='border-b border-gray-800'>
                  <td className='p-2 text-black'>autoDismiss</td>
                  <td className='p-2 text-black'>number</td>
                  <td className='p-2 text-black'>9000</td>
                  <td className='p-2 text-black'>
                    the time in milliseconds after which the toast gets removed
                  </td>
                </tr>
                <tr className='border-b border-gray-800'>
                  <td className='p-2 text-black'>id</td>
                  <td className='p-2 text-black'>number</td>
                  <td className='p-2 text-black'>Date.now()</td>
                  <td className='p-2 text-black'>
                    the id of each toast component
                  </td>
                </tr>
                <tr className='border-b border-gray-800'>
                  <td className='p-2 text-black'>toaster</td>
                  <td className='p-2 text-black'>React.SetStateAction</td>
                  <td className='p-2 text-black'>-</td>
                  <td className='p-2 text-black'>
                    The main toast state setter
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastPage;
