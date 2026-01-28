import { useState, useEffect, useCallback } from 'react'
import { usePrefersReducedMotion } from './useMediaQuery'

interface UseTerminalAnimationOptions {
  /** Text to animate */
  text: string
  /** Speed in milliseconds per character (default: 50) */
  speed?: number
  /** Delay before starting in milliseconds (default: 0) */
  delay?: number
  /** Whether animation is enabled (default: true) */
  enabled?: boolean
}

interface UseTerminalAnimationReturn {
  /** Currently displayed text */
  displayedText: string
  /** Whether animation is complete */
  isComplete: boolean
  /** Whether animation is in progress */
  isAnimating: boolean
  /** Full text for screen readers */
  fullText: string
  /** Restart the animation */
  restart: () => void
}

/**
 * Hook for terminal typing animation effect
 * Respects prefers-reduced-motion for accessibility
 */
export function useTerminalAnimation({
  text,
  speed = 50,
  delay = 0,
  enabled = true,
}: UseTerminalAnimationOptions): UseTerminalAnimationReturn {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  // Skip animation if reduced motion is preferred
  const shouldAnimate = enabled && !prefersReducedMotion

  const restart = useCallback(() => {
    setDisplayedText('')
    setIsComplete(false)
    setAnimationKey((prev) => prev + 1)
  }, [])

  useEffect(() => {
    // If animation is disabled or reduced motion is preferred, show full text immediately
    if (!shouldAnimate) {
      setDisplayedText(text)
      setIsComplete(true)
      return
    }

    // Reset state for new animation
    setDisplayedText('')
    setIsComplete(false)

    let currentIndex = 0
    let intervalId: ReturnType<typeof setInterval>

    // Delay before starting
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(intervalId)
          setIsComplete(true)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, speed, delay, shouldAnimate, animationKey])

  return {
    displayedText,
    isComplete,
    isAnimating: !isComplete && shouldAnimate,
    fullText: text,
    restart,
  }
}
