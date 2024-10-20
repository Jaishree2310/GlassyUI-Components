import React, { useState } from 'react';
import CheckboxDetails from './CheckboxDetails'; // Ensure the path is correct

const Checkbox: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <CheckboxDetails
      //checked={setIsChecked}
      //onChange={setIsChecked} // Directly pass setIsChecked
      //label="I agree to the terms"
      //size="medium" // Pass size if necessary
      //borderColor="#4A90E2" // Pass border color
      //backgroundColor="#fff" // Pass background color
      //checkColor="#000" // Pass check color
      />
    </div>
  );
};

export default Checkbox;
