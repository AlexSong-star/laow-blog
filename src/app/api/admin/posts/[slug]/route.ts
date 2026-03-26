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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const res = await supabaseFetch(`/posts?slug=eq.${encodeURIComponent(slug)}&select=*`)
  const data = await res.json()
  if (!data || data.length === 0) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  }
  return NextResponse.json({ post: data[0] })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await request.json()
  const { title, date, category, tags, excerpt, content, published, top, image } = body

  const res = await supabaseFetch(`/posts?slug=eq.${encodeURIComponent(slug)}`, {
    method: 'PATCH',
    headers: { 'Prefer': 'return=minimal' },
    body: JSON.stringify({
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

  return NextResponse.json({ success: true })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const res = await supabaseFetch(`/posts?slug=eq.${encodeURIComponent(slug)}`, {
    method: 'DELETE',
    headers: { 'Prefer': 'return=minimal' },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }))
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
