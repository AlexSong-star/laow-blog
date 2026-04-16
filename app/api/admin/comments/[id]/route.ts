// 单条评论删除 API
import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const DATA_FILE = path.join(process.cwd(), 'data', 'comments.json')

function getComments() {
  try {
    if (existsSync(DATA_FILE)) return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
  } catch {}
  return []
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const comments = getComments().filter((c: { id: string }) => c.id !== id)
  const dir = path.dirname(DATA_FILE)
  if (!existsSync(dir)) require('fs').mkdirSync(dir, { recursive: true })
  writeFileSync(DATA_FILE, JSON.stringify(comments))
  return NextResponse.json({ success: true })
}
