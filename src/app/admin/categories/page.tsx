// 分类/标签管理页面
"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin');
      return;
    }

    fetch('/api/posts')
      .then(res => res.json())
      .then((data: { posts?: Array<{ category?: string; tags?: string[] }> }) => {
        const cats = new Set<string>()
        const tgs = new Set<string>()
        ;(data.posts || []).forEach(p => {
          if (p.category) cats.add(p.category)
          if (p.tags && Array.isArray(p.tags)) p.tags.forEach((t: string) => tgs.add(t))
        })
        setCategories(Array.from(cats))
        setTags(Array.from(tgs))
      })
      .catch(() => {})
  }, [router]);

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    setCategories([...categories, newCategory]);
    setNewCategory('');
  };

  const addTag = async () => {
    if (!newTag.trim()) return;
    setTags([...tags, newTag]);
    setNewTag('');
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 transition-colors">← 返回</Link>
          <h1 className="text-2xl font-bold text-white">🏷️ 分类/标签管理</h1>
        </div>

        <div className="bg-slate-800 rounded-xl border border-emerald-500/20 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">分类</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <span key={cat} className="px-3 py-1 bg-slate-700 text-white rounded-full">{cat}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="新分类名称（需编辑文章才能真正添加）" className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none" />
            <button onClick={addCategory} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors">添加</button>
          </div>
          <p className="text-gray-500 text-sm mt-2">注意：分类和标签通过文章 frontmatter 管理，这里只展示现有分类。</p>
        </div>

        <div className="bg-slate-800 rounded-xl border border-emerald-500/20 p-6">
          <h2 className="text-xl font-bold text-white mb-4">标签</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full">#{tag}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="新标签名称（需编辑文章才能真正添加）" className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none" />
            <button onClick={addTag} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors">添加</button>
          </div>
        </div>
      </div>
    </div>
  );
}
