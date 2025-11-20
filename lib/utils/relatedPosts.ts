import { PostFrontMatter } from 'types/PostFrontMatter'
import kebabCase from './kebabCase'

export function getRelatedPosts(
  currentPost: PostFrontMatter,
  allPosts: PostFrontMatter[],
  maxPosts: number = 3
): PostFrontMatter[] {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    // If no tags, return recent posts excluding current
    return allPosts
      .filter((post) => post.slug !== currentPost.slug)
      .slice(0, maxPosts)
  }

  // Calculate similarity score based on shared tags
  const scoredPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug && post.draft !== true)
    .map((post) => {
      const currentTags = currentPost.tags.map((t) => kebabCase(t))
      const postTags = post.tags.map((t) => kebabCase(t))
      
      // Count shared tags
      const sharedTags = currentTags.filter((tag) => postTags.includes(tag)).length
      
      // Score: shared tags count (higher is better)
      return {
        post,
        score: sharedTags,
      }
    })
    .filter((item) => item.score > 0) // Only posts with at least one shared tag
    .sort((a, b) => {
      // Sort by score (descending), then by date (descending)
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    })
    .slice(0, maxPosts)
    .map((item) => item.post)

  // If we don't have enough related posts, fill with recent posts
  if (scoredPosts.length < maxPosts) {
    const recentPosts = allPosts
      .filter(
        (post) =>
          post.slug !== currentPost.slug &&
          post.draft !== true &&
          !scoredPosts.some((p) => p.slug === post.slug)
      )
      .slice(0, maxPosts - scoredPosts.length)
    
    return [...scoredPosts, ...recentPosts]
  }

  return scoredPosts
}

