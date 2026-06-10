import React, { useEffect, useRef } from 'react';
import './GlassRefractionPanel.css';

interface GlassRefractionPanelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const GlassRefractionPanel: React.FC<GlassRefractionPanelProps> = ({
  children,
  className = '',
  style,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetPositionRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const updatePanelPosition = (x: number, y: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const normalizedX = clamp(x);
    const normalizedY = clamp(y);
    const offsetX = normalizedX - 0.5;
    const offsetY = normalizedY - 0.5;
    const lightX = clamp(normalizedX + offsetX * 0.18);
    const lightY = clamp(normalizedY + offsetY * 0.18);

    wrapper.style.setProperty('--glass-refraction-x', normalizedX.toString());
    wrapper.style.setProperty('--glass-refraction-y', normalizedY.toString());
    wrapper.style.setProperty('--glass-light-x', lightX.toString());
    wrapper.style.setProperty('--glass-light-y', lightY.toString());
    wrapper.style.setProperty('--glass-tilt-x', `${offsetY * 15}deg`);
    wrapper.style.setProperty('--glass-tilt-y', `${offsetX * 18}deg`);
    wrapper.style.setProperty(
      '--glass-depth',
      `${Math.min(1, Math.hypot(offsetX, offsetY) * 1.8)}`,
    );
  };

  const scheduleUpdate = (x: number, y: number) => {
    targetPositionRef.current = { x, y };
    if (rafRef.current !== null) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(() => {
      const target = targetPositionRef.current;
      if (target) {
        updatePanelPosition(target.x, target.y);
      }
      rafRef.current = null;
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    scheduleUpdate(x, y);
  };

  const handleMouseLeave = () => {
    scheduleUpdate(0.5, 0.5);
  };

  return (
    <div
      ref={wrapperRef}
      className={`glass-refraction-panel ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <div className='glass-refraction-sheen' />
      <div className='glass-refraction-highlight' />
      {children}
    </div>
  );
};

export default GlassRefractionPanel;
