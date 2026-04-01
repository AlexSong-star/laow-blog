// 文章详情页
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts } from '@/lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import CommentSection from '@/components/CommentSection';
import LikeButton from '@/components/LikeButton';
import Navigation from '@/components/Navigation';

export const revalidate = 60;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

const articleImages: Record<string, string> = {
  '2026-03-17-ai-workflow': '/images/articles/ai-workflow.jpg',
  '2026-03-17-how-i-work': '/images/articles/how-i-work.jpg',
  '2026-03-19-blog-upgrade': '/images/articles/blog-upgrade.jpg',
  '2026-03-17-first-post': '/images/articles/blog-launch.jpg',
  '2026-03-17-hello-world': '/images/articles/blog-launch.jpg',
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  
  // 获取所有文章，通过 JS filter 找到当前 slug
  const allPosts = await getAllPosts();
  const post = allPosts.find(p => p.slug === slug) || null;
  
  // DEBUG: 如果找不到，显示调试信息
  if (!post) {
    return (
      <div style={{padding:'40px',fontFamily:'monospace',background:'#111',color:'#0f0',minHeight:'100vh'}}>
        <h1>DEBUG: POST NOT FOUND</h1>
        <p>slug: {slug}</p>
        <p>allPosts.length: {allPosts.length}</p>
        <p>slug type: {typeof slug}</p>
        <p>slug bytes: {Buffer.from(slug, 'utf8').toString('hex').slice(0,40)}</p>
        <details>
          <summary>All slugs ({allPosts.length})</summary>
          <pre style={{fontSize:'10px',overflow:'auto',maxHeight:'400px'}}>
            {allPosts.map(p => `${p.slug} (${Buffer.from(p.slug,'utf8').toString('hex').slice(0,30)})`).join('\n')}
          </pre>
        </details>
      </div>
    );
  }

  // 处理 Markdown 内容
  let content = post.content || '';
  if (content) {
    content = content.replace(/^#\s+.+$/m, '');
    content = content.replace(
      /\[video\]\(https?:\/\/www\.bilibili\.com\/video\/BV[\w]+\)/g,
      (match) => {
        const bvid = match.match(/BV[\w]+/)?.[0] || '';
        return `<div style="position:relative;padding-bottom:56.25%;height:0;"><iframe src="//player.bilibili.com/player.html?bvid=${bvid}&page=1" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>`;
      }
    );
    content = content.replace(
      /\[video\]\(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+\)/g,
      (match) => {
        const vid = match.match(/v=([\w-]+)/)?.[1] || '';
        return `<div style="position:relative;padding-bottom:56.25%;height:0;"><iframe src="https://www.youtube.com/embed/${vid}" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>`;
      }
    );
    content = content.replace(
      /\[video\]\((https?:\/\/.*\.(?:mp4|webm|ogg))\)/g,
      (_: string, url: string) =>
        `<video controls style="width:100%;max-width:800px;margin:1rem 0;"><source src="${url}" /></video>`
    );
  }
  const processedContent = await remark().use(html).process(content || '<p>（无正文内容）</p>');
  const contentHtml = processedContent.toString();

  const heroImage = post.image || articleImages[slug] || '/images/articles/blog-launch.jpg';

  return (
    <>
      <Navigation />
      <article className="article-page">
        <div className="article-wrapper">
          <span className="blog-entry-category">
            Posted by 老六, {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <div className="article-wrapper">
          <img 
            src={heroImage}
            className="article-hero-image"
            alt={post.title}
          />
        </div>
        <div className="article-wrapper">
          <div className="article-content">
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <div style={{ marginTop: '24px' }}>
              <LikeButton slug={slug} />
              <CommentSection slug={slug} />
            </div>
            <div className="share-links">
              <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>
        </div>
      </article>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Email</h3>
              <a href="mailto:hello@laow6.com">hello@laow6.com</a>
            </div>
            <div className="footer-section">
              <h3>Newsletter</h3>
              <Link href="/subscribe">Stay in touch</Link>
            </div>
            <div className="footer-section">
              <h3>Connect</h3>
              <a href="#"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
              <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 AI Edge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
