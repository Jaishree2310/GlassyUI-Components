import React, { useState } from 'react';
import BackToTopButton from './BackToTop';

const sections = [
  {
    number: '01',
    title: 'Acceptance of Terms',
    icon: '📋',
    content:
      'By accessing or using GlassyUI-Components, you agree to abide by these Terms of Use. If you disagree with any part of these terms, please refrain from using this library. Continued use of the library after any modifications to these terms constitutes your acceptance of the updated Terms.',
  },
  {
    number: '02',
    title: 'User Obligations',
    icon: '🤝',
    content:
      'Users must use the components responsibly, providing proper attribution as required by the applicable open-source license. Redistribution of unmodified versions without attribution is prohibited. You agree not to use GlassyUI-Components in any way that violates applicable laws or regulations.',
  },
  {
    number: '03',
    title: 'Intellectual Property Rights',
    icon: '⚡',
    content:
      'GlassyUI-Components and its designs are the intellectual property of the creators and contributors. The library is released under an open-source license, but the brand, logo, and associated assets remain the property of the project maintainers. Unauthorized commercial use of the brand is strictly prohibited.',
  },
  {
    number: '04',
    title: 'Limitation of Liability',
    icon: '🛡️',
    content:
      'We are not liable for any direct, indirect, incidental, special, or consequential damages arising from the use or misuse of GlassyUI-Components. The library is provided "as-is" without any warranty of any kind, either expressed or implied, including but not limited to merchantability or fitness for a particular purpose.',
  },
  {
    number: '05',
    title: 'Termination',
    icon: '🔒',
    content:
      'We reserve the right to terminate or restrict access to GlassyUI-Components for users who violate these Terms. Termination may occur without prior notice. Upon termination, you must cease all use of the library and destroy any copies in your possession that do not comply with the license.',
  },
  {
    number: '06',
    title: 'Modification of Terms',
    icon: '✏️',
    content:
      'We reserve the right to modify these Terms at any time at our sole discretion. Changes will be announced through our GitHub repository or other official channels. It is your responsibility to review the Terms periodically. Your continued use of the library following any changes constitutes acceptance.',
  },
  {
    number: '07',
    title: 'Privacy Policy',
    icon: '🔐',
    content:
      'We respect your privacy. Any data collected through interactions with our project — such as GitHub contributions or newsletter sign-ups — is handled according to our Privacy Policy, accessible through our main website. We do not sell or share personal data with third parties for commercial purposes.',
  },
  {
    number: '08',
    title: 'Third-Party Links',
    icon: '🔗',
    content:
      'Our library and documentation may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of these external sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.',
  },
  {
    number: '09',
    title: 'User-Generated Content',
    icon: '🎨',
    content:
      'Contributions or modifications made to GlassyUI-Components are welcome and encouraged. All contributions must align with our community guidelines and open-source policies as defined in the CONTRIBUTING.md file. By submitting a contribution, you grant the project maintainers a perpetual license to use your contribution.',
  },
  {
    number: '10',
    title: 'Governing Law',
    icon: '⚖️',
    content:
      'These Terms are governed by and construed in accordance with applicable intellectual property laws and open-source policies. Any disputes arising under these Terms shall be resolved through good-faith negotiation. If resolution cannot be reached, disputes shall be subject to binding arbitration.',
  },
];

