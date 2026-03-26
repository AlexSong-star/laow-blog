import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function supabaseFetch(path: string, options: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      ...options.headers,
    },
  })
}

// GET /api/admin/posts - 列出所有文章
export async function GET() {
  const res = await supabaseFetch(
    '/posts?select=slug,title,date,category,tags,excerpt,published,top,created_at&order=top,desc&order=created_at,desc'
  )
  const data = await res.json()
  return NextResponse.json({ posts: data || [] })
}

// POST /api/admin/posts - 创建新文章
export async function POST(request: Request) {
  const body = await request.json()
  const { title, date, category, tags, excerpt, content, published, top, image } = body

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '-' + date

  const res = await supabaseFetch('/posts', {
    method: 'POST',
    headers: { 'Prefer': 'return=minimal' },
    body: JSON.stringify({
      slug,
      title,
      date,
      category: category || '博客',
      tags: tags || [],
      excerpt: excerpt || '',
      content: content || '',
      image: image || '',
      published: published !== false,
      top: top || false,
    }),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }))
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, slug })
}
