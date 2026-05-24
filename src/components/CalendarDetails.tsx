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
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [customCode, setCustomCode] = useState('');

  const currentYear = new Date().getFullYear();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const handleDateChange: CalendarProps['onChange'] = newDate => {
    if (Array.isArray(newDate)) {
      const startDate = newDate[0] instanceof Date ? newDate[0] : null;
      const endDate = newDate[1] instanceof Date ? newDate[1] : null;

      if (startDate && endDate) {
        setDate([startDate, endDate]);
        setActiveStartDate(startDate);
      } else {
        setDate(null);
      }
    } else if (newDate instanceof Date) {
      setDate(newDate);
      setActiveStartDate(newDate);
    }
  };

  const jumpToMonthYear = (month: number, year: number) => {
    const newTargetDate = new Date(year, month, 1);
    setActiveStartDate(newTargetDate);
    setShowPicker(false);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  const getGlassyClasses = () => 'bg-white bg-opacity-20 rounded-lg shadow-lg';

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className='absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30 transition z-10'
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={20} className='text-green-400' />
      ) : (
        <Copy size={20} />
      )}
    </button>
  );

  const codeExampleString = `const CalendarExample: React.FC = () => {
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
};`;

  const reminderExampleString = `// Listening to onChange events to update contextual application flows
const [selectedDate, setSelectedDate] = useState<Date | null>(null);

const handleReminderDate = (date: Date) => {
  setSelectedDate(date);
  openReminderModal(date); // Dispatches layout overlays
  saveReminder({
    title: 'GSSoC Open Source Contribution Review',
    date,
  });
};

<Calendar
  onChange={handleReminderDate}
  value={selectedDate}
/>`;

  useEffect(() => {
    const dynamicSnippet = `<Calendar 
  onChange={handleDateChange} 
  value={${Array.isArray(date) ? `[Date, Date]` : date ? `Date(${date.toLocaleDateString()})` : 'null'}} 
  view="month"
/>`;
    setCustomCode(dynamicSnippet);
  }, [date]);

  return (
    <div className='min-h-screen pt-24 px-8 pb-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative flex flex-col'>
      <BackToTopButton />

      <nav className='mb-8 flex items-center justify-between relative z-10'>
        <button
          onClick={() => navigate('/components')}
          className='flex items-center p-2 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30 transition'
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </nav>

      <h1 className='text-6xl font-bold mb-8 text-white relative z-10'>
        Calendar Component
      </h1>

      <p className='text-xl mb-8 text-gray-100'>
        A highly interactive glassmorphic calendar component featuring quick
        month/year navigation jumpers and isolated real-time today highlighting.
      </p>

      {/* Props Section */}
      <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>Props</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr className='bg-white bg-opacity-20 border-b border-gray-700'>
                <th className='p-3'>Prop</th>
                <th className='p-3'>Type</th>
                <th className='p-3'>Default</th>
                <th className='p-3'>Description</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700/40'>
              <tr>
                <td className='p-3 font-mono text-blue-300'>className</td>
                <td className='p-3 font-mono text-purple-300'>string</td>
                <td className='p-3 font-mono'>''</td>
                <td className='p-3 text-gray-200'>
                  Additional CSS classes for layout adjustments.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5'>
                <td className='p-3 font-mono text-blue-300'>onChange</td>
                <td className='p-3 font-mono text-purple-300'>{`(date: Date | [Date, Date] | null) => void`}</td>
                <td className='p-3 font-mono'>-</td>
                <td className='p-3 text-gray-200'>
                  Callback function triggered when the date selection changes.
                </td>
              </tr>
              <tr>
                <td className='p-3 font-mono text-blue-300'>value</td>
                <td className='p-3 font-mono text-purple-300'>{`Date | [Date, Date] | null`}</td>
                <td className='p-3 font-mono text-green-300'>new Date()</td>
                <td className='p-3 text-gray-200'>
                  The currently selected calendar date reference.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5'>
                <td className='p-3 font-mono text-blue-300'>view</td>
                <td className='p-3 font-mono text-purple-300'>string</td>
                <td className='p-3 font-mono'>'month'</td>
                <td className='p-3 text-gray-200'>
                  The initial layout view scope to display: month, year, or
                  decade.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Calendar Preview Section */}
      <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-3xl font-bold mb-6 text-white'>
          Calendar Component Example
        </h2>

        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='p-4 bg-white bg-opacity-10 rounded-lg mb-4 relative max-w-sm w-full mx-auto lg:mx-0'>
            <h2 className='mt-2 mb-4 font-bold flex justify-center text-lg text-blue-200 bg-black/20 py-2 rounded-md'>
              Selected:{' '}
              {Array.isArray(date)
                ? `${date[0]?.toLocaleDateString()} to ${date[1]?.toLocaleDateString()}`
                : (date?.toLocaleDateString() ?? 'No date selected')}
            </h2>

            <div className='relative'>
              <Calendar
                onChange={handleDateChange}
                value={date}
                activeStartDate={activeStartDate}
                onActiveStartDateChange={({
                  activeStartDate: nextStartDate,
                }) => {
                  if (nextStartDate) setActiveStartDate(nextStartDate);
                }}
                view='month'
                className='custom-calendar'
                navigationLabel={({ date: currentNavDate }) => (
                  <button
                    type='button'
                    onClick={e => {
                      e.preventDefault();
                      setShowPicker(!showPicker);
                    }}
                    className='px-3 py-1 text-sm font-semibold rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 border border-white/10 shadow transition text-white'
                  >
                    {months[currentNavDate.getMonth()]}{' '}
                    {currentNavDate.getFullYear()} ▾
                  </button>
                )}
                tileClassName={({ date: tileDate, view }) => {
                  if (view === 'month') {
                    const today = new Date();
                    const isToday =
                      tileDate.getDate() === today.getDate() &&
                      tileDate.getMonth() === today.getMonth() &&
                      tileDate.getFullYear() === today.getFullYear();

                    return isToday ? 'today-highlight-border' : '';
                  }
                  return '';
                }}
              />

              {/* Navigation Jump Dropdown */}
              {showPicker && (
                <div className='absolute top-14 left-0 right-0 z-30 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl p-4 shadow-2xl transition-all'>
                  <div className='flex justify-between items-center mb-2 border-b border-gray-800 pb-2'>
                    <span className='text-xs uppercase tracking-wider text-gray-400 font-bold'>
                      Quick Jump Navigation
                    </span>
                    <button
                      onClick={() => setShowPicker(false)}
                      className='text-xs text-gray-400 hover:text-white px-2 py-0.5 bg-white/5 rounded hover:bg-white/10'
                    >
                      Close
                    </button>
                  </div>

                  {/* Months Selection Grid */}
                  <div className='grid grid-cols-4 gap-1.5 mb-4'>
                    {months.map((month, index) => (
                      <button
                        key={month}
                        onClick={() =>
                          jumpToMonthYear(index, activeStartDate.getFullYear())
                        }
                        className={`text-xs p-1.5 rounded font-medium transition ${
                          activeStartDate.getMonth() === index
                            ? 'bg-blue-500 text-white font-bold shadow'
                            : 'bg-white/10 hover:bg-white/20 text-gray-200'
                        }`}
                      >
                        {month.slice(0, 3)}
                      </button>
                    ))}
                  </div>

                  {/* Years Selection Row */}
                  <div className='max-h-36 overflow-y-auto grid grid-cols-3 gap-1.5 pr-1 border-t border-gray-800 pt-3'>
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() =>
                          jumpToMonthYear(activeStartDate.getMonth(), year)
                        }
                        className={`text-xs p-1.5 rounded font-medium transition ${
                          activeStartDate.getFullYear() === year
                            ? 'bg-green-500 text-white font-bold shadow'
                            : 'bg-white/10 hover:bg-white/20 text-gray-200'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Source Snippet Display */}
          <div className='flex-1 lg:w-2/3'>
            <h3 className='text-xl font-semibold mb-4 text-white'>
              Source Integration Code
            </h3>
            <div className='relative group'>
              <pre className='bg-gray-900 border border-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-[400px] whitespace-pre font-mono shadow-inner'>
                <code>{codeExampleString}</code>
              </pre>
              <CopyButton text={codeExampleString} codeKey='CalendarExample' />
            </div>
          </div>
        </div>
      </section>

      {/* Reminder Architecture Integration View (Documentation Requirement) */}
      <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-3xl font-bold mb-4 text-white'>
          Reminder & State Scheduling Pipeline Hook
        </h2>
        <p className='text-gray-300 mb-4 max-w-3xl'>
          Developers can use the reactive{' '}
          <code className='bg-black/30 px-1.5 py-0.5 rounded text-yellow-300 font-mono text-xs'>
            onChange
          </code>{' '}
          event stream to seamlessly bind calendar events with operational
          scheduler hooks, modals, or system mutations.
        </p>
        <div className='relative group'>
          <pre className='bg-gray-900 border border-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono shadow-inner'>
            <code>{reminderExampleString}</code>
          </pre>
          <CopyButton text={reminderExampleString} codeKey='ReminderExample' />
        </div>
      </section>

      {/* Global CSS Overrides for UI Uniformity */}
      <style jsx>{`
        :global(.custom-calendar) {
          width: 100% !important;
          background: transparent !important;
          border: none !important;
          font-family: inherit !important;
        }

        :global(.custom-calendar .react-calendar__navigation) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        :global(.custom-calendar .react-calendar__navigation button) {
          color: white !important;
          min-width: 35px;
          height: 35px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          margin: 0 2px;
        }

        :global(
          .custom-calendar
            .react-calendar__navigation
            button:hover:not([disabled])
        ) {
          background: rgba(255, 255, 255, 0.15) !important;
        }

        :global(.custom-calendar .react-calendar__month-view__weekdays) {
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4) !important;
          margin-bottom: 0.5rem;
        }

        :global(
          .custom-calendar .react-calendar__month-view__weekdays__weekday
        ) {
          padding: 0.5rem 0;
          text-align: center;
        }

        :global(.custom-calendar .react-calendar__month-view__days) {
          display: grid !important;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px !important;
        }

        :global(.custom-calendar .react-calendar__tile) {
          background: rgba(255, 255, 255, 0.05) !important;
          color: white !important;
          border-radius: 8px !important;
          padding: 0;
          height: 44px !important;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.15s ease;
          border: 1px solid transparent !important;
        }

        :global(.custom-calendar .react-calendar__tile:hover:not([disabled])) {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-1px);
        }

        :global(.custom-calendar .react-calendar__tile--active) {
          background: rgba(59, 130, 246, 0.6) !important;
          color: white !important;
          font-weight: bold;
          border-color: rgba(59, 130, 246, 1) !important;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
        }

        :global(.custom-calendar .react-calendar__tile--now) {
          background: rgba(255, 255, 255, 0.1) !important;
        }

        :global(.custom-calendar .today-highlight-border) {
          border: 2px dashed #22c55e !important;
          background: rgba(34, 197, 94, 0.15) !important;
          color: #4ade80 !important;
          font-weight: bold;
        }

        :global(
          .custom-calendar
            .react-calendar__month-view__days__day--neighboringMonth
        ) {
          color: rgba(255, 255, 255, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default CalendarDetail;
