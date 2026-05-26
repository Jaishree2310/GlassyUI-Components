import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  Code,
  Package,
  Zap,
  ArrowRight,
  Users,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './GlassyUILandingPage.css';
import gsap from 'gsap';
import { useGitHubStars } from '../hooks/useGitHubStars';

const GlassyUILandingPage: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLDivElement>(null);
  const githubRepoUrl = 'https://github.com/Jaishree2310/GlassyUI-Components';
  const stars = useGitHubStars();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      '.hero-badge',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    )
      .fromTo(
        '.hero-title .title-line',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12 },
        '-=0.4',
      )
      .fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4',
      )
      .fromTo(
        '.hero-cta-group .hero-cta',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=0.3',
      )
      .fromTo(
        '.stat-card',
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.4)',
          stagger: 0.08,
        },
        '-=0.2',
      )
      .fromTo(
        '.hero-preview',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.8',
      )
      .fromTo(
        '.feature-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
        },
        '-=0.3',
      );
    return () => {
      tl.kill();
    };
  }, []);

  const orbX1 = (mousePos.x - 0.5) * 40;
  const orbY1 = (mousePos.y - 0.5) * 40;
  const orbX2 = (mousePos.x - 0.5) * -30;
  const orbY2 = (mousePos.y - 0.5) * -30;
  const orbX3 = (mousePos.x - 0.5) * 25;
  const orbY3 = (mousePos.y - 0.5) * -20;

  return (
    <div className='min-h-screen flex flex-col items-center justify-center pt-24 font-mono relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black'>
    <div className='landing-root'>
      {/* Animated background orbs */}
      <div
        className='bg-orb bg-orb-1'
        style={{ transform: `translate(${orbX1}px, ${orbY1}px)` }}
      />
      <div
        className='bg-orb bg-orb-2'
        style={{ transform: `translate(${orbX2}px, ${orbY2}px)` }}
      />
      <div
        className='bg-orb bg-orb-3'
        style={{ transform: `translate(${orbX3}px, ${orbY3}px)` }}
      />
      <div
        className='bg-orb bg-orb-4'
        style={{
          transform: `translate(${-orbX1 * 0.6}px, ${orbY2 * 0.4}px)`,
        }}
      />

      <div className='homeGSap relative z-10 w-full max-w-4xl'>
        <main
          className={` text-center p-12 rounded-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 shadow-lg border border-white border-opacity-20 relative`}
          style={{ marginTop: '20px' }} // Added marginTop for spacing
          data-aos='flip-up'
          data-aos-duration='2500'
        >
          <h1 className='text-7xl font-bold mb-4 text-white'>
            <span className='animated-glossy-text'>Glassy UI</span>
      {/* Grid overlay */}
      <div className='grid-overlay' />

      {/* Hero Section */}
      <section className='hero-section' ref={heroRef}>
        <div className='hero-content'>
          {/* Badge */}
          <div className='hero-badge'>
            <span className='badge-dot' />
            <span>Open Source</span>
            <a
              href={githubRepoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='badge-link'
            >
              View on GitHub ↗
            </a>
          </div>

          {/* Title */}
          <h1 className='hero-title'>
            <span className='title-line'>Build Beautiful</span>
            <span className='title-line title-gradient'>Glassmorphic</span>
            <span className='title-line'>UI Experiences</span>
          </h1>

          {/* Subtitle */}
          <p className='hero-subtitle'>
            A premium collection of glassmorphism UI components for modern web
            apps. Stunning glass effects, buttery animations, and pixel-perfect
            design — all open source.
          </p>

          {/* CTA Buttons */}
          <div className='hero-cta-group'>
            <Link to='/components' className='hero-cta cta-primary'>
              <span>Explore Components</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href={githubRepoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='hero-cta cta-secondary'
            >
              <GithubIcon />
              <span>Star on GitHub</span>
              <span className='cta-stars'>★ {stars}</span>
            </a>
          </div>

          {/* Stats Row */}
          <div className='stats-row'>
            <StatCard
              value='50+'
              label='Components'
              icon={<Layers size={18} />}
            />
            <StatCard
              value={stars}
              label='GitHub Stars'
              icon={<Star size={18} />}
            />
            <StatCard
              value='100+'
              label='Contributors'
              icon={<Users size={18} />}
            />
            <StatCard
              value='Free'
              label='Open Source'
              icon={<Sparkles size={18} />}
            />
          </div>
        </div>

        {/* Floating preview card */}
        <div className='hero-preview'>
          <PreviewCard />
          <div className='preview-glow' />
        </div>
      </section>

      {/* Open Source Programs */}
      <ProgramsSection />

      {/* Feature Cards */}
      <section className='features-section'>
        <div className='features-header'>
          <span className='section-label'>Why GlassyUI?</span>
          <h2 className='section-title'>
            Everything you need to craft stunning interfaces
          </h2>
          <p className='section-subtitle'>
            Built for developers who care about design. Every component is
            crafted with obsessive attention to detail.
          </p>
        </div>
        <div className='features-grid'>
          <FeatureCard
            icon={<Code size={26} />}
            title='Developer First'
            description='Clean TypeScript API, zero config, and comprehensive docs. Drop in and start building immediately.'
            accentColor='#6366f1'
            gradientFrom='#6366f1'
            gradientTo='#06b6d4'
          />
          <FeatureCard
            icon={<Package size={26} />}
            title='Fully Customizable'
            description='Every property is exposed — blur intensity, opacity, border, glow, and shadow. Make it yours.'
            accentColor='#a855f7'
            gradientFrom='#a855f7'
            gradientTo='#ec4899'
          />
          <FeatureCard
            icon={<Zap size={26} />}
            title='Blazing Fast'
            description='Hardware-accelerated CSS animations with zero JavaScript overhead. 60fps on every device.'
            accentColor='#f59e0b'
            gradientFrom='#f59e0b'
            gradientTo='#ef4444'
          />
          <FeatureCard
            icon={<Sparkles size={26} />}
            title='True Glass Effects'
            description='Real depth, light refraction, and layered translucency — not just white opacity hacks.'
            accentColor='#10b981'
            gradientFrom='#10b981'
            gradientTo='#06b6d4'
          />
        </div>
      </section>

      {/* Marquee strip */}
      <div className='marquee-section'>
        <div className='marquee-track'>
          {[
            'Buttons',
            'Cards',
            'Modals',
            'Inputs',
            'Sliders',
            'Tooltips',
            'Dropdowns',
            'Accordions',
            'Spinners',
            'Toasts',
            'Pagination',
            'Calendars',
            'Badges',
            'Gallery',
          ]
            .concat([
              'Buttons',
              'Cards',
              'Modals',
              'Inputs',
              'Sliders',
              'Tooltips',
              'Dropdowns',
              'Accordions',
              'Spinners',
              'Toasts',
              'Pagination',
              'Calendars',
              'Badges',
              'Gallery',
            ])
            .map((name, i) => (
              <span key={i} className='marquee-item'>
                <span className='marquee-dot'>◆</span> {name}
              </span>
            ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className='cta-section'>
        <div className='cta-card'>
          <div className='cta-orb cta-orb-left' />
          <div className='cta-orb cta-orb-right' />
          <div className='cta-inner'>
            <span className='section-label'>Get Started Today</span>
            <h2 className='cta-title'>
              Ready to build something
              <br />
              <span className='title-gradient'>extraordinary?</span>
            </h2>
            <p className='cta-subtitle'>
              Join hundreds of developers building next-level glass UIs.
              <br />
              Free forever. No account needed.
            </p>
            <div className='cta-buttons'>
              <Link to='/components' className='hero-cta cta-primary'>
                Browse Components <ArrowRight size={18} />
              </Link>
              <Link to='/contributors' className='hero-cta cta-outline'>
                Meet Our Contributors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── Programs Section ───────────────────────────────────── */

const ProgramsSection: React.FC = () => (
  <section className='programs-section'>
    <div className='programs-inner'>
      <div className='programs-header'>
        <span className='section-label'>Official Selection</span>
        <h2 className='programs-title'>Featured in Open Source Programs</h2>
        <p className='programs-subtitle'>
          GlassyUI has been officially selected for these prestigious open
          source initiatives — welcoming contributors from around the world.
        </p>
      </div>

      <div className='programs-grid'>
        <ProgramCard
          logo='GSSoC'
          name='GirlScript Summer of Code'
          year='2025'
          description='Selected as an official project for GSSoC 2025 — mentored open source contributions over the summer.'
          accentFrom='#7B2FBE'
          accentTo='#E91E8C'
          tag='Summer 2025'
          icon={
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              width='20'
              height='20'
            >
              <circle cx='12' cy='12' r='10' />
              <path d='M12 6v6l4 2' />
            </svg>
          }
        />
        <ProgramCard
          logo='GSSoC'
          name='GirlScript Summer of Code'
          year='2026'
          description='Continuing as an official GSSoC 2026 project — open for contributions from developers worldwide.'
          accentFrom='#7B2FBE'
          accentTo='#a855f7'
          tag='Summer 2026'
          icon={
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              width='20'
              height='20'
            >
              <circle cx='12' cy='12' r='10' />
              <path d='M12 6v6l4 2' />
            </svg>
          }
        />
        <ProgramCard
          logo='HTF'
          name='Hacktoberfest'
          year='2025'
          description='An official Hacktoberfest 2025 participating repository — earn your T-shirt by contributing in October.'
          accentFrom='#FF6B00'
          accentTo='#DC2626'
          tag='October 2025'
          icon={
            <svg viewBox='0 0 24 24' fill='currentColor' width='20' height='20'>
              <path d='M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z' />
            </svg>
          }
        />
      </div>

      <div className='programs-cta-row'>
        <a
          href='https://github.com/Jaishree2310/GlassyUI-Components/issues'
          target='_blank'
          rel='noopener noreferrer'
          className='programs-cta-link'
        >
          View open issues and start contributing →
        </a>
      </div>
    </div>
  </section>
);

const ProgramCard: React.FC<{
  logo: string;
  name: string;
  year: string;
  description: string;
  accentFrom: string;
  accentTo: string;
  tag: string;
  icon: React.ReactNode;
}> = ({ logo, name, year, description, accentFrom, accentTo, tag, icon }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className='program-card'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={
        hovered
          ? {
              borderColor: `${accentFrom}55`,
              boxShadow: `0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px ${accentFrom}33`,
              transform: 'translateY(-8px)',
            }
          : undefined
      }
    >
      {/* Top glow */}
      <div
        className='program-card-glow'
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${accentFrom}25, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Logo pill */}
      <div className='program-logo-row'>
        <div
          className='program-logo-badge'
          style={{
            background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
          }}
        >
          {icon}
          <span className='program-logo-text'>{logo}</span>
        </div>
        <span
          className='program-year-tag'
          style={{
            color: accentFrom,
            borderColor: `${accentFrom}44`,
            background: `${accentFrom}12`,
          }}
        >
          {tag}
        </span>
      </div>

      <h3 className='program-name'>
        {name} <span className='program-year-inline'>{year}</span>
      </h3>
      <p className='program-desc'>{description}</p>

      {/* Selected badge */}
      <div className='program-selected-row'>
        <span
          className='program-selected-badge'
          style={{
            color: accentFrom,
            background: `${accentFrom}15`,
            borderColor: `${accentFrom}40`,
          }}
        >
          <svg viewBox='0 0 20 20' fill='currentColor' width='12' height='12'>
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
          Officially Selected
        </span>
      </div>
    </div>
  );
};

/* ─── Sub-components ─────────────────────────────────────── */

const GithubIcon: React.FC = () => (
  <svg viewBox='0 0 24 24' fill='currentColor' width='17' height='17'>
    <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
  </svg>
);

const StatCard: React.FC<{
  value: string;
  label: string;
  icon: React.ReactNode;
}> = ({ value, label, icon }) => (
  <div className='stat-card'>
    <div className='stat-icon'>{icon}</div>
    <div className='stat-value'>{value}</div>
    <div className='stat-label'>{label}</div>
  </div>
);

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
}> = ({ icon, title, description, accentColor, gradientFrom, gradientTo }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className='feature-card'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={
        {
          '--accent': accentColor,
          '--grad-from': gradientFrom,
          '--grad-to': gradientTo,
          boxShadow: hovered
            ? `0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px ${accentColor}33`
            : undefined,
        } as React.CSSProperties
      }
    >
      <div
        className='feature-icon-bg'
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        {icon}
      </div>
      <h3 className='feature-title'>{title}</h3>
      <p className='feature-desc'>{description}</p>
      <div
        className='feature-glow'
        style={{
          background: `radial-gradient(circle at 30% 30%, ${accentColor}20, transparent 70%)`,
        }}
      />
      <div className='feature-shimmer' />
    </div>
  );
};

const PreviewCard: React.FC = () => (
  <div className='preview-card'>
    <div className='preview-header'>
      <div className='preview-dots'>
        <span className='dot dot-red' />
        <span className='dot dot-yellow' />
        <span className='dot dot-green' />
      </div>
      <span className='preview-filename'>glass-components.tsx</span>
    </div>
    <div className='preview-body'>
      {/* Mini glass card */}
      <div className='mini-glass-card'>
        <div className='mini-card-shine' />
        <div className='mini-avatar'>
          <span>GU</span>
        </div>
        <div className='mini-card-info'>
          <div className='mini-line line-lg' />
          <div className='mini-line line-sm' />
        </div>
        <div className='mini-tag'>Glass ✦</div>
      </div>

      {/* Mini buttons */}
      <div className='mini-btn-row'>
        <div className='mini-btn-primary'>
          <span>Primary</span>
          <ArrowRight size={10} />
        </div>
        <div className='mini-btn-ghost'>Ghost</div>
        <div className='mini-btn-outline'>Outline</div>
      </div>

      {/* Mini input */}
      <div className='mini-input'>
        <div className='mini-input-icon'>⌕</div>
        <div className='mini-input-placeholder'>Search components…</div>
      </div>

      {/* Mini progress */}
      <div className='mini-progress-wrap'>
        <div className='mini-progress-label'>
          <span>Loading</span>
          <span>73%</span>
        </div>
        <div className='mini-progress-bar'>
          <div className='mini-progress-fill' />
        </div>
      </div>
    </div>
  </div>
);

export default GlassyUILandingPage;
