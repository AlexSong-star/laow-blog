// 文章列表 API
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function GET() {
  if (!fs.existsSync(postsDirectory)) {
    return NextResponse.json({ posts: [] });
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || '无标题',
        date: data.date || '2026-01-01',
        category: data.category || '未分类',
        tags: data.tags || [],
        excerpt: data.excerpt || '',
        published: data.published !== false,
        top: data.top || false,
      };
    });

  // 按日期排序
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, date, category, tags, excerpt, content, published, top } = body;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '-' + date;

  const markdown = `---
title: ${title}
date: ${date}
category: ${category}
tags: [${tags.join(', ')}]
excerpt: ${excerpt}
published: ${published}
top: ${top}
---

${content}
`;

  const fullPath = path.join(postsDirectory, `${slug}.md`);
  fs.writeFileSync(fullPath, markdown);

  return NextResponse.json({ success: true, slug });
}
