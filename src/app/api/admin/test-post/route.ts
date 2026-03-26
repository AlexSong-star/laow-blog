import { NextResponse } from 'next/server'

export async function POST() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        slug: 'debug-test-' + Date.now(),
        title: 'Debug Test',
        date: '2026-03-26',
        category: '博客',
        tags: [],
        excerpt: '',
        content: 'debug',
        published: true,
      }),
    })

    const text = await res.text()
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      body: text,
      env: {
        hasUrl: !!SUPABASE_URL,
        hasKey: !!SUPABASE_ANON_KEY,
        keyPrefix: SUPABASE_ANON_KEY?.substring(0, 15),
      }
    })
  } catch (e: unknown) {
    return NextResponse.json({
      error: String(e),
      stack: e instanceof Error ? e.stack : undefined,
    }, { status: 500 })
  }
}
