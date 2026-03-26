// 浏览器端直接调用 Supabase REST API（绕过 Vercel Serverless）
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function supabaseFetch(path: string, options: RequestInit = {}) {
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

export async function getAllPosts() {
  const res = await supabaseFetch(
    '/posts?select=slug,title,date,category,tags,excerpt,published,top,created_at&order=top,desc&order=created_at,desc'
  )
  return await res.json()
}

export async function getPost(slug: string) {
  const res = await supabaseFetch(
    `/posts?slug=eq.${encodeURIComponent(slug)}&select=*`
  )
  const data = await res.json()
  return Array.isArray(data) && data.length > 0 ? data[0] : null
}

export async function createPost(payload: Record<string, unknown>) {
  const slug = String(payload.title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '-' + String(payload.date || '')

  const res = await supabaseFetch('/posts', {
    method: 'POST',
    headers: { 'Prefer': 'return=minimal' },
    body: JSON.stringify({ ...payload, slug }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return { slug }
}

export async function updatePost(slug: string, payload: Record<string, unknown>) {
  const res = await supabaseFetch(
    `/posts?slug=eq.${encodeURIComponent(slug)}`,
    {
      method: 'PATCH',
      headers: { 'Prefer': 'return=minimal' },
      body: JSON.stringify(payload),
    }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
}

export async function deletePost(slug: string) {
  const res = await supabaseFetch(
    `/posts?slug=eq.${encodeURIComponent(slug)}`,
    { method: 'DELETE', headers: { 'Prefer': 'return=minimal' } }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
}
