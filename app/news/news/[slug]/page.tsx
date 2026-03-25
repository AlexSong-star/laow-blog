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
    slug: "2026-03-20-ai-news",
    title: "AI日报：全球算力告急涨价，腾讯AI投入翻倍",
    excerpt: "全球算力告急引发涨价潮，阿里云百度云同日官宣；腾讯2026财年AI投入翻倍；英伟达新功能遭游戏圈抵制",
    date: "2026-03-20",
    readTime: "3 min",
    content: `<h3>1. 全球算力告急引发"涨价潮"</h3>
<p>AWS和腾讯云之后，阿里云与百度云于3月19日同日官宣涨价，最高涨幅达34%。这意味着云计算十年"价格战"正式终结。</p>
<p><strong>影响分析：</strong></p>
<ul>
<li>中小企业成本压力增加</li>
<li>AI算力需求持续旺盛</li>
<li>云计算厂商盈利能力有望改善</li>
</ul>

<h3>2. 腾讯2026财年AI投入翻倍</h3>
<p>稳扎稳打的腾讯也要为AI花大钱了。2026财年，腾讯将减少股票回购，AI投入翻倍。</p>
<p><strong>关键点：</strong></p>
<ul>
<li>AI投入大幅增加</li>
<li>股票回购力度减少</li>
<li>市场期待微信Agent和姚顺雨两张底牌</li>
</ul>

<h3>3. 英伟达新AI功能遭全网抵制</h3>
<p>老黄怒怼玩家"根本不懂AI"，英伟达新AI功能遭全网抵制，游戏圈炸锅了。</p>

<h3>行业观察</h3>
<ul>
<li><strong>算力紧缺</strong>：AI爆发式增长导致全球算力供不应求</li>
<li><strong>投资加码</strong>：科技巨头纷纷加大AI投入</li>
<li><strong>争议显现</strong>：AI新技术应用面临用户接受度挑战</li>
</ul>`,
    image: "/images/articles/cloud-computing-price.png"
  },
  {
    slug: "openclaw-3-0",
    title: "OpenClaw 3.0 发布：AI 助手新纪元",
    excerpt: "全新版本的 OpenClaw 带来了更强大的自动化能力和更好的开发体验",
    date: "2026-03-19",
    readTime: "5 min",
    content: `<p>OpenClaw 3.0 正式发布了！这一版本带来了众多令人兴奋的新功能和改进，标志着 AI 助手开发进入了一个新的里程碑。</p>
    
    <h3>主要更新亮点</h3>
    <ul>
    <li><strong>更智能的任务自动化</strong> - 全新的任务调度系统，能够更智能地处理复杂的工作流程</li>
    <li><strong>增强的插件生态系统</strong> - 支持更多第三方插件，集成能力大幅提升</li>
    <li><strong>改进的协作能力</strong> - 支持多 Agent 协同工作，更好地处理复杂任务</li>
    <li><strong>性能优化</strong> - 响应速度提升 40%，内存占用降低 25%</li>
    <li><strong>全新 UI 设计</strong> - 更现代化的界面，更好的用户体验</li>
    </ul>
    
    <h3>开发者体验提升</h3>
    <p>对于开发者来说，3.0 版本提供了更完善的 SDK 和 API 文档，让集成变得更加简单。新增的调试工具和实时监控功能，大大提升了开发效率。</p>
    
    <h3>安全性增强</h3>
    <p>安全性一直是 OpenClaw 的核心关注点。3.0 版本引入了更严格的权限控制和数据加密机制，确保用户数据的安全。</p>
    
    <p>如果你想了解更多关于 OpenClaw 3.0 的详细信息，可以访问官方网站或关注官方社区。</p>`,
    image: "/images/articles/news-ai-robot.jpg"
  },
  {
    slug: "ai-agent-workflow",
    title: "AI Agent 工作流最佳实践",
    excerpt: "探讨如何构建高效的 AI Agent 协作系统",
    date: "2026-03-19",
    readTime: "8 min",
    content: `<p>随着 AI 技术的快速发展，如何构建高效的 AI Agent 协作系统成为了开发者关注的焦点。本文将分享一些经过验证的最佳实践。</p>
    
    <h3>任务分配策略</h3>
    <ul>
    <li><strong>单一职责原则</strong> - 每个 Agent 只负责特定类型的任务，避免功能过于复杂</li>
    <li><strong>层级架构</strong> - 建立清晰的 Agent 层级，主 Agent 负责协调，子 Agent 负责执行</li>
    <li><strong>动态调度</strong> - 根据任务复杂度自动选择合适的 Agent 处理</li>
    </ul>
    
    <h3>通信协议设计</h3>
    <p>Agent 之间的通信是协作的关键。建议采用结构化的消息格式，明确消息类型和内容规范，便于调试和扩展。</p>
    
    <h3>错误处理机制</h3>
    <ul>
    <li><strong>重试策略</strong> - 实现智能重试，对临时性错误自动重试</li>
    <li><strong>降级方案</strong> - 当主要 Agent 不可用时，自动切换到备用方案</li>
    <li><strong>错误上报</strong> - 完善的错误收集和分析机制</li>
    </ul>
    
    <h3>监控和日志</h3>
    <p>建立全面的监控体系，实时跟踪 Agent 的运行状态和性能指标。详细的日志记录有助于问题排查和系统优化。</p>
    
    <h3>总结</h3>
    <p>构建高效的 AI Agent 系统需要综合考虑多个方面，包括架构设计、通信协议、错误处理和监控等。希望这些最佳实践对你有所帮助。</p>`,
    image: "/images/articles/news-ai-workflow.jpg"
  },
  {
    slug: "digital-employee-era",
    title: "数字员工时代的到来",
    excerpt: "AI 正在改变我们的工作方式，企业数字化转型进入新阶段",
    date: "2026-03-19",
    readTime: "6 min",
    content: `<p>AI 技术的快速发展正在彻底改变我们的工作方式。数字员工不再是科幻概念，而是正在成为企业中不可或缺的力量。</p>
    
    <h3>什么是数字员工？</h3>
    <p>数字员工是基于人工智能技术的虚拟工作者，能够模拟人类员工的行为，执行各种工作任务。它们可以 24/7 不间断工作，处理大量重复性任务，并且不会感到疲劳。</p>
    
    <h3>数字员工的优势</h3>
    <ul>
    <li><strong>效率提升</strong> - 处理速度是人工的 10 倍以上，错误率接近零</li>
    <li><strong>成本降低</strong> - 一次投入，长期使用，大幅降低人力成本</li>
    <li><strong>一致性</strong> - 服务质量稳定，不受情绪和状态影响</li>
    <li><strong>可扩展性</strong> - 根据业务需求快速扩展或缩减</li>
    <li><strong>数据驱动</strong> - 实时收集和分析数据，提供决策支持</li>
    </ul>
    
    <h3>应用场景</h3>
    <ul>
    <li><strong>客户服务</strong> - 智能客服机器人，处理常见问题和咨询</li>
    <li><strong>业务流程</strong> - 自动化处理订单、审批、报表等流程</li>
    <li><strong>数据分析</strong> - 快速处理大量数据，生成洞察报告</li>
    <li><strong>人力资源</strong> - 简历筛选、员工入职流程自动化</li>
    </ul>
    
    <h3>未来展望</h3>
    <p>预计到 2028 年，超过 50% 的大型企业将部署数字员工。随着技术的不断进步，数字员工将能够处理越来越复杂的任务，成为企业数字化转型的重要推动力。</p>
    
    <p>对于企业来说，现在是时候开始规划数字员工战略了。越早布局，就能越早享受AI带来的红利。</p>`,
    image: "/images/articles/news-digital-era.jpg"
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
      <Navigation headerBgImage={news.image} />

      <article className="article-page news-article-page" style={{ padding: 0 }}>
        
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

      {/* 其他新闻推荐 */}
      <section className="bg-light pt-4 pb-4">
        <div className="container">
          <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: 700 }}>其他新闻</h3>
          <div className="posts-grid">
            {newsItems
              .filter(n => n.slug !== slug)
              .slice(0, 3)
              .map(item => (
                <div key={item.slug} className="col-12 col-md-6 col-lg-4 mb-4 blog-item">
                  <div className="card h-100">
                    <Link href={`/news/${item.slug}`}>
                      <div className="position-relative">
                        <img
                          src={item.image}
                          className="blog-image"
                          alt={item.title}
                        />
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{item.title}</h3>
                        <p className="blog-length">
                          {item.date} · {item.readTime} 阅读
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
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
