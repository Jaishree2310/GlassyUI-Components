import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useAdaptiveBackgroundIntelligence from '../hooks/useAdaptiveBackgroundIntelligence';
import PageShell from './PageShell';

const AdaptiveBackgroundIntelligenceDemo: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const adaptiveMetrics = useAdaptiveBackgroundIntelligence(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    const drawScene = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.88)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.84)');
      gradient.addColorStop(1, 'rgba(79, 70, 229, 0.72)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 6; i += 1) {
        const x = (Math.sin(time / 900 + i) * 0.35 + 0.5) * width;
        const y = (Math.cos(time / 1200 + i) * 0.35 + 0.5) * height;
        const radius = 52 + i * 18;

        const glow = ctx.createRadialGradient(x, y, 4, x, y, radius);
        glow.addColorStop(
          0,
          `rgba(${Math.round(255 - i * 10)}, ${Math.round(80 + i * 18)}, ${Math.round(220 + i * 6)}, 0.42)`,
        );
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(drawScene);
    };

    animationFrame = requestAnimationFrame(drawScene);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const surfaceStyle = useMemo(
    () => ({
      backdropFilter: `blur(${adaptiveMetrics.blur}px)`,
      WebkitBackdropFilter: `blur(${adaptiveMetrics.blur}px)`,
      background: adaptiveMetrics.baseTint,
      border: `1px solid rgba(255, 255, 255, ${adaptiveMetrics.borderOpacity})`,
      boxShadow: `0 0 ${adaptiveMetrics.shadowSoftness}px rgba(14, 116, 144, ${adaptiveMetrics.glowIntensity})`,
      color: adaptiveMetrics.textColor,
    }),
    [adaptiveMetrics],
  );

  return (
    <PageShell>
      <div className='min-h-screen bg-transparent px-6 py-8 text-slate-800 dark:text-white'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-6'>
            <button
              onClick={() => navigate(-1)}
              className='inline-flex items-center rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-4 py-2 text-sm font-medium text-slate-700 dark:text-white transition hover:bg-slate-200 dark:hover:bg-white/20'
            >
              <ArrowLeft size={18} className='mr-2' />
              Back to Components
            </button>
          </div>

          <div className='mb-8'>
            <p className='mb-2 inline-flex rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200'>
              New intelligence layer
            </p>
            <h1 className='text-4xl font-bold text-slate-800 dark:text-white md:text-5xl'>
              Adaptive Background Intelligence
            </h1>
            <p className='mt-3 max-w-3xl text-base text-slate-600 dark:text-slate-200 md:text-lg'>
              Real-time glassmorphism tuning traces the live scene behind the
              card, adjusting blur, opacity, glow, border visibility, and text
              contrast to stay readable across changing environments.
            </p>
          </div>

          <div className='grid gap-6 lg:grid-cols-[1.3fr_0.7fr]'>
            <div className='relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100/50 p-1 shadow-2xl dark:border-white/10 dark:bg-slate-950/70'>
              <canvas
                ref={canvasRef}
                className='h-[420px] w-full rounded-[26px] border border-slate-200 bg-slate-100/30 dark:border-white/10 dark:bg-slate-950/40'
              />
              <div className='absolute inset-4 flex items-end'>
                <div
                  className='relative z-10 w-full max-w-md rounded-[26px] p-5 md:p-6'
                  style={surfaceStyle}
                >
                  <p className='text-xs uppercase tracking-[0.28em] text-inherit opacity-70'>
                    Adaptive glass surface
                  </p>
                  <h2 className='mt-3 text-2xl font-semibold'>
                    Environmental glass rendering
                  </h2>
                  <p className='mt-2 text-sm text-inherit opacity-80'>
                    Blur, transparency, border emphasis, and glow all shift as
                    the sampled background changes, keeping the interface
                    polished and legible.
                  </p>
                  <div className='mt-4 flex flex-wrap gap-2 text-xs font-medium'>
                    <span className='rounded-full bg-current/10 px-3 py-1 text-inherit'>
                      Dynamic blur
                    </span>
                    <span className='rounded-full bg-current/10 px-3 py-1 text-inherit'>
                      Auto contrast
                    </span>
                    <span className='rounded-full bg-current/10 px-3 py-1 text-inherit'>
                      Smart glow
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='rounded-[28px] border border-slate-200 bg-slate-50/50 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
              <div className='mb-5 flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-200'>
                    Live metrics
                  </p>
                  <h2 className='mt-1 text-xl font-semibold text-slate-800 dark:text-white'>
                    Adaptive profile
                  </h2>
                </div>
                <span className='rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-200'>
                  Realtime
                </span>
              </div>

              <div className='space-y-3'>
                {[
                  ['Blur intensity', `${adaptiveMetrics.blur.toFixed(0)}px`],
                  [
                    'Transparency',
                    `${Math.round(adaptiveMetrics.opacity * 100)}%`,
                  ],
                  [
                    'Border visibility',
                    `${Math.round(adaptiveMetrics.borderOpacity * 100)}%`,
                  ],
                  [
                    'Glow strength',
                    `${Math.round(adaptiveMetrics.glowIntensity * 100)}%`,
                  ],
                  [
                    'Shadow softness',
                    `${Math.round(adaptiveMetrics.shadowSoftness)}px`,
                  ],
                  ['Text contrast', adaptiveMetrics.textColor],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className='rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-950/70'
                  >
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-slate-500 dark:text-slate-300'>
                        {label}
                      </span>
                      <span className='font-semibold text-slate-800 dark:text-white'>
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-6 rounded-2xl border border-cyan-400/25 bg-cyan-50/50 p-4 text-sm text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-50'>
                <p className='font-semibold'>How it works</p>
                <p className='mt-2 text-cyan-900/90 dark:text-cyan-100/90'>
                  The live canvas is sampled continuously, brightness and color
                  complexity are analyzed, and adaptive glass values are
                  recalculated on the fly for a balanced and accessible
                  interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default AdaptiveBackgroundIntelligenceDemo;
