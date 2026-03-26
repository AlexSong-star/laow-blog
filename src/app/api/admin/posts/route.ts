import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/admin/posts - 列出所有文章
export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('slug, title, date, category, tags, excerpt, published, top, created_at')
    .order('top', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ posts: [] }, { status: 200 })
  }

  return NextResponse.json({ posts: data || [] })
}

// POST /api/admin/posts - 创建新文章
export async function POST(request: Request) {
  const body = await request.json()
  const { title, date, category, tags, excerpt, content, published, top, image } = body

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '-' + date

  const { error } = await supabase.from('posts').insert({
    slug,
    title,
    date,
    category: category || '博客',
    tags: tags || [],
    excerpt: excerpt || '',
    content: content || '',
    image: image || '',
    published: published !== false,
    top: top || false,
  })

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, slug })
}
