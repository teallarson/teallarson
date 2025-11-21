'use client'

import { useEffect, useState } from 'react'

interface ViewCounterProps {
  slug: string
  className?: string
}

export default function ViewCounter({ slug, className = '' }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    try {
      const storageKey = `views-${slug}`
      
      // Get current views from localStorage
      const storedViews = localStorage.getItem(storageKey)
      const currentViews = storedViews ? parseInt(storedViews, 10) : 0
      
      // Increment views
      const newViews = currentViews + 1
      localStorage.setItem(storageKey, newViews.toString())
      setViews(newViews)
    } catch (error) {
      // Handle localStorage errors (e.g., quota exceeded, disabled)
      console.warn('Failed to update view counter:', error)
      setViews(null)
    }
  }, [slug])

  if (views === null) {
    return null
  }

  return (
    <span className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      {views} {views === 1 ? 'view' : 'views'}
    </span>
  )
}

