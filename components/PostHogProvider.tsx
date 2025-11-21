'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

export function PostHogProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init('phc_j8KjSwgyddIWVle9CCQGwTaxIp14EcdUYzxNoyOGqx7', {
        api_host: 'https://app.posthog.com',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug()
        },
      })
    }
  }, [])

  return null
}

