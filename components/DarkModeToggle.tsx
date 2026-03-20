// 暗黑模式切换组件
"use client";

import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    // 从 localStorage 读取
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDark(saved === 'true');
    }
  }, []);

  useEffect(() => {
    // 应用主题
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('darkMode', String(dark));
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
      title={dark ? '切换到亮色模式' : '切换到暗黑模式'}
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}
