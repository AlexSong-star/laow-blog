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

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const contentHtml = await getPostContentHtml(slug);

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <Link href="/" className="logo">老六博客</Link>
        </div>
      </header>

      {/* 信息栏：日期 */}
      <div className="bg-light pt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto">
              <div className="row">
                <div className="col-xl-6">
                  <span className="blog-entry-category text-grey mb-1 d-inline-block">
                    {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主图 */}
      <div className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto">
              <img 
                src="/images/articles/blog-launch.jpg" 
                className="w-100 d-sm-none" 
                style={{ objectPosition: '50% 50%' }} 
                alt={post.title}
              />
              <img 
                src="/images/articles/blog-launch.jpg" 
                className="w-100 d-none d-sm-block" 
                style={{ objectPosition: '50% 50%' }} 
                alt={post.title}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 文章内容 */}
      <div className="block-text bg-light">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto article-content">
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              
              {/* 点赞 */}
              <div className="pt-3">
                <LikeButton slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 分享链接 */}
      <div className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto">
              <hr />
              <p className="share-links text-right">
                <a href="#" className="mr-1">Twitter</a>
                <a href="#" className="mr-1">LinkedIn</a>
                <a href="#" className="mr-1">Facebook</a>
              </p>
            </div>
          </div>
        </div>
      </div>

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
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 老六博客. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
