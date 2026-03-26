"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface Props {
  slug: string;
}

export default function CommentSection({ slug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComments = () => {
    fetch(`/api/comments/${slug}`)
      .then(r => r.json())
      .then(d => { setComments(d.comments || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchComments(); }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) { setMsg('请填写昵称和评论内容'); return; }
    setSubmitting(true);
    try {
      const r = await fetch(`/api/comments/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author_name: name.trim(), content: content.trim() }),
      });
      const d = await r.json();
      if (!r.ok) { setMsg(d.error || '发布失败'); }
      else {
        setMsg('评论发布成功！');
        setContent('');
        fetchComments();
        setTimeout(() => setMsg(''), 3000);
      }
    } catch { setMsg('网络错误'); }
    setSubmitting(false);
  };

  return (
    <div className="mt-8 border-t border-slate-700 pt-6">
      <h3 className="text-xl font-bold text-white mb-4">💬 评论 ({comments.length})</h3>

      {/* 评论列表 */}
      {loading ? <p className="text-slate-400">加载中...</p> : comments.length === 0 ? (
        <p className="text-slate-500">暂无评论，来抢沙发！</p>
      ) : (
        <div className="space-y-4 mb-6">
          {comments.map(c => (
            <div key={c.id} className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-400 font-medium">{c.author_name}</span>
                <span className="text-slate-500 text-sm">{new Date(c.created_at).toLocaleString('zh-CN')}</span>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap">{c.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* 发布表单 */}
      <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-4 space-y-3">
        <h4 className="text-white font-medium">发表评论</h4>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="你的昵称"
          maxLength={30}
          className="w-full bg-slate-700 text-white rounded px-3 py-2 outline-none focus:ring-1 ring-emerald-500"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="写下你的评论..."
          rows={3}
          maxLength={500}
          className="w-full bg-slate-700 text-white rounded px-3 py-2 outline-none focus:ring-1 ring-emerald-500 resize-none"
        />
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-sm">{content.length}/500</span>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-400 disabled:opacity-50 transition-colors text-sm"
          >
            {submitting ? '发布中...' : '发布评论'}
          </button>
        </div>
        {msg && <p className={`text-sm ${msg.includes('成功') ? 'text-emerald-400' : 'text-red-400'}`}>{msg}</p>}
      </form>
    </div>
  );
}
