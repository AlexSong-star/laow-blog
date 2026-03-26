import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  // 统计文章数
  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({
    totalPosts: totalPosts || 0,
    totalViews: 0,
    totalLikes: 0,
  })
}
