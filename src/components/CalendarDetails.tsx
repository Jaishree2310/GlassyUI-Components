import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import Calendar, { CalendarProps } from 'react-calendar'; // Import CalendarProps
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

      if (startDate && endDate) {
        setDate([startDate, endDate]);
      } else {
        setDate(null);
      }
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
  const getGlassyClasses = () => {
    return 'bg-white bg-opacity-20 rounded-lg shadow-lg'; // Customize as needed
  };

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  const getCustomCode = () => {
    const code = `<Calendar 
  onChange={handleDateChange} 
  value={date} 
  view="month"
/>`;
    setCustomCode(code);
  };

  useEffect(() => {
    getCustomCode();
  }, [date]);

  const handleBackToComponents = () => {
    navigate('/components');
  };

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative flex flex-col '>
      <BackToTopButton />
      <nav className='mb-8 flex items-center justify-between relative z-10'>
        <button
          onClick={handleBackToComponents}
          className={`flex items-center p-2 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </nav>

      <h1 className='text-6xl font-bold mb-8 text-white relative z-10'>
        Calendar Component
      </h1>
      <p className='text-xl mb-8 text-gray-100 '>
        A customizable calendar component for date selection.
      </p>
      {/* Props Section */}
      <section
        className={`p-6 mb-14 bg-white bg-opacity-20 rounded-lg shadow-lg relative`}
      >
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>Props</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-white bg-opacity-20'>
                <th className='text-left p-2'>Prop</th>
                <th className='text-left p-2'>Type</th>
                <th className='text-left p-2'>Default</th>
                <th className='text-left p-2'>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2'>className</td>
                <td className='p-2'>string</td>
                <td className='p-2'>''</td>
                <td className='p-2'>Additional CSS classes for styling</td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>onChange</td>
                <td className='p-2'>{`(date: Date | [Date, Date] | null) => void`}</td>
                <td className='p-2'>-</td>
                <td className='p-2'>
                  Callback function triggered when the date changes
                </td>
              </tr>
              <tr>
                <td className='p-2'>value</td>
                <td className='p-2'>{`Date | [Date, Date] | null`}</td>
                <td className='p-2'>{'new Date()'}</td>
                <td className='p-2'>The currently selected date(s)</td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>view</td>
                <td className='p-2'>string</td>
                <td className='p-2'>month</td>
                <td className='p-2'>The view to show: month, year, decade</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-3xl font-bold mb-6 text-white'>
          Calendar Component Example
        </h2>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className={`p-4 bg-white bg-opacity-10 rounded-lg mb-4`}>
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
                <code>
                  {`const CalendarExample: React.FC = () => {
  const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());

  const handleDateChange: CalendarProps['onChange'] = (newDate) => {
    if (Array.isArray(newDate)) {
      const startDate = newDate[0] instanceof Date ? newDate[0] : null;
      const endDate = newDate[1] instanceof Date ? newDate[1] : null;
      setDate(startDate && endDate ? [startDate, endDate] : null);
    } else if (newDate instanceof Date) {
      setDate(newDate);
    }
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={date}
      view="month"
      className="custom-calendar"
    />
  );
};`}
                </code>
              </pre>
              <CopyButton
                text={`const CalendarExample: React.FC = () => {
  const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());

  const handleDateChange: CalendarProps['onChange'] = (newDate) => {
    if (Array.isArray(newDate)) {
      const startDate = newDate[0] instanceof Date ? newDate[0] : null;
      const endDate = newDate[1] instanceof Date ? newDate[1] : null;
      setDate(startDate && endDate ? [startDate, endDate] : null);
    } else if (newDate instanceof Date) {
      setDate(newDate);
    }
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={date}
      view="month"
      className="custom-calendar"
    />
  );
};`}
                codeKey='CalendarExample'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inline Styles for Calendar Tiles */}
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

        .react-calendar__month-view {
          padding: 20px;
          display: flex;
          justify-content: center; /* Center calendar */
          align-items: center; /* Center vertically */
        }

        .react-calendar__tile {
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.1)
          );
          margin: 2px;
          transition:
            background 0.3s ease,
            transform 0.2s ease;
          display: flex;
          justify-content: center; /* Center text */
          align-items: center; /* Center text vertically */
          height: 60px; /* Set height for tiles */
          width: 60px; /* Set width for tiles */
        }

        .react-calendar__tile:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.05); /* Slightly scale up on hover */
        }

        .react-calendar__tile--active {
          background: rgba(0, 255, 0, 0.5); /* Active tile color */
        }

        .react-calendar__tile--now {
          border: 2px solid #00ff00; /* Highlight today with a green border */
        }

        .react-calendar__month-view__days__day {
          color: white; /* Change day text color */
          font-size: 1.25rem; /* Increase font size */
        }

        /* Styling for day labels */
        .react-calendar__month-view__days__day__label {
          color: rgba(255, 255, 255, 0.7); /* Lighter color for day labels */
        }
      `}</style>
    </div>
  );
};

export default CalendarDetail;
