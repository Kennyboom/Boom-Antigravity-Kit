import { type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Container } from './Container'

type SectionBackground = 'primary' | 'secondary' | 'gradient' | 'transparent'
type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl' | 'none'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: SectionBackground
  spacing?: SectionSpacing
  contained?: boolean
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
}

const backgroundClasses: Record<SectionBackground, string> = {
  primary: 'bg-[var(--color-bg-primary)]',
  secondary: 'bg-[var(--color-bg-secondary)]',
  gradient: `
    bg-[var(--color-bg-primary)]
    relative
    before:content-['']
    before:absolute
    before:inset-0
    before:bg-gradient-to-b
    before:from-[rgba(255,68,68,0.03)]
    before:via-transparent
    before:to-[rgba(136,68,255,0.03)]
    before:pointer-events-none
  `,
  transparent: 'bg-transparent',
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-24 md:py-32', // 6rem = 96px / ~6rem
}

export function Section({
  background = 'primary',
  spacing = 'xl',
  contained = true,
  containerSize = 'xl',
  className,
  children,
  ...props
}: SectionProps) {
  const content = contained ? (
    <Container size={containerSize}>{children}</Container>
  ) : (
    children
  )

  return (
    <section
      className={cn(
        backgroundClasses[background],
        spacingClasses[spacing],
        'relative',
        className
      )}
      {...props}
    >
      {content}
    </section>
  )
}

// Section header for consistent title + description patterns
interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  align?: 'left' | 'center'
  titleAs?: 'h1' | 'h2' | 'h3'
}

export function SectionHeader({
  title,
  description,
  align = 'center',
  titleAs: TitleTag = 'h2',
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
      {...props}
    >
      <TitleTag className="heading-section mb-4">{title}</TitleTag>
      {description && (
        <p
          className={cn(
            'text-body max-w-2xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
