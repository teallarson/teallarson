import Link from './Link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="shimmer-hover mr-2 mb-2 inline-block rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold uppercase text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-primary-600 hover:shadow-glow dark:bg-primary-500 dark:hover:bg-primary-400 hotdog:rounded-sm hotdog:border-2 hotdog:border-black hotdog:bg-[#FFFF00] hotdog:text-black hotdog:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hotdog:hover:bg-black hotdog:hover:text-[#FFFF00]"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
