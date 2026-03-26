---
title: "AI + 飞书多维表格：零代码搭建 CMS 内容管理系统"
date: "2026-03-26"
description: "用 Supabase + Next.js，在 2 小时内为博客搭建了一套完整的 CMS 后台，文章管理、分类打标签、封面图上传，全套可视化操作"
category: "技术"
image: "/images/articles/supabase-cms-setup.jpg"
tags: ["Supabase", "Next.js", "CMS", "博客", "无代码", "数据库"]
---

# AI + 飞书多维表格：零代码搭建 CMS 内容管理系统

## 痛点

博客搭了，内容写了几十篇，但每次发布新文章都要：

1. 打开 VS Code
2. 新建 `.md` 文件
3. 写 front matter
4. 推送到 GitHub
5. 等 Vercel 部署

改个错别字也要走一遍流程。产品经理强哥表示：能不能有个后台，点几下就发布文章？

能。而且免费。

---

## 方案选型

**需求：** 文章存在数据库里，有可视化 CMS 后台，支持发布/编辑/分类/打标签。

**选 Supabase 而不是自建数据库：**
- 免费额度：500MB 存储 + 2GB 流量/月
- PostgreSQL 成熟稳定
- 自带 REST API，不用写后端
- 有 Row Level Security，可以精细控制权限

**选原生 fetch 而不是 SDK：**
- `@supabase/supabase-js` 在 Vercel Serverless 环境下偶发 500 错误
- 直接调用 REST API 更稳定，调试也更容易

---

## 搭建步骤

### 1. 创建 Supabase 项目

注册 https://supabase.com，创建一个新项目（选 Singapore 区域，离中国近）。

### 2. 创建 posts 表

在 SQL Editor 里执行：

```sql
CREATE TABLE posts (
  id bigserial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  date text DEFAULT '',
  category text DEFAULT '',
  tags text[] DEFAULT '{}',
  excerpt text DEFAULT '',
  content text DEFAULT '',
  image text DEFAULT '',
  published boolean DEFAULT true,
  top boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 启用行级安全
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 公开读取，认证写入
CREATE POLICY "Allow all reads" ON posts FOR SELECT USING (true);
CREATE POLICY "Allow all inserts" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates" ON posts FOR UPDATE USING (true);
```

### 3. 改造 Next.js 读取层

把 `lib/posts.ts` 里的文件系统读取替换成 Supabase REST API：

```typescript
function supabaseFetch(path: string, options: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      ...options.headers,
    },
  })
}

// 读取文章列表
export async function getAllPosts() {
  const res = await supabaseFetch(
    '/posts?select=*&published=eq.true&order=top,desc&order=created_at,desc'
  )
  return await res.json()
}
```

### 4. 改造 Admin API

同样用原生 fetch 替换 Supabase SDK：

```typescript
// 创建文章
export async function POST(request: Request) {
  const { title, date, category, tags, content } = await request.json()
  
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-') + '-' + date
  
  const res = await supabaseFetch('/posts', {
    method: 'POST',
    headers: { 'Prefer': 'return=minimal' },
    body: JSON.stringify({ slug, title, date, category, tags, content }),
  })
  
  if (!res.ok) return NextResponse.json({ error: '创建失败' }, { status: 500 })
  return NextResponse.json({ success: true, slug })
}
```

### 5. 配置 Vercel 环境变量

在 Vercel 项目里设置两个环境变量：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 效果

现在强哥只需要：

1. 打开 `https://你的博客/admin`
2. 输入密码登录
3. 点「新建文章」，填写标题、正文、分类、标签
4. 点「发布」

全程可视化，不用碰代码，不用打开 VS Code。

---

## 踩坑记录

**Vercel Serverless + Supabase SDK 的 500 问题：**

用 `@supabase/supabase-js` 客户端在本地开发完全正常，部署到 Vercel 后 POST 请求偶发 500。原因是 Supabase SDK 在 Serverless 冷启动环境下对 WebSocket/Keep-alive 处理有问题。

解决方案：直接用原生 `fetch` 调用 Supabase REST API，绕过 SDK。

**免费套餐直接连接超时：**

Supabase 免费版直连 Postgres 端口（5432）会超时。要用 Transaction Pooler，端口是 6543。

---

强哥，CMS 已经在线了：https://laow-blog-git.vercel.app/admin

有问题随时说。
