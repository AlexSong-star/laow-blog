// 项目作品页面 - 与首页相同的卡片布局
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import './globals.css';

const projects = [
  {
    title: "数字员工团队",
    description: "基于 Openclaw 搭建的多 AI 员工协作系统，实现自动化工作流",
    tags: ["Openclaw", "AI Agent", "自动化"],
    icon: "🤖",
    status: "进行中"
  },
  {
    title: "俄罗斯跨境贸易系统",
    description: "Skills 开发，实现客户自动开发、多语言支持、Telegram 适配",
    tags: ["Telegram", "多语言", "客户开发"],
    icon: "🌍",
    status: "进行中"
  },
  {
    title: "活动打卡小程序",
    description: "每日任务打卡系统，支持提醒、统计、排行榜功能",
    tags: ["微信小程序", "打卡", "统计"],
    icon: "✅",
    status: "已完成"
  },
  {
    title: "AI 数字员工招聘平台",
    description: "央国企招聘场景的 AI 面试、筛选系统",
    tags: ["AI 面试", "招聘", "自动化"],
    icon: "👔",
    status: "规划中"
  },
  {
    title: "老六博客系统",
    description: "用 Next.js + Tailwind 搭建的个人技术博客",
    tags: ["Next.js", "React", "Tailwind"],
    icon: "📝",
    status: "已完成"
  },
  {
    title: "飞书机器人",
    description: "集成飞书各种能力的智能助手机器人",
    tags: ["飞书", "Bot", "API"],
    icon: "💬",
    status: "已完成"
  }
];

const projectImages = [
  '/images/articles/ai-workflow.jpg',
  '/images/articles/blog-launch.jpg',
  '/images/articles/hello-world.jpg',
  '/images/articles/how-i-work.jpg',
  '/images/articles/ai-workflow.jpg',
  '/images/articles/blog-launch.jpg',
];

export default function ProjectsPage() {
  return (
    <div>
      <Navigation />

      {/* Projects Grid - 与首页相同 */}
      <div className="bg-light pt-2 pt-md-4">
        <div className="container">
          <div className="posts-grid">
            {projects.map((project, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 mb-4 blog-item">
                <div className="card h-100">
                  <Link href="#">
                    <div className="position-relative">
                      <img 
                        src={projectImages[index]} 
                        className="blog-image" 
                        alt={project.title}
                      />
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span style={{ fontSize: '24px' }}>{project.icon}</span>
                        <span className={`badge ${
                          project.status === "已完成" ? "bg-success" : 
                          project.status === "进行中" ? "bg-info" : "bg-warning"
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <h3 className="card-title">{project.title}</h3>
                      <p className="card-text mb-3">{project.description}</p>
                      <div className="d-flex flex-wrap gap-2">
                        {project.tags.map((tag, j) => (
                          <span key={j} className="badge bg-secondary">{tag}</span>
                        ))}
                      </div>
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
            <p>© 2026 AI Edge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
