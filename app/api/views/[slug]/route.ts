// 阅读量 API
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data/likes.json');

// 初始化文件
if (!fs.existsSync(dataFile)) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  fs.writeFileSync(dataFile, '{}');
}

function getLikesData() {
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function saveLikesData(data: object) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = getLikesData();
  
  if (!data[slug]) {
    data[slug] = { views: 0, likes: 0 };
    saveLikesData(data);
  }
  
  return NextResponse.json({ views: data[slug].views });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = getLikesData();
  
  if (!data[slug]) {
    data[slug] = { views: 0, likes: 0 };
  }
  
  data[slug].views = (data[slug].views || 0) + 1;
  saveLikesData(data);
  
  return NextResponse.json({ views: data[slug].views });
}
