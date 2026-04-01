// 搜索页面 - 带搜索框
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {getAllPosts, getPostBySlug, getAllCategories, getAllTags, getPostsByCategory, getPostsByTag} from '@/lib/posts';
import { encodeSlug } from '@/lib/slug';

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || '';
  
  const allPosts = await getAllPosts();
  const results = query 
    ? allPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 搜索框 */}
      <form action="/search" method="GET" className="mb-8">
        <div className="relative">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="搜索文章标题、内容、标签..."
            className="w-full px-6 py-4 bg-slate-800 border border-emerald-500/30 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-lg"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors"
          >
            🔍
          </button>
        </div>
      </form>

      {/* 搜索结果 */}
      {!query ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p>输入关键词搜索文章</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-4">😢</p>
          <p>没有找到相关文章</p>
          <p className="text-sm mt-2">试试其他关键词？</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-500 mb-6">找到 {results.length} 篇文章</p>
          {results.map(post => (
            <Link
              key={post.slug}
              href={`/posts/${encodeSlug(post.slug)}`}
              className="block p-6 bg-slate-800/50 border border-emerald-500/20 rounded-xl hover:border-emerald-400/50 hover:bg-slate-800 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-gray-500">{post.date}</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                  {post.category}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
