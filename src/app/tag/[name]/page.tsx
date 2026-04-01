// 标签页面
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {getAllPosts, getPostBySlug, getAllCategories, getAllTags, getPostsByCategory, getPostsByTag} from '@/lib/posts';

export const revalidate = 60;

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((name) => ({ name }));
}

export default async function TagPage({ params }: Props) {
  const { name } = await params;
  const posts = await getPostsByTag(name);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 头部 */}
      <header className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-4 transition-colors"
        >
          ← 返回文章列表
        </Link>
        
        <h1 className="text-3xl font-bold text-white mb-2">
          标签：<span className="text-emerald-400">#{name}</span>
        </h1>
        <p className="text-gray-500">共 {posts.length} 篇文章</p>
      </header>

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
                  <Link 
                    href={`/category/${post.category}`}
                    className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded hover:bg-emerald-500/30 transition-colors"
                  >
                    {post.category}
                  </Link>
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
      </section>
    </div>
  );
}
