import Link from '@/components/Link'

interface Props {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <span className="cursor-not-allowed text-gray-400 dark:text-gray-600">
            Previous
          </span>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`} className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:underline">
            Previous
          </Link>
        )}
        <span className="text-gray-700 dark:text-gray-300">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <span className="cursor-not-allowed text-gray-400 dark:text-gray-600">
            Next
          </span>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`} className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:underline">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}
