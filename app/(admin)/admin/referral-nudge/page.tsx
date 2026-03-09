'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Mail, Users, AlertTriangle, CheckCircle, Send } from 'lucide-react'

interface Result {
  ok: boolean
  totalReferrers: number
  sent: number
  failed: number
  errors: string[]
}

export default function ReferralNudgePage() {
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  const run = async () => {
    if (!confirm('Send referral nudge emails to all users with inactive referrals?\n\nThis will email every user whose referrals have not invested yet.')) return
    setRunning(true)
    setResult(null)
    try {
      const res = await fetch('/api/admin/referral-nudge', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setResult(data)
        toast.success(`Sent ${data.sent} nudge emails successfully.`)
      } else {
        toast.error(data.error || 'Failed to send nudge emails.')
      }
    } catch {
      toast.error('Something went wrong.')
    }
    setRunning(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Mail className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Referral Nudge Emails</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Automatically emails referrers whose invited friends haven&apos;t invested yet, reminding them to share again.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">How it works</CardTitle>
          <CardDescription>
            This sends a personalized email to every user who has at least one referral that signed up but never activated a staking plan. The email shows their unclaimed earning potential and includes a ready-to-share WhatsApp button.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg bg-secondary/40 border border-border p-3">
              <p className="text-xs text-muted-foreground mb-1">Target</p>
              <p className="font-semibold">Users with inactive referrals</p>
            </div>
            <div className="rounded-lg bg-secondary/40 border border-border p-3">
              <p className="text-xs text-muted-foreground mb-1">Auto-schedule</p>
              <p className="font-semibold">Every Monday at 10:00 UTC</p>
            </div>
            <div className="rounded-lg bg-secondary/40 border border-border p-3">
              <p className="text-xs text-muted-foreground mb-1">Email includes</p>
              <p className="font-semibold">Potential $ + share buttons</p>
            </div>
          </div>

          <Button onClick={run} disabled={running} className="w-full gap-2">
            <Send className="h-4 w-4" />
            {running ? 'Sending nudge emails...' : 'Send Referral Nudge Emails Now'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className={result.failed === 0 ? 'border-green-500/30' : 'border-yellow-500/30'}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {result.failed === 0
                ? <CheckCircle className="h-5 w-5 text-green-400" />
                : <AlertTriangle className="h-5 w-5 text-yellow-400" />}
              Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-secondary/40 p-3">
                <p className="text-2xl font-black">{result.totalReferrers}</p>
                <p className="text-xs text-muted-foreground">Referrers found</p>
              </div>
              <div className="rounded-lg bg-green-500/10 p-3">
                <p className="text-2xl font-black text-green-400">{result.sent}</p>
                <p className="text-xs text-muted-foreground">Emails sent</p>
              </div>
              <div className={`rounded-lg p-3 ${result.failed > 0 ? 'bg-red-500/10' : 'bg-secondary/40'}`}>
                <p className={`text-2xl font-black ${result.failed > 0 ? 'text-red-400' : ''}`}>{result.failed}</p>
                <p className="text-xs text-muted-foreground">Failed</p>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Errors:</p>
                {result.errors.map((e, i) => (
                  <p key={i} className="text-xs text-red-400 font-mono">{e}</p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
