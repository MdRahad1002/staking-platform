import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Lightweight ingestion endpoint — no auth required (public tracker)
// Rate limiting is handled by the client (max 1 pageview + batched clicks)

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const ip = getIp(req)
    const ua = req.headers.get('user-agent') ?? undefined

    const { type, sessionId, page, referrer, duration, pageViewId, element, href, x, y } = body

    if (!type || !sessionId || !page) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Sanitise strings to prevent injection
    const sanitise = (s: unknown, max = 500) =>
      typeof s === 'string' ? s.slice(0, max) : undefined

    if (type === 'pageview') {
      const pv = await prisma.pageView.create({
        data: {
          sessionId: sanitise(sessionId, 64)!,
          ip,
          page: sanitise(page, 500)!,
          referrer: sanitise(referrer, 500),
          userAgent: ua?.slice(0, 500),
          duration: typeof duration === 'number' ? Math.min(duration, 86400) : undefined,
        },
      })
      return NextResponse.json({ id: pv.id })
    }

    if (type === 'duration') {
      // Update page exit duration
      if (pageViewId) {
        await prisma.pageView.updateMany({
          where: { id: sanitise(pageViewId, 64)!, sessionId: sanitise(sessionId, 64)! },
          data: { duration: typeof duration === 'number' ? Math.min(duration, 86400) : 0 },
        })
      }
      return NextResponse.json({ ok: true })
    }

    if (type === 'click') {
      await prisma.clickEvent.create({
        data: {
          sessionId: sanitise(sessionId, 64)!,
          pageViewId: sanitise(pageViewId, 64) ?? undefined,
          ip,
          page: sanitise(page, 500)!,
          element: sanitise(element, 300) ?? 'unknown',
          href: sanitise(href, 500),
          x: typeof x === 'number' ? x : undefined,
          y: typeof y === 'number' ? y : undefined,
        },
      })
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  } catch (err) {
    console.error('[analytics]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
