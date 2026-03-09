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

type BotState = 'ASKED_CATEGORY' | 'ASKED_DETAIL' | 'AWAITING_FEEDBACK' | 'ESCALATED'
interface BotMeta { state: BotState; topic?: string }
interface TopicAnswer { keywords: RegExp; reply: string }
interface Topic { id: string; keywords: RegExp; followUp: string; answers: TopicAnswer[]; defaultAnswer: string }

const TOPICS: Topic[] = [
  {
    id: 'deposit',
    keywords: /\b(deposit|fund|add money|top.?up|payment|recharge|credit my account)\b/i,
    followUp: 'Got it - deposits!\n\n**Are you trying to make a new deposit, or is there an issue with an existing deposit (not showing in your account)?**',
    answers: [
      {
        keywords: /new|make|how|start|add|want to|can i|method/i,
        reply: 'To make a deposit:\n\n1. Go to **Dashboard → Deposit**\n2. Select your cryptocurrency\n3. Copy the wallet address and send the exact amount\n4. Balance updates after network confirmations (usually within 30 min)\n\n> Always double-check the address before sending.\n\n---\n**Did that answer your question?** Reply **yes** if you are all set, or **no** to be connected with a human agent.',
      },
      {
        keywords: /pending|missing|not showing|not received|not credited|confirm|stuck|delay|track/i,
        reply: 'If your deposit is not showing:\n\n- Allow up to **2 hours** for network confirmations\n- Verify you sent to the correct address and network\n- Check the TX on a blockchain explorer using your TX hash\n\nIf it has been over 2 hours and the TX is confirmed on-chain, please reply **no** and share your TX hash — a human agent will investigate.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
    ],
    defaultAnswer: 'For deposits, go to **Dashboard → Deposit**. Confirmations can take up to 2 hours.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
  },
  {
    id: 'withdrawal',
    keywords: /\b(withdraw|withdrawal|cash out|payout|send funds?|take out|get my money)\b/i,
    followUp: 'Got it - withdrawals!\n\n**Are you trying to make a withdrawal, or is there an issue with a pending or missing withdrawal?**',
    answers: [
      {
        keywords: /new|make|how|start|want to|can i|request/i,
        reply: 'To withdraw:\n\n1. Go to **Dashboard → Withdraw**\n2. Select your cryptocurrency\n3. Enter your wallet address and amount\n4. Confirm - withdrawals are usually processed within **24 hours**\n\n> KYC verification may be required for larger amounts.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
      {
        keywords: /pending|not received|stuck|delay|processing|status|rejected|failed|waiting/i,
        reply: 'For a pending or missing withdrawal:\n\n- Normal processing time is **up to 24 hours**\n- Check the status at **Dashboard → History**\n- If status shows Failed or Rejected, funds are returned to your balance\n\nIf it has been over 24 hours and still pending, please reply **no** - a human agent needs to investigate.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
    ],
    defaultAnswer: 'Withdrawals are made through **Dashboard → Withdraw** and processed within 24 hours. Check **Dashboard → History** for status.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
  },
  {
    id: 'kyc',
    keywords: /\b(kyc|verify|verification|identity|passport|document|id card|id check)\b/i,
    followUp: 'Got it - KYC verification!\n\n**Are you submitting your documents for the first time, or do you have a question about a pending or rejected submission?**',
    answers: [
      {
        keywords: /submit|upload|how|start|first time|new|what do i need/i,
        reply: 'To complete KYC:\n\n1. Government-issued ID (passport, national ID, or drivers license)\n2. A selfie holding your ID\n3. Utility bill (optional, for address verification)\n\nGo to **Dashboard → Settings → KYC** to upload.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
      {
        keywords: /waiting|pending|approved|status|how long|rejected|failed|declined/i,
        reply: 'KYC reviews take **1-2 business days**.\n\n- Approved: you will receive a confirmation email\n- Rejected: email with reason; resubmit at **Dashboard → Settings → KYC**\n- Still pending after 3+ days? Reply **no** and an agent will check.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
    ],
    defaultAnswer: 'Go to **Dashboard → Settings → KYC** to submit documents. Reviews take 1-2 business days.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
  },
  {
    id: 'staking',
    keywords: /\b(stake|staking|invest|plan|plans|return|profit|earn|yield|apy|apr|interest|investment)\b/i,
    followUp: 'Got it - staking!\n\n**Are you looking to start a new investment, or do you have a question about an existing staking position?**',
    answers: [
      {
        keywords: /new|start|begin|how|choose|pick|which|best|want to/i,
        reply: 'To start staking:\n\n1. Go to **Dashboard → Plans**\n2. Browse plans - each shows APY, duration, and minimum\n3. Click **Invest Now** on your chosen plan\n4. Enter your amount and confirm\n\nMonitor active positions under **Dashboard → Orders**.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
      {
        keywords: /existing|current|active|cancel|early|profit|returns|when|not received|matured/i,
        reply: 'For active stakes:\n\n- View all positions at **Dashboard → Orders**\n- Returns update in real-time\n- Funds and returns are credited automatically at maturity\n- Early cancellation may incur a fee\n\nIf returns have not credited after the maturity date, reply **no** and an agent will investigate.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
    ],
    defaultAnswer: 'Browse plans at **Dashboard → Plans** and track active positions at **Dashboard → Orders**.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
  },
  {
    id: 'account',
    keywords: /\b(password|forgot|reset|login|sign.?in|account|locked|access|2fa|profile|username)\b/i,
    followUp: 'Got it - account issues!\n\n**Are you having trouble logging in or resetting your password, or do you need to update your profile details?**',
    answers: [
      {
        keywords: /log.?in|sign.?in|password|forgot|reset|locked|can.?t access|lost/i,
        reply: 'To reset your password:\n\n1. Click **Forgot Password?** on the login page\n2. Enter your registered email\n3. Open the reset link in the email (check spam too)\n4. Set your new password\n\nIf you no longer have access to your registered email, reply **no** - an agent will verify your identity manually.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
      {
        keywords: /change|update|email|profile|name|settings|edit/i,
        reply: 'To update your profile, go to **Dashboard → Settings → Profile**.\n\nTo change your registered email address, please reply **no** - this requires identity verification by a support agent.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
    ],
    defaultAnswer: 'For login issues use **Forgot Password?** on the login page. For profile changes go to **Dashboard → Settings**.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
  },
  {
    id: 'referral',
    keywords: /\b(referral|refer|affiliate|invite|bonus|commission|referral link)\b/i,
    followUp: 'Got it - referrals!\n\n**Are you looking for your referral link, or do you have a question about earned commissions?**',
    answers: [
      {
        keywords: /link|find|where|get|my|share/i,
        reply: 'Your referral link is at **Dashboard → Referrals**.\n\n- Share it with anyone\n- You earn a commission when they register and deposit\n- No limit on referrals\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
      {
        keywords: /commission|earning|pending|not received|paid|rate|when|credited/i,
        reply: 'Commissions are credited when your referred user makes their first deposit. View all earnings at **Dashboard → Referrals**. They may take up to 24 hours to appear.\n\nIf a commission is missing, reply **no** and share the referred users email - an agent will investigate.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
      },
    ],
    defaultAnswer: 'Find your link and earnings at **Dashboard → Referrals**.\n\n---\n**Did that answer your question?** Reply **yes** or **no**.',
  },
]

const CATEGORY_MENU = `Hi! I am your support assistant. I will ask a couple of quick questions to find the best answer for you.

**What can I help you with today?**

1 - Deposit - Making or tracking a deposit
2 - Withdrawal - Withdrawing funds or checking status
3 - KYC / Verification - Identity verification
4 - Staking / Plans - Investment plans and earnings
5 - Account / Login - Access or profile issues
6 - Referrals - Referral links and commissions
7 - Other - Connect me to a human agent

Type a number or describe your issue in your own words.`

const ESCALATION_MESSAGE = `I am sorry I could not fully resolve this.

I have **notified a human support agent** who will review your conversation and reply as soon as possible - usually within a few hours.

Feel free to add any extra details here and the agent will see everything.`

const ESCALATED_FOLLOWUP = `Your request has already been sent to a live agent. They will respond shortly. Feel free to add more details in the meantime.`

const RESOLVED_MESSAGE = `Great, glad I could help! If you ever need anything else, do not hesitate to reach out.`

const RETRY_CATEGORY = `I did not quite catch that. Please type a number **1-7** from the menu, or describe your issue in a few words.`

const RETRY_FEEDBACK = `Just to confirm - did that answer help? Please reply **yes** if you are all set, or **no** to be connected with a human agent.`

function detectTopic(text: string): Topic | null {
  const num = text.trim().match(/^[1-7]/)
  if (num) {
    const map: Record<string, string> = { '1': 'deposit', '2': 'withdrawal', '3': 'kyc', '4': 'staking', '5': 'account', '6': 'referral' }
    const id = map[num[0]]
    return id ? (TOPICS.find((t) => t.id === id) ?? null) : null
  }
  for (const topic of TOPICS) {
    if (topic.keywords.test(text)) return topic
  }
  return null
}

function isPositive(text: string) {
  return /\b(yes|yep|yeah|yup|sure|correct|solved|fixed|great|thanks|thank you|perfect|ok|okay|done|got it|helpful|helped|resolved|awesome|worked)\b/i.test(text)
}

function isNegative(text: string) {
  return /\b(no|nope|not really|still|not solved|not helpful|not working|need more|need help|agent|human|person|staff|connect me|talk to someone|real person)\b/i.test(text)
}

async function sendBotMessage(userId: string, content: string, meta: BotMeta) {
  return prisma.chatMessage.create({
    data: { userId, content, isStaff: true, isBot: true, isRead: false, botMeta: JSON.stringify(meta) },
  })
}

async function escalateToHuman(userId: string) {
  await prisma.notification.create({
    data: {
      userId,
      type: 'SYSTEM',
      title: 'Chat: customer needs a human agent',
      message: 'The bot could not resolve this issue. Please review the chat and respond.',
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth()
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Message or image required.' }, { status: 400 })

    const userMsg = await prisma.chatMessage.create({
      data: { userId: session.user.id, content: parsed.data.content, isStaff: false, imageUrl: parsed.data.imageUrl ?? null, isRead: false },
    })

    if (!parsed.data.content.trim()) return NextResponse.json({ data: userMsg }, { status: 201 })

    // If a real human staff member has already replied, stay out of the way
    const humanStaffReply = await prisma.chatMessage.findFirst({
      where: { userId: session.user.id, isStaff: true, isBot: false },
    })
    if (humanStaffReply) return NextResponse.json({ data: userMsg }, { status: 201 })

    const lastBotMsg = await prisma.chatMessage.findFirst({
      where: { userId: session.user.id, isStaff: true, isBot: true, botMeta: { not: null } },
      orderBy: { createdAt: 'desc' },
    })
    const meta: BotMeta | null = lastBotMsg?.botMeta ? (JSON.parse(lastBotMsg.botMeta) as BotMeta) : null
    const userText = parsed.data.content.trim()

    // 1. No prior bot state - show menu or jump straight to follow-up
    if (!meta) {
      const topic = detectTopic(userText)
      if (topic) {
        await sendBotMessage(session.user.id, topic.followUp, { state: 'ASKED_DETAIL', topic: topic.id })
      } else {
        await sendBotMessage(session.user.id, CATEGORY_MENU, { state: 'ASKED_CATEGORY' })
      }
      return NextResponse.json({ data: userMsg }, { status: 201 })
    }

    // 2. Already escalated
    if (meta.state === 'ESCALATED') {
      await sendBotMessage(session.user.id, ESCALATED_FOLLOWUP, { state: 'ESCALATED' })
      return NextResponse.json({ data: userMsg }, { status: 201 })
    }

    // 3. Category menu shown - pick a topic
    if (meta.state === 'ASKED_CATEGORY') {
      if (/\b(7|other|else|something|different|none|agent|human|person|staff|connect)\b/i.test(userText)) {
        await sendBotMessage(session.user.id, ESCALATION_MESSAGE, { state: 'ESCALATED' })
        await escalateToHuman(session.user.id)
      } else {
        const topic = detectTopic(userText)
        if (topic) {
          await sendBotMessage(session.user.id, topic.followUp, { state: 'ASKED_DETAIL', topic: topic.id })
        } else {
          await sendBotMessage(session.user.id, RETRY_CATEGORY, { state: 'ASKED_CATEGORY' })
        }
      }
      return NextResponse.json({ data: userMsg }, { status: 201 })
    }

    // 4. Follow-up shown - give detailed answer
    if (meta.state === 'ASKED_DETAIL' && meta.topic) {
      const topic = TOPICS.find((t) => t.id === meta.topic)
      if (topic) {
        const matched = topic.answers.find((a) => a.keywords.test(userText))
        const reply = matched?.reply ?? topic.defaultAnswer
        await sendBotMessage(session.user.id, reply, { state: 'AWAITING_FEEDBACK', topic: topic.id })
      } else {
        await sendBotMessage(session.user.id, ESCALATION_MESSAGE, { state: 'ESCALATED' })
        await escalateToHuman(session.user.id)
      }
      return NextResponse.json({ data: userMsg }, { status: 201 })
    }

    // 5. Awaiting yes/no feedback
    if (meta.state === 'AWAITING_FEEDBACK') {
      if (isPositive(userText)) {
        await sendBotMessage(session.user.id, RESOLVED_MESSAGE, { state: 'ASKED_CATEGORY' })
      } else if (isNegative(userText)) {
        await sendBotMessage(session.user.id, ESCALATION_MESSAGE, { state: 'ESCALATED' })
        await escalateToHuman(session.user.id)
      } else {
        await sendBotMessage(session.user.id, RETRY_FEEDBACK, { state: 'AWAITING_FEEDBACK', topic: meta.topic })
      }
      return NextResponse.json({ data: userMsg }, { status: 201 })
    }

    return NextResponse.json({ data: userMsg }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}