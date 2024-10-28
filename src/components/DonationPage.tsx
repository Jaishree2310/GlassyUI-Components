import React, { useState, useEffect } from 'react';

const DonationPage: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Set viewport background color when component mounts
  useEffect(() => {
    document.body.style.backgroundColor = '#3f434a';

    // Clean up to reset background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = ''; // Reset to default or previous color
    };
  }, []);

  // Inline styles
  const containerStyle: React.CSSProperties = {
    maxWidth: '500px',

    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',

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
    color: '#e0e0e0',

  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const inputStyle: React.CSSProperties = {
    marginBottom: '20px',

    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px',
    backgroundColor: isHovering ? '#45a049' : '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',

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

  // Mouse hover handlers
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div style={containerStyle}>

      <h1>Liked our glassmorphic components!</h1>
      <p>Your contributions help us continue our work.</p>
      <form style={formStyle}>

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
          style={inputStyle}
          required
        />

        <label htmlFor='name' style={labelStyle}>
          Your Name:
        </label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter your name'
          style={inputStyle}
          required
        />

        <label htmlFor='email' style={labelStyle}>
          Your Email:
        </label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          style={inputStyle}
          required
        />

        <button
          type='submit'
          style={buttonStyle}
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
