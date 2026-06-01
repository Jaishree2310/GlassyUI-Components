import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ClipboardCopy,
  Layers3,
  Menu,
  Monitor,
  MoonStar,
  PanelTop,
  Search,
  Sparkles,
  SunMedium,
} from 'lucide-react';
import PageShell from './PageShell';
import { getGlassyClasses } from '../utils/glassy';

type PlaygroundComponent = 'button' | 'card' | 'navbar' | 'input' | 'modal';
type PlaygroundTheme = 'aurora' | 'midnight' | 'ember';
type PreviewSize = 'desktop' | 'tablet' | 'mobile';

const componentOptions: Array<{
  id: PlaygroundComponent;
  title: string;
  description: string;
}> = [
  {
    id: 'button',
    title: 'Buttons',
    description:
      'Tune call-to-action styling, hover depth, and glass intensity.',
  },
  {
    id: 'card',
    title: 'Cards',
    description:
      'Shape content surfaces with blur, borders, and layered shadows.',
  },
  {
    id: 'navbar',
    title: 'Navbar',
    description: 'Preview a responsive top bar with desktop and mobile states.',
  },
  {
    id: 'input',
    title: 'Inputs',
    description:
      'Adjust field clarity, focus glow, and transparency in real time.',
  },
  {
    id: 'modal',
    title: 'Modals',
    description: 'Explore dialog overlays, content depth, and CTA emphasis.',
  },
];

const themeOptions: Array<{
  id: PlaygroundTheme;
  label: string;
  accent: string;
  backdropA: string;
  backdropB: string;
  surface: string;
  foreground: string;
}> = [
  {
    id: 'aurora',
    label: 'Aurora',
    accent: '#8b5cf6',
    backdropA: '#07111f',
    backdropB: '#0f766e',
    surface: 'rgba(255, 255, 255, 0.14)',
    foreground: '#f8fafc',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    accent: '#38bdf8',
    backdropA: '#020617',
    backdropB: '#1e293b',
    surface: 'rgba(15, 23, 42, 0.58)',
    foreground: '#e2e8f0',
  },
  {
    id: 'ember',
    label: 'Ember',
    accent: '#fb7185',
    backdropA: '#1f0f12',
    backdropB: '#7c2d12',
    surface: 'rgba(255, 255, 255, 0.16)',
    foreground: '#fff7ed',
  },
];

