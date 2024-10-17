import React, { useEffect } from 'react';
import BackToTopButton from './BackToTop';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

// Styled component for the main container of the About Us page
const AboutUsContainer = styled.div`
  max-width: 900px; // Maximum width of the container
  margin: 0 auto; // Center the container horizontally
  padding: 40px 20px; // Padding around the container
  background: black; // Black background for the container
  border-radius: 15px; // Rounded corners
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2); // Shadow for depth
  position: relative; // For pseudo-element positioning

  @media (max-width: 600px) {
    padding: 20px; // Adjust padding for smaller screens
  }

  // Background gradient for added visual appeal
  &:before {
    content: ''; // Empty content for pseudo-element
    position: absolute; // Position it absolutely within the container
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; // Cover entire area
    background: linear-gradient(
      135deg,
      rgba(52, 152, 219, 0.2),
      rgba(0, 0, 0, 0.3)
    ); // Gradient background
    border-radius: 15px; // Match the container's corners
    z-index: 0; // Place it behind other content
  }

  & > * {
    position: relative; // Ensure child elements stack above the background
    z-index: 1; // Bring child elements above the background
  }
`;

// Styled component for the header section
const AboutUsHeader = styled.div`
  text-align: center; // Center align the text
  margin-bottom: 30px; // Space below the header

  h1 {
    font-size: 3em; // Larger font size for the main heading
    background: linear-gradient(
      270deg,
      #ff6b6b,
      #feca57,
      #48dbfb,
      #ff9ff3,
      #54a0ff
    );
    background-size: 300% 300%;
    animation: glossy-animation 10s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    display: inline-block;
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
    padding-bottom: 10px;
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3); // Text shadow for depth
    padding-bottom: 10px; // Space below the heading
    font-weight: 500; // Make the heading bold
    animation: fadeIn 0.5s; // Fade-in animation
    transition: transform 0.3s ease; // Smooth transition for hover effect
  }

  h1:hover {
    transform: scale(1.1); // Scale up the heading on hover
  }

  p {
    font-size: 1.5em; // Larger font size for the subtitle
    color: white; // White color for the text
    margin-top: 10px; // Space above the paragraph

    animation: fadeIn 0.7s; // Fade-in animation for the paragraph
  }

  // Fade-in keyframe animation
  @keyframes fadeIn {
    from {
      opacity: 0; // Start fully transparent
    }
    to {
      opacity: 1; // End fully opaque
    }
  }
`;

// Styled component for the content section
const AboutUsContent = styled.section`
  margin-bottom: 30px; // Space below the content section
  display: flex; // Flexbox for vertical layout
  flex-direction: column; // Arrange children in a column
  gap: 20px; // Space between sections

  h2 {
    font-size: 2em; // Increase font size for subheadings
    color: #3498db; // Change subheading color to blue
    margin-bottom: 10px; // Space below the subheading
    font-weight: 600; // Make subheadings bold
    transition: color 0.3s ease; // Transition for hover effect
  }

  h2:hover {
    color: #2980b9; // Change color on hover
  }

  p {
    font-size: 1.2em; // Larger font size for paragraph text
    color: #f9f9f9; // Light gray color for text
    line-height: 1.8; // Increase line height for better readability
    margin-bottom: 20px; // Space below the paragraph
    padding: 10px; // Padding within the paragraph
    border: 1px solid #eaeaea; // Light gray border around the paragraph
    border-radius: 10px; // Rounded corners for the paragraph
    background-color: rgba(
      0,
      0,
      0,
      0.1
    ); // Light transparent black background for the paragraph
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease; // Animation for hover effect
  }

  p:hover {
    transform: translateY(-5px); // Move up on hover
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); // Shadow effect on hover
  }
`;

// Styled component for the footer section
const AboutUsFooter = styled.div`
  text-align: center; // Center align footer text

  p {
    font-size: 1.2em; // Slightly larger font size for footer paragraph
    color: white; // Light gray color for text
    font-weight: 600; // Bold footer text
    margin-bottom: 10px; // Space below the paragraph
  }
`;

