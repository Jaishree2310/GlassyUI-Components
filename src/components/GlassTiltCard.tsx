import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLightReflection } from '../hooks/useLightReflection';
import { useTiltEffect } from '../hooks/useTiltEffect';

export interface GlassTiltCardSettings {
  blur: number;
  opacity: number;
  borderRadius: number;
  glowColor: string;
  tiltIntensity: number;
  borderOpacity: number;
  shadowStrength: number;
}

interface GlassTiltCardProps {
  settings: GlassTiltCardSettings;
  theme: 'dark' | 'light';
}

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '');
  const value = parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const GlassTiltCard: React.FC<GlassTiltCardProps> = ({ settings, theme }) => {
  const { elementRef, transform, handlePointerMove, resetTilt } =
    useTiltEffect<HTMLDivElement>({
      maxTilt: settings.tiltIntensity,
    });
  const { reflection, handleLightMove, softenReflection } =
    useLightReflection<HTMLDivElement>();

  const glow = hexToRgb(settings.glowColor);
  const surfaceRgb = theme === 'dark' ? '255, 255, 255' : '18, 25, 38';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const mutedColor =
    theme === 'dark' ? 'rgba(255,255,255,0.72)' : 'rgba(17,24,39,0.7)';

  const cardStyle: React.CSSProperties = {
    transform: `perspective(900px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) translateZ(0)`,
    background: `linear-gradient(145deg, rgba(${surfaceRgb}, ${settings.opacity}), rgba(${surfaceRgb}, ${Math.max(
      settings.opacity - 0.18,
      0.08,
    )}))`,
    backdropFilter: `blur(${settings.blur}px) saturate(150%)`,
    WebkitBackdropFilter: `blur(${settings.blur}px) saturate(150%)`,
    borderRadius: `${settings.borderRadius}px`,
    border: `1px solid rgba(${glow.r}, ${glow.g}, ${glow.b}, ${settings.borderOpacity})`,
    boxShadow: `0 24px ${settings.shadowStrength}px rgba(0, 0, 0, 0.32), 0 0 42px rgba(${glow.r}, ${glow.g}, ${glow.b}, 0.25), inset 0 1px 0 rgba(255,255,255,0.35)`,
    color: textColor,
  };

  const glareStyle: React.CSSProperties = {
    background: `radial-gradient(circle at ${reflection.x}% ${reflection.y}%, rgba(255,255,255,${reflection.opacity}) 0%, rgba(${glow.r},${glow.g},${glow.b},0.18) 18%, transparent 48%)`,
  };

  return (
    <div
      ref={elementRef}
      className='relative h-[430px] w-full max-w-[360px] overflow-hidden p-7 transition-transform duration-200 ease-out will-change-transform'
      style={cardStyle}
      onPointerMove={event => {
        handlePointerMove(event);
        handleLightMove(event);
      }}
      onPointerLeave={() => {
        resetTilt();
        softenReflection();
      }}
    >
      <div
        className='pointer-events-none absolute inset-0'
        style={glareStyle}
      />
      <div className='pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-white/20 blur-3xl' />
      <div className='pointer-events-none absolute inset-x-7 top-5 h-px bg-white/70' />

      <div className='relative z-10 flex h-full flex-col justify-between'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p
              className='text-xs font-semibold uppercase tracking-[0.22em]'
              style={{ color: mutedColor }}
            >
              Live Glass
            </p>
            <h2 className='mt-3 text-3xl font-bold leading-tight'>
              Aurora Pass
            </h2>
          </div>
          <div className='flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20'>
            <Sparkles size={20} />
          </div>
        </div>

        <div>
          <div className='mb-8 grid grid-cols-3 gap-3'>
            {['Depth', 'Glow', 'Blur'].map((label, index) => (
              <div
                key={label}
                className='rounded-lg border border-white/20 bg-white/15 p-3'
              >
                <p className='text-[11px]' style={{ color: mutedColor }}>
                  {label}
                </p>
                <p className='mt-1 text-lg font-semibold'>
                  {index === 0
                    ? `${settings.tiltIntensity}deg`
                    : index === 1
                      ? `${Math.round(settings.borderOpacity * 100)}%`
                      : `${settings.blur}px`}
                </p>
              </div>
            ))}
          </div>

          <div className='rounded-lg border border-white/20 bg-black/10 p-4'>
            <p className='text-sm leading-6' style={{ color: mutedColor }}>
              Move the cursor across the card to bend the surface and steer the
              reflection in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassTiltCard;
