import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '老六的博客',
  description: '记录技术、思考与成长',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
