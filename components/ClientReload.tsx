'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

/**
 * Client-side complement to next-remote-watch
 * Re-triggers page reload when watched mdx files change
 *
 */
export const ClientReload = () => {
  const router = useRouter()
  const pathname = usePathname()

  // Exclude socket.io from prod bundle
  useEffect(() => {
    import('socket.io-client').then((module) => {
      const socket = module.io()
      socket.on('reload', () => {
        router.refresh()
      })
    })
  }, [router])

  return null
}
