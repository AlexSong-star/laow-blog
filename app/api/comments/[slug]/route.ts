// 评论 API — 读取 & 发布
import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'
import { filterComment } from '@/lib/sensitive-filter'

export const dynamic = 'force-dynamic'

const DATA_FILE = path.join(process.cwd(), 'data', 'comments.json')

interface Comment {
  id: string
  slug: string
  author_name: string
  content: string
  created_at: string
}

function getComments(): Comment[] {
  try {
    if (existsSync(DATA_FILE)) return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
  } catch {}
  return []
}

function saveComment(comment: Comment) {
  const comments = getComments()
  comments.push(comment)
  const dir = path.dirname(DATA_FILE)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(DATA_FILE, JSON.stringify(comments))
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const allComments = getComments()
  const filtered = allComments.filter(c => c.slug === slug)
  return NextResponse.json({ comments: filtered })
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await req.json()
  const { author_name, content } = body

  if (!author_name?.trim() || !content?.trim()) {
    return NextResponse.json({ error: '昵称和内容不能为空' }, { status: 400 })
  }

  const result = filterComment(author_name.trim(), content.trim())
  if (!result.passed) {
    return NextResponse.json({ error: '评论内容包含敏感词，禁止发表' }, { status: 403 })
  }

  const comment: Comment = {
    id: Date.now().toString(),
    slug,
    author_name: author_name.trim(),
    content: content.trim(),
    created_at: new Date().toISOString(),
  }

  saveComment(comment)
  return NextResponse.json({ comment })
}
