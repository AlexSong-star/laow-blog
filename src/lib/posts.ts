// 博客文章解析工具
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  published: boolean;
  top: boolean;
  contentHtml?: string;
}

export function getAllPosts(): Post[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
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

  // 按日期排序，置顶文章优先
  allPosts.sort((a, b) => {
    if (a.top && !b.top) return -1;
    if (!a.top && b.top) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return allPosts.filter(post => post.published);
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '无标题',
    date: data.date || '2026-01-01',
    category: data.category || '未分类',
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    published: data.published !== false,
    top: data.top || false,
    contentHtml: content,
  };
}

export async function getPostContentHtml(slug: string): Promise<string> {
  const post = getPostBySlug(slug);
  if (!post || !post.contentHtml) {
    return '';
  }

  let content = post.contentHtml;

  // 移除 Markdown 内容中的第一个标题（# title），因为 frontmatter 的 title 已在页面显示
  content = content.replace(/^#\s+.+$/m, '');

  // 处理 B站视频
  content = content.replace(
    /\[video\]\(https?:\/\/www\.bilibili\.com\/video\/BV[\w]+\)/g,
    (match) => {
      const bvid = match.match(/BV[\w]+/)?.[0] || '';
      return `<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="//player.bilibili.com/player.html?bvid=${bvid}&page=1" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`;
    }
  );

  // 处理 YouTube 视频
  content = content.replace(
    /\[video\]\(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+\)/g,
    (match) => {
      const vid = match.match(/v=([\w-]+)/)?.[1] || '';
      return `<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.youtube.com/embed/${vid}" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`;
    }
  );

  // 处理直接视频链接
  content = content.replace(
    /\[video\]\((https?:\/\/.*\.(mp4|webm|ogg))\)/g,
    (match, url) => {
      return `<video controls style="width: 100%; max-width: 800px; margin: 1rem 0;"><source src="${url}" /></video>`;
    }
  );

  const processedContent = await remark()
    .use(html)
    .process(content);
  
  return processedContent.toString();
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags);
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(post => post.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}
