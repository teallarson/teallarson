import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hotdog:bg-yellow-300 hotdog:text-black hotdog:ring-black"
      >
        Skip to main content
      </a>
      <div className="flex min-h-screen flex-col justify-between hotdog:overflow-x-hidden">
        <header className="flex flex-wrap items-center justify-between gap-4 py-10 hotdog:py-6">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="gradient-text-viewport hidden h-6 text-2xl font-semibold sm:block hotdog:bg-none hotdog:text-black">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text p-1 font-medium text-transparent transition-all hover:from-primary-500 hover:via-primary-500 hover:to-primary-500 hover:bg-clip-text dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 dark:hover:from-primary-400 dark:hover:via-primary-400 dark:hover:to-primary-400 hotdog:border-2 hotdog:border-black hotdog:bg-[#FFFF00] hotdog:bg-none hotdog:px-3 hotdog:py-1 hotdog:text-black hotdog:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hotdog:hover:bg-black hotdog:hover:text-[#FFFF00] sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main id="main-content" className="mb-auto" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
