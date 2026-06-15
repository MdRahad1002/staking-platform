import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  mode: z.enum(['OFF', 'COMPOUND', 'SPLIT']),
  compoundPercent: z.number().min(0).max(100),
})

export async function GET() {
  try {
    const session = await requireAuth()
    const setting = await prisma.autopilotSetting.findUnique({
      where: { userId: session.user.id },
    })
    return NextResponse.json({
      data: setting ?? { mode: 'OFF', compoundPercent: 50 },
    })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAuth()
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }
    const { mode, compoundPercent } = parsed.data

    const setting = await prisma.autopilotSetting.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id, mode, compoundPercent },
      update: { mode, compoundPercent },
    })

    return NextResponse.json({ data: setting })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
