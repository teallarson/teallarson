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
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`} className="inline-block rounded-md bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700 hotdog:rounded-sm hotdog:border-2 hotdog:border-black hotdog:bg-[#FFFF00] hotdog:text-black hotdog:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hotdog:hover:bg-black hotdog:hover:text-[#FFFF00]">
            Previous
          </Link>
        )}
        <span className="hotdog:font-bold hotdog:text-black">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50 hotdog:font-bold hotdog:text-black" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`} className="inline-block rounded-md bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700 hotdog:rounded-sm hotdog:border-2 hotdog:border-black hotdog:bg-[#FFFF00] hotdog:text-black hotdog:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hotdog:hover:bg-black hotdog:hover:text-[#FFFF00]">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}
