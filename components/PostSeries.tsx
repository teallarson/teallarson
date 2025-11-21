import Link from './Link'
import { PostFrontMatter } from 'types/PostFrontMatter'
import formatDate from '@/lib/utils/formatDate'

interface PostSeriesProps {
  series: string
  currentSlug: string
  posts: PostFrontMatter[]
}

export default function PostSeries({ series, currentSlug, posts }: PostSeriesProps) {
  const seriesPosts = posts
    .filter((post) => post.series === series && post.draft !== true)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (seriesPosts.length <= 1) {
    return null
  }

  const currentIndex = seriesPosts.findIndex((post) => post.slug === currentSlug)
  const currentPost = seriesPosts[currentIndex]

  return (
    <div className="my-8 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-800 dark:bg-primary-900/20">
      <h3 className="mb-4 text-lg font-semibold text-primary-900 dark:text-primary-100">
        {series} Series
      </h3>
      <p className="mb-4 text-sm text-primary-700 dark:text-primary-300">
        Part {currentIndex + 1} of {seriesPosts.length}
      </p>
      <nav aria-label={`${series} series navigation`}>
        <ol className="space-y-2">
          {seriesPosts.map((post, index) => {
            const isCurrent = post.slug === currentSlug
            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`shimmer-hover flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
                    isCurrent
                      ? 'bg-primary-600 text-white dark:bg-primary-500'
                      : 'text-primary-700 hover:bg-primary-100 hover:text-primary-600 dark:text-primary-300 dark:hover:bg-primary-800/40 dark:hover:text-primary-400'
                  }`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-opacity-20 text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="flex-1">{post.title}</span>
                  <time className="text-xs opacity-75" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </Link>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}

