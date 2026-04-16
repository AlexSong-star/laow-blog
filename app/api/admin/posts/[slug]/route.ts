// 单篇文章 API — GitHub PR 方式
import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/posts'

export const dynamic = 'force-dynamic'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!
const OWNER = 'AlexSong-star'
const REPO = 'laow-blog'
const POSTS_DIR = 'posts'

function buildFrontmatter(post: {
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  image: string
  published: boolean
  top: boolean
}): string {
  const tagsStr = JSON.stringify(post.tags)
  return `---\ntitle: "${post.title.replace(/"/g, '\\"')}"\ndate: "${post.date}"\ndescription: "${post.excerpt.replace(/"/g, '\\"')}"\ncategory: "${post.category}"\nimage: "${post.image}"\ntags: ${tagsStr}\npublished: ${post.published}\ntop: ${post.top}\n---\n`
}

async function commitToGitHub({
  slug,
  content,
  message,
}: {
  slug: string
  content: string
  message: string
}) {
  const branchName = `laow-blog-admin/${slug}-${Date.now()}`

  // 1. 获取 main SHA
  const refRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/ref/heads/main`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, 'X-GitHub-Api-Version': '2022-11-28' } }
  )
  const refData = await refRes.json()
  const mainSha = refData.object.sha

  // 2. 创建分支
  await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/refs`,
    {
      method: 'POST',
      headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: mainSha }),
    }
  )

  // 3. 获取文件 SHA（如存在）
  const filepath = `${POSTS_DIR}/${slug}.md`
  const fileRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filepath}?ref=${branchName}`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, 'X-GitHub-Api-Version': '2022-11-28' } }
  )
  const fileData = await fileRes.json()
  const existingSha = fileRes.ok && fileData.sha ? fileData.sha : undefined

  // 4. 写入文件
  await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filepath}`,
    {
      method: 'PUT',
      headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString('base64'),
        branch: branchName,
        ...(existingSha ? { sha: existingSha } : {}),
      }),
    }
  )

  // 5. 创建 PR
  const prRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/pulls`,
    {
      method: 'POST',
      headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
      body: JSON.stringify({
        title: `✏️ Update post: ${slug}`,
        head: branchName,
        base: 'main',
        body: `由管理后台自动更新，请审核后合并。\n\n合并后将自动部署到 Vercel。`,
      }),
    }
  )
  const prData = await prRes.json()
  return { prNumber: prData.number, prUrl: prData.html_url }
}

async function deleteViaGitHub(slug: string) {
  const branchName = `laow-blog-admin/del-${slug}-${Date.now()}`
  const filepath = `${POSTS_DIR}/${slug}.md`

  // 1. 获取 main SHA 并创建分支
  const refRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/ref/heads/main`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, 'X-GitHub-Api-Version': '2022-11-28' } }
  )
  const refData = await refRes.json()
  await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/refs`,
    {
      method: 'POST',
      headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: refData.object.sha }),
    }
  )

  // 2. 获取文件 SHA
  const fileRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filepath}?ref=${branchName}`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, 'X-GitHub-Api-Version': '2022-11-28' } }
  )
  const fileData = await fileRes.json()

  // 3. 删除文件
  await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filepath}`,
    {
      method: 'PUT',
      headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
      body: JSON.stringify({
        message: `Delete post: ${slug}`,
        branch: branchName,
        sha: fileData.sha,
      }),
    }
  )

  // 4. 创建 PR
  const prRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/pulls`,
    {
      method: 'POST',
      headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
      body: JSON.stringify({
        title: `🗑️ Delete post: ${slug}`,
        head: branchName,
        base: 'main',
        body: `由管理后台自动删除，请在 GitHub 合并后生效。`,
      }),
    }
  )
  const prData = await prRes.json()
  return { prNumber: prData.number, prUrl: prData.html_url }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  return NextResponse.json({ post })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
  }

  const { slug } = await params
  const body = await request.json()
  const { title, date, category, tags, excerpt, content, image, published, top } = body

  try {
    const frontmatter = buildFrontmatter({
      title: title || '',
      date: date || '',
      category: category || '博客',
      tags: tags || [],
      excerpt: excerpt || '',
      image: image || '',
      published: published ?? true,
      top: top ?? false,
    })
    const fileContent = frontmatter + '\n' + (content || '')

    const { prNumber, prUrl } = await commitToGitHub({
      slug,
      content: fileContent,
      message: `Update post: ${title || slug}`,
    })

    return NextResponse.json({
      success: true,
      prNumber,
      prUrl,
      message: `PR #${prNumber} 已创建，请在 GitHub 合并后自动部署。`,
    })
  } catch (err) {
    console.error('PUT /api/admin/posts/[slug] error:', err)
    return NextResponse.json({ error: '更新失败: ' + String(err) }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
  }

  const { slug } = await params
  try {
    const { prNumber, prUrl } = await deleteViaGitHub(slug)
    return NextResponse.json({
      success: true,
      prNumber,
      prUrl,
      message: `删除 PR #${prNumber} 已创建，请在 GitHub 合并后生效。`,
    })
  } catch (err) {
    console.error('DELETE /api/admin/posts/[slug] error:', err)
    return NextResponse.json({ error: '删除失败: ' + String(err) }, { status: 500 })
  }
}
