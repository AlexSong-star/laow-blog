// 文章管理 API — GitHub PR 方式
import { NextResponse } from 'next/server'
import { getAllPostsIncludeUnpublished } from '@/lib/posts'

export const dynamic = 'force-dynamic'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!
const OWNER = 'AlexSong-star'
const REPO = 'laow-blog'
const POSTS_DIR = 'posts'

function makeSlug(title: string, date: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '-' + date
}

function buildFrontmatter(post: {
  title: string; date: string; category: string; tags: string[];
  excerpt: string; image: string; published: boolean; top: boolean
}): string {
  const tagsStr = JSON.stringify(post.tags)
  return `---\ntitle: "${post.title.replace(/"/g, '\\"')}"\ndate: "${post.date}"\ndescription: "${post.excerpt.replace(/"/g, '\\"')}"\ncategory: "${post.category}"\nimage: "${post.image}"\ntags: ${tagsStr}\npublished: ${post.published}\ntop: ${post.top}\n---\n`
}

async function createGitHubPr({ slug, content, message }: { slug: string; content: string; message: string }) {
  const branchName = `laow-blog-admin/${slug}-${Date.now()}`

  const refRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/ref/heads/main`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'X-GitHub-Api-Version': '2022-11-28' }
  })
  const refData = await refRes.json()
  const mainSha = refData.object.sha

  await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/refs`, {
    method: 'POST',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: mainSha }),
  })

  const filepath = `${POSTS_DIR}/${slug}.md`
  const fileRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${filepath}?ref=${branchName}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'X-GitHub-Api-Version': '2022-11-28' }
  })
  const fileData = await fileRes.json()
  const existingSha = fileRes.ok && fileData.sha ? fileData.sha : undefined

  await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${filepath}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
    body: JSON.stringify({ message, content: Buffer.from(content).toString('base64'), branch: branchName, ...(existingSha ? { sha: existingSha } : {}) }),
  })

  const prRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/pulls`, {
    method: 'POST',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
    body: JSON.stringify({
      title: `📝 ${slug}`,
      head: branchName,
      base: 'main',
      body: `由管理后台自动创建，请审核后合并。\n\n合并后将自动部署到 Vercel。`,
    }),
  })
  const prData = await prRes.json()
  return { prNumber: prData.number, prUrl: prData.html_url }
}

export async function GET() {
  try {
    const posts = await getAllPostsIncludeUnpublished()
    return NextResponse.json({ posts })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!GITHUB_TOKEN) return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })

  try {
    const body = await request.json()
    const { title, date, category, tags, excerpt, content, image, published, top } = body

    if (!title || !date || !category) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 })
    }

    const slug = makeSlug(title, date)
    const existing = await getAllPostsIncludeUnpublished()
    if (existing.find(p => p.slug === slug)) {
      return NextResponse.json({ error: '同名文章已存在，请修改标题' }, { status: 409 })
    }

    const frontmatter = buildFrontmatter({ title, date, category, tags: tags || [], excerpt: excerpt || '', image: image || '', published: published ?? false, top: top ?? false })
    const { prNumber, prUrl } = await createGitHubPr({ slug, content: frontmatter + '\n' + (content || ''), message: `Add post: ${title}` })

    return NextResponse.json({ success: true, slug, prNumber, prUrl, message: `PR #${prNumber} 已创建，请在 GitHub 合并后自动部署。` })
  } catch (err) {
    console.error('POST /api/admin/posts error:', err)
    return NextResponse.json({ error: '创建失败: ' + String(err) }, { status: 500 })
  }
}
