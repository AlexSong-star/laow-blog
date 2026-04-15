// 博客文章读取工具 — 静态 JSON 版本（从 GitHub posts.json 读取）
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/AlexSong-star/laow-blog@main/public'

function toCdnUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('/')) return CDN_BASE + path
  return CDN_BASE + '/' + path
}

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

let _postsCache: Post[] | null = null

async function loadPosts(): Promise<Post[]> {
  if (_postsCache) return _postsCache
  const res = await fetch(`${CDN_BASE}/posts.json`, { cache: 'no-store' })
  if (!res.ok) {
    console.error('Failed to load posts.json:', res.status)
    return []
  }
  const posts: Post[] = await res.json()
  _postsCache = posts.map(p => ({ ...p, image: toCdnUrl(p.image) }))
  return _postsCache
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await loadPosts()
  return posts.filter(p => p.published)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await loadPosts()
  return posts.find(p => p.slug === slug) || null
}

export async function getPostContentHtml(slug: string): Promise<string> {
  const post = await getPostBySlug(slug)
  if (!post || !post.content) {
    return ''
  }

  let content = post.content

  // 如果内容已经是 HTML（以 < 开头），直接返回，跳过 remark 处理
  if (content.trim().startsWith('<')) {
    return content
  }

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
  const posts = await getAllPosts()
  return posts.filter(p => p.category === category)
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(p => p.tags?.includes(tag))
}
