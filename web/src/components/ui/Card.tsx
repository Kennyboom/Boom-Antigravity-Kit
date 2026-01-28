import { forwardRef, type HTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type CardVariant = 'default' | 'elevated' | 'bordered'

interface CardBaseProps {
  variant?: CardVariant
  className?: string
  children: React.ReactNode
  hoverable?: boolean
}

type CardAsDiv = CardBaseProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CardBaseProps> & {
    as?: 'div'
    href?: never
  }

type CardAsLink = CardBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CardBaseProps> & {
    as: 'link'
    href: string
  }

type CardAsArticle = CardBaseProps &
  Omit<HTMLAttributes<HTMLElement>, keyof CardBaseProps> & {
    as: 'article'
    href?: never
  }

export type CardProps = CardAsDiv | CardAsLink | CardAsArticle

const baseClasses = `
  bg-[var(--color-bg-secondary)]
  border border-[var(--color-border-secondary)]
  rounded-xl
  overflow-hidden
`

const variantClasses: Record<CardVariant, string> = {
  default: '',
  elevated: 'shadow-lg shadow-black/20',
  bordered: 'border-[var(--color-border-primary)]',
}

const hoverClasses = `
  transition-all duration-300 ease-out
  hover:-translate-y-1
  hover:border-transparent
  hover:shadow-[var(--shadow-glow-gradient)]
  group
  
  before:content-['']
  before:absolute
  before:inset-0
  before:rounded-xl
  before:p-[1px]
  before:bg-gradient-to-br
  before:from-[var(--color-gradient-red)]
  before:via-[var(--color-gradient-orange)]
  before:to-[var(--color-gradient-purple)]
  before:opacity-0
  before:transition-opacity
  before:duration-300
  before:-z-10
  
  hover:before:opacity-100
`

const linkClasses = `
  block
  no-underline
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-[var(--color-text-accent)]
  focus-visible:ring-offset-2
  focus-visible:ring-offset-[var(--color-bg-primary)]
`

export const Card = forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>(
  (props, ref) => {
    const {
      variant = 'default',
      hoverable = false,
      className,
      children,
      ...rest
    } = props

    const classes = cn(
      baseClasses,
      variantClasses[variant],
      hoverable && 'relative',
      hoverable && hoverClasses,
      props.as === 'link' && linkClasses,
      className
    )

    if (props.as === 'link') {
      const { href, ...linkProps } = rest as CardAsLink
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...linkProps}
        >
          {children}
        </a>
      )
    }

    if (props.as === 'article') {
      return (
        <article
          ref={ref as React.Ref<HTMLDivElement>}
          className={classes}
          {...(rest as CardAsArticle)}
        >
          {children}
        </article>
      )
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={classes}
        {...(rest as CardAsDiv)}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card subcomponents for composition
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-[var(--color-border-secondary)]', className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-[var(--color-border-secondary)]', className)}
      {...props}
    >
      {children}
    </div>
  )
}
