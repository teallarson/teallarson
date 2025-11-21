'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Client-side complement to next-remote-watch
 * Re-triggers page reload when watched mdx files change
 *
 */
export const ClientReload = () => {
  const router = useRouter()

  // Exclude socket.io from prod bundle
  useEffect(() => {
    let socket: any = null
    let isMounted = true

    const initSocket = async () => {
      try {
        const module = await import('socket.io-client')
        if (!isMounted) return
        
        socket = module.io()
        socket.on('reload', () => {
          if (isMounted) {
            router.refresh()
          }
        })
      } catch (error) {
        // Silently fail if socket.io is not available
        console.warn('Socket.io client not available:', error)
      }
    }

    initSocket()

    // Cleanup function
    return () => {
      isMounted = false
      if (socket) {
        socket.disconnect()
        socket = null
      }
    }
  }, [router])

  return null
}
