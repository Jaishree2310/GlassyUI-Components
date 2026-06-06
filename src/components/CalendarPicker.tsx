import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface CalendarPickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  glassOpacity?: number;
  accentColor?: string; // hover and selection highlight (e.g. #a855f7)
  placeholder?: string;
}

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

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  value,
  onChange,
  glassOpacity = 0.15,
  accentColor = '#a855f7',
  placeholder = 'Select date...',
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || new Date());

  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize when value prop updates
  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setCurrentDate(value);
    }
  }, [value]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calendar Calculations
  const getDaysInMonth = (y: number, m: number) =>
    new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) =>
    new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  const prevMonthDays = getDaysInMonth(year, month - 1);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDaySelect = (day: number, isCurrentMonth = true) => {
    let targetDate: Date;
    if (isCurrentMonth) {
      targetDate = new Date(year, month, day);
    } else if (day > 20) {
      // Prev month
      targetDate = new Date(year, month - 1, day);
    } else {
      // Next month
      targetDate = new Date(year, month + 1, day);
    }

    setSelectedDate(targetDate);
    setCurrentDate(targetDate);
    setIsOpen(false);
    if (onChange) {
      onChange(targetDate);
    }
  };

  // Generate grid tiles
  const renderDays = () => {
    const tiles: React.ReactNode[] = [];

    // 1. Previous month overlapping days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      tiles.push(
        <button
          key={`prev-${day}`}
          onClick={() => handleDaySelect(day, false)}
          className='text-white/20 hover:text-white/40 text-xs py-1.5 rounded-lg text-center'
        >
          {day}
        </button>,
      );
    }

    // 2. Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === month &&
        new Date().getFullYear() === year;

      const activeStyle = isSelected
        ? {
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}80`,
            color: '#ffffff',
          }
        : isToday
          ? {
              border: '1px solid rgba(255, 255, 255, 0.4)',
            }
          : {};

      tiles.push(
        <button
          key={`day-${day}`}
          onClick={() => handleDaySelect(day, true)}
          style={activeStyle}
          className={`text-white text-xs font-semibold py-1.5 rounded-lg text-center transition-all ${
            !isSelected ? 'hover:bg-white/10' : ''
          }`}
        >
          {day}
        </button>,
      );
    }

    // 3. Next month overlapping days
    const totalRendered = tiles.length;
    const remainingDays = 42 - totalRendered; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      tiles.push(
        <button
          key={`next-${day}`}
          onClick={() => handleDaySelect(day, false)}
          className='text-white/20 hover:text-white/40 text-xs py-1.5 rounded-lg text-center'
        >
          {day}
        </button>,
      );
    }

    return tiles;
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div ref={containerRef} className='relative w-full max-w-[280px]'>
      {/* Input textbox field */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: `rgba(255, 255, 255, ${glassOpacity})`,
          borderColor: 'rgba(255, 255, 255, 0.15)',
        }}
        className='flex items-center justify-between px-4 py-2.5 border rounded-xl backdrop-filter backdrop-blur-md cursor-pointer transition-all duration-300 hover:bg-white/25 select-none'
      >
        <span
          className={`text-sm ${selectedDate ? 'text-white font-medium' : 'text-white/45'}`}
        >
          {formatDate(selectedDate) || placeholder}
        </span>
        <CalendarIcon size={16} className='text-white/50' />
      </div>

      {/* Popover Calendar Grid Box */}
      {isOpen && (
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            boxShadow:
              '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 255, 255, 0.05)',
          }}
          className='absolute z-30 mt-2.5 left-0 w-72 p-4 border rounded-2xl backdrop-filter backdrop-blur-xl transition-all duration-200'
        >
          {/* Header Controls */}
          <div className='flex items-center justify-between mb-4'>
            <h4 className='text-sm font-bold text-white tracking-wide'>
              {MONTHS[month]} {year}
            </h4>
            <div className='flex gap-1.5'>
              <button
                onClick={handlePrevMonth}
                className='p-1 rounded-lg border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all'
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNextMonth}
                className='p-1 rounded-lg border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all'
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday Names */}
          <div className='grid grid-cols-7 gap-1 text-center mb-2'>
            {DAYS_OF_WEEK.map(day => (
              <span
                key={day}
                className='text-[10px] font-bold uppercase text-white/40'
              >
                {day}
              </span>
            ))}
          </div>

          {/* Day tiles Grid */}
          <div className='grid grid-cols-7 gap-1 text-center'>
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
