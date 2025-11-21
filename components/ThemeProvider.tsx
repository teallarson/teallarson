'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme={siteMetadata.theme === 'hotdog' ? 'light' : siteMetadata.theme}
      themes={['light', 'dark', 'hotdog']}
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  )
}

