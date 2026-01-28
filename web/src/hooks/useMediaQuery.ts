import { useState, useEffect, useSyncExternalStore, useCallback } from 'react'

/**
 * Hook to detect media query matches
 * Uses useSyncExternalStore for proper SSR hydration
 * @param query - CSS media query string
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches
  }, [query])

  const getServerSnapshot = useCallback(() => {
    // Default to false on server
    return false
  }, [])

  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', callback)
      return () => mediaQuery.removeEventListener('change', callback)
    },
    [query]
  )

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * Legacy version using useState/useEffect pattern
 * Use this if you need IE11 support
 */
export function useMediaQueryLegacy(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    // Initialize with current value if available (avoids flash)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    mediaQuery.addEventListener('change', handler)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}

// Preset breakpoint hooks
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 639px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
