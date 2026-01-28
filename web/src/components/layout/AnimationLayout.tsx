import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * Page transition animation variants
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
}

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
}

/**
 * Reduced motion variants (instant transitions)
 */
const reducedMotionVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

const reducedMotionTransition = {
  duration: 0.01,
}

interface AnimationLayoutProps {
  children?: React.ReactNode
}

/**
 * AnimationLayout - Wrapper for page transitions
 * Uses Framer Motion AnimatePresence for smooth page transitions
 * Respects prefers-reduced-motion user preference
 */
export function AnimationLayout({ children }: AnimationLayoutProps) {
  const location = useLocation()
  const prefersReducedMotion = usePrefersReducedMotion()

  const variants = prefersReducedMotion ? reducedMotionVariants : pageVariants
  const transition = prefersReducedMotion ? reducedMotionTransition : pageTransition

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={transition}
      >
        {children ?? <Outlet />}
      </motion.div>
    </AnimatePresence>
  )
}
