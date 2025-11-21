import fs from 'fs'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXContent } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { getRelatedPosts } from '@/lib/utils/relatedPosts'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { Toc } from 'types/Toc'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostLayout from '@/layouts/PostLayout'
import AuthorLayout from '@/layouts/AuthorLayout'
import PostSimple from '@/layouts/PostSimple'

const DEFAULT_LAYOUT = 'PostLayout'

export async function generateStaticParams() {
  const posts = getFiles('blog')
  return posts.map((p) => ({
    slug: formatSlug(p).split('/'),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const post = await getFileBySlug('blog', slug)

  if (!post || ('draft' in post.frontMatter && post.frontMatter.draft === true)) {
    return {
      title: 'Post Not Found',
    }
  }

  const { title, summary, images } = post.frontMatter as PostFrontMatter
  const featuredImage = images && images.length > 0 ? `${siteMetadata.siteUrl}${images[0]}` : `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`

  return {
    title,
    description: summary || '',
    openGraph: {
      title,
      description: summary || '',
      url: `${siteMetadata.siteUrl}/blog/${slug}`,
      siteName: siteMetadata.title,
      images: [featuredImage],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary || '',
      images: [featuredImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const allPosts = await getAllFilesFrontMatter('blog')
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === slug)
  const prev: { slug: string; title: string } | null = allPosts[postIndex + 1] || null
  const next: { slug: string; title: string } | null = allPosts[postIndex - 1] || null
  const post = await getFileBySlug('blog', slug)

  if (!post || ('draft' in post.frontMatter && post.frontMatter.draft === true)) {
    notFound()
  }

  const { mdxSource, toc, frontMatter } = post
  // @ts-ignore
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // Get related posts
  const relatedPosts = getRelatedPosts(post.frontMatter, allPosts, 3)

  // Generate RSS
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  const layoutName = frontMatter.layout || DEFAULT_LAYOUT
  
  // Select the layout component
  let LayoutComponent: React.ComponentType<any>
  switch (layoutName) {
    case 'PostLayout':
      LayoutComponent = PostLayout
      break
    case 'AuthorLayout':
      LayoutComponent = AuthorLayout
      break
    case 'PostSimple':
      LayoutComponent = PostSimple
      break
    default:
      LayoutComponent = PostLayout
  }

  return (
    <>
      {'draft' in frontMatter && frontMatter.draft !== true ? (
        <LayoutComponent
          toc={toc}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
          relatedPosts={relatedPosts}
          allPosts={allPosts}
        >
          <MDXContent mdxSource={mdxSource} />
        </LayoutComponent>
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}

