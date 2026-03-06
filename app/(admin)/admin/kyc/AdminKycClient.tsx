'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { formatDateTime } from '@/lib/utils'
import {
  ShieldCheck, Clock, XCircle, CheckCircle2, Eye, Search, Filter,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface KycRecord {
  id: string
  status: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  documentType: string
  documentNumber: string
  frontImage: string
  backImage: string | null
  selfieImage: string
  rejectionReason: string | null
  reviewedAt: Date | null
  reviewedById: string | null
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    email: string
    username: string | null
    firstName: string | null
    lastName: string | null
  }
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'APPROVED') return <Badge className="bg-green-500/20 text-green-500 border-green-500/30"><CheckCircle2 className="h-3 w-3 mr-1" />Approved</Badge>
  if (status === 'REJECTED') return <Badge className="bg-destructive/20 text-destructive border-destructive/30"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
  return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
}

const DOC_TYPE_LABELS: Record<string, string> = {
  PASSPORT: 'Passport',
  NATIONAL_ID: 'National ID',
  DRIVERS_LICENSE: "Driver's License",
}

function safeImgSrc(src: string): string {
  // Only allow base64 data URIs for images (guards against XSS from stored data)
  return /^data:image\/(png|jpeg|jpg|webp|gif);base64,/.test(src) ? src : ''
}

