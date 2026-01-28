import { useState, useCallback } from 'react'

/**
 * Hook to copy text to clipboard with visual feedback
 * @returns Object with copied state and copy function
 */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard API not available')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000)
      return true
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      setCopied(false)
      return false
    }
  }, [])

  const reset = useCallback(() => {
    setCopied(false)
  }, [])

  return { copied, copy, reset }
}
