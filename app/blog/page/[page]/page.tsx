import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5

export async function generateStaticParams() {
  const posts = await getAllFilesFrontMatter('blog')
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const { page } = await params
  return {
    title: `Blog - Page ${page} - ${siteMetadata.author}`,
    description: siteMetadata.description,
  }
}

export default async function BlogPagePage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  const posts = await getAllFilesFrontMatter('blog')
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}

