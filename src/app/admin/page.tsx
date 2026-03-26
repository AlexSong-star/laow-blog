// 后台首页
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabaseFetch } from '@/lib/supabase-client'

interface Stats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({ totalPosts: 0, totalViews: 0, totalLikes: 0 });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 简单密码验证（生产环境应该用更安全的方式）
    if (password === 'laoliu123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('密码错误');
    }
  };

  useEffect(() => {
    // 检查是否已登录
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }

    // 获取统计数据
    supabaseFetch('/posts?select=id')
      .then(res => res.json())
      .then(data => setStats({ totalPosts: Array.isArray(data) ? data.length : 0, totalViews: 0, totalLikes: 0 }))
      .catch(() => {});
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-xl border border-emerald-500/20 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            🔐 管理后台
          </h1>
          <input
            type="password"
            placeholder="请输入管理密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white mb-4 focus:border-emerald-500 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-400 transition-colors"
          >
            登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            📊 管理后台
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
            }}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            退出登录
          </button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-emerald-500/20">
            <p className="text-gray-400 text-sm mb-2">文章总数</p>
            <p className="text-4xl font-bold text-emerald-400">{stats.totalPosts}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-emerald-500/20">
            <p className="text-gray-400 text-sm mb-2">总阅读量</p>
            <p className="text-4xl font-bold text-cyan-400">{stats.totalViews}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-emerald-500/20">
            <p className="text-gray-400 text-sm mb-2">总点赞数</p>
            <p className="text-4xl font-bold text-yellow-400">{stats.totalLikes}</p>
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/posts"
            className="bg-slate-800 p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all group"
          >
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              📝 文章管理
            </h2>
            <p className="text-gray-400">查看、编辑、删除文章</p>
          </Link>

          <Link
            href="/admin/comments"
            className="bg-slate-800 p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all group"
          >
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              💬 评论管理
            </h2>
            <p className="text-gray-400">审核、删除读者评论</p>
          </Link>

          <Link
            href="/admin/categories"
            className="bg-slate-800 p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all group"
          >
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              🏷️ 分类/标签管理
            </h2>
            <p className="text-gray-400">管理文章分类和标签</p>
          </Link>

          <Link
            href="/blog"
            className="bg-slate-800 p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all group"
          >
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              👁️ 预览博客
            </h2>
            <p className="text-gray-400">查看博客前台效果</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
