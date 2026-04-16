// 分类/标签 API — 本地文件系统版
import { NextResponse } from 'next/server'
import { getAllPostsIncludeUnpublished } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export async function GET() {
  const posts = await getAllPostsIncludeUnpublished()
  const categoriesSet = new Set<string>()
  const tagsSet = new Set<string>()

  for (const post of posts) {
    if (post.category) categoriesSet.add(post.category)
    if (post.tags) post.tags.forEach((tag: string) => tagsSet.add(tag))
  }

  return NextResponse.json({
    categories: Array.from(categoriesSet),
    tags: Array.from(tagsSet),
  })
}
