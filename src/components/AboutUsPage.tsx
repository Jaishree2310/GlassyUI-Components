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
          library. We are a community-driven organization dedicated to making a
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

const pageContainerStyle: React.CSSProperties = {
  marginTop: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#3f434a',
  padding: '0 20px',
};

const aboutContainerStyle: React.CSSProperties = {
  backgroundColor: 'rgba(43, 48, 60, 0.85)',
  color: 'white',
  padding: '40px',
  borderRadius: '20px',
  maxWidth: '800px',
  textAlign: 'center',
  boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.3s ease',
};

const headingStyle: React.CSSProperties = {
  color: '#fde047',
  fontSize: '40px',
  marginBottom: '20px',
  fontWeight: '700',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '18px',
  lineHeight: '1.8',
  marginBottom: '20px',
  fontWeight: '300',
  letterSpacing: '0.5px',
  color: '#f0f0f0',
};

const subheadingStyle: React.CSSProperties = {
  color: '#fde047',
  fontSize: '30px',
  marginTop: '40px',
  marginBottom: '20px',
  fontWeight: '600',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
};

const listStyle: React.CSSProperties = {
  listStyleType: 'none',
  padding: 0,
  margin: '20px 0',
  textAlign: 'left',
};

const listItemStyle: React.CSSProperties = {
  marginBottom: '15px',
  fontSize: '18px',
  lineHeight: '1.8',
  paddingLeft: '20px',
  position: 'relative',
  fontWeight: '400',
  color: '#e1e1e1',
  transition: 'color 0.2s ease',
};

const listItemStyleHover: React.CSSProperties = {
  color: '#fde047',
};

export default AboutUsPage;
