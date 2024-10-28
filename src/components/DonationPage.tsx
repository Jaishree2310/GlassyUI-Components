import React, { useState, useEffect } from 'react';
import { z } from 'zod';

const DonationPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    amount: '',
    name: '',
    email: '',
  });

  const donationSchema = z.object({
    amount: z
      .string()
      .regex(/^\d+$/, { message: 'Amount must be a number' })
      .min(1, { message: 'Amount is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
  });

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#3f434a' : '#ffffff';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [darkMode]);

  const containerStyle: React.CSSProperties = {
    maxWidth: '500px',
    margin: '70px auto',
    padding: '40px',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
    color: '#ffffff',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: darkMode ? '#e0e0e0' : '#202020',
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const labelStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'left',
    marginBottom: '10px',
    fontWeight: '600',
    color: darkMode ? '#eeeeee' : '#202020',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    marginBottom: '20px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'border-color 0.4s ease, transform 0.3s ease',
    backdropFilter: 'blur(5px)',
  };

  const inputFocusStyle: React.CSSProperties = {
    borderColor: '#00c6ff',
    transform: 'scale(1.02)',
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '10px',
    padding: '14px 24px',
    background: isHovering
      ? 'linear-gradient(90deg, #00c6ff, #0072ff)'
      : 'linear-gradient(90deg, #0072ff, #00c6ff)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background 0.4s ease, transform 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 198, 255, 0.4)',
  };

  const buttonHoverStyle: React.CSSProperties = {
    transform: 'scale(1.05)',
  };

  const errorStyle: React.CSSProperties = {
    color: 'red',
    fontSize: '1.2rem',
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      donationSchema.parse(formData);
      setErrors({ amount: '', name: '', email: '' });
      alert('Form submitted successfully!');
    } catch (err: any) {
      const formattedErrors: any = {};
      err.errors.forEach((error: any) => {
        formattedErrors[error.path[0]] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Support Us!</h1>
      <p style={paragraphStyle}>
        Your contributions help us continue our work.
      </p>
      <form noValidate style={formStyle} onSubmit={handleSubmit}>
        <label htmlFor='amount' style={labelStyle}>
          Donation Amount:
        </label>
        <input
          type='text'
          id='amount'
          name='amount'
          placeholder='Enter amount in Rupees'
          style={{
            ...inputStyle,
            ...(formData.amount ? inputFocusStyle : {}),
          }}
          value={formData.amount}
          onChange={handleChange}
          required
        />
        {errors.amount && <p style={errorStyle}>{errors.amount}</p>}

        <label htmlFor='name' style={labelStyle}>
          Your Name:
        </label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter your name'
          style={{
            ...inputStyle,
            ...(formData.name ? inputFocusStyle : {}),
          }}
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p style={errorStyle}>{errors.name}</p>}

        <label htmlFor='email' style={labelStyle}>
          Your Email:
        </label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          style={{
            ...inputStyle,
            ...(formData.email ? inputFocusStyle : {}),
          }}
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}

        <button
          type='submit'
          style={{
            ...buttonStyle,
            ...(isHovering ? buttonHoverStyle : {}),
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default DonationPage;
