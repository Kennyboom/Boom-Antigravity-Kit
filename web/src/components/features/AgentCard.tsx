import { type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'

interface AgentCardProps {
  /** Agent icon from Lucide */
  icon: LucideIcon
  /** Agent name */
  name: string
  /** Agent role/description */
  role: string
  /** Category badge */
  category: string
  /** Capability tags */
  capabilities: string[]
  /** Additional class names */
  className?: string
  /** Click handler */
  onClick?: () => void
}

const categoryColors: Record<string, 'default' | 'red' | 'orange' | 'purple' | 'green' | 'cyan'> = {
  Core: 'cyan',
  Engineering: 'purple',
  Quality: 'green',
  Support: 'orange',
  default: 'default',
}

/**
 * Card displaying an agent with icon, name, role, and capabilities
 * Hover effects for interactivity
 */
export function AgentCard({
  icon: Icon,
  name,
  role,
  category,
  capabilities,
  className,
  onClick,
}: AgentCardProps) {
  const badgeVariant = categoryColors[category] || categoryColors.default

  return (
    <motion.div
      className={cn(
        'group relative h-full',
        'bg-bg-secondary rounded-xl overflow-hidden',
        'border border-border-secondary',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:border-border-accent',
        'hover:shadow-[var(--shadow-glow-accent)]',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
    >
      <div className="p-5">
        {/* Header with icon and category */}
        <div className="flex items-start justify-between mb-4">
          {/* Agent icon */}
          <div className="p-3 rounded-lg bg-bg-tertiary">
            <Icon 
              size={24} 
              className="text-text-accent" 
              aria-hidden="true" 
            />
          </div>
          
          {/* Category badge */}
          <Badge variant={badgeVariant} size="sm">
            {category}
          </Badge>
        </div>

        {/* Name and role */}
        <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-text-accent transition-colors">
          {name}
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          {role}
        </p>

        {/* Capabilities tags */}
        <div className="flex flex-wrap gap-1.5">
          {capabilities.slice(0, 4).map((capability) => (
            <span
              key={capability}
              className="px-2 py-0.5 text-xs rounded-md bg-bg-tertiary text-text-muted"
            >
              {capability}
            </span>
          ))}
          {capabilities.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-bg-tertiary text-text-muted">
              +{capabilities.length - 4} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
