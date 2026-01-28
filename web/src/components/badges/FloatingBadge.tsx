import { type ReactNode, useId } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

type BadgeColorVariant = 'red' | 'orange' | 'purple' | 'green' | 'cyan' | 'default'

interface FloatingBadgeProps {
  /** Badge content */
  children: ReactNode
  /** Color variant */
  variant?: BadgeColorVariant
  /** Animation delay in seconds */
  delay?: number
  /** Additional class names */
  className?: string
  /** Disable floating animation */
  static?: boolean
  /** Optional seed for deterministic animation variation */
  seed?: number
}

const variantStyles: Record<BadgeColorVariant, string> = {
  red: 'bg-gradient-red/10 text-gradient-red border-gradient-red/20',
  orange: 'bg-gradient-orange/10 text-gradient-orange border-gradient-orange/20',
  purple: 'bg-gradient-purple/10 text-gradient-purple border-gradient-purple/20',
  green: 'bg-gradient-green/10 text-gradient-green border-gradient-green/20',
  cyan: 'bg-gradient-cyan/10 text-gradient-cyan border-gradient-cyan/20',
  default: 'bg-bg-tertiary/80 text-text-secondary border-border-primary',
}

/**
 * Simple hash function for deterministic variation from string
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

/**
 * Floating badge with semi-transparent background and smooth animation
 * GPU-accelerated using transform for smooth 60fps animation
 */
export function FloatingBadge({
  children,
  variant = 'default',
  delay = 0,
  className,
  static: isStatic = false,
  seed,
}: FloatingBadgeProps) {
  const id = useId()
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldAnimate = !isStatic && !prefersReducedMotion

  // Use deterministic variation based on id or seed
  const hashValue = seed !== undefined ? seed : hashString(id)
  const durationVariation = 5 + (hashValue % 20) / 10 // 5-7 seconds
  const yVariation = 8 + (hashValue % 40) / 10 // 8-12px
  const delayVariation = (hashValue % 20) / 10 // 0-2 seconds

  return (
    <motion.span
      className={cn(
        'inline-flex items-center px-3 py-1.5',
        'text-xs font-medium rounded-full',
        'backdrop-blur-md border',
        'will-change-transform',
        variantStyles[variant],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 0.7, 
        y: shouldAnimate 
          ? [0, -yVariation, 0] 
          : 0 
      }}
      transition={shouldAnimate ? {
        opacity: { duration: 0.6, delay },
        y: {
          duration: durationVariation,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + delayVariation,
        },
      } : {
        opacity: { duration: 0.6, delay },
      }}
      aria-hidden="true"
    >
      {children}
    </motion.span>
  )
}
