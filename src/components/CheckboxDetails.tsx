// CheckboxDetails.tsx
import React from 'react';

// Define the prop types for CheckboxDetails
interface CheckboxDetailsProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  size?: string;
  borderColor?: string;
  backgroundColor?: string;
  checkColor?: string;
}

const CheckboxDetails: React.FC<CheckboxDetailsProps> = ({
  checked,
  onChange,
  label,
  size = 'medium',
  borderColor = '#4A90E2',
  backgroundColor = '#E5F1FB',
  checkColor = '#007bff',
}) => (
  <label className='inline-flex items-center'>
    <input
      type='checkbox'
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className={`form-checkbox ${size} border-${borderColor} bg-${backgroundColor} text-${checkColor} rounded`}
    />
    <span className='ml-2'>{label}</span>
  </label>
);

export default CheckboxDetails;
