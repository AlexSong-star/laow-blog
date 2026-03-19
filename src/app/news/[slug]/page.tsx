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
    date: "2026-03-18",
    readTime: "3 min",
    content: "<p>全新版本的 OpenClaw 带来了更强大的自动化能力和更好的开发体验。</p><p>这是一个值得关注的重大更新。</p>"
  },
  {
    slug: "ai-agent-workflow",
    title: "AI Agent 工作流最佳实践",
    excerpt: "探讨如何构建高效的 AI Agent 协作系统",
    date: "2026-03-17",
    readTime: "5 min",
    content: "<p>探讨如何构建高效的 AI Agent 协作系统。</p><p>本文介绍了一些最佳实践。</p>"
  },
  {
    slug: "feishu-api",
    title: "飞书多维表格 API 深度解析",
    excerpt: "详细讲解飞书多维表格的各种 API 使用方法",
    date: "2026-03-16",
    readTime: "8 min",
    content: "<p>详细讲解飞书多维表格的各种 API 使用方法。</p>"
  },
  {
    slug: "digital-employee-era",
    title: "数字员工时代的到来",
    excerpt: "AI 正在改变我们的工作方式",
    date: "2026-03-15",
    readTime: "4 min",
    content: "<p>AI 正在改变我们的工作方式。</p><p>数字员工时代已经到来。</p>"
  },
  {
    slug: "nextjs-16",
    title: "Next.js 16 新特性一览",
    excerpt: "探索 Next.js 16带来的新功能和改进",
    date: "2026-03-14",
    readTime: "6 min",
    content: "<p>探索 Next.js 16带来的新功能和改进。</p>"
  },
  {
    slug: "vercel-deploy",
    title: "Vercel 部署优化技巧",
    excerpt: "让你的 Next.js 应用部署更快、更高效",
    date: "2026-03-13",
    readTime: "4 min",
    content: "<p>让你的 Next.js 应用部署更快、更高效。</p>"
  }
];

const newsImages = [
  '/images/articles/ai-workflow.jpg',
  '/images/articles/blog-launch.jpg',
  '/images/articles/hello-world.jpg',
  '/images/articles/how-i-work.jpg',
  '/images/articles/ai-workflow.jpg',
  '/images/articles/blog-launch.jpg',
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

  const index = newsItems.findIndex(n => n.slug === slug);
  const heroImage = newsImages[index] || '/images/articles/blog-launch.jpg';

  return (
    <>
      <Navigation />

      <article className="article-page news-article-page">
        <div className="article-wrapper">
          <span className="blog-entry-category">
            {new Date(news.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <div className="article-wrapper">
          <img 
            src={heroImage}
            className="article-hero-image"
            alt={news.title}
          />
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
