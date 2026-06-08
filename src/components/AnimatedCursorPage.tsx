import React from 'react';
import AnimatedCursor from './AnimatedCursor';

const AnimatedCursorPage: React.FC = () => {
  return (
    <div className='min-h-screen text-white p-8'>
      <AnimatedCursor
        size={10}
        ringSize={36}
        color='#6c63ff'
        accentColor='#ff6584'
        lerpFactor={0.13}
      />

      <h1 className='text-4xl font-bold mb-4'>Animated Cursor</h1>
      <p className='text-gray-300 mb-8'>
        A customizable cursor that smoothly follows the pointer with hover
        animations.
      </p>

      {/* Props table */}
      <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6'>
        <h2 className='text-xl font-semibold mb-4'>Props</h2>
        <table className='w-full text-sm'>
          <thead>
            <tr className='text-left text-gray-400 border-b border-white/10'>
              <th className='pb-2'>Prop</th>
              <th className='pb-2'>Type</th>
              <th className='pb-2'>Default</th>
              <th className='pb-2'>Description</th>
            </tr>
          </thead>
          <tbody className='text-gray-300'>
            <tr className='border-b border-white/5'>
              <td className='py-2'>size</td>
              <td>number</td>
              <td>20</td>
              <td>Outer ring diameter in px</td>
            </tr>
            <tr className='border-b border-white/5'>
              <td className='py-2'>color</td>
              <td>string</td>
              <td>&quot;255,255,255&quot;</td>
              <td>RGB values as a string</td>
            </tr>
            <tr className='border-b border-white/5'>
              <td className='py-2'>opacity</td>
              <td>number</td>
              <td>0.8</td>
              <td>Cursor opacity (0–1)</td>
            </tr>
            <tr className='border-b border-white/5'>
              <td className='py-2'>animationSpeed</td>
              <td>number</td>
              <td>0.15</td>
              <td>Trail lag factor (0–1)</td>
            </tr>
            <tr>
              <td className='py-2'>trailSize</td>
              <td>number</td>
              <td>8</td>
              <td>Inner dot diameter in px</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnimatedCursorPage;
