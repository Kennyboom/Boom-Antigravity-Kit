import { cn } from '../../lib/utils'

interface SkipLinkProps {
  href?: string
  children?: React.ReactNode
  className?: string
}

/**
 * SkipLink - Accessible skip navigation link
 * Hidden until focused, allows keyboard users to skip to main content
 */
export function SkipLink({
  href = '#main-content',
  children = 'Skip to main content',
  className,
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'skip-link',
        'fixed z-[9999]',
        'px-6 py-3',
        'font-medium text-[var(--color-text-accent)]',
        'bg-[var(--color-bg-secondary)]',
        'border border-[var(--color-text-accent)]',
        'rounded-lg',
        'transition-all duration-200',
        '-translate-y-full opacity-0',
        'focus:translate-y-0 focus:opacity-100 focus:top-4',
        'focus:left-1/2 focus:-translate-x-1/2',
        className
      )}
    >
      {children}
    </a>
  )
}
