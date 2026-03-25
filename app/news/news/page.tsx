// 新闻页面 - 与首页相同的图文卡片布局
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const newsItems = [
  {
    slug: "astral-join-openai",
    title: "Astral 团队加入 OpenAI：Python 工具作者的下一站",
    excerpt: "Ruff 和 uv 的作者团队 Astral 宣布加入 OpenAI，继续推进 Python 开发者工具革新",
    date: "2026-03-20",
    readTime: "4 min",
    image: "/images/articles/news-ai-robot.jpg"
  },
  {
    slug: "google-android-sideload",
    title: "Google 发布 Android 侧载应用新政策",
    excerpt: "Google 公布新流程，第三方应用侧载需经更严格的验证机制",
    date: "2026-03-20",
    readTime: "3 min",
    image: "/images/articles/news-ai-workflow.jpg"
  },
  {
    slug: "markdown-generative-ui",
    title: "Markdown 变身生成式 UI 协议",
    excerpt: "开发者将 Markdown 转化为生成式 UI 的协议，开启前端开发新范式",
    date: "2026-03-20",
    readTime: "4 min",
    image: "/images/articles/news-digital-era.jpg"
  },
  {
    slug: "2026-03-20-ai-news",
    title: "AI日报：全球算力告急涨价，腾讯AI投入翻倍",
    excerpt: "全球算力告急引发涨价潮，阿里云百度云同日官宣；腾讯2026财年AI投入翻倍",
    date: "2026-03-20",
    readTime: "3 min",
    image: "/images/articles/cloud-computing-price.png"
  },
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

export default function NewsPage() {
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
                  <Link href={`/posts/${news.slug}`}>
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
