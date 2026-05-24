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
      className={`${getGlassyClasses()} animate-pulse ${className}`}
      style={{ width, height }}
    />
  );
};

export const AvatarSkeleton: React.FC<SkeletonLoaderProps> = ({
  width = '80px',
  height = '80px',
  className = '',
}) => {
  return (
    <div
      className={`${getGlassyClasses()} animate-pulse rounded-full ${className}`}
      style={{ width, height }}
    />
  );
};

export const ImageSkeleton: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = '240px',
  className = '',
}) => {
  return (
    <div
      className={`${getGlassyClasses()} animate-pulse ${className}`}
      style={{ width, height }}
    />
  );
};

export const CardSkeleton: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  className = '',
}) => {
  return (
    <div
      className={`${getGlassyClasses()} animate-pulse p-4 flex flex-col gap-4 ${className}`}
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
