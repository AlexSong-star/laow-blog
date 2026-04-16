// GET /api/posts — 列出所有文章（供管理后台使用）
import { NextResponse } from 'next/server'
import { getAllPostsIncludeUnpublished } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const posts = await getAllPostsIncludeUnpublished()
    return NextResponse.json({ posts })
  } catch (err) {
    console.error('GET /api/posts error:', err)
    return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 })
  }
}
