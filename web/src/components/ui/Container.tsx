import { type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
  as?: 'div' | 'main' | 'section' | 'article'
  children: React.ReactNode
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-2xl',      // 672px
  md: 'max-w-4xl',      // 896px
  lg: 'max-w-6xl',      // 1152px
  xl: 'max-w-[1200px]', // 1200px - default
  full: 'max-w-full',
}

const baseClasses = `
  w-full
  mx-auto
  px-4
  md:px-8
`

export function Container({
  size = 'xl',
  as: Component = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        baseClasses,
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
