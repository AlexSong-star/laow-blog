// 文章详情页 - 复刻参考网站样式
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostContentHtml, getAllPosts } from '@/lib/posts';
import LikeButton from '@/components/LikeButton';
import Navigation from '@/components/Navigation';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 每篇文章对应的图片
const articleImages: Record<string, string> = {
  '2026-03-17-ai-workflow': '/images/articles/ai-workflow.jpg',
  '2026-03-17-how-i-work': '/images/articles/how-i-work.jpg',
    '2026-03-19-blog-upgrade': '/images/articles/blog-upgrade.jpg',
  '2026-03-17-first-post': '/images/articles/blog-launch.jpg',
  '2026-03-17-hello-world': '/images/articles/hello-world.jpg',
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const contentHtml = await getPostContentHtml(slug);
  const heroImage = articleImages[slug] || '/images/articles/blog-launch.jpg';

  // 如果文章正文已经以图片开头（markdown第一行就是图片），就不需要header背景图
  const bodyStartsWithImage = contentHtml.trim().startsWith('<img');

  return (
    <>
      <Navigation headerBgImage={bodyStartsWithImage ? undefined : post.image} />

      {/* 详情页主体 */}
      <article className="article-page">
        {/* 日期信息 */}
        <div className="article-wrapper">
          <span className="blog-entry-category">
            Posted by 老六, {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
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

      {/* 其他新闻推荐 */}
      <section className="bg-light pt-4 pb-4">
        <div className="container">
          <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: 700 }}>其他新闻</h3>
          <div className="posts-grid">
            {((await getAllPosts()))
              .filter(p => p.category === '新闻' && p.slug !== slug)
              .slice(0, 3)
              .map(post => (
                <div key={post.slug} className="col-12 col-md-6 col-lg-4 mb-4 blog-item">
                  <div className="card h-100">
                    <Link href={`/posts/${post.slug}`}>
                      <div className="position-relative">
                        <img
                          src={post.image}
                          className="blog-image"
                          alt={post.title}
                        />
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{post.title}</h3>
                        <p className="blog-length">
                          {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

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
