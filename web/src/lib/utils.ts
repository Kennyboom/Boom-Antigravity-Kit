import { clsx, type ClassValue } from 'clsx'

/**
 * Merge class names with clsx
 * Utility for conditionally joining classNames together
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format a number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
