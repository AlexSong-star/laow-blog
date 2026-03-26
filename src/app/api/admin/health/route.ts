import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const res = await fetch(`${supabaseUrl}/rest/v1/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey || '',
        'Authorization': `Bearer ${supabaseKey || ''}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        slug: 'health-check-' + Date.now(),
        title: 'Health Check',
        date: new Date().toISOString().split('T')[0],
        category: 'test',
        tags: [],
        excerpt: '',
        content: 'ok',
        published: false,
      }),
      // 5秒超时，避免 Vercel 函数超时
      signal: AbortSignal.timeout(5000),
    })

    const text = await res.text()
    return NextResponse.json({
      success: res.ok,
      status: res.status,
      body: text.substring(0, 200),
      env: { url: !!supabaseUrl, key: !!supabaseKey },
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ success: false, error: msg }, { status: 200 })
  }
}
