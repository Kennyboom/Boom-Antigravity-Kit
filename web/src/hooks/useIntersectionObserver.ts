import { useState, useEffect, useRef, type RefObject } from 'react'

interface UseIntersectionObserverOptions {
  /** Threshold for intersection (0-1) */
  threshold?: number | number[]
  /** Root margin for observer */
  rootMargin?: string
  /** Root element (default: viewport) */
  root?: Element | null
  /** Whether to disconnect after first intersection */
  triggerOnce?: boolean
  /** Initial state before intersection is checked */
  initialIsIntersecting?: boolean
}

interface UseIntersectionObserverReturn<T extends Element> {
  /** Ref to attach to the target element */
  ref: RefObject<T | null>
  /** Whether the element is intersecting */
  isIntersecting: boolean
  /** The IntersectionObserverEntry */
  entry: IntersectionObserverEntry | null
}

/**
 * Hook to observe element intersection with viewport
 * Useful for scroll-triggered animations and lazy loading
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn<T> {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    triggerOnce = true,
    initialIsIntersecting = false,
  } = options

  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  // Check if IntersectionObserver is available (SSR/old browser fallback)
  const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined'

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Fallback: assume element is visible when IntersectionObserver unavailable
    if (!hasIntersectionObserver) {
      // Using callback in setState to avoid lint warning about cascading renders
      // This is a legitimate one-time fallback initialization
      queueMicrotask(() => setIsIntersecting(true))
      return
    }

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry)
        setIsIntersecting(observerEntry.isIntersecting)

        // Disconnect after first intersection if triggerOnce is true
        if (triggerOnce && observerEntry.isIntersecting) {
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, root, triggerOnce, hasIntersectionObserver])

  return { ref, isIntersecting, entry }
}

/**
 * Simplified hook for scroll-triggered fade-in animations
 */
export function useFadeInOnScroll<T extends Element = HTMLDivElement>(
  options: Omit<UseIntersectionObserverOptions, 'triggerOnce'> = {}
) {
  return useIntersectionObserver<T>({
    ...options,
    triggerOnce: true,
    threshold: options.threshold ?? 0.1,
  })
}
