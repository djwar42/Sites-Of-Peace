import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { has } = auth()

    const canManage = has({ permission: 'org:addsite:addsite' })

    if (!canManage) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const body = await req.json()
    const { title, content, url, favicon } = body

    const newSite = await prisma.site.create({
      data: {
        title,
        content,
        url,
        favicon,
        published: true // You might want to adjust this based on your needs
      }
    })

    return NextResponse.json(newSite)
  } catch (error) {
    console.error('Error adding site:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
