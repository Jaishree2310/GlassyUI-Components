import React from 'react';
import BackToTopButton from './BackToTop';
import { FaGithub } from 'react-icons/fa6';

const AboutUsPage: React.FC = () => (
  <div className='about-root'>
    <div className='about-orb-1' />
    <div className='about-orb-2' />
    <BackToTopButton />

    <div className='about-inner'>
      {/* Header */}
      <div className='about-header'>
        <span className='section-label'>Who we are</span>
        <h1 className='about-title'>About GlassyUI</h1>
        <p className='about-lead'>
          Your journey to beautiful, glassy UI components starts here — built by
          the community, for the community.
        </p>
      </div>

      {/* Mission */}
      <div className='about-section'>
        <div className='about-card'>
          <p className='about-section-title'>Our Mission</p>
          <p className='about-text'>
            At <strong style={{ color: '#a78bfa' }}>GlassyUI-Components</strong>
            , we are more than just a library. We are a community-driven
            organization dedicated to making a meaningful impact in the world of
            web development. Our mission is to unite creators, foster
            collaboration, and pave the way for a brighter future through
            innovation.
          </p>
        </div>
      </div>

      {/* Who We Welcome */}
      <div className='about-section'>
        <p className='about-section-title' style={{ marginBottom: 20 }}>
          Who We Welcome
        </p>
        <div className='about-who-grid'>
          <WhoCard
            icon='⚡'
            title='Developers'
            desc='Whether you are just starting out or a seasoned expert, your skills can help shape our offerings.'
          />
          <WhoCard
            icon='🎨'
            title='Designers'
            desc='Bring your unique vision and creativity to enhance our beautiful glassmorphism components.'
          />
          <WhoCard
            icon='🤝'
            title='Contributors'
            desc='If you share our passion for building stunning user experiences, we invite you to join our journey.'
          />
        </div>
      </div>

      {/* Achieving Together */}
      <div className='about-section'>
        <div className='about-card'>
          <p className='about-section-title'>Achieving Together</p>
          <p className='about-text'>
            Together, we can achieve incredible things. Let&apos;s collaborate,
            innovate, and transform ideas into reality. Join us in crafting a
            more beautiful and functional web for everyone.
          </p>
        </div>
      </div>

      {/* Open Source Programs */}
      <div className='about-section'>
        <p className='about-section-title' style={{ marginBottom: 20 }}>
          Officially Selected For
        </p>
        <div className='about-programs-grid'>
          <AboutProgramCard
            shortName='GSSoC'
            fullName='GirlScript Summer of Code'
            years={['2025', '2026']}
            desc='Selected as an official project for both GSSoC 2025 and 2026, welcoming student contributors every summer.'
            colorA='#7B2FBE'
            colorB='#E91E8C'
          />
          <AboutProgramCard
            shortName='HTF'
            fullName='Hacktoberfest'
            years={['2025']}
            desc='An official Hacktoberfest 2025 participating repository — contribute in October and earn exclusive swag.'
            colorA='#FF6B00'
            colorB='#DC2626'
          />
        </div>
      </div>

      {/* Footer */}
      <div className='about-footer'>
        <p style={{ color: '#475569', fontSize: 14, margin: 0 }}>
          Follow us on GitHub to stay updated with the latest releases.
        </p>
        <a
          href='https://github.com/Jaishree2310/GlassyUI-Components'
          target='_blank'
          rel='noopener noreferrer'
          className='about-github-btn'
        >
          <FaGithub size={18} />
          View on GitHub
        </a>
      </div>
    </div>
  </div>
);

const WhoCard: React.FC<{ icon: string; title: string; desc: string }> = ({
  icon,
  title,
  desc,
}) => (
  <div className='about-who-card'>
    <div className='about-who-icon'>{icon}</div>
    <h3 className='about-who-title'>{title}</h3>
    <p className='about-who-desc'>{desc}</p>
  </div>
);

const AboutProgramCard: React.FC<{
  shortName: string;
  fullName: string;
  years: string[];
  desc: string;
  colorA: string;
  colorB: string;
}> = ({ shortName, fullName, years, desc, colorA, colorB }) => (
  <div className='about-program-card' style={{ borderColor: `${colorA}30` }}>
    <div
      className='about-program-glow'
      style={{
        background: `radial-gradient(ellipse at 0% 0%, ${colorA}20, transparent 70%)`,
      }}
    />
    <div className='about-program-top'>
      <span
        className='about-program-logo'
        style={{ background: `linear-gradient(135deg, ${colorA}, ${colorB})` }}
      >
        {shortName}
      </span>
      <div className='about-program-years'>
        {years.map(y => (
          <span
            key={y}
            className='about-program-year'
            style={{
              color: colorA,
              background: `${colorA}15`,
              borderColor: `${colorA}40`,
            }}
          >
            {y}
          </span>
        ))}
      </div>
    </div>
    <h3 className='about-program-name'>{fullName}</h3>
    <p className='about-program-desc'>{desc}</p>
    <span
      className='about-program-badge'
      style={{
        color: colorA,
        background: `${colorA}12`,
        borderColor: `${colorA}38`,
      }}
    >
      ✓ Officially Selected
    </span>
  </div>
);

export default AboutUsPage;
