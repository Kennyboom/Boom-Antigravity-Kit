import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'
import { Terminal } from '../terminal/Terminal'

interface CommandVariant {
  name: string
  description: string
}

interface CommandCardProps {
  /** Command name (e.g., "/cook", "/fix") */
  command: string
  /** Command description */
  description: string
  /** Example command usage */
  example: string
  /** Command variants */
  variants?: CommandVariant[]
  /** Additional class names */
  className?: string
}

/**
 * Card displaying a command with syntax highlighting and example
 * Shows variants as badges and includes a terminal preview
 */
export function CommandCard({
  command,
  description,
  example,
  variants = [],
  className,
}: CommandCardProps) {
  return (
    <motion.div
      className={cn(
        'group relative h-full',
        'bg-bg-secondary rounded-xl overflow-hidden',
        'border border-border-secondary',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:border-border-accent',
        'hover:shadow-[var(--shadow-glow-accent)]',
        className
      )}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="p-5">
        {/* Command header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-mono text-xl font-bold text-text-accent">
            {command}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4">
          {description}
        </p>

        {/* Variant badges */}
        {variants.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {variants.map((variant) => (
              <Badge 
                key={variant.name} 
                variant="default" 
                size="sm"
                title={variant.description}
              >
                :{variant.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Example terminal */}
        <Terminal
          command={example}
          title={command}
          showCopy={true}
          className="text-xs"
        />
      </div>
    </motion.div>
  )
}

/**
 * Compact command badge for inline display
 */
interface CommandBadgeProps {
  command: string
  variant?: string
  className?: string
}

export function CommandBadge({ command, variant, className }: CommandBadgeProps) {
  return (
    <span 
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1',
        'font-mono text-sm rounded-md',
        'bg-bg-tertiary text-text-accent',
        'border border-border-accent/30',
        className
      )}
    >
      <span>{command}</span>
      {variant && (
        <span className="text-text-muted">:{variant}</span>
      )}
    </span>
  )
}
