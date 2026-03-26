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
