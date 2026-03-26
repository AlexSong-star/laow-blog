// 点赞 API — Supabase 版本
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

async function getLikesCount(slug: string): Promise<number> {
  const safeSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '_')
  const res = await supabaseFetch(
    `/posts?slug=eq.__likes__:${safeSlug}&select=title`
  )
  const data = await res.json()
  if (Array.isArray(data) && data.length > 0) {
    return parseInt(data[0].title || '0', 10)
  }
  return 0
}

async function doLike(slug: string): Promise<number> {
  const safeSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '_')
  const key = `__likes__:${safeSlug}`

  // 先 SELECT 看有没有
  const sel = await supabaseFetch(
    `/posts?slug=eq.${encodeURIComponent(key)}&select=id,title`
  )
  const existing = await sel.json()

  if (Array.isArray(existing) && existing.length > 0) {
    // 有记录，UPDATE title + 1
    const current = parseInt(existing[0].title || '0', 10)
    const patch = await supabaseFetch(
      `/posts?slug=eq.${encodeURIComponent(key)}`,
      {
        method: 'PATCH',
        headers: { 'Prefer': 'return=representation' },
        body: JSON.stringify({ title: String(current + 1) }),
      }
    )
    const updated = await patch.json()
    return Array.isArray(updated) ? parseInt(updated[0]?.title || '0', 10) : current + 1
  } else {
    // 没有记录，INSERT 新记录
    const post = await supabaseFetch('/posts', {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify({
        slug: key,
        title: '1',
        date: new Date().toISOString().split('T')[0],
        category: 'likes',
        tags: [],
        excerpt: '',
        content: '',
        published: true,
      }),
    })
    const created = await post.json()
    return 1
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const count = await getLikesCount(slug)
    return NextResponse.json({ likes: count })
  } catch {
    return NextResponse.json({ likes: 0 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const count = await doLike(slug)
    return NextResponse.json({ likes: count })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
