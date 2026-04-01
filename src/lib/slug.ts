// Slug 编码/解码工具：解决 Vercel Edge 中文 URL 解码 bug
// 方案：用 Base64 URL-safe 编码存储 slug，避开中文 URL 解析问题

export function encodeSlug(slug: string): string {
  return Buffer.from(slug, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeSlug(encoded: string): string {
  try {
    // 先尝试直接 base64 解码（标准 URL-safe base64）
    let decoded = Buffer.from(encoded, 'base64').toString('utf8');
    if (decoded && decoded.length > 0 && decoded.length < 300) {
      return decoded;
    }
  } catch {
    // 尝试带 padding 的解码
    try {
      const padded = encoded + '='.repeat((4 - encoded.length % 4) % 4);
      const decoded = Buffer.from(padded, 'base64').toString('utf8');
      if (decoded && decoded.length > 0 && decoded.length < 300) {
        return decoded;
      }
    } catch {
      // fallback
    }
  }
  return encoded;
}
