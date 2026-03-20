// 统计数据 API
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
const dataDirectory = path.join(process.cwd(), 'data');

export async function GET() {
  // 统计文章数
  let totalPosts = 0;
  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    totalPosts = fileNames.filter((f) => f.endsWith('.md')).length;
  }

  // 统计阅读量和点赞
  let totalViews = 0;
  let totalLikes = 0;
  const likesFile = path.join(dataDirectory, 'likes.json');
  
  if (fs.existsSync(likesFile)) {
    const likesData = JSON.parse(fs.readFileSync(likesFile, 'utf8'));
    Object.values(likesData).forEach((item: any) => {
      totalViews += item.views || 0;
      totalLikes += item.likes || 0;
    });
  }

  return NextResponse.json({
    totalPosts,
    totalViews,
    totalLikes,
  });
}
