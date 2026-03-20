// 视频嵌入组件
"use client";

import { useState } from 'react';

interface VideoEmbedProps {
  url: string;
}

export default function VideoEmbed({ url }: VideoEmbedProps) {
  const [error, setError] = useState(false);

  // 提取 B站视频 ID
  const getBiliId = (url: string) => {
    const match = url.match(/bilibili\.com\/video\/(BV[\w]+)/);
    return match ? match[1] : null;
  };

  // 提取 YouTube 视频 ID
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return match ? match[1] : null;
  };

  const biliId = getBiliId(url);
  const youtubeId = getYoutubeId(url);

  if (biliId) {
    return (
      <div className="my-6">
        <iframe
          src={`//player.bilibili.com/player.html?bvid=${biliId}&page=1`}
          style={{ width: '100%', height: '400px' }}
          frameBorder="0"
          allowFullScreen
          title="Bilibili Video"
        />
      </div>
    );
  }

  if (youtubeId) {
    return (
      <div className="my-6">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        />
      </div>
    );
  }

  // 普通视频链接
  return (
    <video
      controls
      className="w-full max-w-2xl my-6 rounded-lg"
      src={url}
      onError={() => setError(true)}
    >
      {error && <p className="text-red-400">视频加载失败</p>}
    </video>
  );
}
