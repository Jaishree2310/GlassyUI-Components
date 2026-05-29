import { ArrowLeft, Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

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

interface Point {
  x: number;
  y: number;
  id: number;
  opacity: number;
}

interface TrailConfig {
  trailColor: string;
  trailSize: number;
  maxPoints: number;
  fadeSpeed: number;
  showGlassOverlay: boolean;
}

function MemoryTrail({ config }: { config: TrailConfig }) {
  const [points, setPoints] = useState<Point[]>([]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPoints(prev => {
      const newPoint: Point = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now() + Math.random(),
        opacity: 1,
      };
      return [...prev, newPoint].slice(-config.maxPoints);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev =>
        prev
          .map(p => ({ ...p, opacity: p.opacity - config.fadeSpeed }))
          .filter(p => p.opacity > 0),
      );
    }, 50);
    return () => clearInterval(interval);
  }, [config.fadeSpeed]);

  return (
    <div
      onMouseMove={handleMove}
      className='relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-950 to-gray-900 cursor-none'
    >
      {config.showGlassOverlay && (
        <div className='absolute inset-0 backdrop-blur-xl bg-white/5' />
      )}
      {points.map(p => (
        <span
          key={p.id}
          className={`absolute rounded-full ${config.trailColor}`}
          style={{
            left: p.x,
            top: p.y,
            width: config.trailSize,
            height: config.trailSize,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      <div className='absolute inset-0 flex items-center justify-center text-white/40 text-sm pointer-events-none select-none'>
        Move cursor to create memory trail
      </div>
    </div>
  );
}

const TRAIL_COLORS = [
  'bg-white/40',
  'bg-blue-400/60',
  'bg-purple-400/60',
  'bg-emerald-400/60',
  'bg-rose-400/60',
];

export default function GlassMemoryTrailPage() {
  const [trailColor, setTrailColor] = useState('bg-white/40');
  const [trailSize, setTrailSize] = useState(6);
  const [maxPoints, setMaxPoints] = useState(80);
  const [fadeSpeed, setFadeSpeed] = useState(0.02);
  const [showGlassOverlay, setShowGlassOverlay] = useState(true);

  const config: TrailConfig = {
    trailColor,
    trailSize,
    maxPoints,
    fadeSpeed,
    showGlassOverlay,
  };

  const importCode = `import GlassMemoryTrail from './GlassMemoryTrail';

// Basic usage
<GlassMemoryTrail />

// With custom props
<GlassMemoryTrail
  trailColor="bg-blue-400/60"
  trailSize={8}
  maxPoints={100}
  fadeSpeed={0.015}
  showGlassOverlay={true}
/>`;

  const code = `<GlassMemoryTrail
  trailColor="${trailColor}"
  trailSize={${trailSize}}
  maxPoints={${maxPoints}}
  fadeSpeed={${fadeSpeed}}
  showGlassOverlay={${showGlassOverlay}}
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

      <h1 className='text-6xl font-bold mb-4'>Glass Memory Trail</h1>
      <p className='text-xl mb-8 text-gray-100'>
        A glassmorphic cursor trail that fades over time.
      </p>

      <section className={`${glassy(20)} p-6 mb-8`}>
        <h2 className='text-3xl font-bold mb-4'>Basic Usage</h2>
        <div className={`${glassy()} p-4 mb-4`}>
          <p className='text-sm text-white/60'>
            Import the component and use it with optional props to customize the
            trail color, size, fade speed, and more.
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
          <div className='h-[360px]'>
            <MemoryTrail config={config} />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className={`${glassy()} p-4 space-y-2`}>
            <p className='text-white/50 text-sm'>Trail Color</p>
            <div className='flex flex-wrap gap-2'>
              {TRAIL_COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setTrailColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${c.replace('bg-', 'bg-').split('/')[0]} ${trailColor === c ? 'border-white scale-110' : 'border-white/20'}`}
                  style={{
                    background: c.includes('blue')
                      ? 'rgba(96,165,250,0.6)'
                      : c.includes('purple')
                        ? 'rgba(192,132,252,0.6)'
                        : c.includes('emerald')
                          ? 'rgba(52,211,153,0.6)'
                          : c.includes('rose')
                            ? 'rgba(251,113,133,0.6)'
                            : 'rgba(255,255,255,0.4)',
                  }}
                />
              ))}
            </div>
          </div>

          <div className={`${glassy()} p-4 space-y-2`}>
            <p className='text-white/50 text-sm'>Trail Size — {trailSize}px</p>
            <input
              type='range'
              min={2}
              max={20}
              step={1}
              value={trailSize}
              onChange={e => setTrailSize(Number(e.target.value))}
              className='w-full accent-white'
            />
          </div>

          <div className={`${glassy()} p-4 space-y-2`}>
            <p className='text-white/50 text-sm'>Max Points — {maxPoints}</p>
            <input
              type='range'
              min={10}
              max={200}
              step={10}
              value={maxPoints}
              onChange={e => setMaxPoints(Number(e.target.value))}
              className='w-full accent-white'
            />
          </div>

          <div className={`${glassy()} p-4 space-y-2`}>
            <p className='text-white/50 text-sm'>
              Fade Speed — {fadeSpeed.toFixed(2)}
            </p>
            <input
              type='range'
              min={0.005}
              max={0.1}
              step={0.005}
              value={fadeSpeed}
              onChange={e => setFadeSpeed(Number(e.target.value))}
              className='w-full accent-white'
            />
          </div>

          <div className={`${glassy()} p-4 space-y-2`}>
            <p className='text-white/50 text-sm'>Glass Overlay</p>
            <button
              onClick={() => setShowGlassOverlay(v => !v)}
              className={`px-3 py-1 rounded text-xs border transition-all duration-200 ${showGlassOverlay ? 'bg-white text-black border-white' : 'bg-black/30 border-white/20 text-white hover:bg-white/10'}`}
            >
              {showGlassOverlay ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <h3 className='text-xl font-semibold mb-3'>Generated Code</h3>
        <div className='relative'>
          <CopyButton text={code} codeKey='generated' />
          <pre className='bg-gray-800 p-4 pt-12 rounded-lg overflow-x-auto text-sm'>
            {code}
          </pre>
        </div>
      </section>
    </div>
  );
}
