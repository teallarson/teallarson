import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import path from 'path'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const root = process.cwd()

export async function generateStaticParams() {
  const tags = await getAllTags('blog')
  return Object.keys(tags).map((tag) => ({
    tag,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const tags = await getAllTags('blog')
  if (!tags[tag]) {
    notFound()
  }

  return {
    title: `${tag} - ${siteMetadata.title}`,
    description: `${tag} tags - ${siteMetadata.author}`,
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
  )

  if (filteredPosts.length === 0) {
    notFound()
  }

  // Generate RSS
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'tags', tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  return <ListLayout posts={filteredPosts} title={title} />
}

