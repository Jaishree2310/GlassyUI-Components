export interface ImageDataLike {
  data: Uint8ClampedArray | number[];
  width: number;
  height: number;
}

export interface BackgroundMetrics {
  averageColor: [number, number, number];
  brightness: number;
  saturation: number;
  complexity: number;
  dominantColor: string;
}

export interface AdaptiveGlassMetrics {
  blur: number;
  opacity: number;
  borderOpacity: number;
  glowIntensity: number;
  shadowSoftness: number;
  textColor: string;
  baseTint: string;
  accentColor: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const rgbaToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map(value => Math.round(value).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;

const rgbToLuminance = (r: number, g: number, b: number) =>
  0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

const contrastRatio = (
  colorA: [number, number, number],
  colorB: [number, number, number],
) => {
  const luminanceA = rgbToLuminance(colorA[0], colorA[1], colorA[2]);
  const luminanceB = rgbToLuminance(colorB[0], colorB[1], colorB[2]);
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
};

export const analyzeBackgroundData = (
  imageData: ImageDataLike,
): BackgroundMetrics => {
  const { data, width, height } = imageData;
  const sampleStride = Math.max(
    1,
    Math.floor(Math.sqrt((width * height) / 3200)),
  );

  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  let totalPixels = 0;
  let varianceSum = 0;

  for (let y = 0; y < height; y += sampleStride) {
    for (let x = 0; x < width; x += sampleStride) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      totalR += r;
      totalG += g;
      totalB += b;
      totalPixels += 1;
    }
  }

  const averageR = totalR / totalPixels;
  const averageG = totalG / totalPixels;
  const averageB = totalB / totalPixels;

  const averageLuminance = rgbToLuminance(averageR, averageG, averageB);

  const maxChannel = Math.max(averageR, averageG, averageB);
  const minChannel = Math.min(averageR, averageG, averageB);

  const saturation =
    maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel;

  for (let y = 0; y < height; y += sampleStride) {
    for (let x = 0; x < width; x += sampleStride) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      const luminance = rgbToLuminance(r, g, b);
      varianceSum += Math.pow(luminance - averageLuminance, 2);
    }
  }

  const meanVariance = varianceSum / totalPixels;
  const complexity = clamp(Math.sqrt(meanVariance / 0.25), 0, 1);

  const dominantColor = rgbaToHex(averageR, averageG, averageB);

  return {
    averageColor: [averageR, averageG, averageB],
    brightness: averageLuminance,
    saturation,
    complexity,
    dominantColor,
  };
};

export const deriveAdaptiveGlassMetrics = (
  backgroundMetrics: BackgroundMetrics,
): AdaptiveGlassMetrics => {
  const { averageColor, brightness, saturation, complexity } =
    backgroundMetrics;
  const [r, g, b] = averageColor;

  const adaptiveBrightness = clamp(brightness, 0, 1);
  const adaptiveComplexity = clamp(complexity, 0, 1);
  const adaptiveSaturation = clamp(saturation, 0, 1);

  const averageColorArray: [number, number, number] = [r, g, b];
  const whiteContrast = contrastRatio(averageColorArray, [255, 255, 255]);
  const darkContrast = contrastRatio(averageColorArray, [15, 23, 42]);

  const textColor = whiteContrast >= darkContrast ? '#FFFFFF' : '#0F172A';

  const blur = clamp(
    10 + (1 - adaptiveBrightness) * 10 + adaptiveComplexity * 8,
    10,
    28,
  );

  const opacity = clamp(
    0.34 + (0.55 - adaptiveBrightness) * 0.25 + adaptiveComplexity * 0.06,
    0.28,
    0.68,
  );

  const borderOpacity = clamp(
    0.14 +
      adaptiveComplexity * 0.26 +
      (1 - Math.abs(adaptiveBrightness - 0.5)) * 0.06,
    0.12,
    0.54,
  );

  const glowIntensity = clamp(
    0.16 + adaptiveSaturation * 0.24 + adaptiveComplexity * 0.08,
    0.16,
    0.52,
  );

  const shadowSoftness = clamp(
    10 + adaptiveComplexity * 24 + (adaptiveBrightness > 0.55 ? 8 : 0),
    10,
    40,
  );

  const baseTint = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${clamp(0.22 + (1 - adaptiveBrightness) * 0.18, 0.2, 0.5)})`;
  const accentColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${clamp(0.24 + adaptiveSaturation * 0.22, 0.18, 0.52)})`;

  return {
    blur,
    opacity,
    borderOpacity,
    glowIntensity,
    shadowSoftness,
    textColor,
    baseTint,
    accentColor,
  };
};
