import { NextResponse } from 'next/server';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || '';
  
  let allPostsCount = 0;
  let allPostsError = 'none';
  let postBySlugResult = 'not_tried';
  
  try {
    const all = await getAllPosts();
    allPostsCount = all.length;
  } catch (e: unknown) {
    allPostsError = String(e);
  }
  
  if (slug) {
    try {
      const post = await getPostBySlug(slug);
      postBySlugResult = post ? `found:${post.title}` : 'null';
    } catch (e: unknown) {
      postBySlugResult = `error:${String(e)}`;
    }
  }
  
  return NextResponse.json({
    slug,
    allPostsCount,
    allPostsError,
    postBySlugResult,
    env: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'MISSING',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set' : 'MISSING',
    }
  });
}
