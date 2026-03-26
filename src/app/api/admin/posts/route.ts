import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

function supabaseFetch(path: string, options: RequestInit = {}) {
  const url = `${SUPABASE_URL}/rest/v1${path}`
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      ...options.headers,
    },
  })
}

export async function GET() {
  try {
    const res = await supabaseFetch(
      '/posts?select=slug,title,date,category,tags,excerpt,published,top,created_at&order=top,desc&order=created_at,desc'
    )
    const data = await res.json()
    return NextResponse.json({ posts: data || [] })
  } catch (e) {
    return NextResponse.json({ posts: [], error: String(e) }, { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const title = String(body.title || '')
    const date = String(body.date || new Date().toISOString().split('T')[0])
    const category = String(body.category || '博客')
    const tags = Array.isArray(body.tags) ? body.tags.map(String) : []
    const excerpt = String(body.excerpt || '')
    const content = String(body.content || '')
    const image = String(body.image || '')
    const published = body.published !== false
    const top = body.top === true

    const safeTitle = title.replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    const slug = safeTitle + '-' + date

    const payload = {
      slug,
      title,
      date,
      category,
      tags,
      excerpt,
      content,
      image,
      published,
      top,
    }

    const res = await supabaseFetch('/posts', {
      method: 'POST',
      headers: { 'Prefer': 'return=minimal' },
      body: JSON.stringify(payload),
    })

    const text = await res.text().catch(() => '')
    if (!res.ok) {
      return NextResponse.json({ success: false, error: text, status: res.status }, { status: 500 })
    }

    return NextResponse.json({ success: true, slug })
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 })
  }
}