export default function AdminKycClient({ submissions: initial, readOnly = false }: { submissions: KycRecord[]; readOnly?: boolean }) {
  const router = useRouter()
  const [submissions, setSubmissions] = useState(initial)
  const [selected, setSelected] = useState<KycRecord | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [rejReason, setRejReason] = useState('')
  const [acting, setActing] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [imgPreview, setImgPreview] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return submissions.filter(s => {
      if (statusFilter !== 'ALL' && s.status !== statusFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          s.user.email.toLowerCase().includes(q) ||
          (s.user.username || '').toLowerCase().includes(q) ||
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.documentNumber.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [submissions, search, statusFilter])

  const counts = useMemo(() => ({
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'PENDING').length,
    approved: submissions.filter(s => s.status === 'APPROVED').length,
    rejected: submissions.filter(s => s.status === 'REJECTED').length,
  }), [submissions])

  const openReview = (s: KycRecord) => {
    setSelected(s)
    setRejReason(s.rejectionReason || '')
    setDialogOpen(true)
  }

  const doAction = async (action: 'APPROVE' | 'REJECT') => {
    if (!selected) return
    if (action === 'REJECT' && !rejReason.trim()) {
      toast.error('Rejection reason is required.')
      return
    }
    setActing(true)
    try {
      const r = await fetch(`/api/admin/kyc/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, rejectionReason: action === 'REJECT' ? rejReason : undefined }),
      })
      const d = await r.json()
      if (!r.ok) { toast.error(d.error || 'Action failed.'); return }
      toast.success(action === 'APPROVE' ? 'KYC approved.' : 'KYC rejected.')
      setSubmissions(prev => prev.map(s => s.id === selected.id ? { ...s, status: d.data.status } : s))
      setDialogOpen(false)
      router.refresh()
    } finally {
      setActing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          KYC Verification
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: counts.total, color: 'text-foreground' },
          { label: 'Pending', value: counts.pending, color: 'text-yellow-500' },
          { label: 'Approved', value: counts.approved, color: 'text-green-500' },
          { label: 'Rejected', value: counts.rejected, color: 'text-destructive' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="pt-4 pb-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search by email, name, doc number..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 font-medium">User</th>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Document</th>
                  <th className="text-left p-3 font-medium">Country</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Submitted</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No KYC submissions found.</td></tr>
                )}
                {filtered.map(s => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="p-3">
                      <p className="font-medium truncate max-w-40">{s.user.email}</p>
                      {s.user.username && <p className="text-xs text-muted-foreground">@{s.user.username}</p>}
                    </td>
                    <td className="p-3">{s.firstName} {s.lastName}</td>
                    <td className="p-3">
                      <p>{DOC_TYPE_LABELS[s.documentType] || s.documentType}</p>
                      <p className="text-xs text-muted-foreground font-mono">{s.documentNumber}</p>
                    </td>
                    <td className="p-3">{s.country}</td>
                    <td className="p-3"><StatusBadge status={s.status} /></td>
                    <td className="p-3 text-muted-foreground text-xs">{formatDateTime(s.createdAt)}</td>
                    <td className="p-3">
                      <Button size="sm" variant="outline" onClick={() => openReview(s)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>KYC Review — {selected?.firstName} {selected?.lastName}</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-5">
              {/* Status */}
              <div className="flex items-center gap-3">
                <StatusBadge status={selected.status} />
                {selected.rejectionReason && (
                  <span className="text-sm text-destructive">{selected.rejectionReason}</span>
                )}
              </div>

              {/* User info */}
              <div className="grid grid-cols-2 gap-2 text-sm bg-muted/20 p-3 rounded-lg border border-border">
                <div><span className="text-muted-foreground">Email:</span> {selected.user.email}</div>
                <div><span className="text-muted-foreground">Username:</span> {selected.user.username || '—'}</div>
                <div><span className="text-muted-foreground">Full Name:</span> {selected.firstName} {selected.lastName}</div>
                <div><span className="text-muted-foreground">Date of Birth:</span> {selected.dateOfBirth}</div>
                <div><span className="text-muted-foreground">Country:</span> {selected.country}</div>
                <div><span className="text-muted-foreground">Submitted:</span> {formatDateTime(selected.createdAt)}</div>
                <div><span className="text-muted-foreground">Document:</span> {DOC_TYPE_LABELS[selected.documentType]}</div>
                <div><span className="text-muted-foreground">Doc Number:</span> <span className="font-mono">{selected.documentNumber}</span></div>
              </div>

              {/* Documents */}
              <div>
                <p className="font-semibold mb-3">Documents</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Front of Document', src: selected.frontImage },
                    ...(selected.backImage ? [{ label: 'Back of Document', src: selected.backImage }] : []),
                    { label: 'Selfie with Document', src: selected.selfieImage },
                  ].map(doc => (
                    <div key={doc.label} className="space-y-1">
                      <p className="text-xs text-muted-foreground">{doc.label}</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={safeImgSrc(doc.src)}
                        alt={doc.label}
                        className="w-full h-40 object-cover rounded-lg border border-border cursor-zoom-in"
                        onClick={() => setImgPreview(doc.src)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action area */}
              {selected.status === 'PENDING' && !readOnly && (
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="space-y-2">
                    <Label>Rejection Reason (required if rejecting)</Label>
                    <Textarea
                      placeholder="e.g. Document is blurry, document expired, name mismatch..."
                      value={rejReason}
                      onChange={e => setRejReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <DialogFooter className="flex-row gap-2 sm:justify-start">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white flex-1"
                      disabled={acting}
                      onClick={() => doAction('APPROVE')}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve KYC
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      disabled={acting || !rejReason.trim()}
                      onClick={() => doAction('REJECT')}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject KYC
                    </Button>
                  </DialogFooter>
                </div>
              )}

              {selected.status === 'PENDING' && readOnly && (
                <p className="text-sm text-muted-foreground border-t border-border pt-3">
                  This submission is pending review. You have view-only access.
                </p>
              )}

              {selected.status !== 'PENDING' && (
                <p className="text-sm text-muted-foreground border-t border-border pt-3">
                  This submission was {selected.status.toLowerCase()} on {selected.reviewedAt ? formatDateTime(selected.reviewedAt) : '—'}.
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Image fullscreen preview */}
      {imgPreview && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center cursor-zoom-out"
          onClick={() => setImgPreview(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={safeImgSrc(imgPreview)} alt="Document preview" className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg" />
        </div>
      )}
    </div>
  )
}
