import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Pipette } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  label?: string;
}

const getGlassyClasses = (opacity = 10) =>
  `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;

function hexToHsv(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, max === 0 ? 0 : d / max, max];
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h / 60) % 6;
  const f = h / 60 - Math.floor(h / 60);
  const p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s);
  const sets: [number, number, number][] = [
    [v, t, p],
    [q, v, p],
    [p, v, t],
    [p, q, v],
    [t, p, v],
    [v, p, q],
  ];
  return sets[i].map(x => Math.round(x * 255)) as [number, number, number];
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [open, setOpen] = useState(false);

  const initialHex = /^#[0-9a-fA-F]{6}$/.test(value) ? value : '#ffffff';
  const [initH, initS, initV] = hexToHsv(initialHex);

  const [hue, setHue] = useState(initH);
  const [sat, setSat] = useState(initS);
  const [val, setVal] = useState(initV);
  const CANVAS_W = 232,
    CANVAS_H = 160;
  const [cursorX, setCursorX] = useState(initS * (CANVAS_W - 1));
  const [cursorY, setCursorY] = useState((1 - initV) * (CANVAS_H - 1));
  const [hexInput, setHexInput] = useState(initialHex.slice(1).toUpperCase());
  const dragging = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Sync from external value changes
  useEffect(() => {
    if (!open) {
      const clean = value.startsWith('#') ? value : '#' + value;
      if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
        const [h, s, v] = hexToHsv(clean);
        setHue(h);
        setSat(s);
        setVal(v);
        setHexInput(clean.slice(1).toUpperCase());
        const canvas = canvasRef.current;
        if (canvas) {
          setCursorX(s * (canvas.width - 1));
          setCursorY((1 - v) * (canvas.height - 1));
        }
      }
    }
  }, [value, open]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const w = canvas.width,
      h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const gH = ctx.createLinearGradient(0, 0, w, 0);
    gH.addColorStop(0, '#fff');
    gH.addColorStop(1, `hsl(${hue},100%,50%)`);
    ctx.fillStyle = gH;
    ctx.fillRect(0, 0, w, h);
    const gV = ctx.createLinearGradient(0, 0, 0, h);
    gV.addColorStop(0, 'rgba(0,0,0,0)');
    gV.addColorStop(1, '#000');
    ctx.fillStyle = gV;
    ctx.fillRect(0, 0, w, h);
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, 7, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, 9, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [hue, cursorX, cursorY]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => drawCanvas());
  }, [open, drawCanvas]);

  const pickColor = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const cx = Math.max(
        0,
        Math.min(canvas.width - 1, (clientX - rect.left) * scaleX),
      );
      const cy = Math.max(
        0,
        Math.min(canvas.height - 1, (clientY - rect.top) * scaleY),
      );
      setCursorX(cx);
      setCursorY(cy);
      const s = cx / (canvas.width - 1);
      const v = 1 - cy / (canvas.height - 1);
      setSat(s);
      setVal(v);
      const [r, g, b] = hsvToRgb(hue, s, v);
      const hex = rgbToHex(r, g, b);
      setHexInput(hex.slice(1));
      onChange(hex);
    },
    [hue, onChange],
  );

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = Number(e.target.value);
    setHue(h);
    const [r, g, b] = hsvToRgb(h, sat, val);
    const hex = rgbToHex(r, g, b);
    setHexInput(hex.slice(1));
    onChange(hex);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
    setHexInput(v.toUpperCase());
    if (v.length === 6) {
      const full = '#' + v;
      const [h, s, val2] = hexToHsv(full);
      setHue(h);
      setSat(s);
      setVal(val2);
      const canvas = canvasRef.current;
      if (canvas) {
        setCursorX(s * (canvas.width - 1));
        setCursorY((1 - val2) * (canvas.height - 1));
      }
      onChange(full.toUpperCase());
    }
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleEyeDropper = async () => {
    if (!('EyeDropper' in window)) return;
    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      const hex = result.sRGBHex.toUpperCase();
      const [h, s, v2] = hexToHsv(hex);
      setHue(h);
      setSat(s);
      setVal(v2);
      setHexInput(hex.slice(1));
      setCursorX(s * (CANVAS_W - 1));
      setCursorY((1 - v2) * (CANVAS_H - 1));
      onChange(hex);
    } catch (_) {}
  };

  const [r, g, b] = hsvToRgb(hue, sat, val);
  const currentHex = '#' + hexInput;

  return (
    <div className='relative' ref={panelRef}>
      {label && (
        <label className='block text-sm font-medium text-white mb-2'>
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`${getGlassyClasses(20)} p-1 hover:bg-opacity-30 transition-all duration-200`}
        title='Choose color'
      >
        <div
          className='w-6 h-6 rounded-md border border-white border-opacity-30 flex-shrink-0'
          style={{ background: value }}
        />
      </button>

      {/* Picker panel */}
      {open && (
        <div
          className={`absolute z-10 mt-2 p-4 ${getGlassyClasses(30)} w-64 flex flex-col gap-3 shadow-2xl`}
          style={{ minWidth: 240 }}
        >
          {/* Gradient canvas */}
          <canvas
            ref={canvasRef}
            width={232}
            height={160}
            className='w-full rounded-lg cursor-crosshair'
            style={{ display: 'block' }}
            onMouseDown={e => {
              dragging.current = true;
              pickColor(e.clientX, e.clientY);
            }}
            onMouseMove={e => {
              if (dragging.current) pickColor(e.clientX, e.clientY);
            }}
            onMouseUp={() => {
              dragging.current = false;
            }}
            onMouseLeave={() => {
              dragging.current = false;
            }}
            onTouchStart={e => {
              dragging.current = true;
              pickColor(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={e => {
              if (dragging.current)
                pickColor(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchEnd={() => {
              dragging.current = false;
            }}
          />

          {/* Hue slider + swatch + eyedropper */}
          <div className='flex items-center gap-3'>
            <span
              className='w-8 h-8 rounded-full border-2 border-white border-opacity-40 flex-shrink-0'
              style={{ background: `#${hexInput || 'ffffff'}` }}
            />
            <input
              type='range'
              min={0}
              max={360}
              value={hue}
              onChange={handleHueChange}
              className='flex-1 h-2 rounded-full cursor-pointer appearance-none border-none'
              style={{
                background:
                  'linear-gradient(to right, hsl(0,100%,50%), hsl(30,100%,50%), hsl(60,100%,50%), hsl(90,100%,50%), hsl(120,100%,50%), hsl(150,100%,50%), hsl(180,100%,50%), hsl(210,100%,50%), hsl(240,100%,50%), hsl(270,100%,50%), hsl(300,100%,50%), hsl(330,100%,50%), hsl(360,100%,50%))',
              }}
            />
            {'EyeDropper' in window && (
              <button
                onClick={handleEyeDropper}
                title='Pick color from screen'
                className={`${getGlassyClasses(20)} p-1.5 hover:bg-opacity-30 text-white flex-shrink-0`}
              >
                <Pipette size={16} />
              </button>
            )}
          </div>

          {/* RGB readout */}
          <div className='grid grid-cols-3 gap-2 text-center'>
            {[
              ['R', r],
              ['G', g],
              ['B', b],
            ].map(([ch, val]) => (
              <div
                key={ch as string}
                className={`${getGlassyClasses(10)} py-1`}
              >
                <div className='text-xs text-white text-opacity-60 font-medium'>
                  {ch}
                </div>
                <div className='text-sm font-semibold text-white'>{val}</div>
              </div>
            ))}
          </div>

          {/* Hex input */}
          <div
            className={`flex items-center gap-2 ${getGlassyClasses(10)} px-3 py-2`}
          >
            <span className='text-white text-opacity-50 text-sm font-mono'>
              #
            </span>
            <input
              type='text'
              value={hexInput}
              onChange={handleHexInput}
              maxLength={6}
              className='bg-transparent text-white text-sm font-mono flex-1 outline-none uppercase tracking-widest'
              spellCheck={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