// Styled component for social links section
const SocialLinks = styled.div`
  display: flex; // Flexbox for horizontal layout
  justify-content: center; // Center align social links
  margin-top: 10px; // Space above social link

  a {
    margin: 0 10px; // Horizontal space between links
    color: #3498db; // Blue color for links
    text-decoration: none; // Remove underline
    transition:
      color 0.3s ease,
      transform 0.3s ease; // Transition for hover effect

    &:hover {
      color: #2980b9; // Darker blue on hover
      transform: scale(1.2); // Scale up on hover
    }

    svg {
      width: 24px; // Set width for icons
      height: 24px; // Set height for icons
    }
  }
`;

// Main About Us page component
const AboutUsPage: React.FC = () => {
  return (
    <div
      style={{
        background: `url('/path/to/A_detailed_dark_blue_grid_background_with_square_b.png') no-repeat center center fixed`, // Set the background image
        backgroundSize: 'cover', // Ensure the background image covers the entire screen
        minHeight: '100vh', // Set the minimum height of the page to the full viewport height
        padding: '20px',
      }}
    >
      <AboutUsContainer>
        <AboutUsHeader>
          <h1>About Us</h1>
          <p>Your journey to beautiful, glassy UI components starts here!</p>
        </AboutUsHeader>

        <AboutUsContent>
          <div>
            <h2>Our Mission</h2>
            <p>
              At GlassyUI-Components, we are more than just a library. We are a
              community-driven organization dedicated to making a meaningful
              impact in the world of web development. Our mission is clear: to
              unite creators, foster collaboration, and pave the way for a
              brighter future through innovation.
            </p>
          </div>

          <div>
            <h2>Who We Welcome:</h2>
            <p>
              Developers: Whether you're just starting out or a seasoned expert,
              your skills can help shape our offerings.
            </p>
            <p>
              Designers: Bring your unique vision and creativity to enhance our
              beautiful glassmorphism components.
            </p>
            <p>
              Contributors: If you share our passion for building stunning user
              experiences, we invite you to join our journey.
            </p>
          </div>

          <div>
            <h2>Together, we can achieve incredible things!</h2>
            <p>
              Let's collaborate, innovate, and transform ideas into reality.
              Join us in crafting a more beautiful and functional web for
              everyone.
            </p>
          </div>
        </AboutUsContent>

        <AboutUsFooter>
          <p>
            Follow us on social media to stay updated with the latest releases
            and updates!
          </p>
          <SocialLinks>
            <a
              href='https://github.com/Jaishree2310/GlassyUI-Components'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaGithub /> {/* GitHub icon */}
            </a>
          </SocialLinks>
        </AboutUsFooter>
      </AboutUsContainer>
    </div>
  );
  return (
    <div className='min-h-screen font-sans bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white'>
      <BackToTopButton />
      <div style={pageContainerStyle}>
        <div style={aboutContainerStyle}>
          <h1 style={headingStyle}>About Us</h1>
          <p style={paragraphStyle}>
            At <strong>GlassyUI-Components</strong>, we are more than just a
            library. We are a community-driven organization dedicated to making
            a meaningful impact in the world of web development. Our mission is
            clear, to unite creators, foster collaboration, and pave the way for
            a brighter future through innovation.
          </p>
          <h2 style={subheadingStyle}>Who We Welcome:</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <strong>Developers</strong>: Whether you're just starting out or a
              seasoned expert, your skills can help shape our offerings.
            </li>
            <li style={listItemStyle}>
              <strong>Designers</strong>: Bring your unique vision and
              creativity to enhance our beautiful glassmorphism components.
            </li>
            <li style={listItemStyle}>
              <strong>Contributors</strong>: If you share our passion for
              building stunning user experiences, we invite you to join our
              journey.
            </li>
          </ul>
          <p style={paragraphStyle}>
            Together, we can achieve incredible things! Let's collaborate,
            innovate, and transform ideas into reality. Join us in crafting a
            more beautiful and functional web for everyone.
          </p>
        </div>
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

export default AboutUsPage; // Exporting the component
