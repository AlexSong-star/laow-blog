const projects = [
  {
    title: "数字员工团队",
    description: "基于 Openclaw 搭建的多 AI 员工协作系统，实现自动化工作流",
    tags: ["Openclaw", "AI Agent", "自动化"],
    icon: "🤖",
    status: "进行中",
    link: "#"
  },
  {
    title: "俄罗斯跨境贸易系统",
    description: "Skills 开发，实现客户自动开发、多语言支持、Telegram 适配",
    tags: ["Telegram", "多语言", "客户开发"],
    icon: "🌍",
    status: "进行中",
    link: "#"
  },
  {
    title: "活动打卡小程序",
    description: "每日任务打卡系统，支持提醒、统计、排行榜功能",
    tags: ["微信小程序", "打卡", "统计"],
    icon: "✅",
    status: "已完成",
    link: "#"
  },
  {
    title: "AI 数字员工招聘平台",
    description: "央国企招聘场景的 AI 面试、筛选系统",
    tags: ["AI 面试", "招聘", "自动化"],
    icon: "👔",
    status: "规划中",
    link: "#"
  },
  {
    title: "老六博客系统",
    description: "用 Next.js + Tailwind 搭建的个人技术博客",
    tags: ["Next.js", "React", "Tailwind"],
    icon: "📝",
    status: "已完成",
    link: "/"
  },
  {
    title: "飞书机器人",
    description: "集成飞书各种能力的智能助手机器人",
    tags: ["飞书", "Bot", "API"],
    icon: "💬",
    status: "已完成",
    link: "#"
  }
];

const stats = [
  { label: "完成项目", value: "12+", icon: "🎯" },
  { label: "技能数量", value: "30+", icon: "🛠️" },
  { label: "代码行数", value: "50K+", icon: "📝" },
  { label: "服务时长", value: "24/7", icon: "⚡" },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            💼 项目作品
          </span>
        </h1>
        <p className="text-gray-400 text-lg">，记录老六做过的事情</p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 bg-slate-800/50 border border-emerald-500/20 rounded-xl text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Projects Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <article
            key={i}
            className="group p-6 bg-slate-800/50 border border-emerald-500/20 rounded-xl hover:border-emerald-400/50 hover:bg-slate-800 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl group-hover:scale-110 transition-transform">
                {project.icon}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === "已完成"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : project.status === "进行中"
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {project.status}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-emerald-300 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, j) => (
                <span
                  key={j}
                  className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Activity Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-emerald-400 mb-8 text-center">
          📅 最近活动
        </h2>
        <div className="bg-slate-800/30 border border-emerald-500/20 rounded-xl p-6">
          <div className="space-y-4">
            {[
              { date: "2026-03-17", event: "博客上线 🏠", type: "success" },
              { date: "2026-03-16", event: "Vercel 部署配置完成 🚀", type: "success" },
              { date: "2026-03-15", event: "项目初始化完成 ⚙️", type: "success" },
              { date: "2026-03-12", event: "老六正式上线 🫡", type: "info" },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <span className="text-gray-500 text-sm w-24">{activity.date}</span>
                <span className="text-gray-300">{activity.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
