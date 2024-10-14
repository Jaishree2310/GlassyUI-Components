import React, { useEffect } from 'react';

const AboutUsPage: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#3f434a';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div style={pageContainerStyle}>
      <div style={aboutContainerStyle}>
        <h1 style={headingStyle}>About Us</h1>
        <p style={paragraphStyle}>
          At <strong>GlassyUI-Components</strong>, we are more than just a
          library. we are a community-driven organization dedicated to making a
          meaningful impact in the world of web development. Our mission is
          clear, to unite creators, foster collaboration, and pave the way for a
          brighter future through innovation.
        </p>
        <h2 style={subheadingStyle}>Who We Welcome:</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Developers</strong>: Whether you're just starting out or a
            seasoned expert, your skills can help shape our offerings.
          </li>
          <li style={listItemStyle}>
            <strong>Designers</strong>: Bring your unique vision and creativity
            to enhance our beautiful glassmorphism components.
          </li>
          <li style={listItemStyle}>
            <strong>Contributors</strong>: If you share our passion for building
            stunning user experiences, we invite you to join our journey.
          </li>
        </ul>
        <p style={paragraphStyle}>
          Together, we can achieve incredible things! Let's collaborate,
          innovate, and transform ideas into reality. Join us in crafting a more
          beautiful and functional web for everyone.
        </p>
      </div>
    </div>
  );
};

// Inline styles
const pageContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const aboutContainerStyle: React.CSSProperties = {
  backgroundColor: '#2b303c',
  color: 'white',
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '800px',
  textAlign: 'center',
};

const headingStyle: React.CSSProperties = {
  color: '#fde047',
  fontSize: '36px',
  marginBottom: '20px',
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '18px',
  lineHeight: '1.6',
  marginBottom: '20px',
};

const subheadingStyle: React.CSSProperties = {
  color: '#fde047',
  fontSize: '28px',
  marginTop: '40px',
  marginBottom: '10px',
};

const listStyle: React.CSSProperties = {
  listStyleType: 'none',
  padding: 0,
  margin: '20px 0',
};

const listItemStyle: React.CSSProperties = {
  marginBottom: '10px',
  fontSize: '18px',
  lineHeight: '1.5',
  color: 'white',
};

export default AboutUsPage;
