import Link from './Link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="shimmer-hover mr-2 mb-2 inline-block rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold uppercase text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-primary-600 hover:shadow-glow dark:bg-primary-500 dark:hover:bg-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
