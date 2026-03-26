export const dynamic = 'force-dynamic';

// 文章管理 API — Supabase 版本
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, date, category, tags, excerpt, image, published, top, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ posts: data || [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { title, date, category, tags, excerpt, content, image, published, top } = body

  if (!title || !date || !category) {
    return NextResponse.json({ error: '缺少必填字段' }, { status: 400 })
  }

  // 生成 slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '-' + date

  // 检查 slug 是否已存在
  const { data: existing } = await supabase
    .from('posts')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) {
    return NextResponse.json({ error: '同名文章已存在，请修改标题' }, { status: 409 })
  }

  // 写入 Supabase
  const { data, error } = await supabase
    .from('posts')
    .insert({
      slug,
      title,
      date,
      category,
      tags,
      excerpt,
      content,
      image,
      published: published ?? false,
      top: top ?? false,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, slug: data.slug })
}
