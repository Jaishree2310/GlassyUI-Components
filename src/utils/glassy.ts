/**
 * Returns Tailwind classes for the glassmorphism effect.
 *
 * @param opacity - Background white opacity (0–100). Default 20.
 *
 * Usage:
 *   import { getGlassyClasses } from '../utils/glassy';
 *   <div className={getGlassyClasses()}>...</div>
 *   <div className={getGlassyClasses(10)}>...</div>
 */
export const getGlassyClasses = (opacity: number = 20): string =>
  `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
