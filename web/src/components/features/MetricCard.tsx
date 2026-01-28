import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

interface MetricCardProps {
  /** Metric value (number as string, e.g., "70%", "310+") */
  value: string
  /** Metric label */
  label: string
  /** Optional icon */
  icon?: LucideIcon
  /** Emoji icon (alternative) */
  emoji?: string
  /** Suffix for the number (e.g., "%", "+") */
  suffix?: string
  /** Duration of count-up animation in ms */
  animationDuration?: number
  /** Additional class names */
  className?: string
}

/**
 * Card displaying a metric with optional count-up animation on scroll
 * Extracts numeric value for animation, preserves suffix
 */
export function MetricCard({
  value,
  label,
  icon: Icon,
  emoji,
  suffix,
  animationDuration = 1500,
  className,
}: MetricCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
    triggerOnce: true,
  })
  const prefersReducedMotion = usePrefersReducedMotion()
  
  // Extract numeric value and auto-detect suffix
  const numericMatch = value.match(/^(\d+)(.*)$/)
  const targetNumber = numericMatch ? parseInt(numericMatch[1], 10) : 0
  const detectedSuffix = suffix ?? (numericMatch ? numericMatch[2] : '')
  
  const [displayNumber, setDisplayNumber] = useState(prefersReducedMotion ? targetNumber : 0)

  useEffect(() => {
    if (!isIntersecting || prefersReducedMotion) return
    
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * targetNumber)
      
      setDisplayNumber(current)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayNumber(targetNumber)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isIntersecting, targetNumber, animationDuration, prefersReducedMotion])

  return (
    <motion.div
      ref={ref}
      className={cn(
        'text-center p-6',
        'bg-bg-secondary rounded-xl',
        'border border-border-secondary',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon */}
      {(Icon || emoji) && (
        <div className="mb-3 text-2xl">
          {emoji ? (
            <span role="img" aria-hidden="true">{emoji}</span>
          ) : Icon ? (
            <Icon size={28} className="mx-auto text-text-accent" aria-hidden="true" />
          ) : null}
        </div>
      )}
      
      {/* Value */}
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        {displayNumber}
        {detectedSuffix && (
          <span className="text-text-accent">{detectedSuffix}</span>
        )}
      </div>
      
      {/* Label */}
      <div className="text-sm text-text-muted">
        {label}
      </div>
    </motion.div>
  )
}

/**
 * Compact inline metric display
 */
interface InlineMetricProps {
  value: string
  label: string
  icon?: LucideIcon
  emoji?: string
  className?: string
}

export function InlineMetric({ value, label, icon: Icon, emoji, className }: InlineMetricProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
        {value}
      </div>
      <div className="text-sm text-text-muted flex items-center gap-1 justify-center">
        {emoji && <span role="img" aria-hidden="true">{emoji}</span>}
        {Icon && <Icon size={14} className="text-text-muted" aria-hidden="true" />}
        <span>{label}</span>
      </div>
    </div>
  )
}
