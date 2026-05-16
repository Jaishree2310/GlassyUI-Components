import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Footer from './Footer';
import BackToTopButton from './BackToTop';

import {
  TextSkeleton,
  AvatarSkeleton,
  ImageSkeleton,
  CardSkeleton,
} from './SkeletonLoader';

const getGlassyClasses = (): string =>
  'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

const codeBlockClasses =
  'bg-slate-900 text-white p-6 rounded-xl overflow-x-auto text-sm whitespace-pre-wrap';

const SkeletonPage: React.FC = () => {
  const navigate = useNavigate();

  const textSkeletonCode = `
import React from 'react';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
}

const getGlassyClasses = (): string =>
  'backdrop-filter backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

export const TextSkeleton: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = '20px',
  className = '',
}) => {
  return (
    <div
      className={\`\${getGlassyClasses()} animate-pulse \${className}\`}
      style={{ width, height }}
    />
  );
};
`;

  const avatarSkeletonCode = `
import React from 'react';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
}

const getGlassyClasses = (): string =>
  'backdrop-filter backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-lg transition-all duration-300';

export const AvatarSkeleton: React.FC<SkeletonLoaderProps> = ({
  width = '90px',
  height = '90px',
  className = '',
}) => {
  return (
    <div
      className={\`\${getGlassyClasses()} animate-pulse \${className}\`}
      style={{ width, height }}
    />
  );
};
`;

  const imageSkeletonCode = `
import React from 'react';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
}

const getGlassyClasses = (): string =>
  'backdrop-filter backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

export const ImageSkeleton: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = '300px',
  className = '',
}) => {
  return (
    <div
      className={\`\${getGlassyClasses()} animate-pulse \${className}\`}
      style={{ width, height }}
    />
  );
};
`;

  const cardSkeletonCode = `
import React from 'react';

interface SkeletonLoaderProps {
  width?: string;
  className?: string;
}

const getGlassyClasses = (): string =>
  'backdrop-filter backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

export const CardSkeleton: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  className = '',
}) => {
  return (
    <div
      className={\`\${getGlassyClasses()} animate-pulse p-4 flex flex-col gap-4 \${className}\`}
      style={{ width }}
    >
      <div className='w-full h-52 bg-white/10 rounded-xl' />

      <div className='space-y-3'>
        <div className='h-4 w-3/4 bg-white/10 rounded-lg' />
        <div className='h-4 w-1/2 bg-white/10 rounded-lg' />
      </div>

      <div className='w-32 h-12 bg-white/10 rounded-xl' />
    </div>
  );
};
`;

  const animationCode = `
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.6;
  }
}
`;

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />

      <div className='relative z-10 p-8'>
        <button
          onClick={() => navigate(-1)}
          className={`${getGlassyClasses()} mb-8 flex items-center px-4 py-2 hover:bg-white/40 transition-all duration-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-5xl font-bold mb-6'>
          Glassmorphic Skeleton Loader
        </h1>

        <p className='text-lg text-gray-200 mb-10'>
          A reusable glassmorphism-inspired Skeleton Loader collection for
          elegant loading states and modern UI experiences.
        </p>

        <div className={`${getGlassyClasses()} p-8 mb-12`}>
          <h2 className='text-3xl font-bold mb-10'>Text Skeleton Preview</h2>

          <div className='space-y-6'>
            <TextSkeleton width='100%' height='22px' />
            <TextSkeleton width='80%' height='22px' />
            <TextSkeleton width='60%' height='22px' />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-12`}>
          <h2 className='text-3xl font-bold mb-8'>Text Skeleton Code</h2>

          <pre className={codeBlockClasses}>{textSkeletonCode}</pre>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-12`}>
          <h2 className='text-3xl font-bold mb-10'>Avatar Skeleton Preview</h2>

          <AvatarSkeleton width='100px' height='100px' />
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-12`}>
          <h2 className='text-3xl font-bold mb-8'>Avatar Skeleton Code</h2>

          <pre className={codeBlockClasses}>{avatarSkeletonCode}</pre>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-12`}>
          <h2 className='text-3xl font-bold mb-10'>Image Skeleton Preview</h2>

          <ImageSkeleton width='100%' height='320px' />
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-12`}>
          <h2 className='text-3xl font-bold mb-8'>Image Skeleton Code</h2>

          <pre className={codeBlockClasses}>{imageSkeletonCode}</pre>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-12`}>
          <h2 className='text-3xl font-bold mb-10'>Card Skeleton Preview</h2>

          <CardSkeleton />
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-12`}>
          <h2 className='text-3xl font-bold mb-8'>Card Skeleton Code</h2>

          <pre className={codeBlockClasses}>{cardSkeletonCode}</pre>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-12`}>
          <h2 className='text-3xl font-bold mb-8'>Animation CSS</h2>

          <pre className={codeBlockClasses}>{animationCode}</pre>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-12`}>
          <h2 className='text-3xl font-bold mb-8'>Props</h2>

          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className='bg-white/20'>
                  <th className='p-4 text-lg'>Prop</th>
                  <th className='p-4 text-lg'>Type</th>
                  <th className='p-4 text-lg'>Default</th>
                  <th className='p-4 text-lg'>Description</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className='p-4 text-base'>width</td>
                  <td className='p-4 text-base'>string</td>
                  <td className='p-4 text-base'>100%</td>
                  <td className='p-4 text-base'>Controls skeleton width</td>
                </tr>

                <tr className='bg-white/10'>
                  <td className='p-4 text-base'>height</td>
                  <td className='p-4 text-base'>string</td>
                  <td className='p-4 text-base'>20px</td>
                  <td className='p-4 text-base'>Controls skeleton height</td>
                </tr>

                <tr>
                  <td className='p-4 text-base'>className</td>
                  <td className='p-4 text-base'>string</td>
                  <td className='p-4 text-base'>-</td>
                  <td className='p-4 text-base'>Additional custom styles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SkeletonPage;
