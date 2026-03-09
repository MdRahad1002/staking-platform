import { Resend } from 'resend'

// Lazily instantiated — env vars are not available at module evaluation during build
let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    const key = (process.env.RESEND_API_KEY || '').trim()
    if (!key) throw new Error('RESEND_API_KEY is not set')
    _resend = new Resend(key)
  }
  return _resend
}

const FROM_ADDRESS = () => process.env.EMAIL_FROM || 'StakeOnix <noreply@stakeonix.com>'

// ─────────────────────────────────────────────
//  Bulk email: batch send (up to 100 per Resend call)
// ─────────────────────────────────────────────
export interface BulkEmailPayload {
  to: string
  subject: string
  html: string
}

export async function sendEmailBatch(emails: BulkEmailPayload[]): Promise<{ sent: number; failed: number }> {
  const resend = getResend()
  let sent = 0
  let failed = 0
  const CHUNK = 100
  for (let i = 0; i < emails.length; i += CHUNK) {
    const chunk = emails.slice(i, i + CHUNK).map((e) => ({
      from: FROM_ADDRESS(),
      to: e.to,
      subject: e.subject,
      html: e.html,
      text: e.html.replace(/<[^>]+>/g, ''),
    }))
    try {
      const result = await resend.batch.send(chunk)
      if (result.error) {
        failed += chunk.length
      } else {
        const successCount = Array.isArray(result.data) ? result.data.length : chunk.length
        sent += successCount
        failed += chunk.length - successCount
      }
    } catch {
      failed += chunk.length
    }
  }
  return { sent, failed }
}

// ─────────────────────────────────────────────
//  Professional bulk email HTML wrapper
// ─────────────────────────────────────────────
export function getBulkEmailTemplate(
  firstName: string,
  subject: string,
  bodyHtml: string,
  unsubscribeUrl: string
): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const year = new Date().getFullYear()
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f1e;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1a0a2e 0%,#2d1b4e 50%,#1a0a2e 100%);border-radius:16px 16px 0 0;padding:32px 48px;text-align:center;">
          <a href="${appUrl}" style="text-decoration:none;">
            <div style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);border-radius:12px;padding:8px 20px;">
              <span style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:2px;">STAKE<span style="color:#a8f0e0;">ONIX</span></span>
            </div>
          </a>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#111827;padding:40px 48px;">
          <p style="color:#d1d5db;font-size:16px;margin:0 0 24px;">Hi <strong style="color:#ffffff;">${firstName}</strong>,</p>
          <div style="color:#9ca3af;font-size:15px;line-height:1.8;">
            ${bodyHtml}
          </div>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top:1px solid #1f2937;padding-top:28px;margin-top:32px;"></td></tr></table>

          <p style="color:#4b5563;font-size:12px;margin:16px 0 0;line-height:1.6;">
            You are receiving this email because you have a StakeOnix account.<br/>
            <a href="${unsubscribeUrl}" style="color:#7c3aed;text-decoration:underline;">Unsubscribe from marketing emails</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0d131f;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;border-top:1px solid #1f2937;">
          <p style="color:#4b5563;font-size:12px;margin:0 0 6px;">
            &copy; ${year} StakeOnix &mdash; 130 King St W, Toronto, ON M5X 2A2, Canada
          </p>
          <p style="color:#374151;font-size:11px;margin:0;">
            <a href="${appUrl}/contact" style="color:#6b7280;text-decoration:none;">Contact Support</a>
            &nbsp;&middot;&nbsp;
            <a href="${appUrl}/dashboard" style="color:#6b7280;text-decoration:none;">My Dashboard</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions): Promise<void> {
  const { error } = await getResend().emails.send({
    from: FROM_ADDRESS(),
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]+>/g, ''),
  })
  if (error) {
    console.error('[MAIL] Resend error:', { to, subject, error })
    throw new Error(error.message)
  }
}

