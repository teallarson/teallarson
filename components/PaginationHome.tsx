import Link from '@/components/Link'

interface Props {
  totalPages: number
  currentPage: number
}

export default function PaginationHome({ totalPages, currentPage }: Props) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-center gap-4 items-center">
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/` : `/page/${currentPage - 1}`}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
          >
            ← Previous
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={page === 1 ? `/` : `/page/${page}`}
            className={`transition-colors ${
              page === currentPage
                ? 'font-bold text-gray-900 dark:text-gray-100 underline'
                : 'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:underline'
            }`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}
        {nextPage && (
          <Link
            href={`/page/${currentPage + 1}`}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
          >
            Next →
          </Link>
        )}
      </nav>
    </div>
  )
}
