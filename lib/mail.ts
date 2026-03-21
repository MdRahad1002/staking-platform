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
//  Shared design-system layout wrapper
// ─────────────────────────────────────────────
function layout(content: string, previewText = ''): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const year   = new Date().getFullYear()
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StakeOnix</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0a0e1a;font-family:'Inter',Arial,sans-serif;color:#e2e8f0;-webkit-font-smoothing:antialiased}
    a{color:inherit;text-decoration:none}
    .wrapper{background:#0a0e1a;padding:40px 16px}
    .container{max-width:600px;margin:0 auto}
    .header{text-align:center;padding:24px 0 16px}
    .logo{font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.5px}
    .logo-dot{width:7px;height:7px;background:#f59e0b;border-radius:50%;display:inline-block;margin-right:3px;vertical-align:middle}
    .card{background:#111827;border:1px solid #1f2d45;border-radius:16px;overflow:hidden}
    .card-header{background:linear-gradient(135deg,#0f1f3d 0%,#162035 50%,#0f1f3d 100%);padding:40px 40px 32px;text-align:center}
    .icon-circle{width:64px;height:64px;border-radius:50%;display:inline-block;text-align:center;line-height:62px;margin:0 auto 20px;font-size:28px}
    .icon-gold{background:linear-gradient(135deg,#f59e0b22,#f59e0b44);border:1px solid #f59e0b55}
    .icon-green{background:linear-gradient(135deg,#10b98122,#10b98144);border:1px solid #10b98155}
    .icon-blue{background:linear-gradient(135deg,#3b82f622,#3b82f644);border:1px solid #3b82f655}
    .icon-purple{background:linear-gradient(135deg,#8b5cf622,#8b5cf644);border:1px solid #8b5cf655}
    .icon-red{background:linear-gradient(135deg,#ef444422,#ef444444);border:1px solid #ef444455}
    .card-title{font-size:24px;font-weight:700;color:#fff;margin-bottom:8px}
    .card-subtitle{font-size:15px;color:#94a3b8;line-height:1.5}
    .card-body{padding:36px 40px}
    .greeting{font-size:16px;color:#cbd5e1;margin-bottom:20px}
    .body-text{font-size:15px;color:#94a3b8;line-height:1.7;margin-bottom:16px}
    .highlight-box{background:#0f1f3d;border:1px solid #1e3a5f;border-radius:12px;padding:24px;margin:24px 0}
    .highlight-box-green{background:#052e1c!important;border-color:#064e2e!important}
    .highlight-box-gold{background:#1c1400!important;border-color:#3d2a00!important}
    .highlight-box-red{background:#1c0a0a!important;border-color:#3d1515!important}
    .stat-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #1f2d3d}
    .stat-row:last-child{border-bottom:none}
    .stat-label{font-size:13px;color:#64748b}
    .stat-value{font-size:14px;font-weight:600;color:#e2e8f0}
    .amount-display{text-align:center;padding:20px 0}
    .amount-large{font-size:42px;font-weight:700;letter-spacing:-1px}
    .amount-currency{font-size:18px;color:#64748b;margin-left:4px}
    .badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600}
    .badge-gold{background:#3d2a0022;color:#f59e0b;border:1px solid #f59e0b44}
    .badge-green{background:#05210f;color:#10b981;border:1px solid #10b98144}
    .badge-blue{background:#0d1f3c;color:#60a5fa;border:1px solid #3b82f644}
    .badge-red{background:#1c0a0a;color:#f87171;border:1px solid #ef444444}
    .cta-btn{display:block;width:fit-content;margin:28px auto 0;padding:14px 36px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;font-size:15px;font-weight:700;border-radius:8px;text-align:center;letter-spacing:0.3px}
    .cta-btn-green{background:linear-gradient(135deg,#10b981,#059669)!important;color:#fff!important}
    .cta-btn-blue{background:linear-gradient(135deg,#3b82f6,#1d4ed8)!important;color:#fff!important}
    .divider{height:1px;background:linear-gradient(90deg,transparent,#1f2d45,transparent);margin:28px 0}
    .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0}
    .info-cell{background:#0d1624;border:1px solid #1a2a3d;border-radius:10px;padding:16px;text-align:center}
    .info-cell-label{font-size:11px;color:#475569;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px}
    .info-cell-value{font-size:18px;font-weight:700;color:#e2e8f0}
    .steps{margin:20px 0}
    .step{display:flex;gap:16px;align-items:flex-start;margin-bottom:20px}
    .step-num{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
    .step-text{font-size:14px;color:#94a3b8;line-height:1.6}
    .step-text strong{color:#e2e8f0}
    .security-note{background:#0a1628;border:1px solid #1a2d47;border-left:3px solid #3b82f6;border-radius:8px;padding:16px 20px;margin:24px 0;font-size:13px;color:#64748b;line-height:1.6}
    .security-note strong{color:#94a3b8}
    .message-bubble{background:#0d1624;border:1px solid #1a2a3d;border-radius:12px;padding:20px;margin:20px 0;font-size:14px;color:#94a3b8;line-height:1.7;font-style:italic}
    .tag{display:inline-block;background:#0f1f3d;color:#60a5fa;font-size:12px;padding:3px 10px;border-radius:4px;border:1px solid #1e3a5f}
    .footer{text-align:center;padding:28px 0 12px}
    .footer-link{font-size:13px;color:#475569;margin:0 10px}
    .footer-address{font-size:12px;color:#374151;line-height:1.7;margin-top:8px}
    @media(max-width:480px){.card-body{padding:24px 20px}.card-header{padding:28px 20px 24px}.info-grid{grid-template-columns:1fr}.amount-large{font-size:32px}}
  </style>
</head>
<body>
  ${previewText ? `<div style="display:none;max-height:0;overflow:hidden;color:#0a0e1a;">${previewText}&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;</div>` : ''}
  <div class="wrapper">
    <div class="container">
      <div class="header"><div class="logo"><span class="logo-dot"></span>StakeOnix</div></div>
      <div class="card">${content}</div>
      <div class="footer">
        <div>
          <a href="${appUrl}/dashboard" class="footer-link">Dashboard</a>
          <a href="${appUrl}/deposit" class="footer-link">Deposit</a>
          <a href="${appUrl}/plans" class="footer-link">Plans</a>
          <a href="${appUrl}/contact" class="footer-link">Support</a>
        </div>
        <div class="footer-address">
          StakeOnix &middot; 130 King St W, Toronto, ON M5X 2A2, Canada<br/>
          <a href="mailto:info@stakeonix.com" style="color:#374151;">info@stakeonix.com</a> &middot; +1 (613) 366-4391
        </div>
        <div style="font-size:12px;color:#374151;margin-top:10px;">&copy; ${year} StakeOnix. All rights reserved.</div>
      </div>
    </div>
  </div>
</body></html>`
}

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

export function getWelcomeEmailTemplate(name: string, _email: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  return layout(`
    <div class="card-header">
      <div class="icon-circle icon-gold">🎉</div>
      <div class="card-title">Welcome to StakeOnix</div>
      <div class="card-subtitle">Your account is ready. Start earning today.</div>
    </div>
    <div class="card-body">
      <p class="greeting">Hi <strong>${name}</strong> 👋</p>
      <p class="body-text">Welcome aboard! You've just joined <strong style="color:#f59e0b;">480,000+ investors</strong> earning daily passive income through staking.</p>
      <div class="highlight-box highlight-box-green" style="text-align:center;padding:20px 24px;">
        <p style="font-size:13px;color:#059669;font-weight:600;margin:0 0 4px;">🎁 Welcome Bonus</p>
        <p style="font-size:36px;font-weight:700;color:#10b981;margin:4px 0;">\$100</p>
        <p style="font-size:13px;color:#065f46;margin:0;">Credited on your first deposit</p>
      </div>
      <a href="${appUrl}/dashboard" class="cta-btn cta-btn-green">Go to My Dashboard</a>
      <div class="security-note">
        <strong>🔒 Security tip:</strong> StakeOnix will never ask for your password via email or chat. Enable 2FA in your account settings for maximum protection.
      </div>
    </div>
  `, 'Your StakeOnix account is ready — claim your \$100 welcome bonus today.')
}

export function getPasswordResetEmailTemplate(name: string, resetLink: string): string {
  const firstName = name.includes('@') ? name.split('@')[0] : name.split(' ')[0]
  return layout(`
    <div class="card-header">
      <div class="icon-circle icon-purple">🔒</div>
      <div class="card-title">Password Reset Request</div>
      <div class="card-subtitle">We received a request to reset your password</div>
    </div>
    <div class="card-body">
      <p class="greeting">Hi <strong>${firstName}</strong>,</p>
      <p class="body-text">Someone requested a password reset for your StakeOnix account. Click the button below to set a new password. This link is valid for <strong style="color:#e2e8f0;">1 hour</strong>.</p>
      <a href="${resetLink}" class="cta-btn" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:#ffffff;display:block;">Reset My Password →</a>
      <div class="highlight-box" style="background:#1a0a2e;border-color:#4c1d95;border-left:4px solid #8b5cf6;margin-top:28px;">
        <p style="color:#c4b5fd;font-size:13px;font-weight:600;margin:0 0 6px;">⚠️ Security Notice</p>
        <p style="color:#6b7280;font-size:13px;margin:0;line-height:1.6;">If you did <strong style="color:#9ca3af;">not</strong> request this, your account may be at risk. Log in and change your password immediately, or contact our support team.</p>
      </div>
      <div class="divider"></div>
      <p style="color:#475569;font-size:12px;margin:0 0 6px;"><strong style="color:#64748b;">Button not working?</strong> Paste this into your browser:</p>
      <p style="margin:0;"><a href="${resetLink}" style="color:#8b5cf6;word-break:break-all;font-size:12px;">${resetLink}</a></p>
      <p style="color:#ef4444;font-size:12px;margin:10px 0 0;">⏱ Expires in <strong>1 hour</strong>.</p>
    </div>
  `, 'Reset your StakeOnix password — link valid for 1 hour.')
}

export function getDepositConfirmedEmailTemplate(name: string, amount: string, currency: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  return layout(`
    <div class="card-header">
      <div class="icon-circle icon-green">✅</div>
      <div class="card-title">Deposit Confirmed</div>
      <div class="card-subtitle">Your funds are live and ready to stake</div>
    </div>
    <div class="card-body">
      <p class="greeting">Hi <strong>${name}</strong>,</p>
      <p class="body-text">Your deposit has been confirmed and credited to your account. Pick a staking plan and start earning daily rewards in minutes.</p>
      <div class="amount-display">
        <span class="amount-large" style="color:#10b981;">${amount}</span>
        <span class="amount-currency">${currency}</span>
      </div>
      <div class="highlight-box highlight-box-green">
        <div class="stat-row"><span class="stat-label">Status</span><span class="stat-value"><span class="badge badge-green">Confirmed</span></span></div>
        <div class="stat-row"><span class="stat-label">Credited to</span><span class="stat-value">Your Account Balance</span></div>
        <div class="stat-row"><span class="stat-label">Next step</span><span class="stat-value">Choose a Staking Plan</span></div>
      </div>
      <a href="${appUrl}/plans" class="cta-btn cta-btn-green">Choose a Staking Plan →</a>
      <div class="security-note">
        <strong>📌 Note:</strong> If you did not initiate this deposit, contact support immediately at <a href="mailto:info@stakeonix.com" style="color:#60a5fa;">info@stakeonix.com</a>.
      </div>
    </div>
  `, `Your ${amount} ${currency} deposit is confirmed and ready to earn.`)
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
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  return layout(`
    <div class="card-header">
      <div class="icon-circle icon-gold">🚀</div>
      <div class="card-title">Welcome to StakeOnix</div>
      <div class="card-subtitle">Verify your email to unlock your account</div>
    </div>
    <div class="card-body">
      <p class="greeting">Hi <strong>${firstName}</strong> 👋</p>
      <p class="body-text">You're almost in! Verify your email address to activate your account and start earning daily staking rewards.</p>
      <a href="${verifyUrl}" class="cta-btn">Verify My Email →</a>
      <div class="highlight-box highlight-box-green" style="text-align:center;padding:20px 24px;margin-top:28px;">
        <p style="font-size:13px;color:#059669;font-weight:600;margin:0 0 4px;">🎁 First Deposit Bonus</p>
        <p style="font-size:36px;font-weight:700;color:#10b981;margin:4px 0;">\$100</p>
        <p style="font-size:13px;color:#065f46;margin:0;">Instant credit on your first deposit</p>
      </div>
      <div class="steps" style="margin-top:28px;">
        <div class="step"><span class="step-num">1</span><div class="step-text"><strong>Verify your email</strong> — click the button above</div></div>
        <div class="step"><span class="step-num">2</span><div class="step-text"><strong>Make your first deposit</strong> — starting from \$100</div></div>
        <div class="step"><span class="step-num">3</span><div class="step-text"><strong>Choose a plan</strong> — up to 3.5% daily returns</div></div>
        <div class="step"><span class="step-num">4</span><div class="step-text"><strong>Earn every day</strong> — rewards credited every 24 hours</div></div>
      </div>
      <div class="divider"></div>
      <p style="color:#475569;font-size:12px;margin:0 0 6px;"><strong style="color:#64748b;">Button not working?</strong> Paste this into your browser:</p>
      <p style="margin:0 0 8px;"><a href="${verifyUrl}" style="color:#f59e0b;word-break:break-all;font-size:12px;">${verifyUrl}</a></p>
      <p style="color:#ef4444;font-size:12px;margin:0;">⚠ This link expires in <strong>24 hours</strong>.</p>
    </div>
  `, 'One click to verify and claim your \$100 welcome bonus.')
  void appUrl
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

// ─────────────────────────────────────────────
//  Follow-up deposit nudge — sent via cron to verified
//  users who still have zero deposits after 3+ days
// ─────────────────────────────────────────────
export function getDepositFollowUpEmailTemplate(firstName: string, unsubscribeUrl: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const year   = new Date().getFullYear()

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Still thinking it over, ${firstName}?</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f1e;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- HEADER -->
  <tr><td style="background:linear-gradient(135deg,#0f1a2e 0%,#1a2d4a 50%,#0f1a2e 100%);border-radius:16px 16px 0 0;padding:40px 48px 36px;text-align:center;">
    <a href="${appUrl}" style="text-decoration:none;">
      <div style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);border-radius:12px;padding:10px 22px;margin-bottom:24px;">
        <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:2px;">STAKE<span style="color:#a8f0e0;">ONIX</span></span>
      </div>
    </a>
    <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 10px;letter-spacing:-0.5px;line-height:1.3;">
      Still thinking it over,&nbsp;<span style="color:#f59e0b;">${firstName}?</span>
    </h1>
    <p style="color:#94a3b8;font-size:15px;margin:0;line-height:1.6;">
      Your account is ready. Your $100 bonus is waiting.<br/>Every day without a deposit is a day your money isn&rsquo;t working for you.
    </p>
  </td></tr>

  <!-- PERSONAL NOTE -->
  <tr><td style="background:#0d1520;padding:36px 48px 0;">
    <p style="color:#d1d5db;font-size:15px;line-height:1.8;margin:0 0 24px;">
      Hi <strong style="color:#ffffff;">${firstName}</strong>,
    </p>
    <p style="color:#9ca3af;font-size:15px;line-height:1.8;margin:0 0 20px;">
      We noticed you created your StakeOnix account but haven&rsquo;t made your first deposit yet.
      We completely understand — starting something new takes confidence.
    </p>
    <p style="color:#9ca3af;font-size:15px;line-height:1.8;margin:0 0 32px;">
      So here are three things we want you to know:
    </p>

    <!-- 3 reassurance points -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr><td style="background:#111827;border:1px solid #1f2937;border-left:3px solid #00d4aa;border-radius:8px;padding:16px 20px;margin-bottom:12px;">
        <p style="color:#00d4aa;font-size:13px;font-weight:700;margin:0 0 4px;">&#10003;&nbsp; You can start with as little as $100</p>
        <p style="color:#6b7280;font-size:13px;margin:0;line-height:1.6;">No need for large amounts. Even a small stake earns daily — $100 at 2%/day = $2 every single day, $60/month.</p>
      </td></tr>
      <tr><td style="height:8px;"></td></tr>
      <tr><td style="background:#111827;border:1px solid #1f2937;border-left:3px solid #f59e0b;border-radius:8px;padding:16px 20px;">
        <p style="color:#f59e0b;font-size:13px;font-weight:700;margin:0 0 4px;">&#10003;&nbsp; Your $100 welcome bonus is still reserved for you</p>
        <p style="color:#6b7280;font-size:13px;margin:0;line-height:1.6;">Make your first deposit and we&rsquo;ll add $100 straight to your account balance — instantly, no strings attached.</p>
      </td></tr>
      <tr><td style="height:8px;"></td></tr>
      <tr><td style="background:#111827;border:1px solid #1f2937;border-left:3px solid #a78bfa;border-radius:8px;padding:16px 20px;">
        <p style="color:#a78bfa;font-size:13px;font-weight:700;margin:0 0 4px;">&#10003;&nbsp; Your funds are fully protected</p>
        <p style="color:#6b7280;font-size:13px;margin:0;line-height:1.6;">256-bit SSL, cold wallet storage, daily audits. Over 87,000 investors trust StakeOnix with their crypto — and we&rsquo;ve never missed a payout.</p>
      </td></tr>
    </table>

    <!-- What others are earning today -->
    <p style="color:#6b7280;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 14px;">What members are earning right now</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:16px;text-align:center;width:30%;vertical-align:top;">
          <p style="color:#00d4aa;font-size:22px;font-weight:800;margin:0 0 2px;">$6</p>
          <p style="color:#4b5563;font-size:11px;margin:0 0 6px;">per day</p>
          <p style="color:#374151;font-size:11px;margin:0;line-height:1.4;">Starter<br/>$300 deposit</p>
        </td>
        <td style="width:6px;"></td>
        <td style="background:linear-gradient(135deg,#0d1e36,#0f2a4a);border:1px solid #1e4060;border-radius:10px;padding:16px;text-align:center;width:36%;vertical-align:top;">
          <div style="background:#164e6b;display:inline-block;border-radius:4px;padding:2px 8px;margin-bottom:8px;">
            <span style="color:#38bdf8;font-size:10px;font-weight:700;">MOST POPULAR</span>
          </div>
          <p style="color:#38bdf8;font-size:22px;font-weight:800;margin:0 0 2px;">$40</p>
          <p style="color:#4b5563;font-size:11px;margin:0 0 6px;">per day</p>
          <p style="color:#374151;font-size:11px;margin:0;line-height:1.4;">Growth<br/>$2,000 deposit</p>
        </td>
        <td style="width:6px;"></td>
        <td style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:16px;text-align:center;width:30%;vertical-align:top;">
          <p style="color:#a78bfa;font-size:22px;font-weight:800;margin:0 0 2px;">$175</p>
          <p style="color:#4b5563;font-size:11px;margin:0 0 6px;">per day</p>
          <p style="color:#374151;font-size:11px;margin:0;line-height:1.4;">Elite<br/>$5,000 deposit</p>
        </td>
      </tr>
    </table>

    <!-- Testimonial -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr><td style="background:#0d1117;border:1px solid #1f2937;border-radius:12px;padding:24px;">
        <p style="color:#e5e7eb;font-size:14px;font-style:italic;line-height:1.7;margin:0 0 16px;">
          &ldquo;I was hesitant at first. I deposited a small amount just to test. Within 24 hours I saw my first daily payment. I&rsquo;ve been here for 6 months and never looked back.&rdquo;
        </p>
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:middle;padding-right:10px;">
            <div style="width:36px;height:36px;background:linear-gradient(135deg,#00d4aa,#00b4d8);border-radius:50%;line-height:36px;text-align:center;">
              <span style="color:#ffffff;font-size:14px;font-weight:700;">M</span>
            </div>
          </td>
          <td style="vertical-align:middle;">
            <p style="color:#e5e7eb;font-size:13px;font-weight:600;margin:0;">Marcus T.</p>
            <p style="color:#4b5563;font-size:12px;margin:0;">StakeOnix member since 2024 &middot; Growth Plan</p>
          </td>
        </tr></table>
      </td></tr>
    </table>

    <!-- CTA -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
      <tr><td style="background:linear-gradient(135deg,#0a2a1a,#0f3d2e);border:1px solid #00d4aa33;border-radius:14px;padding:32px;text-align:center;">
        <p style="color:#00d4aa;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px;">Your $100 bonus is still available</p>
        <h2 style="color:#ffffff;font-size:20px;font-weight:800;margin:0 0 12px;line-height:1.3;">Make your first deposit today<br/>and start earning tomorrow</h2>
        <p style="color:#6b7280;font-size:13px;margin:0 0 24px;line-height:1.6;">
          Takes under 3 minutes &middot; BTC, ETH, USDT &amp; more accepted
        </p>
        <a href="${appUrl}/deposit"
           style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);color:#ffffff;font-size:16px;font-weight:800;text-decoration:none;padding:16px 52px;border-radius:12px;letter-spacing:0.3px;">
          Claim My $100 Bonus &rarr;
        </a>
        <p style="color:#374151;font-size:12px;margin:16px 0 0;">
          Questions? Reply to this email or <a href="${appUrl}/contact" style="color:#6b7280;text-decoration:none;">contact our support team</a>.
        </p>
      </td></tr>
    </table>

    <!-- Divider -->
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top:1px solid #1f2937;padding-top:24px;"></td></tr></table>
    <p style="color:#4b5563;font-size:12px;margin:16px 0 0;line-height:1.6;">
      You are receiving this because you have a StakeOnix account and haven&rsquo;t made your first deposit yet.<br/>
      <a href="${unsubscribeUrl}" style="color:#7c3aed;text-decoration:underline;">Unsubscribe from follow-up emails</a>
    </p>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#0d131f;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;border-top:1px solid #1f2937;">
    <p style="color:#4b5563;font-size:12px;margin:0 0 6px;">
      &copy; ${year} StakeOnix &mdash; Operated by ONIX HOLDINGS LIMITED &mdash; Company No. 03449482
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

export async function sendDepositFollowUpEmail(email: string, name: string): Promise<void> {
  const appUrl    = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const firstName = name.includes('@') ? name.split('@')[0] : name.split(' ')[0]
  const unsubUrl  = `${appUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&type=activation`
  await sendEmail({
    to: email,
    subject: `${firstName}, your $100 bonus is still waiting for you`,
    html: getDepositFollowUpEmailTemplate(firstName, unsubUrl),
  })
}

// ─────────────────────────────────────────────
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
  const adminEmail = process.env.ADMIN_EMAIL || 'info@stakeonix.com'
  const appUrl     = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const refId      = Date.now().toString(36).toUpperCase()

  const userHtml = layout(`
    <div class="card-header">
      <div class="icon-circle icon-blue">💬</div>
      <div class="card-title">We Got Your Message</div>
      <div class="card-subtitle">Our team will respond within 24 hours</div>
    </div>
    <div class="card-body">
      <p class="greeting">Hi <strong>${name}</strong>,</p>
      <p class="body-text">Thanks for reaching out to StakeOnix. We have received your message and our support team will get back to you shortly — typically within a few hours.</p>
      <div class="highlight-box">
        <div class="stat-row"><span class="stat-label">Subject</span><span class="stat-value">${subject}</span></div>
        <div class="stat-row"><span class="stat-label">Reference</span><span class="stat-value tag">#${refId}</span></div>
        <div class="stat-row"><span class="stat-label">Response time</span><span class="stat-value">Within 24 hours</span></div>
      </div>
      <p class="body-text">Your message:</p>
      <div class="message-bubble">&ldquo;${message}&rdquo;</div>
      <div class="divider"></div>
      <p class="body-text">Need urgent help? Our live chat is available 24/7 inside your dashboard.</p>
      <a href="${appUrl}/dashboard" class="cta-btn cta-btn-blue">Go to Dashboard</a>
    </div>
  `, 'We received your message and will reply within 24 hours.')

  const adminHtml = layout(`
    <div class="card-header">
      <div class="icon-circle icon-blue">📩</div>
      <div class="card-title">New Contact Form Submission</div>
      <div class="card-subtitle">Requires a reply — Ref #${refId}</div>
    </div>
    <div class="card-body">
      <div class="highlight-box">
        <div class="stat-row"><span class="stat-label">Name</span><span class="stat-value">${name}</span></div>
        <div class="stat-row"><span class="stat-label">Email</span><span class="stat-value">${email}</span></div>
        <div class="stat-row"><span class="stat-label">Subject</span><span class="stat-value">${subject}</span></div>
      </div>
      <p class="body-text">Message:</p>
      <div class="message-bubble">${message}</div>
      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="cta-btn cta-btn-blue">Reply to ${name}</a>
    </div>
  `)

  await Promise.all([
    sendEmail({ to: email, subject: `We received your message at StakeOnix`, html: userHtml }),
    sendEmail({ to: adminEmail, subject: `[Contact] ${subject} — from ${name}`, html: adminHtml }),
  ])
}

/** @deprecated Use sendWithdrawalEmail instead */
export function getWithdrawalStatusEmailTemplate(
  name: string,
  amount: string,
  currency: string,
  status: 'approved' | 'rejected',
  reason?: string
): string {
  return layout(`
    <div class="card-header">
      <div class="icon-circle ${status === 'approved' ? 'icon-green' : 'icon-red'}">${status === 'approved' ? '✅' : '❌'}</div>
      <div class="card-title">Withdrawal ${status === 'approved' ? 'Approved' : 'Rejected'}</div>
      <div class="card-subtitle">${status === 'approved' ? 'Your funds are on the way' : 'Your funds have been returned to your balance'}</div>
    </div>
    <div class="card-body">
      <p class="greeting">Hi <strong>${name}</strong>,</p>
      <p class="body-text">Your withdrawal of <strong style="color:#e2e8f0;">${amount} ${currency}</strong> has been <strong style="color:${status === 'approved' ? '#10b981' : '#ef4444'}">${status}</strong>.</p>
      ${reason ? `<div class="highlight-box highlight-box-red"><p style="color:#fca5a5;font-size:13px;font-weight:600;margin:0 0 4px;">Reason</p><p style="color:#f87171;font-size:14px;margin:0;">${reason}</p></div>` : ''}
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'}/withdraw" class="cta-btn ${status === 'approved' ? 'cta-btn-green' : ''}">View Withdrawal History</a>
    </div>
  `, `Your ${amount} ${currency} withdrawal has been ${status}.`)
}

// ─────────────────────────────────────────────
//  Withdrawal processed email
// ─────────────────────────────────────────────
export async function sendWithdrawalEmail({
  name, email, amount, currency, walletAddress, txHash, estimatedArrival,
}: {
  name: string; email: string; amount: number; currency: string
  walletAddress: string; txHash?: string | null; estimatedArrival?: string
}): Promise<void> {
  const appUrl      = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const shortWallet = `${walletAddress.slice(0, 10)}...${walletAddress.slice(-6)}`
  const html = layout(`
    <div class="card-header">
      <div class="icon-circle icon-purple">🚀</div>
      <div class="card-title">Withdrawal Sent</div>
      <div class="card-subtitle">Your funds are on their way</div>
    </div>
    <div class="card-body">
      <p class="greeting">Hi <strong>${name}</strong>,</p>
      <p class="body-text">Your withdrawal has been processed and broadcast to the network. Funds should arrive in your wallet within the estimated time below.</p>
      <div class="amount-display">
        <span class="amount-large" style="color:#a78bfa;">${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        <span class="amount-currency">${currency}</span>
      </div>
      <div class="highlight-box">
        <div class="stat-row"><span class="stat-label">To Wallet</span><span class="stat-value" style="font-family:monospace;font-size:13px;">${shortWallet}</span></div>
        ${txHash ? `<div class="stat-row"><span class="stat-label">Tx Hash</span><span class="stat-value" style="font-family:monospace;font-size:12px;color:#60a5fa;">${txHash.slice(0, 10)}...${txHash.slice(-8)}</span></div>` : ''}
        <div class="stat-row"><span class="stat-label">Est. Arrival</span><span class="stat-value">${estimatedArrival ?? '1–24 hours'}</span></div>
        <div class="stat-row"><span class="stat-label">Status</span><span class="stat-value"><span class="badge badge-blue">Broadcasting</span></span></div>
      </div>
      <a href="${appUrl}/withdraw" class="cta-btn" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:#fff;">View Transaction History</a>
      <div class="security-note">
        <strong>🔒 Not you?</strong> Contact us immediately at <a href="mailto:info@stakeonix.com" style="color:#60a5fa;">info@stakeonix.com</a> — transactions cannot be reversed once confirmed on-chain.
      </div>
    </div>
  `, `Your ${amount} ${currency} withdrawal is on its way.`)
  await sendEmail({
    to: email,
    subject: `Withdrawal Sent 🚀 — ${amount} ${currency} is on its way`,
    html,
  })
}

// ─────────────────────────────────────────────
//  KYC status email
// ─────────────────────────────────────────────
export async function sendKycStatusEmail({
  name, email, status, rejectionReason,
}: {
  name: string; email: string
  status: 'approved' | 'rejected' | 'pending_review'
  rejectionReason?: string
}): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const cfg = {
    approved:       { icon: '✅', iconClass: 'icon-green',  title: 'Identity Verified',      subtitle: 'Your account is fully unlocked'   },
    rejected:       { icon: '❌', iconClass: 'icon-red',    title: 'Verification Incomplete', subtitle: 'Action required to continue'      },
    pending_review: { icon: '🔍', iconClass: 'icon-blue',   title: 'Under Review',            subtitle: 'We are verifying your documents'  },
  }[status]
  const subjects: Record<typeof status, string> = {
    approved:       'Identity Verified ✅ — Full account access unlocked',
    rejected:       'Action Required: KYC verification needs attention',
    pending_review: 'KYC Under Review 🔍 — We will notify you within 1–3 days',
  }
  const html = layout(`
    <div class="card-header">
      <div class="icon-circle ${cfg.iconClass}">${cfg.icon}</div>
      <div class="card-title">${cfg.title}</div>
      <div class="card-subtitle">${cfg.subtitle}</div>
    </div>
    <div class="card-body">
      <p class="greeting">Hi <strong>${name}</strong>,</p>
      ${status === 'approved' ? `
        <p class="body-text">Congratulations! Your identity has been successfully verified. Your account now has <strong style="color:#10b981;">full access</strong>, including higher deposit limits, instant withdrawals, and all premium staking plans.</p>
        <div class="highlight-box highlight-box-green">
          <div class="stat-row"><span class="stat-label">Deposits</span><span class="stat-value"><span class="badge badge-green">Unlimited</span></span></div>
          <div class="stat-row"><span class="stat-label">Withdrawals</span><span class="stat-value"><span class="badge badge-green">Instant</span></span></div>
          <div class="stat-row"><span class="stat-label">Premium Plans</span><span class="stat-value"><span class="badge badge-green">Unlocked</span></span></div>
        </div>
        <a href="${appUrl}/plans" class="cta-btn cta-btn-green">Explore All Plans</a>
      ` : status === 'pending_review' ? `
        <p class="body-text">We have received your documents and our compliance team is reviewing them. This usually takes <strong style="color:#60a5fa;">1–3 business days</strong>. You will receive an email as soon as the review is complete.</p>
        <div class="highlight-box">
          <div class="stat-row"><span class="stat-label">Status</span><span class="stat-value"><span class="badge badge-blue">In Review</span></span></div>
          <div class="stat-row"><span class="stat-label">Est. Time</span><span class="stat-value">1–3 Business Days</span></div>
        </div>
        <a href="${appUrl}/dashboard" class="cta-btn cta-btn-blue">View Account Status</a>
      ` : `
        <p class="body-text">Unfortunately, we were unable to verify your identity with the documents provided. Please resubmit with the corrections noted below.</p>
        ${rejectionReason ? `<div class="highlight-box highlight-box-red"><p style="color:#fca5a5;font-size:13px;font-weight:600;margin:0 0 4px;">Reason</p><p style="color:#f87171;font-size:14px;margin:0;">${rejectionReason}</p></div>` : ''}
        <div class="steps">
          <div class="step"><span class="step-num">1</span><div class="step-text"><strong>Check your document</strong> — valid, not expired, all four corners visible.</div></div>
          <div class="step"><span class="step-num">2</span><div class="step-text"><strong>Re-upload high-quality images</strong> — avoid glare, blur, or cropping.</div></div>
          <div class="step"><span class="step-num">3</span><div class="step-text"><strong>Contact support</strong> if you need help — live chat is available 24/7.</div></div>
        </div>
        <a href="${appUrl}/settings" class="cta-btn">Resubmit Documents</a>
      `}
    </div>
  `, status === 'approved' ? 'Your identity is verified — full access is now unlocked.' : 'Update on your KYC verification status.')
  await sendEmail({ to: email, subject: subjects[status], html })
}

// ─────────────────────────────────────────────
//  Daily reward payout email
// ─────────────────────────────────────────────
export async function sendDailyRewardEmail({
  name, email, rewardAmount, currency, totalEarned, planName, daysRemaining, nextPayout,
}: {
  name: string; email: string; rewardAmount: number; currency: string
  totalEarned: number; planName: string; daysRemaining: number; nextPayout: string
}): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.stakeonix.com'
  const today  = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const html   = layout(`
    <div class="card-header">
      <div class="icon-circle icon-gold">⚡</div>
      <div class="card-title">Daily Reward Paid</div>
      <div class="card-subtitle">${today}</div>
    </div>
    <div class="card-body">
      <p class="greeting">Hi <strong>${name}</strong>,</p>
      <p class="body-text">Your daily staking reward has just been credited to your account. Keep compounding and watch your balance grow!</p>
      <div class="amount-display">
        <span class="amount-large" style="color:#f59e0b;">+${rewardAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        <span class="amount-currency">${currency}</span>
      </div>
      <div class="info-grid">
        <div class="info-cell"><div class="info-cell-label">Plan</div><div class="info-cell-value" style="font-size:14px;">${planName}</div></div>
        <div class="info-cell"><div class="info-cell-label">Days Left</div><div class="info-cell-value">${daysRemaining}</div></div>
        <div class="info-cell"><div class="info-cell-label">Total Earned</div><div class="info-cell-value" style="color:#10b981;font-size:16px;">${totalEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
        <div class="info-cell"><div class="info-cell-label">Next Payout</div><div class="info-cell-value" style="color:#f59e0b;font-size:14px;">${nextPayout}</div></div>
      </div>
      <div class="highlight-box highlight-box-gold" style="text-align:center;">
        <p style="font-size:12px;color:#92400e;text-transform:uppercase;letter-spacing:0.8px;margin:0 0 4px;">Auto-Compounding Active</p>
        <p style="font-size:13px;color:#d97706;line-height:1.6;margin:0;">Your rewards are automatically reinvested, maximising returns every single day.</p>
      </div>
      <a href="${appUrl}/dashboard" class="cta-btn">View My Portfolio</a>
    </div>
  `, `+${rewardAmount.toFixed(2)} ${currency} just landed in your StakeOnix account.`)
  await sendEmail({
    to: email,
    subject: `⚡ +${rewardAmount.toFixed(2)} ${currency} reward credited to your account`,
    html,
  })
}
