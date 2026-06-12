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

/**
 * Returns CSS custom properties for theme-aware shadows.
 * Use in style prop or define in global CSS.
 */
export const getThemeAwareShadows = (): Record<string, string> => ({
  '--shadow-light': 'rgba(255, 255, 255, 0.3)',
  '--shadow-dark': 'rgba(0, 0, 0, 0.3)',
  '--shadow-light-sm': '0 1px 2px var(--shadow-light)',
  '--shadow-light-md': '0 4px 6px var(--shadow-light)',
  '--shadow-light-lg': '0 10px 15px var(--shadow-light)',
  '--shadow-dark-sm': '0 1px 2px var(--shadow-dark)',
  '--shadow-dark-md': '0 4px 6px var(--shadow-dark)',
  '--shadow-dark-lg': '0 10px 15px var(--shadow-dark)',
});
