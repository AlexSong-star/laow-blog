import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return NextResponse.json({
    url: url || 'MISSING',
    key: key ? key.substring(0, 10) + '...' : 'MISSING',
    allEnv: Object.keys(process.env).filter(k => k.includes('SUPABASE')),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return NextResponse.json({ error: 'env missing', url, key }, { status: 500 })
    }

    // Test the actual POST
    const res = await fetch(`${url}/rest/v1/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        slug: 'debug-' + Date.now(),
        title: String(body.title || 'test'),
        date: '2026-03-26',
        category: 'test',
        tags: [],
        excerpt: '',
        content: 'debug',
        published: true,
      }),
    })

    const text = await res.text()
    return NextResponse.json({
      supabaseStatus: res.status,
      supabaseBody: text,
      title: body.title,
    })
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
