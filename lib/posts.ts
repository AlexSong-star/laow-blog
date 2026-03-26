// 博客文章读取工具 — Supabase 版本
import { supabase } from './supabase'

export interface Post {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  image: string
  published: boolean
  top: boolean
  contentHtml?: string
  content?: string
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, date, category, tags, excerpt, image, published, top')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getAllPosts error:', error)
    return []
  }

  // 按置顶优先，再按日期排序
  const posts: Post[] = (data || []).sort((a, b) => {
    if (a.top && !b.top) return -1
    if (!a.top && b.top) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return posts
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
    slug: data.slug,
    title: data.title,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    image: data.image || '',
    published: data.published,
    top: data.top,
    content: data.content || '',
  }
}

export async function getPostContentHtml(slug: string): Promise<string> {
  const post = await getPostBySlug(slug)
  if (!post || !post.content) {
    return ''
  }

  let content = post.content

  // 移除 Markdown 内容中的第一个标题（# title），因为 frontmatter 的 title 已在页面显示
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

  // Markdown → HTML 转换
  const { remark } = await import('remark')
  const remarkHtml = (await import('remark-html')).default
  const processedContent = await remark()
    .use(remarkHtml)
    .process(content)

  return processedContent.toString()
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories)
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set(posts.flatMap(post => post.tags))
  return Array.from(tags)
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, date, category, tags, excerpt, image, published, top')
    .eq('category', category)
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) return []
  return data || []
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, date, category, tags, excerpt, image, published, top')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) return []
  return (data || []).filter(post => post.tags?.includes(tag))
}
