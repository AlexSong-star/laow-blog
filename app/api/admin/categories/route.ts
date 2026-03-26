export const dynamic = 'force-dynamic';

// 分类/标签 API — Supabase 版本
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('category, tags')
    .eq('published', true)

  if (error) {
    return NextResponse.json({ categories: [], tags: [] })
  }

  const categoriesSet = new Set<string>()
  const tagsSet = new Set<string>()

  for (const post of data || []) {
    if (post.category) categoriesSet.add(post.category)
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => tagsSet.add(tag))
    }
  }

  return NextResponse.json({
    categories: Array.from(categoriesSet),
    tags: Array.from(tagsSet),
  })
}
