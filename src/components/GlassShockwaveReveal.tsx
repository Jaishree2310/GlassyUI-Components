import { ArrowLeft, Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Shape = 'circle' | 'square' | 'diamond' | 'ring';
type RevealState = 'idle' | 'impact' | 'revealed';

const glassy = (opacity = 10) =>
  `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;

function CopyButton({ text, codeKey }: { text: string; codeKey: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className={`group absolute top-2 right-3 flex items-center gap-1 px-2 py-1 rounded-xl border backdrop-blur-xl transition-all duration-300 active:scale-95 shadow-lg overflow-hidden ${
        copied
          ? 'bg-green-500/35 border-green-300 text-white shadow-[0_0_28px_rgba(34,197,94,0.75)]'
          : 'bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30'
      }`}
    >
      <span className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent' />
      <span className='relative flex items-center gap-2'>
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-md transition-all duration-300 ${copied ? 'bg-green-500 shadow-[0_0_22px_rgba(34,197,94,0.95)]' : ''}`}
        >
          {copied ? (
            <Check size={18} strokeWidth={2.4} />
          ) : (
            <Copy size={18} strokeWidth={2.4} />
          )}
        </span>
        <span className='text-sm font-medium tracking-wide'>
          {copied ? 'Copied' : 'Copy'}
        </span>
      </span>
      {copied && (
        <span className='absolute inset-0 rounded-xl bg-green-400/25 animate-pulse' />
      )}
    </button>
  );
}

