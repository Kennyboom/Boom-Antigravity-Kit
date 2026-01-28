import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'

interface HeaderProps {
  className?: string
}

/**
 * Header - Sticky header with navigation
 * Features: backdrop blur, logo, navigation, mobile hamburger menu
 */
export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')

  // Track scroll for enhanced header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when resizing to desktop
  // Using layout effect timing to avoid cascading renders
  const wasDesktop = !isMobile
  if (wasDesktop && isMobileMenuOpen) {
    // Schedule close on next tick to avoid setState in render
    queueMicrotask(() => setIsMobileMenuOpen(false))
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled
            ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-lg shadow-lg'
            : 'bg-[rgba(10,10,10,0.8)] backdrop-blur-md',
          'border-b border-[rgba(255,255,255,0.1)]',
          className
        )}
      >
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              to="/"
              className={cn(
                'flex items-center gap-3',
                'group',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[var(--color-text-accent)]',
                'rounded-lg'
              )}
              aria-label="Agent Assistant - Home"
            >
              <motion.img
                src="/assets/logo.svg"
                alt=""
                className="h-8 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'text-lg font-semibold',
                  'text-[var(--color-text-primary)]',
                  'group-hover:text-[var(--color-text-accent)]',
                  'transition-colors duration-200',
                  'hidden sm:inline'
                )}
              >
                Agent Assistant
              </span>
            </Link>

            {/* Desktop Navigation */}
            <Navigation />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                'md:hidden',
                'p-2 -mr-2',
                'text-[var(--color-text-secondary)]',
                'hover:text-[var(--color-text-primary)]',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[var(--color-text-accent)]',
                'rounded-lg',
                'transition-colors'
              )}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16 md:h-18" aria-hidden="true" />
    </>
  )
}
