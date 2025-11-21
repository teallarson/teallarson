/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link'
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

const CustomLink = ({
  href,
  children,
  className,
  ...rest
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
  if (!href) {
    return <span className={className}>{children}</span>
  }

  const isInternalLink = href.startsWith('/')
  const isAnchorLink = href.startsWith('#')

  if (isInternalLink) {
    // Next.js Link accepts: href, className, and some Next.js specific props
    // Note: aria-label and other HTML attributes may not be directly supported
    // So we'll only pass href and className to be safe
    return (
      <NextLink href={href} className={className}>
        {children}
      </NextLink>
    )
  }

  if (isAnchorLink) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} className={className} {...rest}>
      {children}
    </a>
  )
}

export default CustomLink
