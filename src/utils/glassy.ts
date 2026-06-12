/**
 * Returns Tailwind classes for the glassmorphism effect.
 * Includes performance optimizations with will-change and contain properties.
 * Supports theme-aware shadows for visibility on both light and dark backgrounds.
 *
 * @param opacity - Background white opacity (0-100). Default 20.
 * @param isDark - Whether to use dark theme shadows. Default false.
 * @param optimizePerformance - Enable performance optimizations. Default true.
 *
 * Usage:
 *   import { getGlassyClasses } from '../utils/glassy';
 *   <div className={getGlassyClasses()}>...</div>
 *   <div className={getGlassyClasses(10, true)}>...</div> // Dark background
 */
export const getGlassyClasses = (
  opacity: number = 20,
  isDark: boolean = false,
  optimizePerformance: boolean = true,
): string => {
  const baseClasses = `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg transition-all duration-300`;
  const shadowClass = isDark ? 'shadow-dark-lg' : 'shadow-lg';
  const performanceClasses = optimizePerformance
    ? 'will-change-transform will-change-opacity'
    : '';

  return `${baseClasses} ${shadowClass} ${performanceClasses}`.trim();
};
