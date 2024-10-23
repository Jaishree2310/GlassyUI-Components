import React, { useState } from 'react';

// import CheckboxDetails from './CheckboxDetails';

interface checkBoxInterface {
  checked: boolean;
  onChange: (checked: any) => void;
  label: string;
  size: string;
  borderColor: string;
  backgroundColor: string;
  checkColor: string;
}

var Checkboxx: React.FC<checkBoxInterface> = ({ checked, onChange, label }) => (
  <label className='inline-flex items-center'>
    <input
      type='checkbox'
      checked={checked}
      onChange={onChange}
      className='form-checkbox h-5 w-5 text-blue-600 rounded'
    />
    <span className='ml-2 text-white'>{label}</span>
  </label>
);

const Checkbox: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <Checkboxx
        checked={isChecked}
        onChange={(checked: any) => setIsChecked(checked.target.checked)}
        label='I agree to the terms'
        size='medium'
        borderColor='#4A90E2'
        backgroundColor='#E5F1FB'
        checkColor='#007bff'
      />
    </div>
  );
};

export default Checkbox;
