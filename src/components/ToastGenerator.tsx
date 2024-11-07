import React, { useState } from 'react';

interface GeneratorProps {
  toaster: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        message: string;
        id: number;
      }[]
    >
  >;
  darkMode: boolean;
}

const ToastGenerator: React.FC<GeneratorProps> = ({ toaster, darkMode }) => {
  const addItem = () => {
    const toastData = [
      {
        id: Date.now(),
        title: 'Update Available',
        message:
          'A new version of the application is ready. Please update to enjoy the latest features.',
      },
      {
        id: Date.now() + 1,
        title: 'New Message',
        message:
          'You’ve received a new message from John Doe. Check your inbox to read it.',
      },
      {
        id: Date.now() + 2,
        title: 'Connection Lost',
        message: 'Your internet connection was lost. Trying to reconnect...',
      },
      {
        id: Date.now() + 3,
        title: 'Success',
        message: 'Your profile has been updated successfully.',
      },
      {
        id: Date.now() + 4,
        title: 'Error',
        message:
          'An error occurred while processing your request. Please try again.',
      },
      {
        id: Date.now() + 5,
        title: 'Low Battery',
        message:
          'Your battery is running low (10%). Please plug in your device.',
      },
      {
        id: Date.now() + 6,
        title: 'Reminder',
        message:
          'Don’t forget your meeting with the marketing team at 2:00 PM.',
      },
      {
        id: Date.now() + 7,
        title: 'File Uploaded',
        message: 'Your document has been uploaded successfully.',
      },
      {
        id: Date.now() + 8,
        title: 'Warning',
        message: 'This action is irreversible. Proceed with caution.',
      },
      {
        id: Date.now() + 9,
        title: 'Friend Request',
        message: 'Jane Smith has sent you a friend request. Accept or decline.',
      },
    ];

    // Example of using this data when generating toasts dynamically:
    const randomIndex = Math.floor(Math.random() * toastData.length);
    const newToast = toastData[randomIndex];

    // Add new item to the array
    toaster(prevItems => [...prevItems, newToast]);

    // Remove the item after 3 seconds
    setTimeout(() => {
      toaster(prevItems => prevItems.filter(item => item !== newToast));
    }, 10000); // 3000ms = 3 seconds
  };

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300';
  };

  return (
    <>
      <button
        className={`${getGlassyClasses()} px-4 py-2 ${darkMode ? 'hover:bg-white/40 ' : 'hover:bg-black/30'}`}
        onClick={addItem}
      >
        Show Toast
      </button>
    </>
  );
};

export default ToastGenerator;
