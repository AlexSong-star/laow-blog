// 统计数据 API — Supabase 版本
import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function supabaseFetch(path: string, options: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      ...options.headers,
    },
  })
}

export async function GET() {
  // 统计文章数
  const postsRes = await supabaseFetch('/posts?select=id')
  const postsData = await postsRes.json()
  const totalPosts = Array.isArray(postsData) ? postsData.length : 0

  // 统计点赞数（所有 __likes__: 开头的记录）
  const likesRes = await supabaseFetch(
    "/posts?slug=like.__likes__"
  )
  const likesData = await likesRes.json()
  let totalLikes = 0
  if (Array.isArray(likesData)) {
    for (const p of likesData) {
      totalLikes += parseInt(p.title || '0', 10)
    }
  }

  return NextResponse.json({ totalPosts, totalViews: 0, totalLikes })
}
