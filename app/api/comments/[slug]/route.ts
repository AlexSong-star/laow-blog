// 评论 API — 读取 & 发布
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { filterComment } from '@/lib/sensitive-filter'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function sfFetch(path: string, opts: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...opts,
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', ...opts.headers },
  })
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const { data, error } = await supabase
    .from('comments')
    .select('id, author_name, content, created_at')
    .eq('slug', slug)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ comments: [] })
  return NextResponse.json({ comments: data || [] })
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

  // 敏感词过滤
  const result = filterComment(author_name.trim(), content.trim())
  if (!result.passed) {
    return NextResponse.json({ error: '评论内容包含敏感词，禁止发表' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({ slug, author_name: author_name.trim(), content: content.trim() })
    .select('id, author_name, content, created_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ comment: data })
}
