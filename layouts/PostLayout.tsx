import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import SocialShare from '@/components/SocialShare'
import TOCInline from '@/components/TOCInline'
import ReadingProgress from '@/components/ReadingProgress'
import PostSeries from '@/components/PostSeries'
import ViewCounter from '@/components/ViewCounter'
import formatDate from '@/lib/utils/formatDate'
import { ReactNode } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { Toc } from 'types/Toc'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  frontMatter: PostFrontMatter
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
  toc?: Toc
  relatedPosts?: PostFrontMatter[]
  allPosts?: PostFrontMatter[]
}

export default function PostLayout({ frontMatter, next, prev, children, toc, relatedPosts, allPosts }: Props) {
  const { slug, fileName, date, title, tags, readingTime, summary, series } = frontMatter
  const postUrl = `${siteMetadata.siteUrl}/blog/${slug}`

  return (
    <SectionContainer>
      <ReadingProgress />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-4 text-center">
              <dl className="space-y-2">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                    {readingTime && (
                      <>
                        <span className="mx-2 text-gray-400 dark:text-gray-500">·</span>
                        <span>{readingTime.text}</span>
                      </>
                    )}
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              {summary && (
                <p className="mx-auto max-w-2xl text-lg leading-7 text-gray-600 dark:text-gray-300">
                  {summary}
                </p>
              )}
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-4 xl:row-span-2 xl:pb-0">
              {series && allPosts && (
                <div className="pt-10">
                  <PostSeries series={series} currentSlug={slug} posts={allPosts} />
                </div>
              )}
              <div className="prose prose-lg max-w-none pt-10 pb-8 dark:prose-dark">
                {children}
              </div>
              <div className="flex flex-col gap-4 border-t border-gray-200 pt-6 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
                <ViewCounter slug={slug} />
                <SocialShare url={postUrl} title={title} summary={summary} />
              </div>
              {relatedPosts && relatedPosts.length > 0 && (
                <div className="py-8">
                  <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Related Posts
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="shimmer-hover group relative rounded-lg border-2 border-gray-200 p-6 transition-all hover:border-primary-500 hover:shadow-glow dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-500"
                      >
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-500/0 via-primary-400/0 to-primary-600/0 transition-opacity duration-300 group-hover:from-primary-500/20 group-hover:via-primary-400/15 group-hover:to-primary-600/20 dark:group-hover:from-primary-500/30 dark:group-hover:via-primary-400/20 dark:group-hover:to-primary-600/30"></div>
                        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 opacity-0 blur transition-opacity duration-300 group-hover:opacity-30 dark:group-hover:opacity-40"></div>
                        <h3 className="relative mb-2 text-lg font-semibold transition-all group-hover:opacity-80">
                          <span className="gradient-text-viewport">{relatedPost.title}</span>
                        </h3>
                        {relatedPost.summary && (
                          <p className="mb-3 text-sm text-gray-600 line-clamp-2 dark:text-gray-300">
                            {relatedPost.summary}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <time
                            className="text-xs text-gray-500 dark:text-gray-400"
                            dateTime={relatedPost.date}
                          >
                            {formatDate(relatedPost.date)}
                          </time>
                          {relatedPost.readingTime && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {relatedPost.readingTime.text}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {toc && toc.length > 0 && (
                  <div className="py-4 xl:py-8">
                    <h2 className="mb-3 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Table of Contents
                    </h2>
                    <div className="text-sm">
                      <TOCInline toc={toc} />
                    </div>
                  </div>
                )}
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex flex-col gap-6 py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div className="group">
                        <h2 className="mb-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <Link
                          href={`/blog/${prev.slug}`}
                          className="shimmer-hover link-modern-hover bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-base font-medium text-transparent transition-all hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 hover:translate-x-1 dark:from-primary-300 dark:via-primary-500 dark:to-primary-400 dark:hover:from-primary-200 dark:hover:via-primary-400 dark:hover:to-primary-300"
                        >
                          {prev.title}
                        </Link>
                      </div>
                    )}
                    {next && (
                      <div className="group">
                        <h2 className="mb-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <Link
                          href={`/blog/${next.slug}`}
                          className="shimmer-hover link-modern-hover bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-base font-medium text-transparent transition-all hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 hover:translate-x-1 dark:from-primary-300 dark:via-primary-500 dark:to-primary-400 dark:hover:from-primary-200 dark:hover:via-primary-400 dark:hover:to-primary-300"
                        >
                          {next.title}
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="shimmer-hover link-modern-hover inline-flex items-center gap-2 text-base font-medium transition-all hover:translate-x-[-4px]"
                >
                  <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent font-bold dark:from-primary-300 dark:via-primary-500 dark:to-primary-400">&larr;</span>
                  <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent font-bold hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 dark:from-primary-300 dark:via-primary-500 dark:to-primary-400 dark:hover:from-primary-200 dark:hover:via-primary-400 dark:hover:to-primary-300">
                    Back to the blog
                  </span>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
