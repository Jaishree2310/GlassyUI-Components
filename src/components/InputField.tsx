import React from 'react';

interface InputFieldProps {
  className?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ 
  className = '', 
  type = 'text', 
  placeholder = '', 
  disabled = false, 
  onChange 
}) => {
  const inputStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    padding: '10px',
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <input
      className={`glassy-input ${className}`}
      style={inputStyle}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default InputField;