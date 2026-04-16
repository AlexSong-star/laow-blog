// 统计数据 API — 文件系统版
import { NextResponse } from 'next/server'
import { getAllPostsIncludeUnpublished } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const posts = await getAllPostsIncludeUnpublished()
    const totalPosts = posts.length
    const totalViews = 0 // 静态博客不追踪浏览量
    const totalLikes = 0  // 如需点赞功能可接入本地 JSON

    return NextResponse.json({ totalPosts, totalViews, totalLikes })
  } catch (err) {
    console.error('GET /api/admin/stats error:', err)
    return NextResponse.json({ totalPosts: 0, totalViews: 0, totalLikes: 0 })
  }
}
