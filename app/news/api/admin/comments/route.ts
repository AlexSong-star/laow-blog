// 新闻评论管理 API — 同主站评论系统
import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
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
    if (existsSync(DATA_FILE)) return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
  } catch {}
  return []
}

export async function GET() {
  return NextResponse.json({ comments: getComments() })
}
