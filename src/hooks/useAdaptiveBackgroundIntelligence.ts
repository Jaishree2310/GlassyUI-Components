import { useEffect, useState, type RefObject } from 'react';
import {
  AdaptiveGlassMetrics,
  analyzeBackgroundData,
  deriveAdaptiveGlassMetrics,
} from '../utils/adaptiveBackground';

interface AdaptiveBackgroundOptions {
  updateInterval?: number;
}

const defaultAdaptiveMetrics = (
  textColor = '#FFFFFF',
): AdaptiveGlassMetrics => ({
  blur: 12,
  opacity: 0.42,
  borderOpacity: 0.24,
  glowIntensity: 0.24,
  shadowSoftness: 18,
  textColor,
  baseTint: 'rgba(255, 255, 255, 0.28)',
  accentColor: 'rgba(255, 255, 255, 0.24)',
});

const useAdaptiveBackgroundIntelligence = (
  canvasRef: RefObject<HTMLCanvasElement>,
  options: AdaptiveBackgroundOptions = {},
) => {
  const { updateInterval = 80 } = options;
  const [adaptiveMetrics, setAdaptiveMetrics] = useState<AdaptiveGlassMetrics>(
    defaultAdaptiveMetrics(),
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frame: number | undefined;
    let lastUpdate = 0;

    const sampleBackground = (time: number) => {
      if (time - lastUpdate < updateInterval) {
        frame = requestAnimationFrame(sampleBackground);
        return;
      }

      lastUpdate = time;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        frame = requestAnimationFrame(sampleBackground);
        return;
      }

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const backgroundMetrics = analyzeBackgroundData({
        data: imageData.data,
        width: imageData.width,
        height: imageData.height,
      });
      setAdaptiveMetrics(deriveAdaptiveGlassMetrics(backgroundMetrics));
      frame = requestAnimationFrame(sampleBackground);
    };

    frame = requestAnimationFrame(sampleBackground);
    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [canvasRef, updateInterval]);

  return adaptiveMetrics;
};

export default useAdaptiveBackgroundIntelligence;
