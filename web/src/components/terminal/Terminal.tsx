import { type ReactNode } from 'react'
import { CopyButton } from './CopyButton'
import { cn } from '../../lib/utils'

interface TerminalProps {
  /** Command(s) to display */
  command: string | string[]
  /** Terminal window title */
  title?: string
  /** Show the $ prompt */
  showPrompt?: boolean
  /** Additional class names */
  className?: string
  /** Show copy button */
  showCopy?: boolean
  /** Custom content instead of command */
  children?: ReactNode
}

/**
 * Terminal component with macOS-style header and syntax highlighting
 * Supports single or multiple commands with optional copy functionality
 */
export function Terminal({
  command,
  title = 'Terminal',
  showPrompt = true,
  className,
  showCopy = true,
  children,
}: TerminalProps) {
  const commands = Array.isArray(command) ? command : [command]
  const copyText = commands.join('\n')

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
        {showCopy && <CopyButton text={copyText} />}
      </div>

      {/* Terminal Content */}
      <div className="px-4 py-4 font-mono text-sm leading-relaxed overflow-x-auto">
        {children || (
          <>
            {commands.map((cmd, index) => (
              <div key={index} className="flex">
                {showPrompt && (
                  <span className="text-text-muted select-none mr-2">$</span>
                )}
                <TerminalCommand command={cmd} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

interface TerminalCommandProps {
  command: string
}

/**
 * Renders a command with syntax highlighting
 */
function TerminalCommand({ command }: TerminalCommandProps) {
  // Simple syntax highlighting for common patterns
  const parts = highlightCommand(command)
  
  return (
    <code className="text-[#00ff88]">
      {parts.map((part, index) => (
        <span key={index} className={part.className}>
          {part.text}
        </span>
      ))}
    </code>
  )
}

interface HighlightedPart {
  text: string
  className: string
}

/**
 * Parse and highlight command parts
 */
function highlightCommand(command: string): HighlightedPart[] {
  const parts: HighlightedPart[] = []
  const tokens = command.split(/(\s+)/)
  let isFirstWord = true

  for (const token of tokens) {
    if (/^\s+$/.test(token)) {
      // Whitespace
      parts.push({ text: token, className: '' })
      continue
    }

    if (isFirstWord) {
      // Command name (e.g., npm, npx, git)
      parts.push({ text: token, className: 'text-[#00ff88]' })
      isFirstWord = false
    } else if (token.startsWith('-')) {
      // Flags
      parts.push({ text: token, className: 'text-[#ff8844]' })
    } else if (token.startsWith('@') || token.includes('/')) {
      // Package names or paths
      parts.push({ text: token, className: 'text-[#00d4ff]' })
    } else if (/^[A-Z_]+$/.test(token)) {
      // Environment variables or constants
      parts.push({ text: token, className: 'text-[#ff8844]' })
    } else if (token.startsWith('"') || token.startsWith("'")) {
      // Strings
      parts.push({ text: token, className: 'text-[#febc2e]' })
    } else {
      // Other arguments
      parts.push({ text: token, className: 'text-text-primary' })
    }
  }

  return parts
}

/**
 * Terminal output line component
 */
interface TerminalOutputProps {
  children: ReactNode
  className?: string
}

export function TerminalOutput({ children, className }: TerminalOutputProps) {
  return (
    <div className={cn('text-text-secondary', className)}>
      {children}
    </div>
  )
}

/**
 * Terminal comment line
 */
interface TerminalCommentProps {
  children: ReactNode
}

export function TerminalComment({ children }: TerminalCommentProps) {
  return (
    <div className="text-text-muted">
      <span className="text-text-muted"># {children}</span>
    </div>
  )
}
