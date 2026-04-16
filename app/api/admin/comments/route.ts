// 评论管理 API — 暂用内存存储（部署后不持久化，需后续接入数据库）
import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

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
    if (existsSync(DATA_FILE)) {
      return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    }
  } catch {}
  return []
}

export async function GET() {
  const comments = getComments()
  return NextResponse.json({ comments })
}

export async function DELETE(req: Request) {
  const body = await req.json()
  const { id } = body
  if (!id) return NextResponse.json({ error: '缺少 id' }, { status: 400 })

  const comments = getComments().filter(c => c.id !== id)
  const dir = path.dirname(DATA_FILE)
  if (!existsSync(dir)) require('fs').mkdirSync(dir, { recursive: true })
  writeFileSync(DATA_FILE, JSON.stringify(comments))
  return NextResponse.json({ success: true })
}
