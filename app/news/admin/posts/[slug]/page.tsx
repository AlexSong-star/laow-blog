// 文章编辑/新建页面
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const isNew = slug === 'new';

  const [form, setForm] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: '技术',
    tags: '',
    excerpt: '',
    content: '',
    published: false,
    top: false,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // 检查登录
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin');
      return;
    }

    // 如果不是新建，获取文章内容
    if (!isNew) {
      fetch(`/api/admin/posts/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.post) {
            setForm({
              ...data.post,
              tags: data.post.tags?.join(', ') || '',
            });
          }
        })
        .catch(() => {});
    }
  }, [slug, isNew, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    const url = isNew ? '/api/admin/posts' : `/api/admin/posts/${slug}`;
    const method = isNew ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      alert(isNew ? '创建成功' : '保存成功');
      router.push('/admin/posts');
    } else {
      alert('保存失败');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/posts"
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            ← 返回
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {isNew ? '📝 新建文章' : '✏️ 编辑文章'}
          </h1>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 标题 */}
          <div>
            <label className="block text-gray-400 mb-2">标题</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* 日期和分类 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">日期</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">分类</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="技术">技术</option>
                <option value="随笔">随笔</option>
                <option value="生活">生活</option>
                <option value="AI">AI</option>
              </select>
            </div>
          </div>

          {/* 标签 */}
          <div>
            <label className="block text-gray-400 mb-2">标签（用逗号分隔）</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="AI, 编程, 老六"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* 摘要 */}
          <div>
            <label className="block text-gray-400 mb-2">摘要</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* 内容 */}
          <div>
            <label className="block text-gray-400 mb-2">内容（Markdown）</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none font-mono"
            />
          </div>

          {/* 选项 */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-white">发布</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.top}
                onChange={(e) => setForm({ ...form, top: e.target.checked })}
                className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-white">置顶</span>
            </label>
          </div>

          {/* 提交 */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存'}
            </button>
            <Link
              href="/admin/posts"
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              取消
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
