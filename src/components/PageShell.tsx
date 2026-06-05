import React from 'react';
import BackToTopButton from './BackToTop';
import './PageShell.css';

interface PageShellProps {
  children: React.ReactNode;
}

const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className='page-shell'>
      {/* Animated background orbs — matches landing page */}
      <div className='ps-orb ps-orb-1' />
      <div className='ps-orb ps-orb-2' />
      <div className='ps-orb ps-orb-3' />
      <div className='ps-orb ps-orb-4' />

      {/* Subtle grid overlay */}
      <div className='ps-grid' />

      <BackToTopButton />

      {/* Page content sits above all bg layers */}
      <div className='ps-content'>{children}</div>
    </div>
  );
};

export default PageShell;
