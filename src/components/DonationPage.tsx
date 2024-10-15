import React, { useState, useEffect } from 'react';
import { z } from 'zod';

const DonationPage: React.FC = () => {
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
    document.body.style.backgroundColor = '#3f434a';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Enhanced CSS styles
  const containerStyle: React.CSSProperties = {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: "'Roboto', sans-serif",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '1rem',
    marginBottom: '30px',
    color: '#555',
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const labelStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'left',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#444',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    marginBottom: '20px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    transition: 'border-color 0.3s ease',
  };

  const inputFocusStyle: React.CSSProperties = {
    borderColor: '#4CAF50',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 20px',
    backgroundColor: isHovering ? '#45a049' : '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const buttonHoverStyle: React.CSSProperties = {
    transform: 'scale(1.05)',
  };

  const errorStyle: React.CSSProperties = {
    color: 'red',
    fontSize: '0.875rem',
    marginBottom: '10px',
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
      <h1 style={headingStyle}>Liked our glassmorphic components!</h1>
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