export const TermsOfUse: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  return (
    <div className='terms-root'>
      {/* Ambient orbs — identical to About/Components pages */}
      <div className='terms-orb-1' />
      <div className='terms-orb-2' />
      <div className='terms-grid' />

      <BackToTopButton />

      <div className='terms-inner'>
        {/* ── Header ── */}
        <div className='terms-header'>
          <span className='terms-badge'>
            <span className='terms-badge-dot' />
            Legal
          </span>
          <h1 className='terms-title'>Terms of Use</h1>
          <p className='terms-lead'>
            Please read these terms carefully before using{' '}
            <strong style={{ color: '#a78bfa' }}>GlassyUI-Components</strong>.
            By accessing our library you agree to be bound by the conditions
            outlined below.
          </p>
          <p className='terms-updated'>Last updated: May 2025</p>
        </div>

        {/* ── Quick-nav pills ── */}
        <div className='terms-pills'>
          {sections.map((s, i) => (
            <button
              key={i}
              className={`terms-pill${activeSection === i ? ' terms-pill--active' : ''}`}
              onClick={() => {
                setActiveSection(i === activeSection ? null : i);
                document
                  .getElementById(`terms-section-${i}`)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              {s.number}
            </button>
          ))}
        </div>

        {/* ── Sections ── */}
        <div className='terms-sections'>
          {sections.map((section, i) => (
            <div
              key={i}
              id={`terms-section-${i}`}
              className={`terms-card${activeSection === i ? ' terms-card--active' : ''}`}
              onClick={() => setActiveSection(i === activeSection ? null : i)}
            >
              <div className='terms-card-shimmer' />
              <div className='terms-card-top'>
                <div className='terms-card-left'>
                  <span className='terms-card-icon'>{section.icon}</span>
                  <div>
                    <span className='terms-card-num'>{section.number}</span>
                    <h2 className='terms-card-title'>{section.title}</h2>
                  </div>
                </div>
                <span
                  className='terms-card-chevron'
                  style={{
                    transform:
                      activeSection === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▾
                </span>
              </div>

              <div
                className='terms-card-body'
                style={{
                  maxHeight: activeSection === i ? '200px' : '0',
                  opacity: activeSection === i ? 1 : 0,
                }}
              >
                <p className='terms-card-text'>{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div className='terms-footer-cta'>
          <p className='terms-footer-text'>Have questions about these terms?</p>
          <a
            href='https://github.com/Jaishree2310/GlassyUI-Components/issues'
            target='_blank'
            rel='noopener noreferrer'
            className='terms-footer-btn'
          >
            Open an Issue on GitHub
          </a>
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* ── ROOT ── */
        .terms-root {
          min-height: 100vh;
          background: #03010f;
          color: #f8fafc;
          position: relative;
          overflow-x: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
          padding: 130px 24px 100px;
        }

        /* ── ORBs (same as About/Components pages) ── */
        .terms-orb-1 {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%);
          filter: blur(80px);
          top: -150px;
          left: -150px;
          animation: termsOrb1 22s ease-in-out infinite;
        }
        .terms-orb-2 {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(8,145,178,0.12), transparent 70%);
          filter: blur(70px);
          bottom: 0;
          right: 0;
          animation: termsOrb2 28s ease-in-out infinite;
        }
        @keyframes termsOrb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(60px,-40px) scale(1.08); }
          66%      { transform: translate(-30px,50px) scale(0.94); }
        }
        @keyframes termsOrb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-50px,-30px) scale(1.06); }
          70%      { transform: translate(30px,40px) scale(0.96); }
        }

        /* ── GRID overlay ── */
        .terms-grid {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* ── INNER ── */
        .terms-inner {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        /* ── HEADER ── */
        .terms-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .terms-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(124,58,237,0.12);
          border: 1px solid rgba(124,58,237,0.3);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          color: #a78bfa;
          margin-bottom: 20px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .terms-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7c3aed;
          box-shadow: 0 0 8px #7c3aed;
          animation: termsPulse 2s ease-in-out infinite;
        }
        @keyframes termsPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(0.7); }
        }
        .terms-title {
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 800;
          letter-spacing: -2px;
          margin: 0 0 20px;
          background: linear-gradient(135deg, #a78bfa, #22d3ee, #f472b6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: termsGradFlow 5s linear infinite;
        }
        @keyframes termsGradFlow {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .terms-lead {
          font-size: 17px;
          color: #64748b;
          line-height: 1.75;
          max-width: 560px;
          margin: 0 auto 12px;
        }
        .terms-updated {
          font-size: 12px;
          color: #334155;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0;
        }

        /* ── QUICK-NAV PILLS ── */
        .terms-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-bottom: 40px;
        }
        .terms-pill {
          padding: 5px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.5px;
        }
        .terms-pill:hover {
          background: rgba(124,58,237,0.12);
          border-color: rgba(124,58,237,0.3);
          color: #a78bfa;
        }
        .terms-pill--active {
          background: rgba(124,58,237,0.2) !important;
          border-color: rgba(124,58,237,0.45) !important;
          color: #a78bfa !important;
        }

        /* ── SECTION CARDS ── */
        .terms-sections {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 56px;
        }
        .terms-card {
          position: relative;
          padding: 24px 28px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .terms-card:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(124,58,237,0.2);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }
        .terms-card--active {
          background: rgba(255,255,255,0.055) !important;
          border-color: rgba(124,58,237,0.35) !important;
          box-shadow: 0 0 0 1px rgba(124,58,237,0.15), 0 16px 40px rgba(0,0,0,0.35) !important;
        }

        /* shimmer sweep */
        .terms-card-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .terms-card:hover .terms-card-shimmer { left: 150%; }

        .terms-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .terms-card-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .terms-card-icon {
          font-size: 22px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(124,58,237,0.12);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 12px;
          flex-shrink: 0;
        }
        .terms-card-num {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #a78bfa;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }
        .terms-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
          line-height: 1.2;
        }
        .terms-card-chevron {
          font-size: 20px;
          color: #475569;
          transition: transform 0.3s ease, color 0.2s ease;
          flex-shrink: 0;
          line-height: 1;
        }
        .terms-card--active .terms-card-chevron { color: #a78bfa; }

        /* collapsible body */
        .terms-card-body {
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s ease;
        }
        .terms-card-text {
          font-size: 14.5px;
          line-height: 1.75;
          color: #94a3b8;
          margin: 18px 0 0 60px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        /* ── FOOTER CTA ── */
        .terms-footer-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 40px 32px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          text-align: center;
        }
        .terms-footer-text {
          font-size: 15px;
          color: #64748b;
          margin: 0;
        }
        .terms-footer-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #7c3aed, #0891b2);
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          color: white;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 24px rgba(124,58,237,0.3);
        }
        .terms-footer-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(124,58,237,0.5);
          opacity: 0.92;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 640px) {
          .terms-root { padding: 110px 16px 80px; }
          .terms-card { padding: 18px 20px; }
          .terms-card-text { margin-left: 0; }
          .terms-card-icon { display: none; }
        }
      `}</style>
    </div>
  );
};
