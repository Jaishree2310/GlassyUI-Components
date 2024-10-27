import React from 'react';

interface CheckboxDetailsProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
}

const CheckboxDetails: React.FC<CheckboxDetailsProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <label className='inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`form-checkbox h-5 w-5 text-blue-600 rounded transition-all duration-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      />
      <span className='ml-2 text-white'>{label}</span>
    </label>
  );
};

export default CheckboxDetails;
