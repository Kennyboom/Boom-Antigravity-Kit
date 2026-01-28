import { useEffect, useRef, useState, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { NAV_ITEMS } from './Navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * MobileMenu - Full-screen slide-in drawer for mobile navigation
 * Accessible: focus trap, Esc to close, aria-hidden when closed
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const location = useLocation()

  // Close on route change
  const prevPathname = useRef(location.pathname)
  useEffect(() => {
    if (prevPathname.current !== location.pathname && isOpen) {
      onClose()
    }
    prevPathname.current = location.pathname
  }, [location.pathname, isOpen, onClose])

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return

    // Focus close button when opened
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }

      // Focus trap
      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const toggleSection = useCallback((label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    )
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'fixed top-0 right-0 bottom-0',
              'w-full max-w-sm',
              'bg-[var(--color-bg-primary)]',
              'border-l border-[var(--color-border-primary)]',
              'z-50 md:hidden',
              'flex flex-col'
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border-primary)]">
              <span className="text-lg font-semibold text-[var(--color-text-primary)]">
                Menu
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className={cn(
                  'p-2 -mr-2',
                  'text-[var(--color-text-secondary)]',
                  'hover:text-[var(--color-text-primary)]',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-[var(--color-text-accent)]',
                  'rounded-lg',
                  'transition-colors'
                )}
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <nav
              className="flex-1 overflow-y-auto py-4"
              aria-label="Mobile navigation"
            >
              <ul className="space-y-1 px-4">
                {NAV_ITEMS.map((item) => {
                  const isExpanded = expandedSections.includes(item.label)
                  const hasChildren = item.children && item.children.length > 0

                  if (hasChildren) {
                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => toggleSection(item.label)}
                          className={cn(
                            'w-full flex items-center justify-between',
                            'px-4 py-3 rounded-lg',
                            'text-left text-base font-medium',
                            'text-[var(--color-text-secondary)]',
                            'hover:text-[var(--color-text-primary)]',
                            'hover:bg-[var(--color-bg-hover)]',
                            'focus-visible:outline-none focus-visible:ring-2',
                            'focus-visible:ring-[var(--color-text-accent)]',
                            'transition-colors'
                          )}
                          aria-expanded={isExpanded}
                        >
                          {item.label}
                          <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden ml-4 mt-1 space-y-1"
                            >
                              {item.children?.map((child) => (
                                <li key={child.href}>
                                  <NavLink
                                    to={child.href}
                                    className={({ isActive }) =>
                                      cn(
                                        'block px-4 py-2.5 rounded-lg',
                                        'text-sm',
                                        'text-[var(--color-text-secondary)]',
                                        'hover:text-[var(--color-text-primary)]',
                                        'hover:bg-[var(--color-bg-hover)]',
                                        'focus-visible:outline-none focus-visible:ring-2',
                                        'focus-visible:ring-[var(--color-text-accent)]',
                                        'transition-colors',
                                        isActive &&
                                          'text-[var(--color-text-accent)] bg-[rgba(0,255,136,0.05)]'
                                      )
                                    }
                                    onClick={onClose}
                                  >
                                    {child.label}
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    )
                  }

                  if (item.external) {
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'flex items-center gap-2',
                            'px-4 py-3 rounded-lg',
                            'text-base font-medium',
                            'text-[var(--color-text-secondary)]',
                            'hover:text-[var(--color-text-primary)]',
                            'hover:bg-[var(--color-bg-hover)]',
                            'focus-visible:outline-none focus-visible:ring-2',
                            'focus-visible:ring-[var(--color-text-accent)]',
                            'transition-colors'
                          )}
                          onClick={onClose}
                        >
                          {item.label}
                          <svg
                            className="w-4 h-4 opacity-60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </li>
                    )
                  }

                  return (
                    <li key={item.href}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          cn(
                            'block px-4 py-3 rounded-lg',
                            'text-base font-medium',
                            'text-[var(--color-text-secondary)]',
                            'hover:text-[var(--color-text-primary)]',
                            'hover:bg-[var(--color-bg-hover)]',
                            'focus-visible:outline-none focus-visible:ring-2',
                            'focus-visible:ring-[var(--color-text-accent)]',
                            'transition-colors',
                            isActive &&
                              'text-[var(--color-text-accent)] bg-[rgba(0,255,136,0.05)]'
                          )
                        }
                        onClick={onClose}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--color-border-primary)]">
              <p className="text-sm text-[var(--color-text-muted)] text-center">
                © 2026 NamCH. MIT License.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
