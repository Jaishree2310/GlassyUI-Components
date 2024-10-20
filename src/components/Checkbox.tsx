import React, { useState } from 'react';

const Checkbox: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <CheckboxDetails
        checked={isChecked}
        onChange={handleCheckboxChange}
        label='I agree to the terms'
        size='medium'
        borderColor='#4A90E2'
        backgroundColor='#E5F1FB'
        checkColor='#007bff'
      />
    </div>
  );
};

// CheckboxDetails Component
interface CheckboxDetailsProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  size?: 'small' | 'medium' | 'large';
  borderColor?: string;
  backgroundColor?: string;
  checkColor?: string;
}

const CheckboxDetails: React.FC<CheckboxDetailsProps> = ({
  checked,
  onChange,
  label,
  size = 'medium',
  borderColor = '#000',
  backgroundColor = '#fff',
  checkColor = '#007bff',
}) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type='checkbox'
        checked={checked}
        onChange={() => onChange(!checked)}
        style={{
          width: size === 'small' ? '16px' : size === 'large' ? '24px' : '20px',
          height: size === 'small' ? '16px' : size === 'large' ? '24px' : '20px',
          borderColor: borderColor,
          backgroundColor: backgroundColor,
        }}
      />
      <span style={{ marginLeft: '8px', color: checkColor }}>{label}</span>
    </label>
  );
};

export default Checkbox;