import { type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type BadgeVariant = 'default' | 'red' | 'orange' | 'purple' | 'green' | 'cyan'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  children: React.ReactNode
}

const baseClasses = `
  inline-flex items-center justify-center
  font-medium
  rounded-full
  whitespace-nowrap
  select-none
`

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
}

const variantClasses: Record<BadgeVariant, string> = {
  default: `
    bg-[var(--color-bg-tertiary)]
    text-[var(--color-text-secondary)]
    border border-[var(--color-border-primary)]
  `,
  red: `
    bg-[rgba(255,68,68,0.15)]
    text-[var(--color-gradient-red)]
    border border-[rgba(255,68,68,0.3)]
  `,
  orange: `
    bg-[rgba(255,136,68,0.15)]
    text-[var(--color-gradient-orange)]
    border border-[rgba(255,136,68,0.3)]
  `,
  purple: `
    bg-[rgba(136,68,255,0.15)]
    text-[var(--color-gradient-purple)]
    border border-[rgba(136,68,255,0.3)]
  `,
  green: `
    bg-[rgba(0,255,136,0.15)]
    text-[var(--color-text-accent)]
    border border-[var(--color-border-accent)]
  `,
  cyan: `
    bg-[rgba(0,212,255,0.15)]
    text-[var(--color-gradient-cyan)]
    border border-[rgba(0,212,255,0.3)]
  `,
}

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Status badge for platform status indicators
type StatusType = 'full' | 'partial' | 'coming' | 'new' | 'beta'

interface StatusBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  status: StatusType
  children?: React.ReactNode
}

const statusConfig: Record<StatusType, { label: string; variant: BadgeVariant }> = {
  full: { label: 'Full Support', variant: 'green' },
  partial: { label: 'Partial', variant: 'orange' },
  coming: { label: 'Coming Soon', variant: 'purple' },
  new: { label: 'New', variant: 'cyan' },
  beta: { label: 'Beta', variant: 'orange' },
}

export function StatusBadge({ status, className, children, ...props }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge variant={config.variant} className={className} {...props}>
      {children || config.label}
    </Badge>
  )
}

// Category badge for feature/agent categories
interface CategoryBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  category: string
  children?: React.ReactNode
}

const categoryColors: Record<string, BadgeVariant> = {
  orchestration: 'red',
  agents: 'orange',
  workflows: 'purple',
  integration: 'cyan',
  'developer-experience': 'green',
  default: 'default',
}

export function CategoryBadge({ category, className, children, ...props }: CategoryBadgeProps) {
  const variant = categoryColors[category.toLowerCase()] || categoryColors.default
  return (
    <Badge variant={variant} size="sm" className={className} {...props}>
      {children || category}
    </Badge>
  )
}
