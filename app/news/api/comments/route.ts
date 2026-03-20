// 评论 API
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data/comments.json');

// 初始化文件
if (!fs.existsSync(dataFile)) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  fs.writeFileSync(dataFile, '[]');
}

function getComments() {
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function saveComments(comments: object[]) {
  fs.writeFileSync(dataFile, JSON.stringify(comments, null, 2));
}

// 获取评论列表
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  const comments = getComments();
  
  if (slug) {
    return NextResponse.json({ 
      comments: comments.filter((c: any) => c.slug === slug) 
    });
  }
  
  return NextResponse.json({ comments });
}

// 提交评论
export async function POST(request: Request) {
  const body = await request.json();
  const { slug, author, content } = body;
  
  if (!slug || !author || !content) {
    return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
  }
  
  const comments = getComments();
  
  const newComment = {
    id: Date.now().toString(),
    slug,
    author,
    content,
    date: new Date().toISOString(),
    status: 'approved', // 直接通过审核
  };
  
  comments.push(newComment);
  saveComments(comments);
  
  return NextResponse.json({ success: true, comment: newComment });
}
