import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  content: z.string().max(2000).optional().default(''),
  imageUrl: z.string().url().optional(),
}).refine((d) => d.content.trim().length > 0 || !!d.imageUrl, {
  message: 'Message or image required.',
})

// ─── Bot knowledge base ────────────────────────────────────────────────────────
interface BotRule {
  keywords: RegExp
  reply: string
}

const BOT_RULES: BotRule[] = [
  {
    keywords: /\b(deposit|fund|add money|top.?up|send money|payment method)\b/i,
    reply:
      'To make a deposit, go to **Dashboard → Deposit**, choose your preferred cryptocurrency, and follow the instructions. Deposits are credited after the required network confirmations. Need help? A human agent will be with you shortly.',
  },
  {
    keywords: /\b(withdraw|withdrawal|cash out|payout|send funds?)\b/i,
    reply:
      'To withdraw funds, go to **Dashboard → Withdraw**, enter your wallet address and amount, and submit. Withdrawals are typically processed within 24 hours. A support agent will follow up if there are any issues.',
  },
  {
    keywords: /\b(kyc|verify|verification|identity|id|passport|id check|document)\b/i,
    reply:
      'KYC (identity verification) is required for withdrawals above certain limits. Go to **Dashboard → Settings → KYC** and upload a valid government-issued ID. We review submissions within 1–2 business days.',
  },
  {
    keywords: /\b(stake|staking|invest|investment|plan|plans|return|profit|earn|yield|apy|apr|interest)\b/i,
    reply:
      'You can browse all available staking plans in **Dashboard → Plans**. Each plan shows the duration, minimum investment, and expected returns. Simply click "Invest Now" to get started.',
  },
  {
    keywords: /\b(referral|refer|affiliate|invite|bonus|commission)\b/i,
    reply:
      'Our referral programme lets you earn a commission for every user who signs up using your link. Check your referral link and earnings under **Dashboard → Referrals**.',
  },
  {
    keywords: /\b(password|forgot|reset|login|sign.?in|account access|locked out|cant log)\b/i,
    reply:
      'If you\'ve forgotten your password, click **"Forgot password?"** on the login page and follow the email instructions. If you still can\'t access your account, a support agent will help you shortly.',
  },
  {
    keywords: /\b(balance|wallet|funds?|money|how much)\b/i,
    reply:
      'Your current balance is shown at the top of your **Dashboard**. All transactions are also listed under **Dashboard → History**.',
  },
  {
    keywords: /\b(fee|fees|cost|charge|commission|spread)\b/i,
    reply:
      'Fees vary by plan and transaction type. Deposit fees depend on the blockchain network. Withdrawal fees are shown before you confirm. Check the **FAQ** page for a full breakdown.',
  },
  {
    keywords: /\b(hello|hi|hey|good (morning|afternoon|evening)|how are you|sup)\b/i,
    reply:
      'Hello! 👋 How can I help you today? You can ask me about deposits, withdrawals, staking plans, KYC, referrals, or anything else. A human agent is also available if you need more help.',
  },
]

const WELCOME_REPLY =
  "👋 Welcome to Support! I'm your automated assistant. I can help with deposits, withdrawals, staking plans, KYC, referrals, and more. Just ask your question — a human agent will also review your message and respond shortly."

const FALLBACK_REPLY =
  "Thanks for your message! I've passed it on to our support team. A human agent will get back to you as soon as possible — usually within a few hours. ⏰"

function getBotReply(content: string): string | null {
  const text = content.trim()
  if (!text) return null
  for (const rule of BOT_RULES) {
    if (rule.keywords.test(text)) return rule.reply
  }
  return null
}
// ──────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth()
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Message or image required.' }, { status: 400 })
    }

    const msg = await prisma.chatMessage.create({
      data: {
        userId: session.user.id,
        content: parsed.data.content,
        isStaff: false,
        imageUrl: parsed.data.imageUrl ?? null,
        isRead: false,
      },
    })

    // ── Auto-bot reply (fire-and-forget, non-blocking) ──────────────────────
    const prevCount = await prisma.chatMessage.count({
      where: { userId: session.user.id, id: { not: msg.id } },
    })

    let botReply: string | null = null
    if (prevCount === 0) {
      // First message ever → welcome
      botReply = WELCOME_REPLY
    } else {
      // Only reply on text messages
      if (parsed.data.content.trim()) {
        botReply = getBotReply(parsed.data.content)
        // If no keyword matched but this might be a real question,
        // send fallback only if there's been no staff/bot reply in last 5 mins
        if (!botReply) {
          const recentStaff = await prisma.chatMessage.findFirst({
            where: {
              userId: session.user.id,
              isStaff: true,
              createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000) },
            },
          })
          if (!recentStaff) {
            botReply = FALLBACK_REPLY
          }
        }
      }
    }

    if (botReply) {
      await prisma.chatMessage.create({
        data: {
          userId: session.user.id,
          content: botReply,
          isStaff: true,
          isBot: true,
          isRead: false,
        },
      })
    }
    // ───────────────────────────────────────────────────────────────────────

    return NextResponse.json({ data: msg }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
