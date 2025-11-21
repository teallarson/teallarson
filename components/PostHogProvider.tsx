'use client'

import { useEffect } from 'react'

export function PostHogProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let isMounted = true
    let abortController: AbortController | null = null

    const initPostHog = async () => {
      try {
        // Create abort controller to handle cleanup
        abortController = new AbortController()
        
        // Dynamically import PostHog to avoid SSR issues and abort signal errors
        const posthog = (await import('posthog-js')).default
        
        if (!isMounted || abortController.signal.aborted) return

        // Check if already initialized
        if ((posthog as any).__loaded) return

        posthog.init('phc_j8KjSwgyddIWVle9CCQGwTaxIp14EcdUYzxNoyOGqx7', {
          api_host: 'https://app.posthog.com',
          loaded: (posthog) => {
            if (isMounted && process.env.NODE_ENV === 'development') {
              posthog.debug()
            }
          },
        })
      } catch (error) {
        // Silently handle abort errors and other initialization failures
        if (error instanceof Error && error.name !== 'AbortError') {
          console.warn('PostHog initialization failed:', error)
        }
      }
    }

    initPostHog()

    return () => {
      isMounted = false
      if (abortController) {
        abortController.abort()
      }
    }
  }, [])

  return null
}