const previewSizes: Record<PreviewSize, string> = {
  desktop: 'min(100%, 1100px)',
  tablet: '768px',
  mobile: '390px',
};

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) {
    return `rgba(255, 255, 255, ${alpha})`;
  }

  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const PlaygroundPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] =
    useState<PlaygroundComponent>('button');
  const [theme, setTheme] = useState<PlaygroundTheme>('aurora');
  const [glassIntensity, setGlassIntensity] = useState(24);
  const [blur, setBlur] = useState(18);
  const [radius, setRadius] = useState(22);
  const [shadow, setShadow] = useState(28);
  const [transparency, setTransparency] = useState(20);
  const [backgroundTint, setBackgroundTint] = useState('#0f172a');
  const [previewSize, setPreviewSize] = useState<PreviewSize>('desktop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Launch demo');
  const [cardTitle, setCardTitle] = useState('Glass Surface Card');
  const [cardBody, setCardBody] = useState(
    'A frosted content panel with adjustable blur, depth, and transparency.',
  );
  const [inputPlaceholder, setInputPlaceholder] = useState(
    'Search glassy components...',
  );
  const [modalTitle, setModalTitle] = useState('Upgrade the preview');
  const [modalBody, setModalBody] = useState(
    'Fine-tune the dialog surface and instantly copy the generated snippet.',
  );

  const activeTheme =
    themeOptions.find(option => option.id === theme) ?? themeOptions[0];

  const surfaceAlpha = Math.min(0.75, Math.max(0.1, transparency / 100));
  const surfaceBorderAlpha = Math.min(0.34, 0.08 + glassIntensity / 300);
  const shadowAlpha = Math.min(0.44, 0.14 + shadow / 160);

  const glassStyle = useMemo<React.CSSProperties>(
    () => ({
      background: activeTheme.surface,
      backdropFilter: `blur(${blur}px) saturate(${110 + glassIntensity}%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(${110 + glassIntensity}%)`,
      border: `1px solid ${hexToRgba(activeTheme.accent, surfaceBorderAlpha)}`,
      borderRadius: `${radius}px`,
      boxShadow: `0 ${Math.max(10, shadow / 2)}px ${shadow}px ${hexToRgba('#000000', shadowAlpha)}`,
      color: activeTheme.foreground,
    }),
    [
      activeTheme.accent,
      activeTheme.foreground,
      activeTheme.surface,
      blur,
      glassIntensity,
      radius,
      shadow,
      shadowAlpha,
      surfaceBorderAlpha,
    ],
  );

  const previewShellStyle = useMemo<React.CSSProperties>(
    () => ({
      background: `radial-gradient(circle at top left, ${hexToRgba(backgroundTint, 0.75)}, transparent 42%), linear-gradient(145deg, ${activeTheme.backdropA}, ${activeTheme.backdropB})`,
    }),
    [activeTheme.backdropA, activeTheme.backdropB, backgroundTint],
  );

  const previewFrameStyle = useMemo<React.CSSProperties>(
    () => ({
      width: previewSizes[previewSize],
      maxWidth: '100%',
    }),
    [previewSize],
  );

  const generatedCode = useMemo(() => {
    const styleBlock = `{
  background: '${activeTheme.surface}',
  backdropFilter: 'blur(${blur}px) saturate(${110 + glassIntensity}%)',
  WebkitBackdropFilter: 'blur(${blur}px) saturate(${110 + glassIntensity}%)',
  border: '1px solid ${hexToRgba(activeTheme.accent, surfaceBorderAlpha)}',
  borderRadius: '${radius}px',
  boxShadow: '0 ${Math.max(10, shadow / 2)}px ${shadow}px ${hexToRgba('#000000', shadowAlpha)}',
}`;

    const buttonCode = `<Button
  style=${styleBlock}
>
  ${buttonLabel}
</Button>`;

    const cardCode = `<Card
  style=${styleBlock}
>
  <h3>${cardTitle}</h3>
  <p>${cardBody}</p>
</Card>`;

    const navbarCode = `const [open, setOpen] = useState(false);

<nav
  style=${styleBlock}
>
  <button onClick={() => setOpen(!open)}>Menu</button>
  <div className={open ? 'block' : 'hidden md:block'}>
    <a href="#home">Home</a>
    <a href="#components">Components</a>
    <a href="#docs">Docs</a>
  </div>
</nav>`;

    const inputCode = `<Input
  placeholder="${inputPlaceholder}"
  style=${styleBlock}
/>
`;

    const modalCode = `const [isOpen, setIsOpen] = useState(true);

{isOpen && (
  <Modal
    onClose={() => setIsOpen(false)}
    style=${styleBlock}
  >
    <h3>${modalTitle}</h3>
    <p>${modalBody}</p>
  </Modal>
)}`;

    switch (selectedComponent) {
      case 'card':
        return cardCode;
      case 'navbar':
        return navbarCode;
      case 'input':
        return inputCode;
      case 'modal':
        return modalCode;
      default:
        return buttonCode;
    }
  }, [
    activeTheme.accent,
    activeTheme.surface,
    blur,
    buttonLabel,
    cardBody,
    cardTitle,
    glassIntensity,
    inputPlaceholder,
    modalBody,
    modalTitle,
    radius,
    selectedComponent,
    shadow,
    shadowAlpha,
    surfaceBorderAlpha,
  ]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const renderPreview = () => {
    const commonProps: React.CSSProperties = {
      ...glassStyle,
      opacity: surfaceAlpha,
    };

    switch (selectedComponent) {
      case 'card':
        return (
          <div className='w-full flex justify-center'>
            <div className='w-full max-w-md p-5 sm:p-6' style={commonProps}>
              <div className='mb-5 flex items-center justify-between gap-3'>
                <div>
                  <p className='text-xs uppercase tracking-[0.35em] text-white/55'>
                    Glassy card
                  </p>
                  <h3 className='mt-2 text-2xl font-semibold'>{cardTitle}</h3>
                </div>
                <Layers3 className='h-10 w-10 text-white/75' />
              </div>
              <p className='text-sm leading-6 text-white/80'>{cardBody}</p>
              <div className='mt-6 flex items-center justify-between text-xs text-white/65'>
                <span>Live preview</span>
                <span>Glass intensity {glassIntensity}%</span>
              </div>
            </div>
          </div>
        );
      case 'navbar':
        return (
          <div className='w-full'>
            <div
              className='rounded-[28px] p-4 sm:p-5'
              style={{
                ...commonProps,
                background: activeTheme.surface,
              }}
            >
              <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  <div
                    className='flex h-10 w-10 items-center justify-center rounded-2xl'
                    style={{
                      background: hexToRgba(activeTheme.accent, 0.2),
                      color: activeTheme.foreground,
                    }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className='text-[0.62rem] uppercase tracking-[0.35em] text-white/50'>
                      Navigation
                    </p>
                    <p className='text-lg font-semibold text-white'>GlassyUI</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(open => !open)}
                  className='inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/85 md:hidden'
                  style={{ background: hexToRgba('#ffffff', 0.08) }}
                >
                  <Menu size={16} />
                  Menu
                </button>
                <div className='hidden items-center gap-2 md:flex'>
                  {['Home', 'Components', 'Docs'].map(item => (
                    <button
                      key={item}
                      type='button'
                      className='rounded-full px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white'
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div
                className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
              >
                <div className='mt-4 grid gap-2'>
                  {['Home', 'Components', 'Docs'].map(item => (
                    <button
                      key={item}
                      type='button'
                      className='rounded-2xl px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white'
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'input':
        return (
          <div className='w-full flex justify-center'>
            <div className='w-full max-w-md p-5 sm:p-6' style={commonProps}>
              <label className='mb-3 block text-sm font-medium text-white/80'>
                Live input preview
              </label>
              <div
                className='flex items-center gap-3 rounded-2xl px-4 py-3'
                style={{ background: hexToRgba('#ffffff', 0.05) }}
              >
                <Search size={18} className='text-white/60' />
                <input
                  value={inputPlaceholder}
                  onChange={e => setInputPlaceholder(e.target.value)}
                  className='w-full bg-transparent text-sm text-white outline-none placeholder:text-white/45'
                  placeholder='Search glassy components...'
                />
              </div>
              <p className='mt-4 text-xs leading-5 text-white/60'>
                Blur and border changes update the field immediately.
              </p>
            </div>
          </div>
        );
      case 'modal':
        return (
          <div
            className='relative min-h-[460px] overflow-hidden rounded-[28px]'
            style={previewShellStyle}
          >
            <div className='absolute inset-0 bg-black/25' />
            <div className='relative flex min-h-[460px] items-center justify-center p-6'>
              {!modalOpen ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className='rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]'
                  style={{
                    background: hexToRgba(activeTheme.accent, 0.2),
                    border: `1px solid ${hexToRgba(activeTheme.accent, 0.35)}`,
                    backdropFilter: `blur(${blur}px)`,
                  }}
                >
                  Reopen modal
                </button>
              ) : (
                <div
                  className='w-full max-w-lg p-6 sm:p-8'
                  style={{
                    ...commonProps,
                    background: activeTheme.surface,
                  }}
                >
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <p className='text-xs uppercase tracking-[0.35em] text-white/50'>
                        Modal preview
                      </p>
                      <h3 className='mt-2 text-2xl font-semibold'>
                        {modalTitle}
                      </h3>
                    </div>
                    <button
                      className='rounded-full px-3 py-2 text-xs text-white/70 transition hover:bg-white/10 hover:text-white'
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                  <p className='mt-4 text-sm leading-6 text-white/78'>
                    {modalBody}
                  </p>
                  <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                    <button
                      className='rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110'
                      style={{
                        background: hexToRgba(activeTheme.accent, 0.26),
                      }}
                    >
                      Primary action
                    </button>
                    <button
                      className='rounded-full px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10'
                      onClick={() => setModalOpen(false)}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className='flex justify-center'>
            <button
              className='rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]'
              style={{
                ...commonProps,
                background: hexToRgba(activeTheme.accent, 0.22),
                border: `1px solid ${hexToRgba(activeTheme.accent, 0.36)}`,
              }}
            >
              {buttonLabel}
            </button>
          </div>
        );
    }
  };

  return (
    <PageShell>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <button
          onClick={() => navigate('/components')}
          className={`${getGlassyClasses(12)} inline-flex items-center gap-2 px-4 py-2 text-sm text-white transition hover:bg-white/20`}
        >
          <ArrowLeft size={18} />
          Back to Components
        </button>
        <div className='hidden items-center gap-2 text-sm text-white/70 sm:flex'>
          <Monitor size={16} />
          Live playground
        </div>
      </div>

      <section className='mb-8 max-w-4xl'>
        <p className='mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70'>
          <PanelTop size={14} />
          Interactive playground
        </p>
        <h1 className='text-4xl font-semibold tracking-tight text-white sm:text-6xl'>
          Component playground with live customization
        </h1>
        <p className='mt-4 max-w-3xl text-base leading-7 text-white/72 sm:text-lg'>
          Adjust glassmorphism intensity, blur, opacity, radius, and theme in
          real time while previewing Buttons, Cards, Navbar, Input fields, and
          Modals.
        </p>
      </section>

      <div className='grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]'>
        <aside className={`${getGlassyClasses(12)} space-y-6 p-4 sm:p-5`}>
          <div>
            <div className='mb-3 flex items-center gap-2 text-sm font-semibold text-white'>
              <Layers3 size={16} />
              Component target
            </div>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1'>
              {componentOptions.map(option => {
                const active = selectedComponent === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedComponent(option.id)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${active ? 'border-white/35 bg-white/15 shadow-lg' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <span className='font-medium text-white'>
                        {option.title}
                      </span>
                      {active ? (
                        <Check size={16} />
                      ) : (
                        <ChevronDown
                          size={16}
                          className='rotate-[-90deg] text-white/55'
                        />
                      )}
                    </div>
                    <p className='mt-2 text-xs leading-5 text-white/65'>
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className='mb-3 flex items-center gap-2 text-sm font-semibold text-white'>
              <SunMedium size={16} />
              Theme toggles
            </div>
            <div className='grid grid-cols-3 gap-2'>
              {themeOptions.map(option => {
                const active = theme === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    className={`rounded-2xl border px-3 py-3 text-left text-xs transition ${active ? 'border-white/35 bg-white/15' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                  >
                    <span
                      className='mb-3 block h-8 w-8 rounded-xl'
                      style={{ background: option.accent }}
                    />
                    <span className='block font-medium text-white'>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='grid gap-4'>
            <SliderControl
              label={`Glass intensity ${glassIntensity}%`}
              value={glassIntensity}
              min={0}
              max={100}
              onChange={setGlassIntensity}
            />
            <SliderControl
              label={`Blur ${blur}px`}
              value={blur}
              min={0}
              max={36}
              onChange={setBlur}
            />
            <SliderControl
              label={`Border radius ${radius}px`}
              value={radius}
              min={8}
              max={40}
              onChange={setRadius}
            />
            <SliderControl
              label={`Shadow depth ${shadow}px`}
              value={shadow}
              min={0}
              max={56}
              onChange={setShadow}
            />
            <SliderControl
              label={`Transparency ${transparency}%`}
              value={transparency}
              min={8}
              max={70}
              onChange={setTransparency}
            />
          </div>

          <div>
            <label className='mb-3 block text-sm font-semibold text-white'>
              Background tint
            </label>
            <div className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3'>
              <input
                type='color'
                value={backgroundTint}
                onChange={e => setBackgroundTint(e.target.value)}
                className='h-10 w-10 cursor-pointer rounded-xl border-0 bg-transparent p-0'
                aria-label='Background tint'
              />
              <div className='flex-1 text-sm text-white/75'>
                {backgroundTint.toUpperCase()}
              </div>
            </div>
          </div>

          <div>
            <div className='mb-3 flex items-center gap-2 text-sm font-semibold text-white'>
              <Monitor size={16} />
              Preview size
            </div>
            <div className='grid grid-cols-3 gap-2'>
              {(['desktop', 'tablet', 'mobile'] as PreviewSize[]).map(size => {
                const active = previewSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setPreviewSize(size)}
                    className={`rounded-2xl border px-3 py-3 text-xs font-medium uppercase tracking-[0.2em] transition ${active ? 'border-white/35 bg-white/15 text-white' : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedComponent === 'button' && (
            <TextFieldControl
              label='Button text'
              value={buttonLabel}
              onChange={setButtonLabel}
            />
          )}

          {selectedComponent === 'card' && (
            <>
              <TextFieldControl
                label='Card title'
                value={cardTitle}
                onChange={setCardTitle}
              />
              <TextFieldControl
                label='Card body'
                value={cardBody}
                onChange={setCardBody}
              />
            </>
          )}

          {selectedComponent === 'input' && (
            <TextFieldControl
              label='Input placeholder'
              value={inputPlaceholder}
              onChange={setInputPlaceholder}
            />
          )}

          {selectedComponent === 'modal' && (
            <>
              <TextFieldControl
                label='Modal title'
                value={modalTitle}
                onChange={setModalTitle}
              />
              <TextFieldControl
                label='Modal body'
                value={modalBody}
                onChange={setModalBody}
              />
            </>
          )}
        </aside>

        <div className='space-y-6'>
          <section
            className={`${getGlassyClasses(12)} overflow-hidden p-4 sm:p-6`}
          >
            <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <h2 className='text-xl font-semibold text-white'>Preview</h2>
                <p className='text-sm text-white/65'>
                  {
                    componentOptions.find(
                      option => option.id === selectedComponent,
                    )?.title
                  }{' '}
                  updates immediately as you move the controls.
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                className='inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15'
              >
                {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
                {copied ? 'Copied code' : 'Copy code'}
              </button>
            </div>

            <div className='overflow-x-auto pb-2'>
              <div
                className='mx-auto flex justify-center'
                style={previewFrameStyle}
              >
                <div
                  className='w-full rounded-[32px] p-4 sm:p-6'
                  style={previewShellStyle}
                >
                  <div className='rounded-[28px] border border-white/10 bg-black/10 p-3 sm:p-5'>
                    {renderPreview()}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={`${getGlassyClasses(12)} p-4 sm:p-6`}>
            <div className='mb-4 flex items-center justify-between gap-4'>
              <div>
                <h2 className='text-xl font-semibold text-white'>
                  Generated code
                </h2>
                <p className='text-sm text-white/65'>
                  Copy a ready-to-paste snippet with the current settings.
                </p>
              </div>
              <div className='hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-white/55 sm:flex'>
                <MoonStar size={12} />
                {themeOptions.find(option => option.id === theme)?.label} mode
              </div>
            </div>
            <pre className='overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-100 shadow-inner sm:p-5'>
              <code>{generatedCode}</code>
            </pre>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

const SliderControl: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}> = ({ label, value, min, max, onChange }) => (
  <label className='rounded-2xl border border-white/10 bg-white/5 p-4'>
    <div className='mb-3 flex items-center justify-between gap-3 text-sm text-white'>
      <span>{label}</span>
      <span className='text-white/55'>{value}</span>
    </div>
    <input
      type='range'
      min={min}
      max={max}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className='w-full accent-white'
    />
  </label>
);

const TextFieldControl: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => (
  <label className='block rounded-2xl border border-white/10 bg-white/5 p-4'>
    <span className='mb-3 block text-sm text-white'>{label}</span>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30'
    />
  </label>
);

export default PlaygroundPage;
