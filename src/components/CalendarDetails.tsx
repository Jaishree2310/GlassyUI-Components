import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BackToTopButton from './BackToTop';

// ─── Constants ────────────────────────────────────────────────────────────────
const MONTHS = [
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

// ─── MonthYearPicker ──────────────────────────────────────────────────────────
interface MonthYearPickerProps {
  activeStartDate: Date;
  onClose: () => void;
  onSelect: (date: Date) => void;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  activeStartDate,
  onClose,
  onSelect,
}) => {
  const [pickerYear, setPickerYear] = useState(activeStartDate.getFullYear());
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className='absolute top-12 left-1/2 -translate-x-1/2 z-50 w-72
                 bg-gray-900 border border-white/20 rounded-2xl shadow-2xl
                 backdrop-blur-md p-4 text-white'
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
    >
      {/* Year row */}
      <div className='flex items-center justify-between mb-3 select-none'>
        <button
          type='button'
          onClick={() => {
            const previousYear = pickerYear - 1;
            setPickerYear(previousYear);
            onSelect(new Date(previousYear, activeStartDate.getMonth(), 1));
          }}
          className='p-1 rounded-lg hover:bg-white/10 transition-colors'
          aria-label='Previous year'
        >
          <ChevronLeft size={16} />
        </button>
        <span className='font-bold text-lg tracking-wide'>{pickerYear}</span>
        <button
          type='button'
          onClick={() => {
            const nextYear = pickerYear + 1;
            setPickerYear(nextYear);
            onSelect(new Date(nextYear, activeStartDate.getMonth(), 1));
          }}
          className='p-1 rounded-lg hover:bg-white/10 transition-colors'
          aria-label='Next year'
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Month grid */}
      <div className='grid grid-cols-3 gap-1.5'>
        {MONTHS.map((month, idx) => {
          const isActive =
            idx === activeStartDate.getMonth() &&
            pickerYear === activeStartDate.getFullYear();
          return (
            <button
              type='button'
              key={month}
              onClick={() => {
                onSelect(new Date(pickerYear, idx, 1));
                onClose();
              }}
              className={`py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                ${
                  isActive
                    ? 'bg-green-500/80 text-white shadow-md scale-105'
                    : 'hover:bg-white/15 text-gray-200'
                }`}
            >
              {month.slice(0, 3)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const CalendarDetail: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());

  // Controls which month the calendar is showing (for the jump nav)
  const [activeStartDate, setActiveStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [showPicker, setShowPicker] = useState(false);

  const today = new Date();

  // ── Handlers ──────────────────────────────────────────────────────────────
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

  const getGlassyClasses = () => 'bg-white bg-opacity-20 rounded-lg shadow-lg';

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className='absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30'
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  // ── Custom navigation label (clickable → picker) ───────────────────────────
  const customNavigationLabel = ({
    activeStartDate: labelDate,
  }: {
    activeStartDate: Date;
    label: string;
    locale: string | undefined;
    view: string;
  }) => (
    <div className='relative flex justify-center'>
      <button
        type='button'
        onClick={e => {
          e.stopPropagation();
          setShowPicker(prev => !prev);
        }}
        className='px-3 py-1 rounded-lg font-bold text-white hover:bg-white/20
                   transition-colors duration-150 flex items-center gap-1 select-none'
        title='Jump to month/year'
      >
        {MONTHS[labelDate.getMonth()]} {labelDate.getFullYear()}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${showPicker ? 'rotate-180' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {showPicker && (
        <MonthYearPicker
          activeStartDate={activeStartDate}
          onClose={() => setShowPicker(false)}
          onSelect={d => {
            setActiveStartDate(d);
          }}
        />
      )}
    </div>
  );

  // ── Today tile class ───────────────────────────────────────────────────────
  const tileClassName = ({
    date: tileDate,
    view,
  }: {
    date: Date;
    view: string;
  }) => {
    if (view !== 'month') return null;
    const isToday =
      tileDate.getDate() === today.getDate() &&
      tileDate.getMonth() === today.getMonth() &&
      tileDate.getFullYear() === today.getFullYear();
    return isToday ? 'is-today' : null;
  };

  // ── Code snippets ──────────────────────────────────────────────────────────
  const basicExampleCode = `const CalendarExample: React.FC = () => {
  const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());
  // Track which month the calendar displays so the jump nav works
  const [activeStartDate, setActiveStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const handleDateChange: CalendarProps['onChange'] = (newDate) => {
    if (Array.isArray(newDate)) {
      const startDate = newDate[0] instanceof Date ? newDate[0] : null;
      const endDate = newDate[1] instanceof Date ? newDate[1] : null;
      setDate(startDate && endDate ? [startDate, endDate] : null);
    } else if (newDate instanceof Date) {
      setDate(newDate);
    }
  };

  // Highlight today's tile independently of the selected date
  const tileClassName = ({ date: tileDate, view }: { date: Date; view: string }) => {
    const today = new Date();
    if (view !== 'month') return null;
    const isToday =
      tileDate.getDate() === today.getDate() &&
      tileDate.getMonth() === today.getMonth() &&
      tileDate.getFullYear() === today.getFullYear();
    return isToday ? 'is-today' : null;
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={date}
      view="month"
      activeStartDate={activeStartDate}
      onActiveStartDateChange={({ activeStartDate: d }) =>
        d && setActiveStartDate(d)
      }
      tileClassName={tileClassName}
      navigationLabel={customNavigationLabel} // see NavigationLabel example
      className="custom-calendar"
    />
  );
};`;

  const remindersExampleCode = `// ── Example: Using onChange to drive a reminders / modal system ──────────────
interface Reminder {
  id: string;
  time: string;
  title: string;
}

const remindersMap: Record<string, Reminder[]> = {
  '2026-06-15': [{ id: '1', time: '09:00', title: 'Team standup' }],
  '2026-06-20': [{ id: '2', time: '14:00', title: 'Doctor appointment' }],
};

const CalendarWithReminders: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDateChange: CalendarProps['onChange'] = (newDate) => {
    if (newDate instanceof Date) {
      setSelectedDate(newDate);
      const key = newDate.toISOString().slice(0, 10); // "YYYY-MM-DD"
      const dayReminders = remindersMap[key] ?? [];
      setReminders(dayReminders);
      setModalOpen(true);
    }
  };

  return (
    <>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="custom-calendar"
      />

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedDate?.toLocaleDateString()}</h3>
            {reminders.length === 0
              ? <p>No reminders. Add one?</p>
              : reminders.map(r => (
                  <div key={r.id}>
                    <strong>{r.time}</strong> – {r.title}
                  </div>
                ))
            }
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};`;

  return (
    <div className='min-h-screen pt-24 px-8 pb-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative flex flex-col'>
      <BackToTopButton />
      <nav className='mb-8 flex items-center justify-between relative z-10'>
        <button
          onClick={() => navigate('/components')}
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
        A customizable calendar component for date selection with today
        highlighting and month/year jump navigation.
      </p>

      {/* ── Props Table ─────────────────────────────────────────────────── */}
      <section className='p-6 mb-14 bg-white bg-opacity-20 rounded-lg shadow-lg relative'>
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
                  Callback triggered when the date changes
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
              <tr>
                <td className='p-2'>activeStartDate</td>
                <td className='p-2'>Date</td>
                <td className='p-2'>current month</td>
                <td className='p-2'>
                  Controls which month is displayed — required for the jump nav
                  feature
                </td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>onActiveStartDateChange</td>
                <td className='p-2'>{`({ activeStartDate }) => void`}</td>
                <td className='p-2'>-</td>
                <td className='p-2'>
                  Fired when the user navigates months; keep your state in sync
                </td>
              </tr>
              <tr>
                <td className='p-2'>tileClassName</td>
                <td className='p-2'>{`({ date, view }) => string | null`}</td>
                <td className='p-2'>-</td>
                <td className='p-2'>
                  Return <code>'is-today'</code> for today's tile to apply the
                  highlight ring
                </td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>navigationLabel</td>
                <td className='p-2'>function</td>
                <td className='p-2'>-</td>
                <td className='p-2'>
                  Replace the default header label with a clickable month/year
                  picker
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Live Example ─────────────────────────────────────────────────── */}
      <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
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
              activeStartDate={activeStartDate}
              onActiveStartDateChange={({ activeStartDate: d }) =>
                d && setActiveStartDate(d)
              }
              tileClassName={tileClassName}
              navigationLabel={
                customNavigationLabel as CalendarProps['navigationLabel']
              }
              className='custom-calendar'
            />

            <div className='mt-4 flex gap-4 justify-center text-sm text-gray-300'>
              <span className='flex items-center gap-1.5'>
                <span className='inline-block w-4 h-4 rounded border-2 border-green-400 bg-transparent' />
                Today
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='inline-block w-4 h-4 rounded bg-green-500/60' />
                Selected
              </span>
            </div>
          </div>

          <div className='lg:w-2/3'>
            <h3 className='text-xl font-semibold mb-4 text-white'>Code</h3>
            <div className='relative'>
              <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm max-h-[480px] whitespace-pre-wrap break-words'>
                <code>{basicExampleCode}</code>
              </pre>
              <CopyButton text={basicExampleCode} codeKey='CalendarExample' />
            </div>
          </div>
        </div>
      </section>

      {/* ── Reminders / Modal Usage ───────────────────────────────────────── */}
      <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-3xl font-bold mb-2 text-white'>
          Using <code className='text-green-300'>onChange</code> with Reminders
          &amp; Modals
        </h2>
        <p className='text-gray-300 mb-6'>
          The <code className='text-green-300'>onChange</code> callback fires
          every time the user clicks a date. You can use it to look up reminders
          stored in a map keyed by ISO date string (<code>'YYYY-MM-DD'</code>),
          then open a modal or side panel pre-populated with those entries. Here
          is a minimal working example:
        </p>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm max-h-[520px] whitespace-pre-wrap break-words'>
            <code>{remindersExampleCode}</code>
          </pre>
          <CopyButton text={remindersExampleCode} codeKey='RemindersExample' />
        </div>

        <div className='mt-6 border border-blue-400/40 bg-blue-500/10 rounded-xl p-4 text-blue-200 text-sm leading-relaxed'>
          <strong className='block mb-1 text-blue-300'>💡 Tip</strong>
          Replace the static <code>remindersMap</code> object with a call to
          your backend or a state-management store to persist reminders across
          sessions.
        </div>
      </section>

      {/* ── Inline styles ────────────────────────────────────────────────── */}
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

        .react-calendar__navigation {
          position: relative;
        }

        .react-calendar__navigation button {
          color: white;
          background: transparent;
        }

        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
        }

        .react-calendar__month-view {
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
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
          justify-content: center;
          align-items: center;
          height: 60px;
          width: 60px;
        }

        .react-calendar__tile:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.05);
        }

        .react-calendar__tile--active {
          background: rgba(0, 255, 0, 0.5) !important;
          color: white !important;
        }

        .react-calendar__tile.is-today {
          border: 2.5px solid #4ade80 !important;
          border-radius: 6px;
          box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.25);
          background: rgba(74, 222, 128, 0.08) !important;
          font-weight: 700;
        }

        .react-calendar__tile--active.is-today {
          background: rgba(0, 255, 0, 0.45) !important;
          border: 2.5px solid #86efac !important;
        }

        .react-calendar__month-view__days__day {
          color: white;
          font-size: 1.25rem;
        }

        .react-calendar__month-view__weekdays {
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .react-calendar__month-view__weekdays abbr {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default CalendarDetail;
