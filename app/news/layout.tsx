import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The AI Edge',
  description: '探索AI与技术的边界',
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
