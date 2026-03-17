export default function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-emerald-500/20 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🫡</span>
            <span className="text-gray-400">老六的个人博客</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>🕐 运行中...</span>
            <span>⚡ Next.js + Tailwind</span>
            <span>💚 Built with love</span>
          </div>
          
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} 老六. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