export function getWelcomeEmailTemplate(name: string, email: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Welcome to StakeOnix</title></head>
    <body style="font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 40px;">
        <h1 style="color: #22c55e; text-align: center;">Welcome to StakeOnix!</h1>
        <p>Hello ${name},</p>
        <p>Your account has been successfully created with email: <strong>${email}</strong></p>
        <p>Start staking today and earn passive income!</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="background: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Go to Dashboard
          </a>
        </div>
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">
          If you didn't create this account, please ignore this email.
        </p>
      </div>
    </body>
    </html>
  `
}

export function getPasswordResetEmailTemplate(name: string, resetLink: string): string {
  const firstName = name.includes('@') ? name.split('@')[0] : name.split(' ')[0]
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password — StakeOnix</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f1e;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1a0a2e 0%,#2d1b4e 50%,#1a0a2e 100%);border-radius:16px 16px 0 0;padding:40px 48px 32px;text-align:center;">
          <div style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);border-radius:12px;padding:10px 20px;margin-bottom:20px;">
            <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:2px;">STAKE<span style="color:#a8f0e0;">ONIX</span></span>
          </div>
          <div style="width:64px;height:64px;background:linear-gradient(135deg,#7c3aed,#a855f7);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:28px;line-height:64px;">&#128274;</span>
          </div>
          <h1 style="color:#ffffff;font-size:26px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px;">Password Reset Request</h1>
          <p style="color:#b794f4;font-size:15px;margin:0;">We received a request to reset your password</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#111827;padding:40px 48px;">
          <p style="color:#d1d5db;font-size:16px;margin:0 0 16px;">Hi <strong style="color:#ffffff;">${firstName}</strong>,</p>
          <p style="color:#9ca3af;font-size:15px;line-height:1.7;margin:0 0 28px;">
            Someone requested a password reset for your StakeOnix account. If this was you, click the button below to set a new password. This link is valid for <strong style="color:#ffffff;">1 hour</strong>.
          </p>

          <!-- CTA Button -->
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:0 0 32px;">
            <a href="${resetLink}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 48px;border-radius:10px;letter-spacing:0.3px;">Reset My Password &rarr;</a>
          </td></tr></table>

          <!-- Security notice box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="background:#1a1a2e;border:1px solid #2d1b4e;border-left:4px solid #7c3aed;border-radius:8px;padding:16px 20px;">
              <p style="color:#c4b5fd;font-size:13px;font-weight:600;margin:0 0 6px;">&#9888;&nbsp; Security Notice</p>
              <p style="color:#6b7280;font-size:13px;margin:0;line-height:1.6;">
                If you did <strong style="color:#9ca3af;">not</strong> request a password reset, your account may be at risk.
                Please <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color:#a855f7;text-decoration:none;">log in</a> and change your password immediately, or contact our support team.
              </p>
            </td></tr>
          </table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top:1px solid #1f2937;padding:24px 0 0;"></td></tr></table>

          <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0;">
            <strong style="color:#9ca3af;">Button not working?</strong> Copy and paste this link into your browser:<br />
            <a href="${resetLink}" style="color:#a855f7;word-break:break-all;font-size:12px;">${resetLink}</a>
          </p>
          <p style="color:#ef4444;font-size:12px;margin:12px 0 0;">&#9201; This reset link expires in <strong>1 hour</strong>. After that you&rsquo;ll need to request a new one.</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0d131f;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;border-top:1px solid #1f2937;">
          <p style="color:#4b5563;font-size:12px;margin:0 0 8px;">
            &copy; ${new Date().getFullYear()} StakeOnix &mdash; 130 King St W, Toronto, ON M5X 2A2, Canada
          </p>
          <p style="color:#374151;font-size:11px;margin:0;">
            This email was sent from a no-reply address. For support, visit <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact" style="color:#6b7280;text-decoration:none;">stakeonix.com/contact</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function getDepositConfirmedEmailTemplate(name: string, amount: string, currency: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Deposit Confirmed</title></head>
    <body style="font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 40px;">
        <h1 style="color: #22c55e; text-align: center;">Deposit Confirmed! ✅</h1>
        <p>Hello ${name},</p>
        <p>Your deposit of <strong style="color: #22c55e;">${amount} ${currency}</strong> has been confirmed and credited to your account.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="background: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            View Dashboard
          </a>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  await sendEmail({
    to: email,
    subject: 'Welcome to StakeOnix!',
    html: getWelcomeEmailTemplate(name, email),
  })
}

export function getVerificationEmailTemplate(name: string, verifyUrl: string): string {
  const firstName = name.split('@')[0].split(' ')[0]
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to StakeOnix</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f1e;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0f2027 0%,#203a43 50%,#0f2027 100%);border-radius:16px 16px 0 0;padding:40px 48px 32px;text-align:center;">
          <div style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);border-radius:12px;padding:10px 20px;margin-bottom:20px;">
            <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:2px;">STAKE<span style="color:#a8f0e0;">ONIX</span></span>
          </div>
          <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px;">Welcome to StakeOnix</h1>
          <p style="color:#7dd3c8;font-size:15px;margin:0;">Your journey to smarter crypto staking starts now</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#111827;padding:40px 48px;">
          <p style="color:#d1d5db;font-size:16px;margin:0 0 16px;">Hi <strong style="color:#ffffff;">${firstName}</strong>,</p>
          <p style="color:#9ca3af;font-size:15px;line-height:1.7;margin:0 0 24px;">
            Thank you for creating your StakeOnix account. We&rsquo;re excited to have you on board.
            Please verify your email address to complete your registration and unlock all platform features.
          </p>

          <!-- CTA Button -->
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:8px 0 32px;">
            <a href="${verifyUrl}" style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 48px;border-radius:10px;letter-spacing:0.3px;">Verify My Email Address &rarr;</a>
          </td></tr></table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top:1px solid #1f2937;padding:24px 0;"></td></tr></table>

          <!-- Features -->
          <p style="color:#6b7280;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin:0 0 16px;">What you get with StakeOnix</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="33%" style="padding:0 8px 0 0;vertical-align:top;">
                <div style="background:#1a2332;border:1px solid #1f2937;border-radius:10px;padding:16px;text-align:center;">
                  <div style="font-size:24px;margin-bottom:8px;">&#128200;</div>
                  <p style="color:#00d4aa;font-size:13px;font-weight:700;margin:0 0 4px;">Daily Returns</p>
                  <p style="color:#6b7280;font-size:12px;margin:0;">Earn rewards every 24h</p>
                </div>
              </td>
              <td width="33%" style="padding:0 4px;vertical-align:top;">
                <div style="background:#1a2332;border:1px solid #1f2937;border-radius:10px;padding:16px;text-align:center;">
                  <div style="font-size:24px;margin-bottom:8px;">&#128274;</div>
                  <p style="color:#00d4aa;font-size:13px;font-weight:700;margin:0 0 4px;">Bank-Grade Security</p>
                  <p style="color:#6b7280;font-size:12px;margin:0;">2FA &amp; SSL encryption</p>
                </div>
              </td>
              <td width="33%" style="padding:0 0 0 8px;vertical-align:top;">
                <div style="background:#1a2332;border:1px solid #1f2937;border-radius:10px;padding:16px;text-align:center;">
                  <div style="font-size:24px;margin-bottom:8px;">&#127381;</div>
                  <p style="color:#00d4aa;font-size:13px;font-weight:700;margin:0 0 4px;">Referral Rewards</p>
                  <p style="color:#6b7280;font-size:12px;margin:0;">Earn when friends join</p>
                </div>
              </td>
            </tr>
          </table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top:1px solid #1f2937;padding:24px 0 0;"></td></tr></table>

          <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0;">
            <strong style="color:#9ca3af;">Button not working?</strong> Copy and paste this link into your browser:<br />
            <a href="${verifyUrl}" style="color:#00d4aa;word-break:break-all;font-size:12px;">${verifyUrl}</a>
          </p>
          <p style="color:#ef4444;font-size:12px;margin:12px 0 0;">&#9888; This link expires in <strong>24 hours</strong>.</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0d131f;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;border-top:1px solid #1f2937;">
          <p style="color:#4b5563;font-size:12px;margin:0 0 8px;">
            &copy; ${new Date().getFullYear()} StakeOnix &mdash; 130 King St W, Toronto, ON M5X 2A2, Canada
          </p>
          <p style="color:#374151;font-size:11px;margin:0;">
            If you did not create a StakeOnix account, please ignore this email.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendVerificationEmail(email: string, name: string, token: string): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const verifyUrl = `${appUrl}/verify-email?token=${token}`
  await sendEmail({
    to: email,
    subject: 'Welcome to StakeOnix — Please Verify Your Email',
    html: getVerificationEmailTemplate(name, verifyUrl),
  })
}

export async function sendPasswordResetEmail(email: string, resetUrl: string, name?: string): Promise<void> {
  await sendEmail({
    to: email,
    subject: 'Reset Your StakeOnix Password',
    html: getPasswordResetEmailTemplate(name || email, resetUrl),
  })
}

export async function sendDepositConfirmedEmail(email: string, amount: number, currency: string): Promise<void> {
  await sendEmail({
    to: email,
    subject: 'Deposit Confirmed',
    html: getDepositConfirmedEmailTemplate(email, amount.toString(), currency),
  })
}

// ─────────────────────────────────────────────
//  Referral nudge email — sent to referrers
//  whose referrals signed up but haven't staked
// ─────────────────────────────────────────────
export function getReferralNudgeEmailTemplate(
  referrerName: string,
  inactiveCount: number,
  potentialEarnings: string,
  commissionRate: number,
  referralLink: string,
  unsubscribeUrl: string
): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const year = new Date().getFullYear()
  const firstName = referrerName.includes('@') ? referrerName.split('@')[0] : referrerName.split(' ')[0]

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You have unclaimed referral earnings waiting</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f1e;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1a0a2e 0%,#2d1b4e 50%,#1a0a2e 100%);border-radius:16px 16px 0 0;padding:32px 48px;text-align:center;">
          <a href="${appUrl}" style="text-decoration:none;">
            <div style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);border-radius:12px;padding:8px 20px;">
              <span style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:2px;">STAKE<span style="color:#a8f0e0;">ONIX</span></span>
            </div>
          </a>
          <p style="color:#f59e0b;font-size:28px;margin:20px 0 4px;">&#128176;</p>
          <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 8px;">You have money waiting</h1>
          <p style="color:#b794f4;font-size:14px;margin:0;">${inactiveCount} friend${inactiveCount !== 1 ? 's' : ''} signed up with your link but haven't invested yet</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#111827;padding:40px 48px;">
          <p style="color:#d1d5db;font-size:16px;margin:0 0 16px;">Hi <strong style="color:#ffffff;">${firstName}</strong>,</p>

          <p style="color:#9ca3af;font-size:15px;line-height:1.7;margin:0 0 24px;">
            You referred <strong style="color:#ffffff;">${inactiveCount} ${inactiveCount !== 1 ? 'people' : 'person'}</strong> to StakeOnix who have created an account.
            The moment any of them activates a staking plan, you earn <strong style="color:#00d4aa;">${commissionRate}% commission</strong> instantly, credited straight to your balance.
          </p>

          <!-- Earning potential box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="background:linear-gradient(135deg,#0f3d2e,#1a4d3a);border:1px solid #00d4aa33;border-radius:12px;padding:24px;text-align:center;">
              <p style="color:#6b7280;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px;">Potential earnings waiting</p>
              <p style="color:#00d4aa;font-size:40px;font-weight:900;margin:0 0 4px;">${potentialEarnings}</p>
              <p style="color:#6b7280;font-size:12px;margin:0;">Estimated if each inactive referral stakes $300</p>
            </td></tr>
          </table>

          <p style="color:#9ca3af;font-size:14px;line-height:1.7;margin:0 0 24px;">
            The easiest thing you can do right now is send them a quick reminder with your referral link.
            People often just forget - a single message can turn into real earnings for you.
          </p>

          <!-- Share link box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="background:#1a2332;border:1px solid #1f2937;border-radius:10px;padding:16px 20px;">
              <p style="color:#6b7280;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px;">Your referral link</p>
              <p style="color:#7c3aed;font-size:13px;word-break:break-all;margin:0;font-family:monospace;">${referralLink}</p>
            </td></tr>
          </table>

          <!-- CTA buttons -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr>
              <td align="center" style="padding:0 8px 0 0;">
                <a href="https://wa.me/?text=${encodeURIComponent(`Hey! I've been earning daily income on my crypto through StakeOnix - no trading needed. You signed up with my link already, just activate a plan to start earning: ${referralLink}`)}"
                   style="display:inline-block;background:#25D366;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:8px;">
                  Send via WhatsApp
                </a>
              </td>
              <td align="center" style="padding:0 0 0 8px;">
                <a href="${appUrl}/referrals"
                   style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:8px;">
                  View My Referrals
                </a>
              </td>
            </tr>
          </table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top:1px solid #1f2937;padding-top:24px;"></td></tr></table>

          <p style="color:#4b5563;font-size:12px;margin:16px 0 0;line-height:1.6;">
            You are receiving this because you have referrals who haven't yet activated a stake.<br/>
            <a href="${unsubscribeUrl}" style="color:#7c3aed;text-decoration:underline;">Unsubscribe from referral reminders</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0d131f;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;border-top:1px solid #1f2937;">
          <p style="color:#4b5563;font-size:12px;margin:0 0 6px;">
            &copy; ${year} StakeOnix - 130 King St W, Toronto, ON M5X 2A2, Canada
          </p>
          <p style="color:#374151;font-size:11px;margin:0;">
            <a href="${appUrl}/contact" style="color:#6b7280;text-decoration:none;">Contact Support</a>
            &nbsp;&middot;&nbsp;
            <a href="${appUrl}/referrals" style="color:#6b7280;text-decoration:none;">My Referrals</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendReferralNudgeEmail(
  email: string,
  referrerName: string,
  inactiveCount: number,
  potentialEarnings: string,
  commissionRate: number,
  referralLink: string
): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const unsubUrl = `${appUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&type=referral`
  await sendEmail({
    to: email,
    subject: `You have ${inactiveCount} referral${inactiveCount !== 1 ? 's' : ''} who haven't invested yet - remind them today`,
    html: getReferralNudgeEmailTemplate(referrerName, inactiveCount, potentialEarnings, commissionRate, referralLink, unsubUrl),
  })
}

