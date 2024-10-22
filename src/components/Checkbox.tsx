import React, { useState } from 'react';
import CheckboxDetails from './CheckboxDetails'; // Assuming CheckboxDetails is a custom component

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

export default Checkbox;
