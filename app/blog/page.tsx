import Link from 'next/link';
import Navigation from '@/components/Navigation';
import {getAllPosts, getPostBySlug, getAllCategories, getAllTags, getPostsByCategory, getPostsByTag} from '@/lib/posts';
import '../globals.css';

export const metadata = {
  title: 'The AI Edge',
  description: '探索AI与技术的边界',
};

export default async function Home() {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(post => post.category === '博客');

  return (
    <div>
      <Navigation />

      {/* 3列卡片布局 - 参考网站结构 */}
      <div className="bg-light pt-2 pt-md-4">
        <div className="container">
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post.slug} className="col-12 col-md-6 col-lg-4 mb-4 blog-item">
                <div className="card h-100">
                  <Link href={`/posts/${post.slug}`}>
                    <div className="position-relative">
                      <img 
                        src={post.image || '/images/articles/blog-launch.jpg'} 
                        className="blog-image" 
                        alt={post.title}
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{post.title}</h3>
                      <p className="card-text mb-4">{post.excerpt}</p>
                      <p className="blog-length">
                        {new Date(post.date).toLocaleDateString('zh-CN')} · 3 分钟阅读
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
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
              <a href="#"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
              <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 AI Edge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
