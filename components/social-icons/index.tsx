import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'
import { ComponentType } from 'react'

// Icons taken from: https://simpleicons.org/

const components: Record<string, ComponentType<any> | { default?: ComponentType<any> }> = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
}

const SocialIcon = ({ kind, href, size = 8 }: { kind: string; href: string; size?: number }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  if (!SocialSvg) {
    return null
  }

  // Handle both direct component exports and default exports
  const Component = (typeof SocialSvg === 'function' 
    ? SocialSvg 
    : (SocialSvg as any).default || SocialSvg) as ComponentType<{ className?: string }>

  if (typeof Component !== 'function') {
    return null
  }

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <Component
        className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
