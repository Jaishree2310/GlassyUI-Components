import React, { useState } from 'react';

const BasicDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().substr(0, 10));

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="font-semibold text-lg text-white mb-2">Basic Date Picker</h3>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      <p className="mt-2 text-gray-400">Selected Date: {new Date(selectedDate).toLocaleDateString()}</p>
    </div>
  );
};


const RangeDatePicker = () => {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().substr(0, 10));
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().substr(0, 10));

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="font-semibold text-lg text-white mb-2">Range Date Picker</h3>
      <div className="flex space-x-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
        />
      </div>
      <p className="mt-2 text-gray-400">
        Selected Range: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
      </p>
    </div>
  );
};


const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState<string>('12:00');

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="font-semibold text-lg text-white mb-2">Time Picker</h3>
      <input
        type="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      <p className="mt-2 text-gray-400">Selected Time: {selectedTime}</p>
    </div>
  );
};


export { BasicDatePicker, RangeDatePicker, TimePicker };
