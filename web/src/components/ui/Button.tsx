import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[36px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[52px]',
}

const baseClasses = `
  inline-flex items-center justify-center
  font-medium rounded-lg
  min-w-[44px]
  transition-all duration-300 ease-out
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]
  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  select-none
`

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    btn-gradient-bg
    text-white
    shadow-lg
    hover:shadow-[var(--shadow-button-hover)]
    hover:-translate-y-0.5
    active:translate-y-0 active:shadow-lg
  `,
  secondary: `
    btn-gradient-border
    bg-transparent
    text-white
    hover:bg-[var(--color-bg-hover)]
    hover:-translate-y-0.5
    active:translate-y-0
  `,
}

function isLink(props: ButtonProps): props is ButtonAsLink {
  return 'href' in props && props.href !== undefined
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const { variant = 'primary', size = 'md', className, children, ...rest } = props

    const classes = cn(
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      className
    )

    if (isLink(props)) {
      const { href, ...linkProps } = rest as ButtonAsLink
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

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonAsButton)}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