// ─────────────────────────────────────────────
//  First-deposit nudge — sent ~8 min after email verification
// ─────────────────────────────────────────────
export function getFirstDepositNudgeEmailTemplate(firstName: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const year = new Date().getFullYear()

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your account is ready — start earning today</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f1e;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- HEADER -->
  <tr><td style="background:linear-gradient(135deg,#0f2027 0%,#1a3a4a 50%,#0f2027 100%);border-radius:16px 16px 0 0;padding:40px 48px 36px;text-align:center;">
    <a href="${appUrl}" style="text-decoration:none;">
      <div style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);border-radius:12px;padding:10px 22px;margin-bottom:24px;">
        <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:2px;">STAKE<span style="color:#a8f0e0;">ONIX</span></span>
      </div>
    </a>
    <!-- Verified badge -->
    <div style="display:inline-block;background:#052e16;border:1px solid #166534;border-radius:999px;padding:6px 18px;margin-bottom:20px;">
      <span style="color:#4ade80;font-size:13px;font-weight:600;">&#10003;&nbsp; Email Verified</span>
    </div>
    <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0 0 10px;letter-spacing:-0.5px;line-height:1.25;">
      Your account is ready.<br/>
      <span style="color:#f59e0b;">But it&rsquo;s not earning yet.</span>
    </h1>
    <p style="color:#94a3b8;font-size:15px;margin:0;line-height:1.6;">
      Every day without a deposit is money you&rsquo;re leaving on the table.
    </p>
  </td></tr>

  <!-- BODY -->
  <tr><td style="background:#0d1520;padding:0;">

    <!-- Opportunity cost banner -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background:linear-gradient(135deg,#1c1207,#2d1e08);border-left:4px solid #f59e0b;padding:20px 32px;">
        <p style="color:#fbbf24;font-size:13px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;margin:0 0 4px;">&#9888;&nbsp; You&rsquo;re Missing Out Right Now</p>
        <p style="color:#92400e;font-size:13px;margin:0;line-height:1.6;">
          Users who deposited today are already earning. A $1,000 stake at 2%/day earns
          <strong style="color:#fbbf24;">$20 today</strong>, <strong style="color:#fbbf24;">$600 this month</strong>.
          Your account has earned exactly <strong style="color:#ef4444;">$0.00</strong> so far.
        </p>
      </td></tr>
    </table>

    <!-- Earnings preview table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:36px 40px 0;">
      <tr><td>
        <p style="color:#6b7280;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px;">What you could be earning daily</p>
        <!-- Row 1 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
          <tr>
            <td style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:14px 18px;width:33%;vertical-align:middle;">
              <p style="color:#6b7280;font-size:11px;margin:0 0 3px;">Deposit $500</p>
              <p style="color:#00d4aa;font-size:20px;font-weight:800;margin:0;">$10<span style="font-size:13px;font-weight:500;color:#4b5563;">/day</span></p>
              <p style="color:#374151;font-size:11px;margin:3px 0 0;">$300/month</p>
            </td>
            <td style="width:8px;"></td>
            <td style="background:linear-gradient(135deg,#0c2340,#0a3a5c);border:1px solid #0e4a73;border-radius:10px;padding:14px 18px;width:33%;vertical-align:middle;">
              <div style="display:inline-block;background:#0e4a73;border-radius:4px;padding:2px 8px;margin-bottom:6px;">
                <span style="color:#38bdf8;font-size:10px;font-weight:700;">POPULAR</span>
              </div>
              <p style="color:#6b7280;font-size:11px;margin:0 0 3px;">Deposit $2,000</p>
              <p style="color:#38bdf8;font-size:20px;font-weight:800;margin:0;">$40<span style="font-size:13px;font-weight:500;color:#4b5563;">/day</span></p>
              <p style="color:#374151;font-size:11px;margin:3px 0 0;">$1,200/month</p>
            </td>
            <td style="width:8px;"></td>
            <td style="background:linear-gradient(135deg,#1a0a2e,#2d1b4e);border:1px solid #4c1d95;border-radius:10px;padding:14px 18px;width:33%;vertical-align:middle;">
              <p style="color:#6b7280;font-size:11px;margin:0 0 3px;">Deposit $5,000</p>
              <p style="color:#a78bfa;font-size:20px;font-weight:800;margin:0;">$100<span style="font-size:13px;font-weight:500;color:#4b5563;">/day</span></p>
              <p style="color:#374151;font-size:11px;margin:3px 0 0;">$3,000/month</p>
            </td>
          </tr>
        </table>
        <p style="color:#374151;font-size:11px;margin:8px 0 0;text-align:right;">Based on Growth plan at 2%/day &middot; <a href="${appUrl}/plans" style="color:#6b7280;text-decoration:none;">View all plans</a></p>
      </td></tr>
    </table>

    <!-- CTA Section -->
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 40px;">
      <tr><td style="background:linear-gradient(135deg,#0a2a1a,#0f3d2e);border:1px solid #00d4aa33;border-radius:14px;padding:32px;text-align:center;">
        <p style="color:#00d4aa;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 10px;">Ready to start earning?</p>
        <h2 style="color:#ffffff;font-size:22px;font-weight:800;margin:0 0 12px;line-height:1.3;">
          Make Your First Deposit &amp;<br/>Get Paid Tomorrow
        </h2>
        <p style="color:#6b7280;font-size:14px;margin:0 0 24px;line-height:1.6;">
          Deposit crypto, choose a plan, and your first daily reward lands in your account within 24 hours. It really is that simple.
        </p>
        <a href="${appUrl}/deposit"
           style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);color:#ffffff;font-size:16px;font-weight:800;text-decoration:none;padding:16px 52px;border-radius:12px;letter-spacing:0.3px;">
          Make My First Deposit &rarr;
        </a>
        <p style="color:#374151;font-size:12px;margin:16px 0 0;">
          No minimum lock-up &middot; Withdraw anytime &middot; Rewards in 24h
        </p>
      </td></tr>
    </table>

    <!-- How it works — 3 steps -->
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px 32px;">
      <tr><td>
        <p style="color:#6b7280;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px;">It takes under 3 minutes</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:33%;vertical-align:top;padding-right:8px;">
              <div style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:18px;text-align:center;">
                <div style="width:32px;height:32px;background:linear-gradient(135deg,#00d4aa,#00b4d8);border-radius:50%;margin:0 auto 10px;line-height:32px;text-align:center;">
                  <span style="color:#ffffff;font-size:14px;font-weight:800;">1</span>
                </div>
                <p style="color:#e5e7eb;font-size:13px;font-weight:600;margin:0 0 4px;">Deposit Crypto</p>
                <p style="color:#4b5563;font-size:12px;margin:0;line-height:1.5;">BTC, ETH, USDT &amp; more accepted</p>
              </div>
            </td>
            <td style="width:33%;vertical-align:top;padding:0 4px;">
              <div style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:18px;text-align:center;">
                <div style="width:32px;height:32px;background:linear-gradient(135deg,#00d4aa,#00b4d8);border-radius:50%;margin:0 auto 10px;line-height:32px;text-align:center;">
                  <span style="color:#ffffff;font-size:14px;font-weight:800;">2</span>
                </div>
                <p style="color:#e5e7eb;font-size:13px;font-weight:600;margin:0 0 4px;">Choose a Plan</p>
                <p style="color:#4b5563;font-size:12px;margin:0;line-height:1.5;">Pick daily ROI &amp; duration that suits you</p>
              </div>
            </td>
            <td style="width:33%;vertical-align:top;padding-left:8px;">
              <div style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:18px;text-align:center;">
                <div style="width:32px;height:32px;background:linear-gradient(135deg,#00d4aa,#00b4d8);border-radius:50%;margin:0 auto 10px;line-height:32px;text-align:center;">
                  <span style="color:#ffffff;font-size:14px;font-weight:800;">3</span>
                </div>
                <p style="color:#e5e7eb;font-size:13px;font-weight:600;margin:0 0 4px;">Earn Daily</p>
                <p style="color:#4b5563;font-size:12px;margin:0;line-height:1.5;">Rewards credited while you sleep</p>
              </div>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- Social proof strip -->
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px 32px;">
      <tr>
        <td style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:16px 20px;text-align:center;width:33%;">
          <p style="color:#00d4aa;font-size:20px;font-weight:800;margin:0 0 2px;">87,000+</p>
          <p style="color:#4b5563;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0;">Active Investors</p>
        </td>
        <td style="width:8px;"></td>
        <td style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:16px 20px;text-align:center;width:33%;">
          <p style="color:#00d4aa;font-size:20px;font-weight:800;margin:0 0 2px;">$2.5B+</p>
          <p style="color:#4b5563;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0;">Total Paid Out</p>
        </td>
        <td style="width:8px;"></td>
        <td style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:16px 20px;text-align:center;width:33%;">
          <p style="color:#00d4aa;font-size:20px;font-weight:800;margin:0 0 2px;">99.95%</p>
          <p style="color:#4b5563;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0;">Platform Uptime</p>
        </td>
      </tr>
    </table>

    <!-- Security reassurance -->
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px 36px;">
      <tr><td style="background:#0d1117;border:1px solid #1f2937;border-radius:10px;padding:18px 22px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;padding-right:12px;width:24px;font-size:18px;">&#128274;</td>
            <td style="vertical-align:top;">
              <p style="color:#d1d5db;font-size:13px;font-weight:600;margin:0 0 4px;">Your funds are safe</p>
              <p style="color:#4b5563;font-size:13px;margin:0;line-height:1.6;">
                256-bit SSL encryption &middot; Multi-signature cold wallets &middot; KYC/AML compliant &middot; Licensed in Canada
              </p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- Divider -->
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px;">
      <tr><td style="border-top:1px solid #1f2937;"></td></tr>
    </table>

    <!-- Footer links -->
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 40px 0;">
      <tr><td>
        <p style="color:#374151;font-size:12px;margin:0;line-height:1.7;">
          You received this because you recently verified your StakeOnix account.<br/>
          <a href="${appUrl}/api/unsubscribe?type=activation&amp;email=" style="color:#6b7280;text-decoration:underline;">Unsubscribe from promotional emails</a>
        </p>
      </td></tr>
    </table>

  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#0d131f;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;border-top:1px solid #1f2937;">
    <p style="color:#4b5563;font-size:12px;margin:0 0 8px;">
      &copy; ${year} StakeOnix &mdash; 130 King St W, Toronto, ON M5X 2A2, Canada
    </p>
    <p style="color:#374151;font-size:11px;margin:0;">
      <a href="${appUrl}/deposit" style="color:#6b7280;text-decoration:none;">Make a Deposit</a>
      &nbsp;&middot;&nbsp;
      <a href="${appUrl}/plans" style="color:#6b7280;text-decoration:none;">View Plans</a>
      &nbsp;&middot;&nbsp;
      <a href="${appUrl}/contact" style="color:#6b7280;text-decoration:none;">Contact Support</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

