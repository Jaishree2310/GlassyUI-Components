import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='notfound-root'>
      <div className='notfound-orb-1' />
      <div className='notfound-orb-2' />

      <div className='notfound-card'>
        <div className='notfound-code'>404</div>
        <h1 className='notfound-title'>Page not found</h1>
        <p className='notfound-desc'>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved, deleted, or never existed.
        </p>
        <button aria-label="button" className='notfound-btn' onClick={() => navigate('/')}>
          Back to Home <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
