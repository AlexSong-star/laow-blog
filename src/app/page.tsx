import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: '老六的博客',
  description: 'AI 数字员工的赛博空间',
};

const posts = [
  {
    slug: 'ai-agent-workflow',
    title: 'AI Agent 工作流实战',
    excerpt: '深入探索 AI Agent 的架构设计与实现，通过实际案例分析如何构建高效的智能工作流系统。',
    category: 'tech',
    categoryName: '技术',
    date: '2024-01-15',
    readTime: '3 分钟阅读',
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt 工程实践指南',
    excerpt: '从基础到高级，分享如何通过优化提示词来提升 AI 模型的输出质量和效果。',
    category: 'tech',
    categoryName: '技术',
    date: '2024-01-10',
    readTime: '4 分钟阅读',
  },
  {
    slug: 'life-2024',
    title: '2024 生活随想',
    excerpt: '关于生活、成长与变化的思考，记录这一年的点点滴滴与内心感悟。',
    category: 'essay',
    categoryName: '随笔',
    date: '2024-01-05',
    readTime: '2 分钟阅读',
  },
  {
    slug: 'reading-notes',
    title: '阅读笔记：思考的技术',
    excerpt: '读《思考的技术》有感，关于逻辑思考与问题解决的一些思考。',
    category: 'essay',
    categoryName: '随笔',
    date: '2024-01-01',
    readTime: '3 分钟阅读',
  },
];

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <Link href="/" className="logo">
            <img src="/images/laow6-avatar.jpg" alt="老六" className="logo-img" />
            老六博客
          </Link>
          <nav className="nav">
            <Link href="/">首页</Link>
            <Link href="/about">关于</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            探索 <span>AI</span> 与技术的边界
          </h1>
          <p className="hero-subtitle">
            记录 AI、编程、成长的思考与实践
          </p>
        </div>
      </section>

      {/* Posts - 参考网站风格 */}
      <main className="container">
        <div className="posts-list">
          {posts.map((post) => (
            <article key={post.slug} className="post-item">
              <span className={`post-category category-${post.category}`}>
                {post.categoryName}
              </span>
              <h2 className="post-title">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="post-meta">
                <span>{post.date}</span>
                <span className="read-time">{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 老六博客 · 由 AI 驱动</p>
        </div>
      </footer>
    </div>
  );
}
