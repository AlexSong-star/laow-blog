import { remark } from 'remark'
import html from 'remark-html'

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

export interface Post {
  id?: number
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  content: string
  image: string
  published: boolean
  top: boolean
  created_at?: string
  contentHtml?: string
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const res = await supabaseFetch(
      '/posts?select=id,slug,title,date,category,tags,excerpt,image,published,top&published=eq.true&order=top,desc&order=date,desc'
    )
    const data = await res.json()
    if (!Array.isArray(data)) {
      console.error('[getAllPosts] data is not array:', typeof data, String(data).slice(0,100))
      return []
    }
    return data.map((p: Record<string, unknown>) => ({
      slug: String(p.slug || ''),
      title: String(p.title || ''),
      date: String(p.date || ''),
      category: String(p.category || '未分类'),
      tags: Array.isArray(p.tags) ? p.tags : [],
      excerpt: String(p.excerpt || ''),
      image: String(p.image || ''),
      published: p.published === true,
      top: p.top === true,
    }))
  } catch (e) {
    console.error('[getAllPosts] ERROR:', e)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Fetch all published posts and find by slug (avoids encoding issues with URL query params)
  const res = await supabaseFetch(
    '/posts?select=*&published=eq.true&limit=500'
  )
  const data = await res.json()
  const found = Array.isArray(data) ? data.find((p: Record<string, unknown>) => String(p.slug) === slug) : null
  if (!found) return null

  const p = found
  return {
    id: p.id,
    slug: String(p.slug),
    title: String(p.title),
    date: String(p.date),
    category: String(p.category || '未分类'),
    tags: Array.isArray(p.tags) ? p.tags : [],
    excerpt: String(p.excerpt || ''),
    content: String(p.content || ''),
    image: String(p.image || ''),
    published: p.published === true,
    top: p.top === true,
    created_at: p.created_at ? String(p.created_at) : undefined,
  }
}

export async function getPostContentHtml(slug: string): Promise<string> {
  const post = await getPostBySlug(slug)
  if (!post || !post.content) return ''

  let content = post.content
  content = content.replace(/^#\s+.+$/m, '')

  content = content.replace(
    /\[video\]\(https?:\/\/www\.bilibili\.com\/video\/BV[\w]+\)/g,
    (match: string) => {
      const bvid = match.match(/BV[\w]+/)?.[0] || ''
      return `<div style="position:relative;padding-bottom:56.25%;height:0;"><iframe src="//player.bilibili.com/player.html?bvid=${bvid}&page=1" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>`
    }
  )

  content = content.replace(
    /\[video\]\(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+\)/g,
    (match: string) => {
      const vid = match.match(/v=([\w-]+)/)?.[1] || ''
      return `<div style="position:relative;padding-bottom:56.25%;height:0;"><iframe src="https://www.youtube.com/embed/${vid}" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>`
    }
  )

  content = content.replace(
    /\[video\]\((https?:\/\/.*\.(?:mp4|webm|ogg))\)/g,
    (_: string, url: string) =>
      `<video controls style="width:100%;max-width:800px;margin:1rem 0;"><source src="${url}" /></video>`
  )

  const processedContent = await remark()
    .use(html)
    .process(content)

  return processedContent.toString()
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  return Array.from(new Set(posts.map(p => p.category)))
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  return Array.from(new Set(posts.flatMap(p => p.tags)))
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const res = await supabaseFetch(
    `/posts?category=eq.${encodeURIComponent(category)}&published=eq.true&select=slug,title,date,category,tags,excerpt,image,published,top,created_at&order=top,desc&order=created_at,desc`
  )
  const data = await res.json()
  return (data || []).map((p: Record<string, unknown>) => ({
    slug: String(p.slug || ''),
    title: String(p.title || ''),
    date: String(p.date || ''),
    category: String(p.category || '未分类'),
    tags: Array.isArray(p.tags) ? p.tags : [],
    excerpt: String(p.excerpt || ''),
    image: String(p.image || ''),
    published: p.published === true,
    top: p.top === true,
    created_at: p.created_at ? String(p.created_at) : undefined,
  }))
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const res = await supabaseFetch(
    `/posts?tags=cs.${encodeURIComponent(tag)}&published=eq.true&select=slug,title,date,category,tags,excerpt,image,published,top,created_at&order=top,desc&order=created_at,desc`
  )
  const data = await res.json()
  return (data || []).map((p: Record<string, unknown>) => ({
    slug: String(p.slug || ''),
    title: String(p.title || ''),
    date: String(p.date || ''),
    category: String(p.category || '未分类'),
    tags: Array.isArray(p.tags) ? p.tags : [],
    excerpt: String(p.excerpt || ''),
    image: String(p.image || ''),
    published: p.published === true,
    top: p.top === true,
    created_at: p.created_at ? String(p.created_at) : undefined,
  }))
}
