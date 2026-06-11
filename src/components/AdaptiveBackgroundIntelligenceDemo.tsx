import { useEffect, useMemo, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useAdaptiveBackgroundIntelligence from '../hooks/useAdaptiveBackgroundIntelligence';

const AdaptiveBackgroundIntelligenceDemo: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const adaptiveMetrics = useAdaptiveBackgroundIntelligence(canvasRef);

  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(28);
  const [borderOpacity, setBorderOpacity] = useState(30);
  const [glowIntensity, setGlowIntensity] = useState(24);
  const [shadowSoftness, setShadowSoftness] = useState(22);
  const [textColor, setTextColor] = useState('#FFFFFF');
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
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,

      background: `linear-gradient(135deg,rgba(15,23,42,${opacity / 100}),rgba(30,41,59,${opacity / 100}))`,

      border: `1px solid rgba(255,255,255,${borderOpacity / 100})`,

      boxShadow: `0 0 ${shadowSoftness}px rgba(14,116,144,${glowIntensity / 100})`,

      color: textColor,
    }),
    [blur, opacity, borderOpacity, glowIntensity, shadowSoftness, textColor],
  );

  return (
    <div className='min-h-screen bg-[#020617] text-white px-6 py-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-6'>
          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20'
          >
            <ArrowLeft size={18} className='mr-2' />
            Back to Components
          </button>
        </div>

        <div className='mb-8'>
          <p className='mb-2 inline-flex rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200'>
            New intelligence layer
          </p>
          <h1 className='text-4xl font-bold md:text-5xl'>
            Adaptive Background Intelligence
          </h1>
          <p className='mt-3 max-w-3xl text-base text-slate-200 md:text-lg'>
            Real-time glassmorphism tuning traces the live scene behind the
            card, adjusting blur, opacity, glow, border visibility, and text
            contrast to stay readable across changing environments.
          </p>
        </div>

        <div className='grid gap-6 lg:grid-cols-[1.3fr_0.7fr]'>
          <div className='relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 p-1 shadow-2xl'>
            <canvas
              ref={canvasRef}
              className='h-[420px] w-full  rounded-[26px] border border-white/10 bg-slate-950/40'
            />
            <div className=' flex justify-center mt-4'>
              <div
                className='relative z-10 w-full max-w-md rounded-[26px] p-5 md:p-6'
                style={surfaceStyle}
              >
                <p className='text-xs uppercase tracking-[0.28em] text-white/70'>
                  Adaptive glass surface
                </p>
                <h2 className='mt-3 text-2xl font-semibold'>
                  Environmental glass rendering
                </h2>
                <p className='mt-2 text-sm text-white/80'>
                  Blur, transparency, border emphasis, and glow all shift as the
                  sampled background changes, keeping the interface polished and
                  legible.
                </p>
                <div className='mt-4 flex flex-wrap gap-2 text-xs font-medium'>
                  <span className='rounded-full bg-white/15 px-3 py-1'>
                    Dynamic blur
                  </span>
                  <span className='rounded-full bg-white/15 px-3 py-1'>
                    Auto contrast
                  </span>
                  <span className='rounded-full bg-white/15 px-3 py-1'>
                    Smart glow
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md'>
            <div className='mb-5 flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium uppercase tracking-[0.28em] text-cyan-200'>
                  Live metrics
                </p>
                <h2 className='mt-1 text-xl font-semibold'>Adaptive profile</h2>
              </div>
              <span className='rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200'>
                Realtime
              </span>
            </div>

            <div className='space-y-2'>
              {[
                ['Blur intensity', blur, setBlur],
                ['Transparency', opacity, setOpacity],
                ['Border visibility', borderOpacity, setBorderOpacity],
                ['Glow strength', glowIntensity, setGlowIntensity],
                ['Shadow softness', shadowSoftness, setShadowSoftness],
              ].map(([label, value, setter]) => (
                <div
                  key={label as string}
                  className='rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3'
                >
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-slate-300'>{label as string}</span>

                    <input
                      type='number'
                      value={value as number}
                      onChange={e =>
                        (
                          setter as React.Dispatch<React.SetStateAction<number>>
                        )(Number(e.target.value))
                      }
                      className='w-20 rounded bg-slate-800 px-2 py-1 text-white outline-none'
                    />
                  </div>
                </div>
              ))}

              <div className='rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-slate-300'>Text contrast</span>

                  <input
                    type='text'
                    value={textColor}
                    onChange={e => setTextColor(e.target.value)}
                    className='w-28 rounded bg-slate-800 px-2 py-1 text-white outline-none'
                    placeholder='#FFFFFF'
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setBlur(16);
                setOpacity(28);
                setBorderOpacity(24);
                setGlowIntensity(30);
                setShadowSoftness(22);
                setTextColor('#FFFFFF');
              }}
              className='mt-4 w-full rounded-xl bg-cyan-500/20 px-4 py-3 font-medium text-cyan-200 transition hover:bg-cyan-500/30'
            >
              Reset
            </button>

            <div className='mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm text-cyan-50'>
              <p className='font-semibold'>How it works</p>
              <p className='mt-2 text-cyan-100/90'>
                The live canvas is sampled continuously, brightness and color
                complexity are analyzed, and adaptive glass values are
                recalculated on the fly for a balanced and accessible interface.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveBackgroundIntelligenceDemo;
