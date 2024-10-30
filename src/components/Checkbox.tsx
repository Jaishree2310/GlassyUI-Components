import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void; // Update type to accept boolean
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <label className='inline-flex items-center'>
    <input
      type='checkbox'
      checked={checked}
      onChange={() => onChange(!checked)} // Toggle checked state
      className='form-checkbox h-5 w-5 text-blue-600 rounded'
    />
    <span className='ml-2 text-white'>{label}</span>
  </label>
);

export default Checkbox;
