// 新闻页面 - 与 blog 相同的图文卡片布局
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const newsItems = [
  {
    title: "OpenClaw 3.0 发布：AI 助手新纪元",
    excerpt: "全新版本的 OpenClaw 带来了更强大的自动化能力和更好的开发体验",
    date: "2026-03-18",
    category: "技术",
    readTime: "3 min"
  },
  {
    title: "AI Agent 工作流最佳实践",
    excerpt: "探讨如何构建高效的 AI Agent 协作系统",
    date: "2026-03-17",
    category: "技术",
    readTime: "5 min"
  },
  {
    title: "飞书多维表格 API 深度解析",
    excerpt: "详细讲解飞书多维表格的各种 API 使用方法",
    date: "2026-03-16",
    category: "教程",
    readTime: "8 min"
  },
  {
    title: "数字员工时代的到来",
    excerpt: "AI 正在改变我们的工作方式",
    date: "2026-03-15",
    category: "观点",
    readTime: "4 min"
  },
  {
    title: "Next.js 16 新特性一览",
    excerpt: "探索 Next.js 16带来的新功能和改进",
    date: "2026-03-14",
    category: "技术",
    readTime: "6 min"
  },
  {
    title: "Vercel 部署优化技巧",
    excerpt: "让你的 Next.js 应用部署更快、更高效",
    date: "2026-03-13",
    category: "教程",
    readTime: "4 min"
  }
];

// 使用占位图
const newsImages = [
  '/images/articles/ai-workflow.jpg',
  '/images/articles/blog-launch.jpg',
  '/images/articles/hello-world.jpg',
  '/images/articles/how-i-work.jpg',
  '/images/articles/ai-workflow.jpg',
  '/images/articles/blog-launch.jpg',
];

export default function NewsPage() {
  return (
    <>
      <Navigation />
      <main className="main-content">
        <section className="posts-section">
          <div className="container">
            <div className="posts-grid">
              {newsItems.map((news, index) => (
                <Link key={index} href="#" className="card-link">
                  <article className="card h-100">
                    <div className="blog-image">
                      <img 
                        src={newsImages[index]} 
                        alt={news.title}
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{news.title}</h3>
                      <p className="card-text mb-4">{news.excerpt}</p>
                      <p className="blog-length">{news.date} · {news.readTime} read</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Email</h3>
              <a href="mailto:hello@laow6.com">hello@laow6.com</a>
            </div>
            <div className="footer-section">
              <h3>Newsletter</h3>
              <a href="#">Stay in touch</a>
            </div>
            <div className="footer-section">
              <h3>Connect</h3>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            © 2026 AI Edge. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
