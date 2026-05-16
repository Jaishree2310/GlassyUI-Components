import React, { useState } from 'react';
import { GlassCheckbox } from './CheckboxDetails';

const Checkbox: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <GlassCheckbox
      checked={isChecked}
      onChange={setIsChecked}
      label='I agree to the terms'
      size='medium'
      color='#4A90E2'
    />
  );
};

export default Checkbox;
