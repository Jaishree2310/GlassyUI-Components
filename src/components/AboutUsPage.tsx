import React from 'react';
import BackToTopButton from './BackToTop';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

// Styled component for the main container of the About Us page
const AboutUsContainer = styled.div<{ darkMode: boolean }>`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background: ${({ darkMode }) =>
    darkMode ? '#1e1e1e' : 'white'}; /* Dark or light background */
  color: ${({ darkMode }) =>
    darkMode ? '#f0f0f0' : '#333'}; /* Text color based on mode */
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  position: relative;

  @media (max-width: 600px) {
    padding: 20px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ darkMode }) =>
      darkMode
        ? 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(0, 0, 0, 0.6))'
        : 'linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(255, 255, 255, 0.3))'};
    border-radius: 15px;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

// Styled component for the header section
const AboutUsHeader = styled.div<{ darkMode: boolean }>`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 3em;
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
    font-weight: 500;
    transition: transform 0.3s ease;
  }

  h1:hover {
    transform: scale(1.1);
  }

  p {
    font-size: 1.5em;
    color: ${({ darkMode }) =>
      darkMode ? '#f0f0f0' : '#333'}; /* Adjust text color */
    margin-top: 10px;
    animation: fadeIn 0.7s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Styled component for the content section
const AboutUsContent = styled.section<{ darkMode: boolean }>`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    font-size: 2em;
    color: ${({ darkMode }) =>
      darkMode ? '#48dbfb' : '#3498db'}; /* Adjust based on mode */
    margin-bottom: 10px;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  h2:hover {
    color: ${({ darkMode }) =>
      darkMode ? '#2980b9' : '#1a73e8'}; /* Adjust hover color */
  }

  p {
    font-size: 1.2em;
    color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
    line-height: 1.8;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#444' : '#eaeaea')}; /* Border based on mode */
    border-radius: 10px;
    background-color: ${({ darkMode }) =>
      darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  p:hover {
    transform: translateY(-5px);
    box-shadow: ${({ darkMode }) =>
      darkMode
        ? '0 4px 20px rgba(0, 0, 0, 0.5)'
        : '0 4px 20px rgba(0, 0, 0, 0.15)'}; /* Hover shadow based on mode */
  }
`;

// Styled component for the footer section
const AboutUsFooter = styled.div<{ darkMode: boolean }>`
  text-align: center;

  p {
    font-size: 1.2em;
    color: ${({ darkMode }) =>
      darkMode ? '#f0f0f0' : '#333'}; /* Footer text color */
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

// Styled component for social links section
const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  a {
    margin: 0 10px;
    color: #3498db;
    text-decoration: none;
    transition:
      color 0.3s ease,
      transform 0.3s ease;

    &:hover {
      color: #2980b9;
      transform: scale(1.2);
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

// Main About Us page component
const AboutUsPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <div className={darkMode ? 'bg-gray-900' : 'bg-white'}>
      <div
        style={{
          background: darkMode
            ? `url('/path/to/dark_mode_background.png') no-repeat center center fixed`
            : `url('/path/to/light_mode_background.png') no-repeat center center fixed`,
          backgroundSize: 'cover',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <AboutUsContainer darkMode={darkMode}>
          <AboutUsHeader darkMode={darkMode}>
            <h1>About Us</h1>
            <p>Your journey to beautiful, glassy UI components starts here!</p>
          </AboutUsHeader>

          <AboutUsContent darkMode={darkMode}>
            <div>
              <h2>Our Mission</h2>
              <p>
                At GlassyUI-Components, we are more than just a library. We are
                a community-driven organization dedicated to making a meaningful
                impact in the world of web development. Our mission is clear: to
                unite creators, foster collaboration, and pave the way for a
                brighter future through innovation.
              </p>
            </div>

            <div>
              <h2>Who We Welcome:</h2>
              <p>
                Developers: Whether you're just starting out or a seasoned
                expert, your skills can help shape our offerings.
              </p>
              <p>
                Designers: Bring your unique vision and creativity to enhance
                our beautiful glassmorphism components.
              </p>
              <p>
                Contributors: If you share our passion for building stunning
                user experiences, we invite you to join our journey.
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

          <AboutUsFooter darkMode={darkMode}>
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
                <FaGithub />
              </a>
            </SocialLinks>
          </AboutUsFooter>
        </AboutUsContainer>
        <BackToTopButton />
      </div>
    </div>
  );
};

export default AboutUsPage;
