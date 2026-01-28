import { motion } from 'framer-motion'
import { Check, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface PlatformBadgeProps {
  /** Platform name */
  name: string
  /** Platform icon from Lucide */
  icon?: LucideIcon
  /** Emoji icon (alternative) */
  emoji?: string
  /** Support status */
  status?: 'full' | 'partial' | 'coming-soon'
  /** Link to platform docs */
  href?: string
  /** Additional class names */
  className?: string
}

const statusConfig = {
  full: {
    text: 'Full Support',
    className: 'bg-gradient-green/10 text-gradient-green border-gradient-green/30',
    icon: Check,
  },
  partial: {
    text: 'Partial',
    className: 'bg-gradient-orange/10 text-gradient-orange border-gradient-orange/30',
    icon: null,
  },
  'coming-soon': {
    text: 'Coming Soon',
    className: 'bg-bg-tertiary text-text-muted border-border-primary',
    icon: null,
  },
}

/**
 * Platform badge with icon, name, and support status
 * Hover lift effect for interactivity
 */
export function PlatformBadge({
  name,
  icon: Icon,
  emoji,
  status = 'full',
  href,
  className,
}: PlatformBadgeProps) {
  const statusInfo = statusConfig[status]
  const StatusIcon = statusInfo.icon

  const content = (
    <motion.div
      className={cn(
        'relative flex flex-col items-center p-6',
        'bg-bg-secondary rounded-xl',
        'border border-border-secondary',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-2 hover:shadow-[var(--shadow-glow-accent)]',
        'hover:border-border-accent',
        href && 'cursor-pointer',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Platform icon */}
      <div className="mb-4 text-4xl">
        {emoji ? (
          <span role="img" aria-label={name}>{emoji}</span>
        ) : Icon ? (
          <Icon size={40} className="text-text-accent" aria-hidden="true" />
        ) : null}
      </div>

      {/* Platform name */}
      <h3 className="text-lg font-semibold text-text-primary mb-3">
        {name}
      </h3>

      {/* Status badge */}
      <span 
        className={cn(
          'inline-flex items-center gap-1 px-3 py-1',
          'text-xs font-medium rounded-full border',
          statusInfo.className
        )}
      >
        {StatusIcon && <StatusIcon size={12} aria-hidden="true" />}
        {statusInfo.text}
      </span>
    </motion.div>
  )

  if (href) {
    return (
      <a 
        href={href} 
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-xl"
      >
        {content}
      </a>
    )
  }

  return content
}

/**
 * Grid container for platform badges
 */
interface PlatformGridProps {
  children: React.ReactNode
  className?: string
}

export function PlatformGrid({ children, className }: PlatformGridProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-6', className)}>
      {children}
    </div>
  )
}
