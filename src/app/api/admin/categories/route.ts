import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('category, tags')

  if (error) {
    return NextResponse.json({ categories: [], tags: [] })
  }

  const categoriesSet = new Set<string>()
  const tagsSet = new Set<string>()

  ;(data || []).forEach(p => {
    if (p.category) categoriesSet.add(p.category)
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach((tag: string) => tagsSet.add(tag))
    }
  })

  return NextResponse.json({
    categories: Array.from(categoriesSet),
    tags: Array.from(tagsSet),
  })
}
