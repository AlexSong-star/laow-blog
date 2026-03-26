import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/admin/posts/[slug] - 获取单篇文章
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  }

  return NextResponse.json({ post: data })
}

// PUT /api/admin/posts/[slug] - 更新文章
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await request.json()
  const { title, date, category, tags, excerpt, content, published, top, image } = body

  const { error } = await supabase
    .from('posts')
    .update({
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
    .eq('slug', slug)

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

// DELETE /api/admin/posts/[slug] - 删除文章
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('slug', slug)

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
