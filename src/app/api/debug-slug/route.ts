import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') || ''
  
  return NextResponse.json({
    slug_received: slug,
    slug_repr: JSON.stringify(slug).slice(0, 50),
  })
}
