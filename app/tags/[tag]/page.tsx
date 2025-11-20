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
  params: { tag: string }
}): Promise<Metadata> {
  const tags = await getAllTags('blog')
  if (!tags[params.tag]) {
    notFound()
  }

  return {
    title: `${params.tag} - ${siteMetadata.title}`,
    description: `${params.tag} tags - ${siteMetadata.author}`,
  }
}

export default async function TagPage({
  params,
}: {
  params: { tag: string }
}) {
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  if (filteredPosts.length === 0) {
    notFound()
  }

  // Generate RSS
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'tags', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  // Capitalize first letter and convert space to dash
  const title = params.tag[0].toUpperCase() + params.tag.split(' ').join('-').slice(1)

  return <ListLayout posts={filteredPosts} title={title} />
}

