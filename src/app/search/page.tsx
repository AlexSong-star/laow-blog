// 搜索页面
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || '';
  
  const allPosts = getAllPosts();
  const results = query 
    ? allPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-6">
        🔍 搜索结果 {query && `：${query}`}
      </h1>

      {results.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p>{query ? '没有找到相关文章' : '请输入搜索关键词'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-500 mb-6">找到 {results.length} 篇文章</p>
          {results.map(post => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block p-6 bg-slate-800/50 border border-emerald-500/20 rounded-xl hover:border-emerald-400/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-gray-500">{post.date}</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                  {post.category}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2">{post.title}</h2>
              <p className="text-gray-400 text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
