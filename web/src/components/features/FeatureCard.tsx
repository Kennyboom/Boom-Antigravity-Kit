import { ArrowRight, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'

interface FeatureCardProps {
  /** Icon component from Lucide */
  icon?: LucideIcon
  /** Emoji icon (alternative to Lucide icon) */
  emoji?: string
  /** Feature title */
  title: string
  /** Feature description */
  description: string
  /** Link to feature page */
  href: string
  /** Badge label */
  badge?: string
  /** Badge variant */
  badgeVariant?: 'default' | 'red' | 'orange' | 'purple' | 'green' | 'cyan'
  /** Additional class names */
  className?: string
}

/**
 * Feature card with icon, title, description, and arrow link
 * Gradient border appears on hover
 */
export function FeatureCard({
  icon: Icon,
  emoji,
  title,
  description,
  href,
  badge,
  badgeVariant = 'purple',
  className,
}: FeatureCardProps) {
  return (
    <motion.a
      href={href}
      className={cn(
        'group block relative h-full',
        'bg-bg-secondary rounded-xl overflow-hidden',
        'border border-border-secondary',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:border-transparent',
        'hover:shadow-[var(--shadow-glow-gradient)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-text-accent focus-visible:ring-offset-2',
        'focus-visible:ring-offset-bg-primary',
        className
      )}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Gradient border overlay */}
      <div 
        className={cn(
          'absolute inset-0 rounded-xl p-[1px]',
          'bg-gradient-to-br from-gradient-red via-gradient-orange to-gradient-purple',
          'opacity-0 transition-opacity duration-300',
          'group-hover:opacity-100',
          '-z-10'
        )}
        aria-hidden="true"
      />

      <div className="p-6 h-full flex flex-col">
        {/* Header with icon and badge */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className="text-4xl">
            {emoji ? (
              <span role="img" aria-hidden="true">{emoji}</span>
            ) : Icon ? (
              <Icon 
                size={40} 
                className="text-text-accent" 
                aria-hidden="true" 
              />
            ) : null}
          </div>
          
          {/* Badge */}
          {badge && (
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="heading-card mb-3 group-hover:text-text-accent transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-body flex-grow mb-4">
          {description}
        </p>

        {/* Arrow link */}
        <div className="flex items-center text-sm font-medium text-text-accent">
          <span>Learn more</span>
          <ArrowRight 
            size={16} 
            className="ml-1 transition-transform duration-300 group-hover:translate-x-1" 
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.a>
  )
}
