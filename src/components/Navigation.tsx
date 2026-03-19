"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container">
          <Link href="/" className="logo">AI Edge</Link>
          
          {/* Desktop Nav - 参考网站样式 */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`desktop-nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button - 汉堡菜单 */}
          <button 
            className="nav-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Navigation"
          >
            Menu
          </button>
        </div>
      </header>

      {/* 全屏导航菜单 - 参考网站样式 */}
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="nav-overlay-content">
          <div className="nav-overlay-header">
            <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>AI Edge</Link>
            <button 
              className="nav-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close Navigation"
            >
              ✕
            </button>
          </div>
          
          <nav className="nav-overlay-menu">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-overlay-link ${pathname === item.href ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-overlay-footer">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
