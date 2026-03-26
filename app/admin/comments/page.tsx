// 评论管理后台
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Comment {
  id: string;
  slug: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = () => {
    fetch('/api/admin/comments')
      .then(r => r.json())
      .then(d => { setComments(d.comments || []); setLoading(false); });
  };

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) { window.location.href = '/admin'; return; }
    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除这条评论？')) return;
    const r = await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' });
    if (r.ok) {
      setComments(comments.filter(c => c.id !== id));
    } else {
      alert('删除失败');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-emerald-400 hover:text-emerald-300">← 返回</Link>
          <h1 className="text-2xl font-bold text-white">💬 评论管理</h1>
          <span className="text-slate-400 text-sm">共 {comments.length} 条评论</span>
        </div>

        {loading ? (
          <p className="text-slate-400">加载中...</p>
        ) : comments.length === 0 ? (
          <p className="text-slate-500">暂无评论</p>
        ) : (
          <div className="space-y-4">
            {comments.map(c => (
              <div key={c.id} className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-emerald-400 font-medium">{c.author_name}</span>
                      <span className="text-slate-500 text-sm">发于 {new Date(c.created_at).toLocaleString('zh-CN')}</span>
                      <Link href={`/posts/${c.slug}`} className="text-slate-400 text-sm hover:text-white">
                        查看文章 →
                      </Link>
                    </div>
                    <p className="text-slate-300 whitespace-pre-wrap break-all">{c.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-400 hover:text-red-300 text-sm whitespace-nowrap"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
