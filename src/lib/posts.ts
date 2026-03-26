import { supabase } from './supabase'
import { remark } from 'remark'
import html from 'remark-html'

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
  const { data, error } = await supabase
    .from('posts')
    .select('slug, title, date, category, tags, excerpt, image, published, top, created_at')
    .eq('published', true)
    .order('top', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return (data || []).map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    category: p.category || '未分类',
    tags: p.tags || [],
    excerpt: p.excerpt || '',
    image: p.image || '',
    published: p.published,
    top: p.top,
    created_at: p.created_at,
  }))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return null
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    date: data.date,
    category: data.category || '未分类',
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    content: data.content || '',
    image: data.image || '',
    published: data.published,
    top: data.top,
    created_at: data.created_at,
  }
}

export async function getPostContentHtml(slug: string): Promise<string> {
  const post = await getPostBySlug(slug)
  if (!post || !post.content) {
    return ''
  }

  let content = post.content

  // 移除内容中的第一个标题（frontmatter 的 title 已在页面显示）
  content = content.replace(/^#\s+.+$/m, '')

  // 处理 B站视频
  content = content.replace(
    /\[video\]\(https?:\/\/www\.bilibili\.com\/video\/BV[\w]+\)/g,
    (match) => {
      const bvid = match.match(/BV[\w]+/)?.[0] || ''
      return `<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="//player.bilibili.com/player.html?bvid=${bvid}&page=1" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`
    }
  )

  // 处理 YouTube 视频
  content = content.replace(
    /\[video\]\(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+\)/g,
    (match) => {
      const vid = match.match(/v=([\w-]+)/)?.[1] || ''
      return `<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.youtube.com/embed/${vid}" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`
    }
  )

  // 处理直接视频链接
  content = content.replace(
    /\[video\]\((https?:\/\/.*\.(mp4|webm|ogg))\)/g,
    (match, url) => {
      return `<video controls style="width: 100%; max-width: 800px; margin: 1rem 0;"><source src="${url}" /></video>`
    }
  )

  const processedContent = await remark()
    .use(html)
    .process(content)

  return processedContent.toString()
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set(posts.map(p => p.category))
  return Array.from(categories)
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set(posts.flatMap(p => p.tags))
  return Array.from(tags)
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug, title, date, category, tags, excerpt, image, published, top, created_at')
    .eq('published', true)
    .eq('category', category)
    .order('top', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) return []
  return (data || []).map(p => ({
    slug: p.slug, title: p.title, date: p.date,
    category: p.category || '未分类', tags: p.tags || [],
    excerpt: p.excerpt || '', image: p.image || '',
    published: p.published, top: p.top, created_at: p.created_at,
  }))
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug, title, date, category, tags, excerpt, image, published, top, created_at')
    .eq('published', true)
    .contains('tags', [tag])
    .order('top', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) return []
  return (data || []).map(p => ({
    slug: p.slug, title: p.title, date: p.date,
    category: p.category || '未分类', tags: p.tags || [],
    excerpt: p.excerpt || '', image: p.image || '',
    published: p.published, top: p.top, created_at: p.created_at,
  }))
}
