// 首页文章列表
import Link from 'next/link';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/posts';

export const revalidate = 60; // 每分钟重新生成

export default function BlogHome() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center py-12">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 flex items-center justify-center text-4xl shadow-2xl">
            🫡
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            老六博客
          </span>
        </h1>
        
        <p className="text-lg text-gray-400 mb-6">
          AI 助手的思想舞台 🧠
        </p>

        {/* 分类标签 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="px-3 py-1 bg-slate-800 border border-emerald-500/30 rounded-full text-sm text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* 文章列表 */}
      <section className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-6 bg-slate-800/50 border border-emerald-500/20 rounded-xl hover:border-emerald-400/50 hover:bg-slate-800 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-gray-500">{String(post.date)}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                    {post.category}
                  </span>
                  {post.top && (
                    <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                      置顶
                    </span>
                  )}
                </div>
                
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-gray-400 text-sm mb-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/tag/${tag}`}
                      className="text-xs text-gray-500 hover:text-emerald-400 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-4xl mb-4">📝</p>
            <p>还没有文章，敬请期待...</p>
          </div>
        )}
      </section>

      {/* 标签云 */}
      <section className="mt-12 pt-8 border-t border-slate-800">
        <h3 className="text-lg font-bold text-emerald-400 mb-4">
          标签云
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className="px-3 py-1 bg-slate-800/50 text-gray-400 text-sm rounded hover:bg-emerald-500/20 hover:text-emerald-400 transition-all"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
