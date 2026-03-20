// 分类/标签 API
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function GET() {
  if (!fs.existsSync(postsDirectory)) {
    return NextResponse.json({ categories: [], tags: [] });
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const categoriesSet = new Set<string>();
  const tagsSet = new Set<string>();

  fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .forEach((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      if (data.category) categoriesSet.add(data.category);
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => tagsSet.add(tag));
      }
    });

  return NextResponse.json({
    categories: Array.from(categoriesSet),
    tags: Array.from(tagsSet),
  });
}
