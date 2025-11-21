'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="ml-1 mr-1 h-8 w-40 sm:ml-4"></div>
  }

  const currentTheme = theme || resolvedTheme || 'light'

  return (
    <div className="relative ml-1 mr-1 sm:ml-4">
      <select
        aria-label="Select Theme"
        value={currentTheme}
        onChange={(e) => setTheme(e.target.value)}
        className="h-8 w-40 rounded border-0 bg-white px-2 pr-8 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-gray-800 dark:text-gray-100 hotdog:bg-yellow-300 hotdog:text-black"
      >
        <option value="light">☀️ Light</option>
        <option value="dark">🌙 Dark</option>
        <option value="hotdog">🌭 Hotdog Stand</option>
      </select>
    </div>
  )
}

export default ThemeSwitch