/**
 * Sends the first-deposit nudge email ~8 minutes after email verification.
 * Uses Resend's scheduledAt so it returns immediately and Resend handles the delay.
 * If scheduling is unavailable (free plan), falls back to immediate send.
 */
export async function sendFirstDepositNudgeEmail(email: string, name: string): Promise<void> {
  const firstName = name.includes('@') ? name.split('@')[0] : name.split(' ')[0]
  const appUrl  = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const key     = (process.env.RESEND_API_KEY || '').trim()
  if (!key) return

  const html    = getFirstDepositNudgeEmailTemplate(firstName)
  const subject = `${firstName}, your account is ready — but it's earning $0 right now`
  const scheduledAt = new Date(Date.now() + 8 * 60 * 1000).toISOString() // 8 minutes from now

  try {
    // Use Resend REST API directly so we can pass scheduledAt
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'StakeOnix <noreply@stakeonix.com>',
        to: email,
        subject,
        html,
        scheduled_at: scheduledAt,
      }),
    })

    const data = await res.json()

    // If scheduledAt not supported (free plan), fall back to immediate send
    if (!res.ok && data?.name === 'restricted_feature') {
      await sendEmail({ to: email, subject, html })
    }

    if (!res.ok && data?.name !== 'restricted_feature') {
      console.warn('[MAIL] First deposit nudge failed to schedule:', data)
    }
  } catch (err) {
    // Non-critical — swallow error so it never breaks the verify flow
    console.warn('[MAIL] First deposit nudge error (non-critical):', err)
  }

  void appUrl // suppress unused warning
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || 'nikos@stakeonix.com'
  await sendEmail({
    to: adminEmail,
    subject: `Contact Form: ${subject}`,
    html: `
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  })
}

export function getWithdrawalStatusEmailTemplate(
  name: string,
  amount: string,
  currency: string,
  status: 'approved' | 'rejected',
  reason?: string
): string {
  const isApproved = status === 'approved'
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Withdrawal ${isApproved ? 'Approved' : 'Rejected'}</title></head>
    <body style="font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 40px;">
        <h1 style="color: ${isApproved ? '#22c55e' : '#ef4444'}; text-align: center;">
          Withdrawal ${isApproved ? 'Approved ✅' : 'Rejected ❌'}
        </h1>
        <p>Hello ${name},</p>
        <p>Your withdrawal request of <strong>${amount} ${currency}</strong> has been 
          <strong style="color: ${isApproved ? '#22c55e' : '#ef4444'};">${status}</strong>.
        </p>
        ${reason ? `<p>Reason: ${reason}</p>` : ''}
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/withdraw" 
             style="background: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            View Withdrawals
          </a>
        </div>
      </div>
    </body>
    </html>
  `
}
