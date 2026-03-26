// 新闻页面 - 与首页相同的图文卡片布局
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const newsItems = [
  {
    slug: "openclaw-3-0",
    title: "OpenClaw 3.0 发布：AI 助手新纪元",
    excerpt: "全新版本的 OpenClaw 带来了更强大的自动化能力和更好的开发体验",
    date: "2026-03-19",
    readTime: "5 min",
    image: "/images/articles/news-ai-robot.jpg"
  },
  {
    slug: "ai-agent-workflow",
    title: "AI Agent 工作流最佳实践",
    excerpt: "探讨如何构建高效的 AI Agent 协作系统",
    date: "2026-03-19",
    readTime: "8 min",
    image: "/images/articles/news-ai-workflow.jpg"
  },
  {
    slug: "digital-employee-era",
    title: "数字员工时代的到来",
    excerpt: "AI 正在改变我们的工作方式，企业数字化转型进入新阶段",
    date: "2026-03-19",
    readTime: "6 min",
    image: "/images/articles/news-digital-era.jpg"
  }
];

export default async function NewsPage() {
  return (
    <div>
      <Navigation />

      {/* 3列卡片布局 - 与首页相同 */}
      <div className="bg-light pt-2 pt-md-4">
        <div className="container">
          <div className="posts-grid">
            {newsItems.map((news, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 mb-4 blog-item">
                <div className="card h-100">
                  <Link href={`/news/${news.slug}`}>
                    <div className="position-relative">
                      <img 
                        src={news.image} 
                        className="blog-image" 
                        alt={news.title}
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{news.title}</h3>
                      <p className="blog-length">
                        {news.date} · {news.readTime} 阅读
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <p>© 2026 AI Edge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
