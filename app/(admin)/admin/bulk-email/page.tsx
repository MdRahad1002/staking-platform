'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  Mail, Send, Eye, Trash2, Users, CheckCircle2, XCircle,
  Clock, BarChart3, TestTube2, RefreshCw, FileText,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Campaign {
  id: string
  subject: string
  content: string
  target: string
  sentCount: number
  failedCount: number
  status: string
  sentAt: string | null
  createdAt: string
}

// ─── Email templates ──────────────────────────────────────────────────────────
const APP_URL = typeof window !== 'undefined' ? window.location.origin : 'https://www.stakeonix.com'

const TEMPLATES = [
  {
    id: 'announcement',
    label: '📢 Announcement',
    subject: '📢 Important Announcement from StakeOnix',
    body: `<p>We have an important update to share with you.</p>
<p>[Add your announcement text here]</p>
<p>Thank you for being a valued member of StakeOnix.</p>
<p>Best regards,<br/><strong>The StakeOnix Team</strong></p>`,
  },
  {
    id: 'promo',
    label: '🎉 Promotion',
    subject: '🎉 Exclusive Offer - Earn More with StakeOnix',
    body: `<p>We have an exciting offer just for you!</p>
<p>[Describe the promotion or limited-time offer]</p>
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 0;">
  <a href="${APP_URL}/plan" style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:10px;">View Plans →</a>
</td></tr></table>
<p>Don't miss out - this offer is for a limited time only.</p>
<p>Best regards,<br/><strong>The StakeOnix Team</strong></p>`,
  },
  {
    id: 'maintenance',
    label: '🔧 Maintenance',
    subject: '🔧 Scheduled Maintenance Notice - StakeOnix',
    body: `<p>We will be performing scheduled maintenance on our platform.</p>
<p><strong>Date &amp; Time:</strong> [Insert date and time]<br/>
<strong>Duration:</strong> Approximately [X] hours<br/>
<strong>Affected services:</strong> [List affected services]</p>
<p>During this time, deposits and withdrawals may be temporarily unavailable. Your funds remain completely safe.</p>
<p>We apologize for any inconvenience and appreciate your patience.</p>
<p>Best regards,<br/><strong>The StakeOnix Team</strong></p>`,
  },
  {
    id: 'newsletter',
    label: '📊 Newsletter',
    subject: '📊 StakeOnix Monthly Update',
    body: `<h2 style="color:#00d4aa;margin:0 0 16px;">This Month at StakeOnix</h2>
<p><strong>Platform highlights:</strong></p>
<ul style="padding-left:20px;line-height:2;">
  <li>New staking plans available</li>
  <li>Improved withdrawal processing times</li>
  <li>Enhanced security features</li>
</ul>
<p><strong>Crypto market insights:</strong></p>
<p>[Add market commentary or insights here]</p>
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 0;">
  <a href="${APP_URL}/dashboard" style="display:inline-block;background:linear-gradient(135deg,#00d4aa,#00b4d8);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:10px;">Go to Dashboard →</a>
</td></tr></table>
<p>Best regards,<br/><strong>The StakeOnix Team</strong></p>`,
  },
  {
    id: 'custom',
    label: '✉️ Custom',
    subject: '',
    body: '',
  },
]

const TARGET_LABELS: Record<string, string> = {
  all: 'All Users',
  active: 'Active Users',
  verified: 'Verified Users',
}

