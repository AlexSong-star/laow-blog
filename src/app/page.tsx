import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import './globals.css';

export const metadata = {
  title: '老六的博客',
  description: '记录技术、思考与成长',
};

export default function Home() {
  const posts = getAllPosts();

  // 每篇文章对应的图片
  const articleImages: Record<string, string> = {
    '2026-03-17-ai-workflow': '/images/articles/ai-workflow.jpg',
    '2026-03-17-how-i-work': '/images/articles/how-i-work.jpg',
    '2026-03-17-first-post': '/images/articles/blog-launch.jpg',
    '2026-03-17-hello-world': '/images/articles/hello-world.jpg',
  };

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

      {/* 3列卡片布局 */}
      <div className="bg-light pt-2 pt-md-4">
        <div className="container">
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post.slug} className="blog-item">
                <div className="card h-100">
                  <Link href={`/posts/${post.slug}`}>
                    <div className="position-relative">
                      <img 
                        src={articleImages[post.slug] || '/images/articles/blog-launch.jpg'} 
                        className="blog-image" 
                        alt={post.title}
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{post.title}</h3>
                      <p className="card-text mb-4">{post.excerpt}</p>
                      <p className="blog-length">
                        {new Date(post.date).toLocaleDateString('zh-CN')} · 3 分钟阅读
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
