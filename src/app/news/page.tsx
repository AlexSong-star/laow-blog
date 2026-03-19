// 新闻页面 - 实时热点新闻
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

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      <div style={{ marginTop: '80px' }}>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900/20 via-slate-900 to-slate-900 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 via-orange-500 to-yellow-500 flex items-center justify-center text-4xl shadow-2xl animate-pulse">
                📰
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                实时热点
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              追踪最新技术动态 📡<br/>
              <span className="text-sm text-gray-500">分享 AI、科技、互联网热点资讯</span>
            </p>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="grid gap-6">
          {newsItems.map((news, index) => (
            <article
              key={index}
              className="group p-6 bg-slate-800/50 border border-red-500/20 rounded-2xl hover:border-orange-400/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-gray-500 font-mono">{news.date}</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-400 text-xs rounded-full">
                      {news.category}
                    </span>
                  </div>
                  
                  <Link href="#">
                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-orange-400 transition-colors mb-3">
                      {news.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {news.excerpt}
                  </p>
                  
                  <span className="text-xs text-gray-500">{news.readTime} read</span>
                </div>

                {/* 右侧箭头 */}
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-slate-700/50 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
      </div>
    </div>
  );
}
