import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

const STARTER_PLAN_NAME = 'Starter Trial'

export async function GET() {
  try {
    const session = await requireAuth()
    const plans = await prisma.stakingPlan.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
    })

    // Check if user has ever used the Starter Trial plan
    const starterPlan = plans.find((p) => p.name === STARTER_PLAN_NAME)
    if (starterPlan) {
      const usedStarter = await prisma.stake.findFirst({
        where: { userId: session.user.id, planId: starterPlan.id },
        select: { id: true },
      })
      if (usedStarter) {
        return NextResponse.json({ data: plans.filter((p) => p.name !== STARTER_PLAN_NAME) })
      }
    }

    return NextResponse.json({ data: plans })
  } catch (error) {
    console.error('[STAKING_PLANS]', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
