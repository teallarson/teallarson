import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter, getAuthorFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Image from 'next/image'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { Metadata } from 'next'
import projectsData from '@/data/projectsData'
import talksData from '@/data/talksData'

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
}

type FeedItem = 
  | { type: 'post'; data: PostFrontMatter }
  | { type: 'project'; data: typeof projectsData[0] & { date: string } }
  | { type: 'talk'; data: typeof talksData[0] }

export default async function Home() {
  const posts = await getAllFilesFrontMatter('blog')
  const author = await getAuthorFrontMatter('default')
  
  // Convert talks to feed items with normalized dates
  const talkItems: FeedItem[] = talksData.map((talk) => {
    // Parse MM-DD-YYYY format
    const [month, day, year] = talk.date.split('-')
    const isoDate = `${year}-${month}-${day}`
    return {
      type: 'talk' as const,
      data: {
        ...talk,
        date: isoDate,
      },
    }
  })
  
  // Convert projects to feed items
  const projectItems: FeedItem[] = projectsData.map((project) => ({
    type: 'project' as const,
    data: {
      ...project,
      date: project.date || new Date().toISOString().split('T')[0], // Use date from projectsData or fallback to current date
    },
  }))
  
  // Convert posts to feed items
  const postItems: FeedItem[] = posts.map((post) => ({
    type: 'post' as const,
    data: post,
  }))
  
  // Combine and sort by date (newest first)
  const allItems: FeedItem[] = [...postItems, ...projectItems, ...talkItems].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 hotdog:divide-black">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="gradient-text-viewport text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 hotdog:border-4 hotdog:border-black hotdog:bg-[#FFFF00] hotdog:bg-none hotdog:p-4 hotdog:text-black hotdog:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 hotdog:text-black">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 hotdog:divide-black">
          {allItems.length === 0 && 'No items found.'}
          {allItems.map((item, index) => {
            const { date } = item.data
            const itemKey = item.type === 'post' 
              ? `post-${item.data.slug}` 
              : item.type === 'project'
              ? `project-${index}`
              : `talk-${index}`
            
            return (
              <li key={itemKey} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">{item.type === 'post' ? 'Published on' : item.type === 'talk' ? 'Date' : 'Date'}</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 hotdog:text-black">
                        <time dateTime={date}>{formatDate(date)}</time>
                        <Link
                          href={item.type === 'post' ? '/blog' : item.type === 'talk' ? '/talks' : '/projects'}
                          className="ml-3 text-xs uppercase text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hotdog:text-black hotdog:hover:text-yellow-300"
                        >
                          {item.type}
                        </Link>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            {item.type === 'post' ? (
                              <>
                                <Link
                                  href={`/blog/${item.data.slug}`}
                                  className="text-gray-900 transition-all hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 hotdog:font-bold hotdog:text-black hotdog:underline hotdog:decoration-2 hotdog:hover:bg-[#FFFF00] hotdog:hover:text-black"
                                >
                                  {item.data.title}
                                </Link>
                                <div className="mt-3 flex flex-wrap">
                                  {item.data.tags.map((tag) => (
                                    <Tag key={tag} text={tag} />
                                  ))}
                                </div>
                              </>
                            ) : item.type === 'project' ? (
                              <Link
                                href={item.data.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 transition-all hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 hotdog:font-bold hotdog:text-black hotdog:underline hotdog:decoration-2 hotdog:hover:bg-[#FFFF00] hotdog:hover:text-black"
                              >
                                {item.data.title}
                              </Link>
                            ) : (
                              <Link
                                href={item.data.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 transition-all hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 hotdog:font-bold hotdog:text-black hotdog:underline hotdog:decoration-2 hotdog:hover:bg-[#FFFF00] hotdog:hover:text-black"
                              >
                                {item.data.title}
                              </Link>
                            )}
                          </h2>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400 hotdog:text-black">
                          {item.type === 'post' && item.data.summary}
                          {item.type === 'project' && item.data.description}
                          {item.type === 'talk' && item.data.description}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        {item.type === 'post' ? (
                          <Link
                            href={`/blog/${item.data.slug}`}
                            className="shimmer-hover link-modern-hover inline-flex items-center gap-1 transition-all hover:translate-x-1 hotdog:rounded-sm hotdog:border-2 hotdog:border-black hotdog:bg-[#FFFF00] hotdog:px-3 hotdog:py-1 hotdog:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hotdog:hover:translate-x-0 hotdog:hover:bg-black"
                            aria-label={`Read "${item.data.title}"`}
                          >
                            <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent font-bold hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 dark:from-primary-300 dark:via-primary-500 dark:to-primary-400 dark:hover:from-primary-200 dark:hover:via-primary-400 dark:hover:to-primary-300 hotdog:bg-none hotdog:text-black hotdog:hover:text-[#FFFF00]">
                              Read more
                            </span>
                            <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent font-bold dark:from-primary-300 dark:via-primary-500 dark:to-primary-400 hotdog:bg-none hotdog:text-black hotdog:hover:text-[#FFFF00]">&rarr;</span>
                          </Link>
                        ) : (
                          <Link
                            href={item.data.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shimmer-hover link-modern-hover inline-flex items-center gap-1 transition-all hover:translate-x-1 hotdog:rounded-sm hotdog:border-2 hotdog:border-black hotdog:bg-[#FFFF00] hotdog:px-3 hotdog:py-1 hotdog:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hotdog:hover:translate-x-0 hotdog:hover:bg-black"
                            aria-label={`View ${item.data.title}`}
                          >
                            <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent font-bold hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 dark:from-primary-300 dark:via-primary-500 dark:to-primary-400 dark:hover:from-primary-200 dark:hover:via-primary-400 dark:hover:to-primary-300 hotdog:bg-none hotdog:text-black hotdog:hover:text-[#FFFF00]">
                              {item.type === 'project' ? 'View project' : 'Watch talk'}
                            </span>
                            <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent font-bold dark:from-primary-300 dark:via-primary-500 dark:to-primary-400 hotdog:bg-none hotdog:text-black hotdog:hover:text-[#FFFF00]">&rarr;</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

