"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "🏠 首页", description: "我是谁" },
  { href: "/blog", label: "📝 博客", description: "思想舞台" },
  { href: "/projects", label: "💼 项目作品", description: "做过的项目" },
  { href: "/growth", label: "📈 成长记录", description: "海星图 & 笔记" },
  { href: "/skills", label: "🛠️ 技能展示", description: "会什么技能" },
  { href: "/about", label: "👤 关于强哥", description: "创造者介绍" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-emerald-500/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform">
              🫡
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              老六の博客
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <details className="md:hidden relative group">
      <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-emerald-500/20 transition-colors">
        <svg
          className="w-6 h-6 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-emerald-500/20 overflow-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 transition-colors ${
                isActive
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}
