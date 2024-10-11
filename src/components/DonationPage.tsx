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
