import React, { useState } from 'react';
import { useEffect } from 'react';

interface ToastProps {
  id?: number;
  title: string;
  message: string;
  autoDismiss?: number;
  toaster: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        message: string;
        id: number;
      }[]
    >
  >;
}

const Toast: React.FC<ToastProps> = ({
  id = Date.now(),
  title,
  message,
  autoDismiss = 8000,
  toaster,
}) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, autoDismiss);
    return () => clearTimeout(timer);
  }, []);

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300';
  };

  const removeItem = (id: number) => {
    toaster(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div
      className={`${getGlassyClasses()} ${hide ? 'hide-toast' : ''} toast pointer-events-auto p-6 flex max-w-[30rem] gap-6 cursor-pointer group transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl`}
    >
      <div>
        <h1>{title}</h1>
        <p className={`opacity-70`}>{message}</p>
      </div>
      <button
        onClick={e => {
          e.currentTarget.parentElement?.classList.add('hide-toast');
          setTimeout(() => {
            removeItem(id);
          }, 400);
        }}
        className={`${getGlassyClasses()} w-10 h-10`}
        style={{ flex: '1 0 auto' }}
      >
        ❌
      </button>
    </div>
  );
};

export default Toast;
