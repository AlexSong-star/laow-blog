// 文章管理列表 - 直接调用 Supabase（绕过 Vercel Serverless）
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllPosts, deletePost } from '@/lib/supabase-client'

interface Post {
  slug: string
  title: string
  date: string
  category: string
  published: boolean
  top: boolean
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (!auth) {
      router.push('/admin')
      return
    }
    getAllPosts().then(data => {
      const published = (data || []).filter((p: Record<string, unknown>) => p.published !== false && p.slug !== undefined)
      setPosts(published as Post[])
    }).catch(() => {})
  }, [router])

  const handleDelete = async (slug: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return
    try {
      await deletePost(slug)
      setPosts(posts.filter(p => p.slug !== slug))
    } catch {
      alert('删除失败')
    }
  }

  const togglePublish = async (slug: string, published: boolean) => {
    try {
      const { updatePost } = await import('@/lib/supabase-client')
      await updatePost(slug, { published: !published })
      setPosts(posts.map(p => p.slug === slug ? { ...p, published: !published } : p))
    } catch {
      alert('操作失败')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 transition-colors">← 返回</Link>
            <h1 className="text-2xl font-bold text-white">📝 文章管理</h1>
          </div>
          <Link href="/admin/posts/new" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors">+ 新建文章</Link>
        </div>

        <div className="bg-slate-800 rounded-xl border border-emerald-500/20 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-400 text-sm font-medium">标题</th>
                <th className="px-6 py-3 text-left text-gray-400 text-sm font-medium">分类</th>
                <th className="px-6 py-3 text-left text-gray-400 text-sm font-medium">日期</th>
                <th className="px-6 py-3 text-left text-gray-400 text-sm font-medium">状态</th>
                <th className="px-6 py-3 text-right text-gray-400 text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {post.top && <span className="text-yellow-400">📌</span>}
                      <span className="text-white font-medium">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{post.category}</td>
                  <td className="px-6 py-4 text-gray-400">{post.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${post.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {post.published ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => togglePublish(post.slug, post.published)} className="px-3 py-1 text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                        {post.published ? '下架' : '发布'}
                      </button>
                      <Link href={`/admin/posts/${post.slug}`} className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors">编辑</Link>
                      <button onClick={() => handleDelete(post.slug)} className="px-3 py-1 text-sm text-gray-400 hover:text-red-400 transition-colors">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && <div className="p-12 text-center text-gray-500">暂无文章</div>}
        </div>
      </div>
    </div>
  )
}
