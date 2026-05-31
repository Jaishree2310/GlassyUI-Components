import React, { useMemo, useState } from 'react';
import { ArrowLeft, Check, Clipboard, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ColorPicker from './ColorPicker';
import GlassTiltCard, { GlassTiltCardSettings } from './GlassTiltCard';

const initialSettings: GlassTiltCardSettings = {
  blur: 22,
  opacity: 0.22,
  borderRadius: 28,
  glowColor: '#7dd3fc',
  tiltIntensity: 14,
  borderOpacity: 0.46,
  shadowStrength: 48,
};

const GlassPlayground: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] =
    useState<GlassTiltCardSettings>(initialSettings);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeCode, setActiveCode] = useState<'tailwind' | 'css'>('tailwind');
  const [copied, setCopied] = useState(false);

  const updateSetting = (
    key: keyof GlassTiltCardSettings,
    value: number | string,
  ) => {
    setSettings(current => ({ ...current, [key]: value }));
  };

  const tailwindCode = useMemo(
    () =>
      `class="relative overflow-hidden rounded-[${settings.borderRadius}px] border border-[${settings.glowColor}]/[${settings.borderOpacity.toFixed(
        2,
      )}] bg-white/[${settings.opacity.toFixed(
        2,
      )}] backdrop-blur-[${settings.blur}px] shadow-[0_24px_${settings.shadowStrength}px_rgba(0,0,0,0.32)] transition-transform duration-200 will-change-transform"`,
    [settings],
  );

  const cssCode = useMemo(
    () => `.glass-tilt-card {
  background: rgba(255, 255, 255, ${settings.opacity.toFixed(2)});
  backdrop-filter: blur(${settings.blur}px) saturate(150%);
  -webkit-backdrop-filter: blur(${settings.blur}px) saturate(150%);
  border: 1px solid ${settings.glowColor};
  border-radius: ${settings.borderRadius}px;
  box-shadow: 0 24px ${settings.shadowStrength}px rgba(0, 0, 0, 0.32);
  transform-style: preserve-3d;
  will-change: transform;
}`,
    [settings],
  );

  const copyCode = () => {
    const text = activeCode === 'tailwind' ? tailwindCode : cssCode;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  const backgroundClass =
    theme === 'dark'
      ? 'bg-[#111114] text-white'
      : 'bg-[#eff6f2] text-slate-950';
  const backgroundPattern: React.CSSProperties = {
    backgroundImage:
      theme === 'dark'
        ? 'linear-gradient(135deg, rgba(125,211,252,0.12) 0%, transparent 32%, rgba(167,139,250,0.12) 64%, transparent 100%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)'
        : 'linear-gradient(135deg, rgba(20,184,166,0.15) 0%, transparent 35%, rgba(244,114,182,0.12) 72%, transparent 100%), linear-gradient(rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.07) 1px, transparent 1px)',
    backgroundSize: 'auto, 40px 40px, 40px 40px',
  };

  return (
    <main
      className={`min-h-screen overflow-hidden px-5 pb-14 pt-28 transition-colors duration-300 ${backgroundClass}`}
      style={backgroundPattern}
    >
      <div className='relative mx-auto flex w-full max-w-7xl flex-col gap-8'>
        <button
          onClick={() => navigate('/components')}
          className='inline-flex w-fit items-center gap-2 rounded-lg border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-md transition hover:bg-white/25'
        >
          <ArrowLeft size={18} />
          Back to Components
        </button>

        <section className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]'>
          <div className='flex min-h-[620px] items-center justify-center rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur-xl'>
            <GlassTiltCard settings={settings} theme={theme} />
          </div>

          <aside className='rounded-lg border border-white/15 bg-white/12 p-5 shadow-2xl backdrop-blur-xl'>
            <div className='mb-5 flex items-start justify-between gap-4'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200'>
                  Playground
                </p>
                <h1 className='mt-2 text-3xl font-bold'>Glass Tilt Card</h1>
              </div>
              <button
                onClick={() =>
                  setTheme(current => (current === 'dark' ? 'light' : 'dark'))
                }
                className='flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/15 transition hover:bg-white/25'
                title='Toggle background'
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <div className='grid gap-4'>
              <RangeControl
                label='Blur intensity'
                value={settings.blur}
                min={0}
                max={44}
                suffix='px'
                onChange={value => updateSetting('blur', value)}
              />
              <RangeControl
                label='Opacity'
                value={settings.opacity}
                min={0.08}
                max={0.72}
                step={0.01}
                onChange={value => updateSetting('opacity', value)}
              />
              <RangeControl
                label='Border radius'
                value={settings.borderRadius}
                min={8}
                max={48}
                suffix='px'
                onChange={value => updateSetting('borderRadius', value)}
              />
              <RangeControl
                label='Tilt intensity'
                value={settings.tiltIntensity}
                min={0}
                max={24}
                suffix='deg'
                onChange={value => updateSetting('tiltIntensity', value)}
              />
              <RangeControl
                label='Border glow'
                value={settings.borderOpacity}
                min={0.12}
                max={0.9}
                step={0.01}
                onChange={value => updateSetting('borderOpacity', value)}
              />
              <RangeControl
                label='Shadow depth'
                value={settings.shadowStrength}
                min={18}
                max={80}
                suffix='px'
                onChange={value => updateSetting('shadowStrength', value)}
              />

              <label className='rounded-lg border border-white/15 bg-white/10 p-3'>
                <span className='mb-3 block text-sm font-semibold'>
                  Glow color
                </span>
                <div className='flex items-center gap-3'>
                  <ColorPicker
                    value={settings.glowColor}
                    onChange={hex => updateSetting('glowColor', hex)}
                  />
                  <input
                    value={settings.glowColor}
                    onChange={event =>
                      updateSetting('glowColor', event.target.value)
                    }
                    className='min-w-0 flex-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 font-mono text-sm outline-none focus:border-cyan-300'
                  />
                </div>
              </label>
            </div>
          </aside>
        </section>

        <section className='rounded-lg border border-white/15 bg-black/35 p-5 text-white shadow-2xl backdrop-blur-xl'>
          <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
            <div className='flex gap-2'>
              {(['tailwind', 'css'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveCode(tab)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    activeCode === tab
                      ? 'bg-cyan-300 text-slate-950'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {tab === 'tailwind' ? 'Tailwind' : 'CSS'}
                </button>
              ))}
            </div>
            <button
              onClick={copyCode}
              className='inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20'
            >
              {copied ? <Check size={17} /> : <Clipboard size={17} />}
              {copied ? 'Copied' : 'Copy code'}
            </button>
          </div>
          <pre className='max-h-72 overflow-auto rounded-lg bg-slate-950 p-4 text-sm leading-6 text-cyan-50'>
            <code>{activeCode === 'tailwind' ? tailwindCode : cssCode}</code>
          </pre>
        </section>
      </div>
    </main>
  );
};

interface RangeControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}

const RangeControl: React.FC<RangeControlProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = '',
  onChange,
}) => (
  <label className='rounded-lg border border-white/15 bg-white/10 p-3'>
    <span className='mb-2 flex items-center justify-between gap-3 text-sm font-semibold'>
      <span>{label}</span>
      <span className='font-mono text-xs text-cyan-100'>
        {Number.isInteger(value) ? value : value.toFixed(2)}
        {suffix}
      </span>
    </span>
    <input
      type='range'
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={event => onChange(Number(event.target.value))}
      className='w-full accent-cyan-300'
    />
  </label>
);

export default GlassPlayground;
