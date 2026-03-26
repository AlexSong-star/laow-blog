// 后台评论管理 API
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('comments')
    .select('id, slug, author_name, content, created_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ comments: [] })
  return NextResponse.json({ comments: data || [] })
}

export async function DELETE(req: Request) {
  const body = await req.json()
  const { id } = body
  if (!id) return NextResponse.json({ error: '缺少 id' }, { status: 400 })

  const { error } = await supabase.from('comments').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
