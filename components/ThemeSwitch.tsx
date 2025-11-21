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
        className="h-8 w-40 cursor-pointer appearance-none rounded-md border-0 bg-transparent px-3 pr-8 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:text-gray-300 dark:hover:bg-gray-800 hotdog:rounded-sm hotdog:border-2 hotdog:border-black hotdog:bg-[#FFFF00] hotdog:text-black hotdog:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hotdog:hover:bg-black hotdog:hover:text-[#FFFF00]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
        }}
      >
        <option value="light">☀️ Light</option>
        <option value="dark">🌙 Dark</option>
        <option value="hotdog">🌭 Hotdog Stand</option>
      </select>
    </div>
  )
}

export default ThemeSwitch
