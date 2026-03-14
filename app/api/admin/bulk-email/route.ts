import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { sendEmailBatch, getBulkEmailTemplate } from '@/lib/mail'

export const maxDuration = 300 // Vercel Pro allow up to 5 min for large sends

// ── GET  /api/admin/bulk-email  ─────────────────────────────────────────
// Returns all campaigns (newest first) + aggregate stats
export async function GET() {
  await requireAdmin()

  const campaigns = await prisma.bulkEmail.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const totalSent = campaigns.reduce((s, c) => s + c.sentCount, 0)
  const lastCampaign = campaigns[0] ?? null

  return NextResponse.json({ campaigns, totalSent, lastCampaign })
}

// ── POST  /api/admin/bulk-email  ────────────────────────────────────────
// Create a campaign and send it immediately
export async function POST(req: NextRequest) {
  await requireAdmin()

  const { subject, content, target } = await req.json()
  if (!subject?.trim() || !content?.trim())
    return NextResponse.json({ error: 'Subject and content are required.' }, { status: 400 })

  // Determine user filter
  let where: Record<string, unknown> = { emailOptOut: false }
  if (target === 'active')    where = { ...where, isActive: true }
  if (target === 'verified')  where = { ...where, emailVerified: { not: null } }

  const users = await prisma.user.findMany({
    where,
    select: { id: true, email: true, firstName: true, lastName: true },
  })

  // Create campaign record status: sending
  const campaign = await prisma.bulkEmail.create({
    data: { subject, content, target: target || 'all', status: 'sending' },
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'

  // Build email payloads
  const emails = users.map((u) => {
    const firstName = u.firstName || (u.email?.split('@')[0] ?? 'Valued User')
    const unsubscribeUrl = `${appUrl}/api/unsubscribe?uid=${Buffer.from(u.id).toString('base64url')}`
    return {
      to: u.email,
      subject,
      html: getBulkEmailTemplate(firstName, subject, content, unsubscribeUrl),
    }
  })

  // Send in batches of 100 using Resend batch API
  const { sent, failed } = await sendEmailBatch(emails)

  // Update campaign record
  const updated = await prisma.bulkEmail.update({
    where: { id: campaign.id },
    data: {
      sentCount: sent,
      failedCount: failed,
      status: failed > 0 && sent === 0 ? 'failed' : 'sent',
      sentAt: new Date(),
    },
  })

  return NextResponse.json({ campaign: updated, sentCount: sent, failedCount: failed })
}
