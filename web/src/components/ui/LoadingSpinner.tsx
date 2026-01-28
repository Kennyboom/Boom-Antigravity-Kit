import { cn } from '../../lib/utils'

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'

interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: SpinnerSize
  /** Additional class names */
  className?: string
  /** Accessible label */
  label?: string
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4',
}

/**
 * Spinning loading indicator
 * Uses accent color and respects reduced motion preferences
 */
export function LoadingSpinner({
  size = 'md',
  className,
  label = 'Loading...',
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('flex items-center justify-center', className)}
    >
      <div
        className={cn(
          'rounded-full',
          'border-border-primary',
          'border-t-text-accent',
          'animate-spin',
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

/**
 * Full page loading overlay
 */
interface LoadingOverlayProps {
  /** Loading message */
  message?: string
  /** Show backdrop */
  backdrop?: boolean
}

export function LoadingOverlay({ message, backdrop = true }: LoadingOverlayProps) {
  return (
    <div 
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center',
        backdrop && 'bg-bg-primary/80 backdrop-blur-sm'
      )}
    >
      <LoadingSpinner size="xl" />
      {message && (
        <p className="mt-4 text-text-secondary">{message}</p>
      )}
    </div>
  )
}

/**
 * Inline loading state for buttons or small areas
 */
interface LoadingDotsProps {
  className?: string
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <span 
      className={cn('inline-flex items-center gap-1', className)}
      role="status"
      aria-label="Loading..."
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
          style={{
            animationDelay: `${i * 150}ms`,
            animationDuration: '600ms',
          }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Loading...</span>
    </span>
  )
}

/**
 * Skeleton loading placeholder
 */
interface SkeletonProps {
  className?: string
  /** Skeleton shape */
  variant?: 'text' | 'rectangular' | 'circular'
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-bg-tertiary',
        variant === 'text' && 'h-4 rounded',
        variant === 'rectangular' && 'rounded-lg',
        variant === 'circular' && 'rounded-full',
        className
      )}
      aria-hidden="true"
    />
  )
}
