import {
  analyzeBackgroundData,
  deriveAdaptiveGlassMetrics,
} from './adaptiveBackground';

describe('adaptiveBackground utilities', () => {
  it('analyzes dark backgrounds and increases contrast handling', () => {
    const darkData = {
      data: new Uint8ClampedArray([
        24, 28, 36, 255, 24, 28, 36, 255, 24, 28, 36, 255, 24, 28, 36, 255,
      ]),
      width: 2,
      height: 2,
    };

    const backgroundMetrics = analyzeBackgroundData(darkData);
    expect(backgroundMetrics.brightness).toBeLessThan(0.2);
    expect(backgroundMetrics.complexity).toBeLessThan(0.1);

    const adaptive = deriveAdaptiveGlassMetrics(backgroundMetrics);
    expect(adaptive.textColor).toBe('#FFFFFF');
    expect(adaptive.blur).toBeGreaterThanOrEqual(10);
    expect(adaptive.opacity).toBeGreaterThanOrEqual(0.28);
    expect(adaptive.borderOpacity).toBeGreaterThan(0.12);
  });

  it('returns a softer, higher-contrast profile for bright backgrounds', () => {
    const lightData = {
      data: new Uint8ClampedArray([
        248, 250, 252, 255, 248, 250, 252, 255, 248, 250, 252, 255, 248, 250,
        252, 255,
      ]),
      width: 2,
      height: 2,
    };

    const backgroundMetrics = analyzeBackgroundData(lightData);
    expect(backgroundMetrics.brightness).toBeGreaterThan(0.7);

    const adaptive = deriveAdaptiveGlassMetrics(backgroundMetrics);
    expect(adaptive.textColor).toBe('#0F172A');
    expect(adaptive.glowIntensity).toBeGreaterThanOrEqual(0.16);
    expect(adaptive.shadowSoftness).toBeGreaterThanOrEqual(10);
  });
});
