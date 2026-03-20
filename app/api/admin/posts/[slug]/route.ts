// 单篇文章 API
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 });
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return NextResponse.json({
    post: {
      slug,
      title: data.title || '无标题',
      date: data.date || '2026-01-01',
      category: data.category || '未分类',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      content,
      published: data.published !== false,
      top: data.top || false,
    },
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();
  const { title, date, category, tags, excerpt, content, published, top } = body;

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 });
  }

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

  fs.writeFileSync(fullPath, markdown);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 });
  }

  fs.unlinkSync(fullPath);

  return NextResponse.json({ success: true });
}
