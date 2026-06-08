import React, { useEffect, useRef } from 'react';

interface AnimatedCursorProps {
  color?: string;
  accentColor?: string;
  size?: number;
  ringSize?: number;
  lerpFactor?: number;
}

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  color = '#6c63ff',
  accentColor = '#ff6584',
  size = 10,
  ringSize = 36,
  lerpFactor = 0.13,
}) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;

    const HOVER =
      'a, button, [data-magnetic], input, textarea, select, label, [role="button"]';

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = '1';
      ring.style.opacity = '0.7';
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER)) {
        dot.classList.add('amc-dot--hover');
        ring.classList.add('amc-ring--hover');
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER)) {
        dot.classList.remove('amc-dot--hover');
        ring.classList.remove('amc-ring--hover');
      }
    };

    const onDown = () => {
      dot.classList.add('amc-dot--click');
      ring.classList.add('amc-ring--click');
      spawnRipple(mouseX, mouseY);
    };

    const onUp = () => {
      dot.classList.remove('amc-dot--click');
      ring.classList.remove('amc-ring--click');
    };

    function spawnRipple(x: number, y: number) {
      const r = document.createElement('div');
      r.className = 'amc-ripple';
      r.style.left = x + 'px';
      r.style.top = y + 'px';
      r.style.borderColor = color;
      document.body.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      if (!dot || !ring) return;

      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';

      ringX = lerp(ringX, mouseX, lerpFactor);
      ringY = lerp(ringY, mouseY, lerpFactor);
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';

      rafId = requestAnimationFrame(tick);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId);
    };
  }, [color, accentColor, lerpFactor]);

  if ('ontouchstart' in window) return null;

  return (
    <>
      <style>{`
        .amc-dot, .amc-ring { position: fixed; top: 0; left: 0; border-radius: 50%; pointer-events: none; z-index: 99999; will-change: transform; }
        .amc-dot {
          width: ${size}px; height: ${size}px;
          background: ${color};
          transform: translate(-50%, -50%) scale(1);
          transition: transform 0.12s ease, background 0.12s ease, opacity 0.12s ease;
          mix-blend-mode: difference;
          z-index: 99999;
        }
        .amc-ring {
          width: ${ringSize}px; height: ${ringSize}px;
          border: 2px solid ${color};
          transform: translate(-50%, -50%) scale(1);
          transition: transform 0.22s cubic-bezier(0.23,1,0.32,1), border-color 0.22s ease, width 0.22s ease, height 0.22s ease, opacity 0.22s ease;
          opacity: 0.7;
          z-index: 99998;
        }
        .amc-ring::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: radial-gradient(circle, ${color}44 0%, transparent 70%);
          filter: blur(10px);
          pointer-events: none;
        }
        .amc-dot--hover  { transform: translate(-50%, -50%) scale(0.4); opacity: 0.6 !important; }
        .amc-ring--hover { width: ${ringSize * 1.8}px !important; height: ${ringSize * 1.8}px !important; border-color: ${accentColor} !important; opacity: 0.9 !important; }
        .amc-ring--hover::after { background: radial-gradient(circle, ${accentColor}55 0%, transparent 70%); }
        .amc-dot--click  { transform: translate(-50%, -50%) scale(1.6); background: ${accentColor} !important; }
        .amc-ring--click { transform: translate(-50%, -50%) scale(0.8); border-color: ${accentColor} !important; }
        .amc-ripple {
          position: fixed; top: 0; left: 0;
          width: 0; height: 0; border-radius: 50%;
          border: 2px solid ${color};
          pointer-events: none; z-index: 99997;
          transform: translate(-50%, -50%);
          animation: amc-ripple 0.55s cubic-bezier(0.22,0.61,0.36,1) forwards;
        }
        @keyframes amc-ripple {
          0%   { width: 0;    height: 0;    opacity: 0.9; }
          100% { width: 80px; height: 80px; opacity: 0;   }
        }
        @media (prefers-reduced-motion: reduce) {
          .amc-dot, .amc-ring { transition: none !important; animation: none !important; }
          .amc-ripple { display: none !important; }
        }
      `}</style>
      <div ref={dotRef} className='amc-dot' />
      <div ref={ringRef} className='amc-ring' />
    </>
  );
};

export default AnimatedCursor;
