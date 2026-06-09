/**
 * Returns Tailwind classes for the glassmorphism effect.
 * Includes performance optimizations with will-change and contain properties.
 *
 * @param opacity - Background white opacity (0–100). Default 20.
 * @param optimizePerformance - Add will-change and contain properties. Default true.
 *
 * Usage:
 *   import { getGlassyClasses } from '../utils/glassy';
 *   <div className={getGlassyClasses()}>...</div>
 *   <div className={getGlassyClasses(10, true)}>...</div>
 */
export const getGlassyClasses = (
  opacity: number = 20,
  optimizePerformance: boolean = true,
): string => {
  const baseClasses = `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  const performanceClasses = optimizePerformance
    ? 'will-change-transform will-change-opacity'
    : '';
  return `${baseClasses} ${performanceClasses}`.trim();
};
