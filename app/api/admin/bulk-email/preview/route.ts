import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { sendEmail, getBulkEmailTemplate } from '@/lib/mail'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// ── POST  /api/admin/bulk-email/preview  ───────────────────────────────
// Sends a test copy of the email to the currently logged-in admin
export async function POST(req: NextRequest) {
  await requireAdmin()

  const { subject, content, testEmail, rawHtml } = await req.json()
  if (!subject?.trim() || !content?.trim())
    return NextResponse.json({ error: 'Subject and content are required.' }, { status: 400 })

  // Use provided testEmail, otherwise fall back to admin's own session email
  let recipientEmail: string | undefined = testEmail?.trim()
  if (!recipientEmail) {
    const session = await getServerSession(authOptions)
    recipientEmail = session?.user?.email ?? undefined
  }
  if (!recipientEmail)
    return NextResponse.json({ error: 'Could not determine recipient email.' }, { status: 400 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const unsubscribeUrl = `${appUrl}/api/unsubscribe?preview=1`

  await sendEmail({
    to: recipientEmail,
    subject: `[TEST] ${subject}`,
    html: rawHtml
      ? content.replace(/\{\{firstName\}\}/g, 'Admin').replace(/\{\{unsubscribeUrl\}\}/g, unsubscribeUrl)
      : getBulkEmailTemplate('Admin', subject, content, unsubscribeUrl),
  })

  return NextResponse.json({ success: true, sentTo: recipientEmail })
}
