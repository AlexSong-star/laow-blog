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

export async function GET() {
  const res = await supabaseFetch('/posts?select=category,tags')
  const data = await res.json()

  const categoriesSet = new Set<string>()
  const tagsSet = new Set<string>()

  ;(data || []).forEach((p: { category?: string; tags?: string[] }) => {
    if (p.category) categoriesSet.add(p.category)
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach((tag: string) => tagsSet.add(tag))
    }
  })

  return NextResponse.json({
    categories: Array.from(categoriesSet),
    tags: Array.from(tagsSet),
  })
}
