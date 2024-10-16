import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { ArrowLeft} from 'lucide-react';
import { FiCopy } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import BackToTopButton from './BackToTop';

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  alert('Code copied to clipboard!');
};

const DatePickerDetails = () => {
  // States for different date pickers
  const [basicDate, setBasicDate] = useState<Date | null>(new Date());
  const [rangeStartDate, setRangeStartDate] = useState<Date | undefined>(new Date());
  const [rangeEndDate, setRangeEndDate] = useState<Date | undefined>(new Date());
  const [timeDate, setTimeDate] = useState<Date | null>(new Date());
  const navigate = useNavigate();

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';
  };


  const basicUsageCode = `
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BasicDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div>
      <h3>Basic Date Picker</h3>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
};
`;

  const rangeUsageCode = `
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RangeDatePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <div>
      <h3>Range Date Picker</h3>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};
`;

  const timeUsageCode = `
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());

  return (
    <div>
      <h3>Time Picker</h3>
      <DatePicker
        selected={selectedTime}
        onChange={(date) => setSelectedTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    </div>
  );
};
`;

  return (
    <div className="p-4 bg-gray-900">
      <BackToTopButton />
          <button
              onClick={() => navigate(-1)}
              className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-800`}
          >
              <ArrowLeft size={20} className="mr-2" />
              Back to Components
          </button>
      {/* Basic Date Picker Section */}
      <div className="p-4 mb-6 bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-6xl font-bold mb-8 text-white">Date Pickers</h1>
        <p className="text-xl mb-8 text-white">
          This example demonstrates three types of date pickers: Basic Date Picker, Range Date Picker, and Time Picker, built with the <strong>react-datepicker</strong> package. Each component has a usage section with code that you can copy, and an interactive example of how it works.
        </p>

        {/* Example Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-3xl font-bold mb-6 text-white">Basic Date Picker:</h4>
          <p className="mb-6 text-lg text-white">
          A simple date picker that allows users to select a single date. The date is formatted as &quot;MM/dd/yyyy&quot; and can be easily integrated into forms.
        </p>
          <DatePicker
            selected={basicDate}
            onChange={(date) => setBasicDate(date)}
            dateFormat="MM/dd/yyyy"
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-200"
          />
          <p className="mt-2 text-gray-400">
            Selected Date: {basicDate ? format(basicDate, 'MM/dd/yyyy') : 'No date selected'}
          </p>
        </div>

        {/* Usage Section */}
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
          <h4 className="text-3xl font-bold mb-6 text-white">Usage:</h4>
          <div className="relative">
            <pre className="bg-gray-900 p-4 rounded-md text-lg text-white overflow-x-auto">
              {basicUsageCode}
            </pre>
            <button
              onClick={() => copyToClipboard(basicUsageCode)}
              className="absolute top-2 right-4 text-white hover:text-blue-500"
              aria-label="Copy to clipboard"
            >
              <FiCopy size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Range Date Picker Section */}
      <div className="p-4 mb-6 bg-gray-900 rounded-lg shadow-md">
        {/* Example Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-3xl font-bold mb-6 text-white">Range Date picker: </h4>
          <p className="mb-6 text-lg text-white">
          This picker allows users to select a range of dates, from a start date to an end date. It&apos;s particularly useful for booking systems or any application that requires a defined time period.
        </p>
          <div className="flex space-x-4">
            <DatePicker
              selected={rangeStartDate}
              onChange={(date) => setRangeStartDate(date || undefined)}
              selectsStart
              startDate={rangeStartDate}
              endDate={rangeEndDate}
              dateFormat="MM/dd/yyyy"
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-200"
            />
            <DatePicker
              selected={rangeEndDate}
              onChange={(date) => setRangeEndDate(date || undefined)}
              selectsEnd
              startDate={rangeStartDate}
              endDate={rangeEndDate}
              dateFormat="MM/dd/yyyy"
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <p className="mt-2 text-gray-400">
            Selected Range: {rangeStartDate ? format(rangeStartDate, 'MM/dd/yyyy') : 'No start date'} -{' '}
            {rangeEndDate ? format(rangeEndDate, 'MM/dd/yyyy') : 'No end date'}
          </p>
        </div>

        {/* Usage Section */}
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
          <h4 className="text-3xl font-bold mb-6 text-white">Usage:</h4>
          <div className="relative">
            <pre className="bg-gray-900 p-4 rounded-md text-lg text-white overflow-x-auto">
              {rangeUsageCode}
            </pre>
            <button
              onClick={() => copyToClipboard(rangeUsageCode)}
              className="absolute top-2 right-4 text-white hover:text-blue-500"
              aria-label="Copy to clipboard"
            >
              <FiCopy size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Time Picker Section */}
      <div className="p-4 mb-6 bg-gray-900 rounded-lg shadow-md">

        {/* Example Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-3xl font-bold mb-6 text-white">Time Picker:</h4>
          <p className="mb-6 text-lg text-white">
          A time picker that enables users to select a time without worrying about date selection. Time intervals are set at 15 minutes, and the selected time is displayed in a 12-hour format.
        </p>
          <DatePicker
            selected={timeDate}
            onChange={(date) => setTimeDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-200"
          />
          <p className="mt-2 text-gray-400">
            Selected Time: {timeDate ? format(timeDate, 'h:mm aa') : 'No time selected'}
          </p>
        </div>

        {/* Usage Section */}
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
          <h4 className="text-3xl font-bold mb-6 text-white">Usage:</h4>
          <div className="relative">
            <pre className="bg-gray-900 p-4 rounded-md text-lg text-white overflow-x-auto">
              {timeUsageCode}
            </pre>
            <button
              onClick={() => copyToClipboard(timeUsageCode)}
              className="absolute top-2 right-4 text-white hover:text-blue-500"
              aria-label="Copy to clipboard"
            >
              <FiCopy size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerDetails;
