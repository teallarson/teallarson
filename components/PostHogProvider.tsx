'use client'

import { usePostHog } from 'next-use-posthog'
import { useEffect } from 'react'

export function PostHogProvider() {
  usePostHog('phc_j8KjSwgyddIWVle9CCQGwTaxIp14EcdUYzxNoyOGqx7', {
    api_host: 'https://app.posthog.com',
  })

  return null
}

