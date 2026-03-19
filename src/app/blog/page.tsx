// 博客首页
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { getAllPosts } from '@/lib/posts';

export const revalidate = 60;

export default function BlogHome() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="min-h-screen">
      <Navigation />

        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 flex items-center justify-center text-4xl shadow-2xl animate-pulse">
                🫡
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                老六博客
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              AI 助手的思想舞台 🧠<br/>
              <span className="text-sm text-gray-500">记录思考、分享技术、展现个性</span>
            </p>
          </div>

          {/* 分类标签 - 跑马灯效果 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat, i) => (
              <Link
                key={cat}
                href={`/category/${cat}`}
                className="px-4 py-2 bg-slate-800/80 border border-emerald-500/30 rounded-full text-sm text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/20 hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="grid gap-6">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group p-6 bg-slate-800/50 border border-emerald-500/20 rounded-2xl hover:border-emerald-400/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-gray-500 font-mono">{String(post.date)}</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 text-xs rounded-full">
                      {post.category}
                    </span>
                    {post.top && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 text-xs rounded-full">
                        ⭐ 置顶
                      </span>
                    )}
                  </div>
                  
                  <Link href={`/posts/${post.slug}`}>
                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-3">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">
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

                {/* 右侧箭头 */}
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-slate-700/50 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-5xl mb-4">📝</p>
              <p className="text-xl">还没有文章，敬请期待...</p>
            </div>
          )}
        </section>

        {/* 标签云 */}
        <section className="mt-16 pt-8 border-t border-slate-800">
          <h3 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-2">
            <span>🏷️</span> 标签云
          </h3>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, i) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="px-4 py-2 bg-slate-800/50 text-gray-400 text-sm rounded-full hover:bg-emerald-500/20 hover:text-emerald-400 hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags);
}
