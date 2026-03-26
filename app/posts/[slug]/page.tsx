// 文章详情页 - 统一入口 /posts/[slug]
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {getAllPosts, getPostBySlug, getAllCategories, getAllTags, getPostsByCategory, getPostsByTag, getPostContentHtml} from '@/lib/posts';
import LikeButton from '@/components/LikeButton';
import CommentSection from '@/components/CommentSection';
import Comments from '@/components/Comments';
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

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const contentHtml = await getPostContentHtml(slug);
  const heroImage = post.image || '/images/articles/blog-launch.jpg';

  // 如果文章正文已经以图片开头（markdown第一行就是图片），就不需要header背景图
  const bodyStartsWithImage = contentHtml.trim().startsWith('<img');

  // 获取其他文章（排除当前篇）
  const otherPosts = (await getAllPosts())
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Navigation headerBgImage={bodyStartsWithImage ? undefined : heroImage} />

      {/* 详情页主体 */}
      <article className={`article-page ${post.category === '新闻' ? 'news-article-page' : ''}`} style={{ padding: 0 }}>

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

      {/* 其他文章推荐 */}
      <section className="bg-light pt-4 pb-4">
        <div className="container">
          <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: 700 }}>其他文章</h3>
          <div className="posts-grid">
            {otherPosts.map(item => (
              <div key={item.slug} className="col-12 col-md-6 col-lg-4 mb-4 blog-item">
                <div className="card h-100">
                  <Link href={`/posts/${item.slug}`}>
                    <div className="position-relative">
                      <img
                        src={item.image}
                        className="blog-image"
                        alt={item.title}
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{item.title}</h3>
                      <p className="blog-length">
                        {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
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
      <CommentSection slug={slug} />
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
