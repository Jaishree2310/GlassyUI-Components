import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BackToTopButton from './BackToTop';

const CalendarDetail: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());
  const [customCode, setCustomCode] = useState('');

  const handleDateChange: CalendarProps['onChange'] = newDate => {
    if (Array.isArray(newDate)) {
      const startDate = newDate[0] instanceof Date ? newDate[0] : null;
      const endDate = newDate[1] instanceof Date ? newDate[1] : null;
      setDate(startDate && endDate ? [startDate, endDate] : null);
    } else if (newDate instanceof Date) {
      setDate(newDate);
    }
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
      className='absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30'
      aria-label='Copy to clipboard'
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  useEffect(() => {
    setCustomCode(
      `<Calendar onChange={handleDateChange} value={date} view="month" />`,
    );
  }, [date]);

  const handleBackToComponents = () => {
    navigate('/components');
  };

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative flex flex-col'>
      <BackToTopButton />
      <nav className='mb-8 flex items-center justify-between relative z-10'>
        <button
          onClick={handleBackToComponents}
          className='flex items-center p-2 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30'
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </nav>

      <h1 className='text-6xl font-bold mb-8 text-white relative z-10'>
        Calendar Component
      </h1>
      <p className='text-xl mb-8 text-gray-100'>
        A customizable calendar component for date selection.
      </p>

      <section className='p-6 mb-14 bg-white bg-opacity-20 rounded-lg shadow-lg relative'>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>Props</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>{/* Table contents here */}</table>
        </div>
      </section>

      <section className='bg-white bg-opacity-20 rounded-lg shadow-lg p-6 mb-14 relative'>
        <h2 className='text-3xl font-bold mb-6 text-white'>
          Calendar Component Example
        </h2>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='p-4 bg-white bg-opacity-10 rounded-lg mb-4'>
            <h2 className='mt-4 mb-4 font-bold flex justify-center text-xl text-blue-200'>
              Selected Date:{' '}
              {Array.isArray(date)
                ? `${date[0]?.toLocaleDateString()} to ${date[1]?.toLocaleDateString()}`
                : (date?.toLocaleDateString() ?? 'No date selected')}
            </h2>
            <Calendar
              onChange={handleDateChange}
              value={date}
              view='month'
              className='custom-calendar'
            />
          </div>
          <div className='lg:w-2/3'>
            <h3 className='text-xl font-semibold mb-4 text-white'>Code</h3>
            <div className='relative'>
              <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm max-h-[480px] whitespace-pre-wrap break-words'>
                <code>{customCode}</code>
              </pre>
              <CopyButton text={customCode} codeKey='CalendarExample' />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .custom-calendar {
          width: 100%;
          max-width: 400px;
          background: transparent;
          border: none;
          border-radius: 10px;
          font-family: 'Arial', sans-serif;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default CalendarDetail;
