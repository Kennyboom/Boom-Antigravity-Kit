import { Copy, Check } from 'lucide-react'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { cn } from '../../lib/utils'

interface CopyButtonProps {
  /** Text to copy to clipboard */
  text: string
  /** Additional class names */
  className?: string
  /** Size of the button */
  size?: 'sm' | 'md'
}

/**
 * Button to copy text to clipboard with visual feedback
 * Accessible with aria-label and aria-live for screen readers
 */
export function CopyButton({ text, className, size = 'sm' }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  const handleClick = async () => {
    await copy(text)
  }

  const iconSize = size === 'sm' ? 14 : 16
  const paddingClass = size === 'sm' ? 'p-1.5' : 'p-2'

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        paddingClass,
        'rounded-md transition-all duration-200',
        'text-text-muted hover:text-text-primary',
        'hover:bg-bg-hover',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary',
        'min-w-[44px] min-h-[44px] flex items-center justify-center',
        copied && 'text-text-accent',
        className
      )}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied!' : 'Copy'}
      </span>
      {copied ? (
        <Check size={iconSize} className="text-text-accent" aria-hidden="true" />
      ) : (
        <Copy size={iconSize} aria-hidden="true" />
      )}
    </button>
  )
}
