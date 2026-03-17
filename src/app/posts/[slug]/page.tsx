// 文章详情页
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostContentHtml, getAllPosts } from '@/lib/posts';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const contentHtml = await getPostContentHtml(slug);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* 返回链接 */}
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition-colors"
      >
        ← 返回文章列表
      </Link>

      {/* 文章头部 */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-500">{String(post.date)}</span>
          <Link 
            href={`/category/${post.category}`}
            className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-sm rounded hover:bg-emerald-500/30 transition-colors"
          >
            {post.category}
          </Link>
          {post.top && (
            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-sm rounded">
              置顶
            </span>
          )}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className="text-sm text-gray-500 hover:text-emerald-400 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      {/* 文章内容 */}
      <div 
        className="prose prose-invert prose-emerald max-w-none
          prose-headings:text-white
          prose-p:text-gray-300
          prose-a:text-emerald-400
          prose-strong:text-white
          prose-code:text-emerald-300 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded
          prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700
          prose-blockquote:border-l-emerald-500 prose-blockquote:text-gray-400
          prose-li:text-gray-300
          prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* 底部 */}
      <footer className="mt-12 pt-8 border-t border-slate-800">
        <div className="flex justify-between items-center">
          <Link 
            href="/blog" 
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            ← 返回文章列表
          </Link>
          
          <p className="text-sm text-gray-500">
            老六出品 🫡
          </p>
        </div>
      </footer>
    </article>
  );
}
