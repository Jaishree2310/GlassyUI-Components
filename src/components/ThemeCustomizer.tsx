import React, { useState } from 'react';

const ThemeCustomizer = () => {
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(0.2);
  const [radius, setRadius] = useState(20);

  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: `${radius}px`,
        backdropFilter: `blur(${blur}px)`,
        background: `rgba(255,255,255,${opacity})`,
        border: '1px solid rgba(255,255,255,0.3)',
        width: '350px',
        color: 'white',
      }}
    >
      <h2>Theme Customizer</h2>

      <label>Blur: {blur}px</label>
      <input
        type='range'
        min='0'
        max='30'
        value={blur}
        onChange={e => setBlur(Number(e.target.value))}
      />

      <label>Opacity: {opacity}</label>
      <input
        type='range'
        min='0.1'
        max='1'
        step='0.1'
        value={opacity}
        onChange={e => setOpacity(Number(e.target.value))}
      />

      <label>Border Radius: {radius}px</label>
      <input
        type='range'
        min='0'
        max='50'
        value={radius}
        onChange={e => setRadius(Number(e.target.value))}
      />
    </div>
  );
};

export default ThemeCustomizer;
