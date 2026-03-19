// 新闻详情页
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

// 新闻数据
const newsItems = [
  {
    slug: "openclaw-3-0",
    title: "OpenClaw 3.0 发布：AI 助手新纪元",
    excerpt: "全新版本的 OpenClaw 带来了更强大的自动化能力和更好的开发体验",
    date: "2026-03-19",
    readTime: "3 min",
    content: "<p>全新版本的 OpenClaw 带来了更强大的自动化能力和更好的开发体验。</p><p>这是一个值得关注的重大更新，包含了众多新功能和改进。</p><p>主要更新包括：</p><ul><li>更智能的任务自动化</li><li>更好的插件生态系统</li><li>增强的协作能力</li><li>性能优化和bug修复</li></ul>",
    image: "/images/articles/news-ai-robot.jpg"
  },
  {
    slug: "ai-agent-workflow",
    title: "AI Agent 工作流最佳实践",
    excerpt: "探讨如何构建高效的 AI Agent 协作系统",
    date: "2026-03-19",
    readTime: "5 min",
    content: "<p>探讨如何构建高效的 AI Agent 协作系统。</p><p>本文介绍了一些最佳实践：</p><ul><li>合理分配任务给不同的Agent</li><li>建立清晰的通信协议</li><li>实现错误处理和恢复机制</li><li>监控和日志记录</li></ul><p>通过这些实践，可以构建更加可靠和高效的AI系统。</p>",
    image: "/images/articles/ai-workflow.jpg"
  },
  {
    slug: "digital-employee-era",
    title: "数字员工时代的到来",
    excerpt: "AI 正在改变我们的工作方式，企业数字化转型进入新阶段",
    date: "2026-03-19",
    readTime: "4 min",
    content: "<p>AI 正在改变我们的工作方式，企业数字化转型进入新阶段。</p><p>数字员工不再是概念，而是正在成为现实。</p><ul><li>24/7 工作能力</li><li>处理重复性任务</li><li>降低人为错误</li><li>提升工作效率</li></ul><p>未来，每个企业都将拥有自己的数字员工团队。</p>",
    image: "/images/articles/blog-upgrade.jpg"
  }
];

export async function generateStaticParams() {
  return newsItems.map((news) => ({
    slug: news.slug,
  }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = newsItems.find(n => n.slug === slug);
  
  if (!news) {
    notFound();
  }

  // 找到当前新闻的索引，获取下一个新闻
  const currentIndex = newsItems.findIndex(n => n.slug === slug);
  const nextNews = newsItems[currentIndex + 1] || newsItems[0]; // 循环到第一个

  const nextIndex = currentIndex + 1 >= newsItems.length ? 0 : currentIndex + 1;

  return (
    <>
      <Navigation />

      <article className="article-page news-article-page" style={{ padding: 0 }}>
        <img 
          src={news.image}
          className="article-hero-image"
          alt={news.title}
          style={{ borderRadius: 0, aspectRatio: '1/1', height: 'auto', width: '100%' }}
        />
        
        <div className="article-wrapper" style={{ padding: '0 24px' }}>
          <span className="blog-entry-category">
            {new Date(news.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <div className="article-wrapper">
          <div className="article-content">
            <h1>{news.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
            <div className="share-links">
              <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>
        </div>
      </article>

      {/* 下一个新闻推荐 */}
      <section className="news-article-page">
        <div className="container" style={{ maxWidth: '100%', padding: '0' }}>
          <div className="posts-grid" style={{ margin: 0, width: '100%' }}>
            <div className="col-12 col-md-6 col-lg-4 mb-4 blog-item">
              <div className="card h-100">
                <Link href={`/news/${nextNews.slug}`}>
                  <div className="position-relative">
                    <img 
                      src={nextNews.image} 
                      className="blog-image" 
                      alt={nextNews.title}
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{nextNews.title}</h3>
                    <p className="blog-length">
                      {nextNews.date} · {nextNews.readTime} 阅读
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <a href="#"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
              <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 AI Edge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
