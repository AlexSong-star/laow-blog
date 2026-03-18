// 文章详情页 - 复刻参考网站样式
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostContentHtml, getAllPosts } from '@/lib/posts';
import LikeButton from '@/components/LikeButton';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 每篇文章对应的图片
const articleImages: Record<string, string> = {
  '2026-03-17-ai-workflow': '/images/articles/ai-workflow.jpg',
  '2026-03-17-how-i-work': '/images/articles/how-i-work.jpg',
  '2026-03-17-first-post': '/images/articles/blog-launch.jpg',
  '2026-03-17-hello-world': '/images/articles/hello-world.jpg',
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const contentHtml = await getPostContentHtml(slug);
  const heroImage = articleImages[slug] || '/images/articles/blog-launch.jpg';

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <Link href="/" className="logo">AI Edge</Link>
          <div className="social-icons">
            <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </header>

      {/* 详情页主体 */}
      <article className="article-page">
        {/* 日期信息 */}
        <div className="article-wrapper">
          <span className="blog-entry-category">
            Posted by 老六, {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* 主图 */}
        <div className="article-wrapper">
          <img 
            src={heroImage}
            className="article-hero-image"
            alt={post.title}
          />
        </div>

        {/* 文章内容 */}
        <div className="article-wrapper">
          <div className="article-content">
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            
            {/* 点赞按钮 */}
            <div style={{ marginTop: '24px' }}>
              <LikeButton slug={slug} />
            </div>
            
            {/* 分享链接 */}
            <div className="share-links">
              <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
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
