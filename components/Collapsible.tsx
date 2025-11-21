'use client'

import { ReactNode, useState } from 'react'

interface CollapsibleProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

export default function Collapsible({ title, children, defaultOpen = false, className = '' }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <details
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
      className={`group rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between">
          <span>{title}</span>
          <svg
            className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </summary>
      <div className="px-4 pb-4 pt-2">{children}</div>
    </details>
  )
}