const STATUS_CONFIG: Record<string, { label: string; color: string; Icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', Icon: Clock },
  sending: { label: 'Sending', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',       Icon: Send },
  sent:    { label: 'Sent',    color: 'bg-green-500/10 text-green-400 border-green-500/20',     Icon: CheckCircle2 },
  failed:  { label: 'Failed',  color: 'bg-red-500/10 text-red-400 border-red-500/20',           Icon: XCircle },
}

function fmtDate(d: string | null) {
  if (!d) return '-'
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(d))
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending
  const Icon = cfg.Icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminBulkEmailPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [totalSent, setTotalSent] = useState(0)
  const [loading, setLoading] = useState(true)

  // Compose state
  const [activeTemplate, setActiveTemplate] = useState('custom')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [target, setTarget] = useState('all')
  const [testEmail, setTestEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [testSending, setTestSending] = useState(false)

  // Modals
  const [previewOpen, setPreviewOpen] = useState(false)
  const [viewCampaign, setViewCampaign] = useState<Campaign | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bulk-email')
      const data = await res.json()
      setCampaigns(data.campaigns || [])
      setTotalSent(data.totalSent ?? 0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const applyTemplate = (id: string) => {
    setActiveTemplate(id)
    const tpl = TEMPLATES.find((t) => t.id === id)
    if (tpl?.subject) setSubject(tpl.subject)
    if (tpl?.body) setBody(tpl.body)
  }

  const handleTestSend = async () => {
    if (!subject.trim() || !body.trim()) return toast.error('Fill in subject and body first.')
    setTestSending(true)
    try {
      const res = await fetch('/api/admin/bulk-email/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content: body, testEmail: testEmail.trim() || undefined }),
      })
      const data = await res.json()
      if (res.ok) toast.success(`Test email sent to ${data.sentTo}`)
      else toast.error(data.error || 'Failed to send test.')
    } catch { toast.error('Network error.') }
    setTestSending(false)
  }

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) return toast.error('Subject and body are required.')
    if (!confirm(`Send this email to ${TARGET_LABELS[target]}? This cannot be undone.`)) return
    setSending(true)
    try {
      const res = await fetch('/api/admin/bulk-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content: body, target }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(`Campaign sent! ${data.sentCount} delivered${data.failedCount > 0 ? `, ${data.failedCount} failed` : ''}.`)
        setSubject('')
        setBody('')
        setActiveTemplate('custom')
        load()
      } else {
        toast.error(data.error || 'Failed to send campaign.')
      }
    } catch { toast.error('Network error.') }
    setSending(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this campaign record?')) return
    const res = await fetch(`/api/admin/bulk-email/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Deleted.'); load() }
    else toast.error('Failed to delete.')
  }

  const previewHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<style>body{margin:0;padding:24px;background:#0a0f1e;font-family:sans-serif;color:#e2e8f0;}
.note{background:#1f2937;border:1px solid #374151;border-radius:8px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#9ca3af;}
</style></head><body>
<div class="note">📧 <strong style="color:#e2e8f0;">Preview</strong> - greeting shows "Hi Admin". Real sends personalise each recipient's name.</div>
<div style="max-width:600px;margin:0 auto;background:#111827;border-radius:16px;padding:40px 48px;">
<p style="color:#d1d5db;font-size:16px;margin:0 0 24px;">Hi <strong style="color:#fff;">Admin</strong>,</p>
<div style="color:#9ca3af;font-size:15px;line-height:1.8;">${body || '<em style="color:#4b5563;">No content yet.</em>'}</div>
</div></body></html>`

  const lastCampaign = campaigns[0] ?? null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bulk Email</h1>
          <p className="text-sm text-muted-foreground mt-1">Compose and send campaigns to your users</p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg"><BarChart3 className="h-5 w-5 text-blue-400" /></div>
            <div><p className="text-sm text-muted-foreground">Total Campaigns</p><p className="text-2xl font-bold">{campaigns.length}</p></div>
          </div>
        </CardContent></Card>
        <Card><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg"><Mail className="h-5 w-5 text-green-400" /></div>
            <div><p className="text-sm text-muted-foreground">Total Emails Sent</p><p className="text-2xl font-bold">{totalSent.toLocaleString()}</p></div>
          </div>
        </CardContent></Card>
        <Card><CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg"><Clock className="h-5 w-5 text-purple-400" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Last Campaign</p>
              <p className="text-sm font-medium">{lastCampaign ? fmtDate(lastCampaign.sentAt ?? lastCampaign.createdAt) : '-'}</p>
            </div>
          </div>
        </CardContent></Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="compose">
        <TabsList>
          <TabsTrigger value="compose"><Mail className="h-4 w-4 mr-1.5" />Compose</TabsTrigger>
          <TabsTrigger value="history"><BarChart3 className="h-4 w-4 mr-1.5" />History ({campaigns.length})</TabsTrigger>
        </TabsList>

        {/* Compose */}
        <TabsContent value="compose" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Templates */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Start with a template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => applyTemplate(tpl.id)}
                        className={`rounded-lg border px-2 py-3 text-xs font-medium text-center transition-colors cursor-pointer
                          ${activeTemplate === tpl.id
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-muted/30 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'}`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Form */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label>Subject line</Label>
                      <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Your email subject…" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Audience</Label>
                      <Select value={target} onValueChange={setTarget}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all"><span className="flex items-center gap-2"><Users className="h-3.5 w-3.5" />All Users</span></SelectItem>
                          <SelectItem value="active">Active Users Only</SelectItem>
                          <SelectItem value="verified">Verified Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label>Email body (HTML)</Label>
                      <span className="text-xs text-muted-foreground">{body.length} chars</span>
                    </div>
                    <Textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={14}
                      placeholder={'<p>Write your message here using HTML…</p>'}
                      className="font-mono text-xs leading-relaxed resize-y"
                    />
                    <p className="text-xs text-muted-foreground">
                      HTML is supported. An unsubscribe footer is added automatically to every sent email.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions panel */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Eye className="h-4 w-4" />Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">See how the email renders before sending.</p>
                  <Button variant="outline" className="w-full" onClick={() => setPreviewOpen(true)}>
                    <Eye className="h-4 w-4 mr-2" />Open Preview
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><TestTube2 className="h-4 w-4" />Test Send</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="test@email.com (optional)" type="email" />
                  <p className="text-xs text-muted-foreground">Leave blank to send to your admin account email.</p>
                  <Button variant="outline" className="w-full" onClick={handleTestSend} disabled={testSending}>
                    {testSending ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <TestTube2 className="h-4 w-4 mr-2" />}
                    {testSending ? 'Sending…' : 'Send Test Email'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Send className="h-4 w-4 text-primary" />Send Campaign</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Audience: <strong className="text-foreground">{TARGET_LABELS[target]}</strong></p>
                    <p>Subject: <strong className="text-foreground truncate block">{subject || '(empty)'}</strong></p>
                  </div>
                  <Separator />
                  <Button className="w-full" onClick={handleSend} disabled={sending || !subject.trim() || !body.trim()}>
                    {sending ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                    {sending ? 'Sending…' : `Send to ${TARGET_LABELS[target]}`}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">This action cannot be undone.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Campaign History</CardTitle>
              <Button variant="outline" size="sm" onClick={load} disabled={loading}>
                <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />Refresh
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {campaigns.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  <Mail className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>No campaigns sent yet.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Sent</TableHead>
                      <TableHead className="text-right">Failed</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">{c.subject}</TableCell>
                        <TableCell>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded">{TARGET_LABELS[c.target] ?? c.target}</span>
                        </TableCell>
                        <TableCell><StatusBadge status={c.status} /></TableCell>
                        <TableCell className="text-right text-green-400 font-medium">{c.sentCount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          {c.failedCount > 0
                            ? <span className="text-red-400">{c.failedCount}</span>
                            : <span className="text-muted-foreground">0</span>}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {fmtDate(c.sentAt ?? c.createdAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="View content" onClick={() => setViewCampaign(c)}>
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="Delete" onClick={() => handleDelete(c.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl h-[85vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-4 w-4" />Email Preview
              {subject && <span className="text-muted-foreground font-normal text-sm">- {subject}</span>}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden px-6 pb-6">
            <iframe srcDoc={previewHtml} title="Email preview" className="w-full h-full rounded-lg border border-border" sandbox="allow-same-origin" />
          </div>
        </DialogContent>
      </Dialog>

      {/* View campaign modal */}
      <Dialog open={!!viewCampaign} onOpenChange={(o) => !o && setViewCampaign(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><FileText className="h-4 w-4" />Campaign Details</DialogTitle>
          </DialogHeader>
          {viewCampaign && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-muted/40 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Subject</p>
                  <p className="font-medium">{viewCampaign.subject}</p>
                </div>
                <div className="bg-muted/40 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Audience</p>
                  <p className="font-medium">{TARGET_LABELS[viewCampaign.target] ?? viewCampaign.target}</p>
                </div>
                <div className="bg-muted/40 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Delivered / Failed</p>
                  <p className="font-medium">
                    <span className="text-green-400">{viewCampaign.sentCount}</span>
                    {' / '}
                    <span className={viewCampaign.failedCount > 0 ? 'text-red-400' : 'text-muted-foreground'}>{viewCampaign.failedCount}</span>
                  </p>
                </div>
                <div className="bg-muted/40 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Sent At</p>
                  <p className="font-medium">{fmtDate(viewCampaign.sentAt)}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-2">Email body (HTML)</p>
                <pre className="bg-muted/30 border border-border rounded-lg p-4 text-xs font-mono whitespace-pre-wrap overflow-x-auto max-h-64 overflow-y-auto">
                  {viewCampaign.content}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
