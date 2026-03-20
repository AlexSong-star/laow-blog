// 评论区域组件
"use client";

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  slug: string;
  author: string;
  content: string;
  date: string;
}

interface Props {
  slug: string;
}

export default function CommentSection({ slug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/comments?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setSubmitting(true);

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, author, content }),
    });

    if (res.ok) {
      const data = await res.json();
      setComments([...comments, data.comment]);
      setAuthor('');
      setContent('');
    }

    setSubmitting(false);
  };

  return (
    <section className="mt-12 pt-8 border-t border-slate-800">
      <h3 className="text-xl font-bold text-white mb-6">
        💬 评论 ({comments.length})
      </h3>

      {/* 评论表单 */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid gap-4 mb-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="你的昵称"
            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的评论..."
            rows={3}
            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50"
        >
          {submitting ? '提交中...' : '发表评论'}
        </button>
      </form>

      {/* 评论列表 */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500">加载中...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">还没有评论，快来抢沙发吧！</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-medium text-emerald-400">{comment.author}</span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.date).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <p className="text-gray-300">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
