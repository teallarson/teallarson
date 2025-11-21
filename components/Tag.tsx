import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-2 mb-2 inline-block rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold uppercase text-white transition-all duration-200 hover:scale-105 hover:shadow-glow dark:bg-primary-600 dark:hover:bg-primary-500"
    >
        {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
