// 点赞按钮组件
"use client";

import { useState, useEffect } from 'react';

interface Props {
  slug: string;
}

export default function LikeButton({ slug }: Props) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取点赞数
    fetch(`/api/likes/${slug}`)
      .then(res => res.json())
      .then(data => {
        setLikes(data.likes || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // 检查是否已点赞
    const liked = localStorage.getItem(`liked_${slug}`);
    if (liked) {
      setHasLiked(true);
    }
  }, [slug]);

  const handleLike = async () => {
    if (hasLiked) return;

    const res = await fetch(`/api/likes/${slug}`, { method: 'POST' });
    const data = await res.json();
    
    setLikes(data.likes);
    setHasLiked(true);
    localStorage.setItem(`liked_${slug}`, 'true');
  };

  return (
    <button
      onClick={handleLike}
      disabled={hasLiked || loading}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
        hasLiked 
          ? 'bg-red-500/20 text-red-400 cursor-default' 
          : 'bg-slate-800 text-gray-400 hover:bg-red-500/20 hover:text-red-400'
      }`}
    >
      <span className={hasLiked ? 'animate-pulse' : ''}>
        {hasLiked ? '❤️' : '🤍'}
      </span>
      <span className="text-sm">
        {loading ? '...' : likes}
      </span>
    </button>
  );
}
