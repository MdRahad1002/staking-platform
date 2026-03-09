'use client'

import { useState } from 'react'
import { MessageCircle, Twitter, Send, Copy, Check, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareButtonsProps {
  referralLink: string
  commissionRate: number | null
}

export default function ShareButtons({ referralLink, commissionRate }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const rate = commissionRate ?? 5
  const message = `I've been earning passive income on my crypto with StakeOnix. You get daily rewards automatically - no trading needed. Sign up with my link and we both benefit: ${referralLink}`
  const shortMessage = `Earn money daily on your crypto with StakeOnix - no trading needed. Join here: ${referralLink}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-4">
      {/* Large copy button */}
      <div className="flex gap-2">
        <div className="flex-1 min-w-0 rounded-lg bg-secondary/40 border border-border px-4 py-3 font-mono text-sm break-all select-all text-muted-foreground">
          {referralLink}
        </div>
        <Button
          onClick={copyLink}
          variant={copied ? 'default' : 'outline'}
          className={`shrink-0 gap-2 transition-all ${copied ? 'bg-green-600 hover:bg-green-700 border-green-600 text-white' : ''}`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>

      {/* Share via platforms */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Share via</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-sm font-medium transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(`Earn ${rate}% commission + daily passive income on crypto. No trading needed.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2AABEE]/10 hover:bg-[#2AABEE]/20 border border-[#2AABEE]/30 text-[#2AABEE] text-sm font-medium transition-colors"
          >
            <Send className="h-4 w-4" />
            Telegram
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shortMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 border border-border text-foreground text-sm font-medium transition-colors"
          >
            <Twitter className="h-4 w-4" />
            X / Twitter
          </a>
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={() => navigator.share?.({ title: 'Earn with StakeOnix', url: referralLink })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-medium transition-colors"
            >
              <Share2 className="h-4 w-4" />
              More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
