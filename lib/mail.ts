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
