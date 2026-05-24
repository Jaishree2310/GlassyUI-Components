import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Calendar as CalendarIcon,
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

const currentYear = new Date().getFullYear();
// Generate a 20-year selection scope (10 years back, 10 years forward)
const YEAR_OPTIONS = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

interface Reminder {
  id: string;
  time: string;
  title: string;
}

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

  // Close when clicking anywhere outside the picker
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
                 bg-gray-950 border border-white/20 rounded-2xl shadow-2xl
                 backdrop-blur-md p-4 text-white'
      style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.7)' }}
    >
      {/* Year Row Navigation & Direct Dropdown Jump */}
      <div className='flex items-center justify-between mb-4 select-none'>
        <button
          type='button'
          onClick={() => {
            const prev = pickerYear - 1;
            setPickerYear(prev);
            onSelect(new Date(prev, activeStartDate.getMonth(), 1));
          }}
          className='p-1.5 rounded-lg hover:bg-white/10 transition-colors'
          aria-label='Previous year'
        >
          <ChevronLeft size={16} />
        </button>

        {/* Direct Year Jump Selection Dropdown */}
        <div className='relative custom-select-wrapper'>
          <select
            value={pickerYear}
            onChange={e => {
              const selectedYear = parseInt(e.target.value, 10);
              setPickerYear(selectedYear);
              onSelect(new Date(selectedYear, activeStartDate.getMonth(), 1));
            }}
            className='bg-gray-800 text-white font-bold text-sm px-3 py-1 rounded-lg 
                       border border-white/10 outline-none cursor-pointer hover:bg-gray-700
                       transition-colors format-select-menu'
          >
            {YEAR_OPTIONS.map(y => (
              <option key={y} value={y} className='bg-gray-900 text-white'>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          type='button'
          onClick={() => {
            const next = pickerYear + 1;
            setPickerYear(next);
            onSelect(new Date(next, activeStartDate.getMonth(), 1));
          }}
          className='p-1.5 rounded-lg hover:bg-white/10 transition-colors'
          aria-label='Next year'
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Month Selection Grid */}
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
              className={`py-2 rounded-lg text-xs font-semibold transition-all duration-150
                ${
                  isActive
                    ? 'bg-green-500 text-white shadow-md scale-105'
                    : 'hover:bg-white/15 text-gray-300'
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

  // Track selected date anchor
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Active view management for top-level Month layout tracking
  const [activeStartDate, setActiveStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [showPicker, setShowPicker] = useState(false);

  // Live Reminder Tracking State Engine
  const [reminders, setReminders] = useState<Record<string, Reminder[]>>({
    [`${currentYear}-06-15`]: [
      {
        id: '1',
        time: '09:00',
        title: 'GSSoC Progress Synchronization Review',
      },
    ],
    [`${currentYear}-06-20`]: [
      { id: '2', time: '14:30', title: 'Open Source Community Code Review' },
    ],
  });

  // Event creation form local inputs
  const [newEvTitle, setNewEvTitle] = useState('');
  const [newEvTime, setNewEvTime] = useState('12:00');

  const today = new Date();
  const dateISOKey = selectedDate.toISOString().slice(0, 10); // Format: "YYYY-MM-DD"
  const localizedDayEvents = reminders[dateISOKey] || [];

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDateChange: CalendarProps['onChange'] = newDate => {
    if (newDate instanceof Date) {
      setSelectedDate(newDate);
    }
  };

  const addNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvTitle.trim()) return;

    const freshEvent: Reminder = {
      id: Math.random().toString(36).substring(2, 9),
      time: newEvTime || '12:00',
      title: newEvTitle.trim(),
    };

    setReminders(prev => {
      const currentList = prev[dateISOKey] || [];
      const updatedList = [...currentList, freshEvent].sort((a, b) =>
        a.time.localeCompare(b.time),
      );
      return { ...prev, [dateISOKey]: updatedList };
    });

    setNewEvTitle('');
  };

  const removeEvent = (id: string) => {
    setReminders(prev => {
      const remaining = (prev[dateISOKey] || []).filter(item => item.id !== id);
      const copy = { ...prev };
      if (remaining.length === 0) {
        delete copy[dateISOKey];
      } else {
        copy[dateISOKey] = remaining;
      }
      return copy;
    });
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

  // ── Custom Navigation Label Header Builder ─────────────────────────────
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
        title='Jump directly to month or year selection'
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

  // ── Dynamic Highlights Ring Processor ───────────────────────────────────────
  const tileClassName = ({
    date: tileDate,
    view,
  }: {
    date: Date;
    view: string;
  }) => {
    if (view !== 'month') return null;

    const classes: string[] = [];

    const isToday =
      tileDate.getDate() === today.getDate() &&
      tileDate.getMonth() === today.getMonth() &&
      tileDate.getFullYear() === today.getFullYear();

    if (isToday) classes.push('is-today');

    // Add a unique visual cue indicator dot flag if that date has events scheduled
    const tileKey = tileDate.toISOString().slice(0, 10);
    if (reminders[tileKey] && reminders[tileKey].length > 0) {
      classes.push('has-events-dot');
    }

    return classes.length > 0 ? classes.join(' ') : null;
  };

  // ── Code snippets ──────────────────────────────────────────────────────────
  const basicExampleCode = `const CalendarExample: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [activeStartDate, setActiveStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  return (
    <Calendar
      onChange={(d) => d instanceof Date && setDate(d)}
      value={date}
      view="month"
      activeStartDate={activeStartDate}
      onActiveStartDateChange={({ activeStartDate: d }) => d && setActiveStartDate(d)}
      tileClassName={({ date: tDate, view }) => {
        if (view !== 'month') return null;
        const today = new Date();
        return tDate.toDateString() === today.toDateString() ? 'is-today' : null;
      }}
      navigationLabel={customNavigationLabel}
      className="custom-calendar"
    />
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
        A production-grade customizable calendar utility featuring atomic day
        event scheduling dashboards along with synchronized multi-tier month &
        year direct selection menus.
      </p>

      {/* ── Production Component Live Interactive Pipeline Playground ── */}
      <section className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-3xl font-bold mb-6 text-white flex items-center gap-2'>
          <CalendarIcon className='text-green-400' /> Live Workspace Preview
        </h2>

        <div className='flex flex-col lg:flex-row gap-8 items-start'>
          {/* Left Block Column: Calendar Wrapper */}
          <div className='p-6 bg-white/10 rounded-2xl border border-white/10 shadow-xl w-full lg:w-5/12 flex flex-col items-center'>
            <h2 className='mb-4 font-bold text-center text-lg text-blue-200 tracking-wide'>
              Focused Date:{' '}
              {selectedDate.toLocaleDateString(undefined, {
                dateStyle: 'long',
              })}
            </h2>

            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
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

            {/* Custom Interactive Legend */}
            <div className='mt-6 flex gap-5 justify-center text-xs text-gray-300 border-t border-white/10 pt-4 w-full'>
              <span className='flex items-center gap-1.5'>
                <span className='inline-block w-3.5 h-3.5 rounded border border-green-400 bg-green-400/10' />
                Today Ring
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='inline-block w-3.5 h-3.5 rounded bg-green-500' />
                Selected Day
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='inline-block w-2 h-2 rounded-full bg-blue-400' />
                Contains Active Events
              </span>
            </div>
          </div>

          {/* Right Block Column: Dynamic Event Reminders Panel Control */}
          <div className='p-6 bg-gray-900/60 rounded-2xl border border-white/10 shadow-xl w-full lg:w-7/12 min-h-[440px] flex flex-col justify-between'>
            <div>
              <div className='flex items-center justify-between border-b border-white/10 pb-3 mb-4'>
                <h3 className='text-xl font-bold text-white flex items-center gap-2'>
                  Agenda for{' '}
                  {selectedDate.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </h3>
                <span className='px-2.5 py-0.5 text-xs bg-white/10 text-gray-300 rounded-full font-mono font-medium'>
                  {localizedDayEvents.length}{' '}
                  {localizedDayEvents.length === 1 ? 'event' : 'events'}
                </span>
              </div>

              {/* Dynamic Task Loop */}
              {localizedDayEvents.length === 0 ? (
                <div className='flex flex-col items-center justify-center text-center py-10 text-gray-400 border border-dashed border-white/10 rounded-xl bg-black/20'>
                  <p className='text-sm font-medium'>
                    No events mapped for this date segment.
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>
                    Fill out the insertion module below to map a reminder.
                  </p>
                </div>
              ) : (
                <div className='space-y-2 max-h-[220px] overflow-y-auto pr-1'>
                  {localizedDayEvents.map(item => (
                    <div
                      key={item.id}
                      className='flex items-center justify-between bg-white/5 border border-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors group'
                    >
                      <div className='flex items-center gap-3'>
                        <span className='text-xs font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 font-semibold'>
                          {item.time}
                        </span>
                        <p className='text-sm text-gray-100 font-medium tracking-wide'>
                          {item.title}
                        </p>
                      </div>
                      <button
                        type='button'
                        onClick={() => removeEvent(item.id)}
                        className='text-gray-400 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150'
                        title='Delete event reminder'
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Event Addition Interface Form Hook */}
            <form
              onSubmit={addNewEvent}
              className='mt-6 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-3'
            >
              <div className='sm:col-span-3'>
                <label className='block text-xs text-gray-400 font-bold uppercase tracking-wider mb-1'>
                  Time
                </label>
                <input
                  type='time'
                  value={newEvTime}
                  onChange={e => setNewEvTime(e.target.value)}
                  className='w-full bg-gray-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-green-400 focus:outline-none transition-colors'
                />
              </div>
              <div className='sm:col-span-6'>
                <label className='block text-xs text-gray-400 font-bold uppercase tracking-wider mb-1'>
                  Event Title Description
                </label>
                <input
                  type='text'
                  placeholder='e.g., Code architecture review'
                  value={newEvTitle}
                  onChange={e => setNewEvTitle(e.target.value)}
                  className='w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-green-400 focus:outline-none transition-colors placeholder-gray-500'
                />
              </div>
              <div className='sm:col-span-3 flex items-end'>
                <button
                  type='submit'
                  className='w-full bg-green-500 hover:bg-green-600 text-white font-bold text-sm rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 shadow-md shadow-green-500/10 transition-colors'
                >
                  <Plus size={16} /> Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── Props Table Documentation Metric ── */}
      <section className='p-6 mb-14 bg-white bg-opacity-20 rounded-lg shadow-lg relative'>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>
          Architecture Documentation APIs
        </h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr className='bg-white bg-opacity-20 text-gray-200 font-semibold'>
                <th className='p-3 rounded-l-lg'>Prop Context Hook</th>
                <th className='p-3'>Type Model</th>
                <th className='p-3'>Fallback Default</th>
                <th className='p-3 rounded-r-lg'>
                  Structural Purpose Description
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-white/5 text-gray-300'>
              <tr>
                <td className='p-3 font-mono text-green-300'>
                  activeStartDate
                </td>
                <td className='p-3 font-mono'>Date</td>
                <td className='p-3'>current month</td>
                <td className='p-3'>
                  Tracks the top-level month representation viewport boundary.
                  Required for dropdown calendar jumps.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5'>
                <td className='p-3 font-mono text-green-300'>tileClassName</td>
                <td className='p-3 font-mono'>{`({ date, view }) => string | null`}</td>
                <td className='p-3'>-</td>
                <td className='p-3'>
                  Dynamically pipes individual conditional string tokens onto
                  individual days to append custom layouts like active event
                  dots or today outlines.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Implementation Integration Code Section ── */}
      <section className={`${getGlassyClasses()} p-6 relative`}>
        <h3 className='text-xl font-bold mb-4 text-white'>
          Implementation Source Code
        </h3>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm max-h-[380px] whitespace-pre-wrap break-words font-mono'>
            <code>{basicExampleCode}</code>
          </pre>
          <CopyButton text={basicExampleCode} codeKey='CalendarExample' />
        </div>
      </section>

      {/* ── Embedded Scope Scoped Global Styles Override ── */}
      <style jsx>{`
        .custom-calendar {
          width: 100%;
          max-width: 100%;
          background: transparent;
          border: none;
          font-family: inherit;
        }

        .react-calendar__navigation {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .react-calendar__navigation button {
          color: white;
          background: transparent;
          min-width: 44px;
          height: 44px;
          font-size: 1.25rem;
        }

        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }

        .react-calendar__viewContainer {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 16px;
          padding: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.4);
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
          border-b: 1px solid rgba(255, 255, 255, 0.05);
        }

        .react-calendar__month-view__weekdays abbr {
          text-decoration: none !important;
        }

        .react-calendar__tile {
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
          font-size: 0.95rem;
          height: 48px;
          border-radius: 10px;
          margin: 2px 0;
          background: transparent;
          transition: all 0.15s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .react-calendar__month-view__days__day--neighboringMonth {
          color: rgba(255, 255, 255, 0.25) !important;
        }

        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background: rgba(255, 255, 255, 0.15) !important;
          color: white;
        }

        /* Active selected date styling context */
        .react-calendar__tile--active {
          background: #22c55e !important; /* Tailwind green-500 */
          color: white !important;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);
        }

        /* Standalone calendar day layout focus tracking indicator for Current Date ring marker */
        .react-calendar__tile.is-today {
          border: 2px solid #4ade80 !important; /* green-400 */
          background: rgba(74, 222, 128, 0.1) !important;
          color: #4ade80;
          font-weight: 700;
        }

        .react-calendar__tile--active.is-today {
          background: #22c55e !important;
          border: 2px solid #bbf7d0 !important;
          color: white !important;
        }

        /* Bottom centering indicator dot structure layout flag representing active events assigned */
        .react-calendar__tile.has-events-dot::after {
          content: '';
          position: absolute;
          bottom: 4px;
          width: 5px;
          height: 5px;
          background-color: #60a5fa; /* Tailwind blue-400 */
          border-radius: 50%;
          transition: background-color 0.15s ease;
        }

        .react-calendar__tile--active.has-events-dot::after {
          background-color: white;
        }

        /* Clean overrides targeting native select structures tucked deep into dynamic overlays */
        .format-select-menu {
          appearance: none;
          -webkit-appearance: none;
          padding-right: 1.75rem;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 4 4 4-4'/></svg>");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
        }
      `}</style>
    </div>
  );
};

export default CalendarDetail;