function ShockwaveCanvas({
  shape,
  onDone,
}: {
  shape: Shape;
  onDone: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    const maxR = Math.max(W, H) * 0.8;

    const drawShape = (r: number, lineWidth: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = `rgba(255,255,255,1)`;
      ctx.beginPath();
      if (shape === 'square') {
        ctx.rect(cx - r, cy - r, r * 2, r * 2);
      } else if (shape === 'diamond') {
        ctx.moveTo(cx, cy - r);
        ctx.lineTo(cx + r, cy);
        ctx.lineTo(cx, cy + r);
        ctx.lineTo(cx - r, cy);
        ctx.closePath();
      } else {
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
      }
      ctx.stroke();
      ctx.restore();
    };

    // shockwave: fast thick ring that punches out and fades
    const shockwaves = [
      { delay: 0, speed: 1.4, startR: 0, maxR: maxR * 0.9, thick: 6 },
      { delay: 60, speed: 1.1, startR: 0, maxR: maxR * 0.7, thick: 3 },
    ];

    // ripples: slow thin rings that breathe out after
    const ripples = [
      { delay: 80, duration: 1000 },
      { delay: 220, duration: 1000 },
      { delay: 360, duration: 1000 },
    ];

    let start: number | null = null;
    let raf: number;

    const draw = (ts: number) => {
      if (start === null) start = ts;
      const t = ts - start;
      ctx.clearRect(0, 0, W, H);

      shockwaves.forEach(w => {
        if (t < w.delay) return;
        const elapsed = t - w.delay;
        const r = w.startR + elapsed * w.speed;
        if (r > w.maxR) return;
        const alpha = Math.max(0, 1 - r / w.maxR);
        drawShape(r, w.thick * alpha + 0.5, alpha * 0.9);
      });

      ripples.forEach(({ delay, duration }) => {
        if (t < delay) return;
        const progress = Math.min((t - delay) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const alpha = Math.max(0, (1 - progress) * 0.45);
        drawShape(maxR * eased, 1, alpha);
      });

      const totalDuration =
        ripples[ripples.length - 1].delay +
        ripples[ripples.length - 1].duration;
      if (t < totalDuration) {
        raf = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, W, H);
        onDone();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [shape]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={360}
      className='absolute inset-0 w-full h-full pointer-events-none z-10'
    />
  );
}

export default function GlassShockwaveReveal() {
  const [state, setState] = useState<RevealState>('idle');
  const [shape, setShape] = useState<Shape>('ring');
  const [title, setTitle] = useState('Hidden Content');
  const [subtitle, setSubtitle] = useState('Click to reveal');
  const [showCanvas, setShowCanvas] = useState(false);

  const trigger = () => {
    if (state !== 'idle') return;
    setState('impact');
    setShowCanvas(true);
    setTimeout(() => setState('revealed'), 750);
  };

  const reset = () => {
    setState('idle');
    setShowCanvas(false);
    setShape('ring');
    setTitle('Hidden Content');
    setSubtitle('Click to reveal');
  };

  const importCode = `import GlassShockwaveReveal from './GlassShockwaveReveal';`;

  const code = `<GlassShockwaveReveal
  title="Hidden Content"
  subtitle="Click to reveal"
/>`;

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white'>
      <nav className='mb-8'>
        <button
          className={`flex items-center ${glassy()} px-4 py-2 hover:bg-opacity-20`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </nav>

      <h1 className='text-6xl font-bold mb-4'>Glass Shockwave Reveal</h1>
      <p className='text-xl mb-8 text-gray-100'>
        Interactive glass break with impact shapes and shockwave system.
      </p>

      <section className={`${glassy(20)} p-6 mb-8`}>
        <h2 className='text-3xl font-bold mb-4'>Basic Usage</h2>
        <div className={`${glassy()} p-4 mb-4`}>
          <p className='text-sm text-white/60'>
            Import the component and use it with optional props for title,
            subtitle, and shape.
          </p>
        </div>
        <pre className='bg-gray-800 p-4 rounded-lg overflow-x-auto relative'>
          {importCode}
          <CopyButton text={importCode} codeKey='import' />
        </pre>
      </section>

      <section className={`${glassy(20)} p-6 mb-8`}>
        <h2 className='text-3xl font-bold mb-6'>Live Preview</h2>

        <div className={`${glassy()} p-6 mb-6`}>
          <div className='relative w-full h-[360px] rounded-2xl overflow-hidden bg-black border border-white/10'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div
                className={`text-center transition-all duration-500 ${state === 'revealed' ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}
              >
                <h3 className='text-3xl font-bold'>{title}</h3>
                <p className='text-white/60 text-sm mt-2'>{subtitle}</p>
              </div>
            </div>

            {showCanvas && (
              <ShockwaveCanvas
                shape={shape}
                onDone={() => setShowCanvas(false)}
              />
            )}

            {state !== 'revealed' && (
              <div
                onClick={trigger}
                className={`absolute inset-0 cursor-pointer backdrop-blur-2xl bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-500 ${state === 'impact' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
              >
                <div className='text-center space-y-1'>
                  <p className='text-lg font-semibold'>
                    {state === 'idle' ? 'Click to Break Glass' : 'Impacting...'}
                  </p>
                  <p className='text-xs text-white/50'>Shape system active</p>
                </div>
              </div>
            )}

            {state === 'revealed' && (
              <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-xl'>
                <div className='text-center space-y-2'>
                  <h3 className='text-4xl font-bold'>Revealed</h3>
                  <p className='text-white/70 text-sm'>
                    Glass structure broken
                  </p>
                  <button
                    onClick={reset}
                    className='mt-4 px-4 py-2 bg-white text-black rounded-lg'
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          {[
            { label: 'Title', value: title, onChange: setTitle },
            { label: 'Subtitle', value: subtitle, onChange: setSubtitle },
          ].map(({ label, value, onChange }) => (
            <div key={label} className={`${glassy()} p-4 space-y-2`}>
              <p className='text-white/50 text-sm'>{label}</p>
              <input
                value={value}
                onChange={e => onChange(e.target.value)}
                className='w-full p-2 bg-black/40 border border-white/20 rounded text-white outline-none focus:border-white/40 transition-colors'
              />
            </div>
          ))}
          <div className={`${glassy()} p-4 space-y-2`}>
            <p className='text-white/50 text-sm'>Shockwave Shape</p>
            <div className='flex flex-wrap gap-2'>
              {(['ring', 'circle', 'square', 'diamond'] as Shape[]).map(s => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`px-3 py-1 rounded text-xs border transition-all duration-200 ${shape === s ? 'bg-white text-black border-white' : 'bg-black/30 border-white/20 text-white hover:bg-white/10'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <h3 className='text-xl font-semibold mb-3'>Generated Code</h3>
        <div className='relative'>
          <CopyButton text={code} codeKey='generated' />
          <pre className='bg-gray-800 p-4 pt-12 rounded-lg overflow-x-auto'>
            {code}
          </pre>
        </div>
      </section>
    </div>
  );
}
