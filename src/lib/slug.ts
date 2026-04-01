// Slug 编码/解码工具：解决 Vercel Edge 中文 URL 解码 bug
// 方案：用 Base64 URL-safe 编码存储 slug，避开中文 URL 解析问题
// 注意：使用 Web Crypto API（btoa/atob），兼容 Edge Runtime（不支持 Buffer）

export function encodeSlug(slug: string): string {
  // 使用 btoa（Web API）进行 Base64 编码，替换 URL 不安全字符
  const encoded = btoa(encodeURIComponent(slug));
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeSlug(encoded: string): string {
  try {
    // 先还原标准 Base64（替换 URL 安全字符）
    const standard = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const padded = standard + '='.repeat((4 - standard.length % 4) % 4);
    // 使用 atob（Web API）解码，再用 decodeURIComponent 还原原始字符
    const decoded = decodeURIComponent(atob(padded));
    if (decoded && decoded.length > 0 && decoded.length < 300) {
      return decoded;
    }
  } catch {
    // fallback
  }
  return encoded;
}
