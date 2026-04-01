import { NextRequest } from 'next/server'
import { getPostBySlug } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') || ''
  
  // Test getPostBySlug
  const post = await getPostBySlug(slug)
  
  return Response.json({
    slug_received: slug,
    slug_hex: Buffer.from(slug, 'utf8').toString('hex'),
    slug_length: slug.length,
    post_found: post !== null,
    post_title: post?.title || null,
    error: null,
  })
}
