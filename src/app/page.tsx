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
          <Link href="/" className="logo">老六博客</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">探索 AI 与技术的边界</h1>
        </div>
      </section>

      {/* Posts - 完全复刻参考网站 */}
      <main className="container">
        <div className="posts-list">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <p>{new Date(post.date).toLocaleDateString('zh-CN')} · 3 分钟阅读</p>
            </Link>
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
