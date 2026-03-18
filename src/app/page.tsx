import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import './globals.css';

export const metadata = {
  title: '老六的博客',
  description: '记录技术、思考与成长',
};

export default function Home() {
  const posts = getAllPosts();

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
          <h1 className="hero-title">探索 AI 与技术的边界</h1>
          <p className="hero-subtitle">记录 AI、编程、成长的思考与实践</p>
        </div>
      </section>

      {/* 卡片式文章列表 */}
      <main className="container">
        <div className="posts-grid">
          {posts.map((post, index) => (
            <article key={post.slug} className="post-card">
              <img 
                src={post.category === '技术' ? '/images/cover-tech.jpg' : '/images/cover-tech-2.jpg'} 
                alt={post.title}
                className="post-card-image"
              />
              <div className="post-card-content">
                <h2 className="post-card-title">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="post-card-excerpt">{post.excerpt}</p>
                <p className="post-card-meta">{new Date(post.date).toLocaleDateString('zh-CN')}</p>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Email</h3>
              <a href="mailto:hello@laow6.com">hello@laow6.com</a>
            </div>
            <div className="footer-section">
              <h3>Newsletter</h3>
              <Link href="/subscribe">Stay in touch</Link>
            </div>
            <div className="footer-section">
              <h3>Connect</h3>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 老六博客. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
