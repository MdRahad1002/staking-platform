import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// ── GET  /api/unsubscribe?uid=<base64url-userId>  ─────────────────────
// Sets emailOptOut = true then redirects to a confirmation page.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const uid = searchParams.get('uid')
  const isPreview = searchParams.get('preview') === '1'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.ca'

  if (isPreview) {
    return new NextResponse(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:60px;background:#0a0f1e;color:#e2e8f0;">
        <h2 style="color:#22c55e;">Preview mode unsubscribe not processed.</h2>
        <p>This is a test email. Real emails include a working unsubscribe link.</p>
        <a href="${appUrl}" style="color:#7c3aed;">Back to StakeOnix</a>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  if (!uid) {
    return NextResponse.redirect(`${appUrl}/?unsubscribe=error`)
  }

  try {
    const userId = Buffer.from(uid, 'base64url').toString('utf-8')
    await prisma.user.update({
      where: { id: userId },
      data: { emailOptOut: true },
    })
    return new NextResponse(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:60px;background:#0a0f1e;color:#e2e8f0;">
        <h2 style="color:#22c55e;">You've been unsubscribed.</h2>
        <p style="color:#9ca3af;">You will no longer receive marketing emails from StakeOnix.</p>
        <p style="color:#6b7280;font-size:14px;">Transactional emails (deposits, withdrawals, security) are still active.</p>
        <a href="${appUrl}" style="color:#7c3aed;">Back to StakeOnix</a>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch {
    return NextResponse.redirect(`${appUrl}/?unsubscribe=error`)
  }
}
