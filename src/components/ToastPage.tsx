import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Copy } from 'lucide-react';

import BackToTopButton from './BackToTop';
import ToastGenerator from './ToastGenerator';
import Toast from './Toast';
import Footer from './Footer';

// Utility function for reusable glassy class styles
const getGlassyClasses = (darkMode: boolean): string =>
  `backdrop-filter backdrop-blur-xl ${darkMode ? 'bg-white/30 border-white/20' : 'bg-black/10 border-black/20'} border rounded-xl shadow-lg transition-all duration-300 max-sm:px-0`;

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

const CopyButton: React.FC<{
  text: string;
  codeKey: string;
  darkMode: boolean;
}> = ({ text, codeKey, darkMode }) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  return (
    <button
      onClick={() => copyToClipboard(text, codeKey, setCopiedStates)}
      className={`absolute top-2 right-2 ${getGlassyClasses(darkMode)} p-2 ${darkMode ? 'hover:bg-white/40' : 'hover:bg-black/30'} transition-all duration-300 z-10`}
      aria-label='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className={darkMode ? 'text-gray-100' : 'text-black'} />
      )}
    </button>
  );
};

const ToastPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
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

  const tableHeadingStyles = `text-left p-2 ${darkMode ? 'text-gray-100' : 'text-black'}`;
  const tableDataStyles = `p-2 ${darkMode ? 'text-gray-200' : 'text-black/80'}`;

  return (
    <div
      className={`min-h-screen p-8 font-sans bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black text-white' : 'from-white via-black/10 to-black/20 text-black'} relative`}
    >
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
          className={`mb-8 flex items-center ${getGlassyClasses(darkMode)} px-4 py-2 ${darkMode ? 'hover:bg-white/40 text-gray-100' : 'hover:bg-black/30 text-black'} transition-all duration-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        {/* Page Title and Description */}
        <h1
          className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Glassmorphic Toast
        </h1>
        <p
          className={`text-xl mb-8 ${darkMode ? 'text-gray-100' : 'text-black'}`}
        >
          A glassmorphism-styled Toast component.
        </p>

        {/* Speed Dial Demo and Code Section */}
        <div className={`${getGlassyClasses(darkMode)} p-8 mb-8 relative`}>
          <ToastGenerator toaster={setToasts} darkMode={darkMode} />
          <h2
            className={`text-3xl font-bold mt-6 mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Main App
          </h2>
          {/* Basic Usage Code Block */}
          <div className='relative mb-4'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {basicUsage}
            </pre>
            <CopyButton
              text={basicUsage}
              codeKey='basicUsage'
              darkMode={darkMode}
            />
          </div>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Toast Generator Component
          </h2>
          <div className='relative mb-4'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {generatorCode}
            </pre>
            <CopyButton
              text={generatorCode}
              codeKey='basicUsage'
              darkMode={darkMode}
            />
          </div>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Toast Component
          </h2>
          <div className='relative mb-4'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {toastCode}
            </pre>
            <CopyButton
              text={toastCode}
              codeKey='basicUsage'
              darkMode={darkMode}
            />
          </div>
          <h2
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-black'}`}
          >
            Aniamtion CSS
          </h2>
          <div className='relative mb-4'>
            <pre
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]`}
            >
              {animationCSS}
            </pre>
            <CopyButton
              text={animationCSS}
              codeKey='basicUsage'
              darkMode={darkMode}
            />
          </div>
        </div>

        <div className={`${getGlassyClasses(darkMode)} p-8 mb-8`}>
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
                  <td className={tableDataStyles}>title</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>The title of the toast</td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>message</td>
                  <td className={tableDataStyles}>string</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>the message of the toast</td>
                </tr>
                <tr>
                  <td className={tableDataStyles}>autoDismiss</td>
                  <td className={tableDataStyles}>number</td>
                  <td className={tableDataStyles}>9000</td>
                  <td className={tableDataStyles}>
                    the time in milliseconds after which the toast gets removed
                  </td>
                </tr>
                <tr
                  className={`${darkMode ? 'bg-white' : 'bg-black'} bg-opacity-10`}
                >
                  <td className={tableDataStyles}>id</td>
                  <td className={tableDataStyles}>number</td>
                  <td className={tableDataStyles}>Date.now()</td>
                  <td className={tableDataStyles}>
                    the id of each toast component
                  </td>
                </tr>
                <tr>
                  <td className={tableDataStyles}>toaster</td>
                  <td className={tableDataStyles}>React.SetStateAction</td>
                  <td className={tableDataStyles}>-</td>
                  <td className={tableDataStyles}>
                    The main toast state setter
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
      <style jsx>{`
        .glass-footer {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default ToastPage;
