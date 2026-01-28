import { useTerminalAnimation } from '../../hooks/useTerminalAnimation'
import { cn } from '../../lib/utils'
import { CopyButton } from './CopyButton'

interface TerminalAnimatedProps {
  /** Command to animate */
  command: string
  /** Terminal window title */
  title?: string
  /** Show the $ prompt */
  showPrompt?: boolean
  /** Animation speed in ms per character */
  speed?: number
  /** Delay before animation starts */
  delay?: number
  /** Additional class names */
  className?: string
  /** Show copy button */
  showCopy?: boolean
}

/**
 * Terminal component with typing animation
 * Accessible: provides full text to screen readers while animating visually
 */
export function TerminalAnimated({
  command,
  title = 'Terminal',
  showPrompt = true,
  speed = 50,
  delay = 0,
  className,
  showCopy = true,
}: TerminalAnimatedProps) {
  const { displayedText, isComplete, fullText } = useTerminalAnimation({
    text: command,
    speed,
    delay,
  })

  return (
    <div
      className={cn(
        'terminal-glow rounded-lg overflow-hidden',
        'bg-[#1a1a1a] border border-border-primary',
        className
      )}
      role="region"
      aria-label={`Terminal: ${title}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-secondary bg-bg-tertiary/50">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 text-xs text-text-muted font-medium">{title}</span>
        </div>
        
        {/* Copy button */}
        {showCopy && <CopyButton text={fullText} />}
      </div>

      {/* Terminal Content */}
      <div className="px-4 py-4 font-mono text-sm leading-relaxed overflow-x-auto">
        {/* Screen reader only: full text */}
        <span className="sr-only">{fullText}</span>
        
        {/* Visual display with animation */}
        <div className="flex" aria-hidden="true">
          {showPrompt && (
            <span className="text-text-muted select-none mr-2">$</span>
          )}
          <code className="text-[#00ff88]">
            {displayedText}
            {/* Blinking cursor */}
            {!isComplete && (
              <span className="inline-block w-2 h-4 ml-0.5 bg-text-accent animate-blink" />
            )}
          </code>
        </div>
      </div>
    </div>
  )
}
