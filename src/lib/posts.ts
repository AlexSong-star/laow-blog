// 博客文章读取工具 — 本地文件系统版（无外部依赖）
// 使用简单的正则解析 frontmatter，避免 gray-matter 解析失败问题
import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const POSTS_DIR = path.join(process.cwd(), 'posts')
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/AlexSong-star/laow-blog@main/public'

function toCdnUrl(imagePath: string): string {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  if (imagePath.startsWith('/')) return CDN_BASE + imagePath
  return CDN_BASE + '/' + imagePath
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
  content?: string
}

function parseFrontmatter(content: string): { data: Record<string, unknown>; content: string } {
  const result: Record<string, unknown> = {}
  let rest = content

  // 匹配 --- 行首的 frontmatter
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (fmMatch) {
    rest = fmMatch[2]
    const lines = fmMatch[1].split(/\r?\n/)
    for (const line of lines) {
      const colonIdx = line.indexOf(':')
      if (colonIdx === -1) continue
      const key = line.slice(0, colonIdx).trim()
      const val = line.slice(colonIdx + 1).trim()

      // 布尔值
      if (val === 'true') { result[key] = true; continue }
      if (val === 'false') { result[key] = false; continue }

      // 数字
      if (!isNaN(Number(val)) && val !== '') { result[key] = Number(val); continue }

      // JSON 数组 [a, b, c]
      if (val.startsWith('[') && val.endsWith(']')) {
        try { result[key] = JSON.parse(val.replace(/'/g, '"')); continue } catch {}
      }

      // 带引号的字符串 "..." 或 '...'
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        result[key] = val.slice(1, -1)
        continue
      }

      // 无引号字符串
      result[key] = val
    }
  }

  return { data: result, content: rest }
}

function parsePost(filename: string, fileContent: string): Post | null {
  try {
    const { data, content } = parseFrontmatter(fileContent)
    const slug = filename.replace(/\.md$/, '')
    return {
      slug,
      title: String(data.title || ''),
      date: String(data.date || ''),
      excerpt: String(data.description || data.excerpt || ''),
      category: String(data.category || '博客'),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      image: toCdnUrl(String(data.image || '')),
      published: data.published !== false,
      top: data.top === true,
      content,
    }
  } catch {
    return null
  }
}

function getAllPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
}

export async function getAllPosts(): Promise<Post[]> {
  const files = getAllPostFiles()
  const posts: Post[] = []
  for (const filename of files) {
    try {
      const content = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const post = parsePost(filename, content)
      if (post && post.published) posts.push(post)
    } catch {}
  }
  return posts.sort((a, b) => {
    if (a.top && !b.top) return -1
    if (!a.top && b.top) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export async function getAllPostsIncludeUnpublished(): Promise<Post[]> {
  const files = getAllPostFiles()
  const posts: Post[] = []
  for (const filename of files) {
    try {
      const content = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const post = parsePost(filename, content)
      if (post) posts.push(post)
    } catch {}
  }
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filename = slug + '.md'
  const filepath = path.join(POSTS_DIR, filename)
  if (!fs.existsSync(filepath)) return null
  try {
    const content = fs.readFileSync(filepath, 'utf-8')
    return parsePost(filename, content)
  } catch {
    return null
  }
}

export async function getPostContentHtml(slug: string): Promise<string> {
  const post = await getPostBySlug(slug)
  if (!post || !post.content) return ''

  let content = post.content

  if (content.trim().startsWith('<')) return content

  content = content.replace(/^#\s+.+$/m, '')

  content = content.replace(
    /\[video\]\(https?:\/\/www\.bilibili\.com\/video\/BV[\w]+\)/g,
    (match) => {
      const bvid = match.match(/BV[\w]+/)?.[0] || ''
      return `<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="//player.bilibili.com/player.html?bvid=${bvid}&page=1" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`
    }
  )

  content = content.replace(
    /\[video\]\(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+\)/g,
    (match) => {
      const vid = match.match(/v=([\w-]+)/)?.[1] || ''
      return `<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.youtube.com/embed/${vid}" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`
    }
  )

  content = content.replace(
    /\[video\]\((https?:\/\/.*\.(?:mp4|webm|ogg))\)/g,
    (_match, url) => {
      return `<video controls style="width: 100%; max-width: 800px; margin: 1rem 0;"><source src="${url}" /></video>`
    }
  )

  const processedContent = await remark()
    .use(remarkHtml)
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
  const posts = await getAllPosts()
  return posts.filter(p => p.category === category)
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(p => p.tags?.includes(tag))
}
