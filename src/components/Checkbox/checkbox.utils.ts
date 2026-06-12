import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility to toggle a value in an array (add if missing, remove if present)
 */
export function toggleArrayValue<T>(array: T[], value: T): T[] {
  const index = array.indexOf(value);
  if (index === -1) {
    return [...array, value];
  }
  const newArray = [...array];
  newArray.splice(index, 1);
  return newArray;
}
