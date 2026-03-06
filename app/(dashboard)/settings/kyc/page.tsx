'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  ShieldCheck,
  Clock,
  XCircle,
  CheckCircle2,
  Upload,
  AlertTriangle,
  FileText,
  User,
  Camera,
} from 'lucide-react'
import { COUNTRIES } from './countries'

interface KycStatus {
  id: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  documentType: string
  documentNumber: string
  rejectionReason?: string | null
  createdAt: string
  reviewedAt?: string | null
}

const DOC_TYPES = [
  { value: 'PASSPORT', label: 'Passport' },
  { value: 'NATIONAL_ID', label: 'National ID Card' },
  { value: 'DRIVERS_LICENSE', label: "Driver's License" },
]

// Compress + resize on a canvas, then return a data URI.
// Max dimension 1400px, JPEG 0.82 quality → each image ~100–300 KB in base64
async function compressImageToBase64(file: File, maxPx = 1400, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > maxPx || height > maxPx) {
        if (width >= height) {
          height = Math.round((height * maxPx) / width)
          width = maxPx
        } else {
          width = Math.round((width * maxPx) / height)
          height = maxPx
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')) }
    img.src = url
  })
}

function ImageUploadBox({
  label,
  description,
  value,
  onChange,
  required = true,
}: {
  label: string
  description: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 25 * 1024 * 1024) {
      toast.error('Image must be under 25MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed')
      return
    }
    try {
      const b64 = await compressImageToBase64(file)
      onChange(b64)
    } catch {
      toast.error('Failed to process image. Please try another file.')
    }
  }

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <p className="text-xs text-muted-foreground">{description}</p>
      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/20">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label} className="h-full w-full object-contain rounded-lg p-1" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload className="h-8 w-8" />
            <span className="text-sm">Click to upload</span>
            <span className="text-xs">JPG, PNG, WEBP — auto-compressed</span>
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </label>
    </div>
  )
}

function StatusBanner({ kyc }: { kyc: KycStatus }) {
  if (kyc.status === 'APPROVED') {
    return (
      <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-green-500">Identity Verified</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your KYC was approved on {new Date(kyc.reviewedAt!).toLocaleDateString()}. You can now make withdrawals.
          </p>
        </div>
      </div>
    )
  }
  if (kyc.status === 'PENDING') {
    return (
      <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
        <Clock className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-yellow-500">Under Review</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your documents were submitted on {new Date(kyc.createdAt).toLocaleDateString()} and are being reviewed. This typically takes 24–48 hours.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
      <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold text-destructive">KYC Rejected — Resubmission Required</p>
        {kyc.rejectionReason && (
          <p className="text-sm text-muted-foreground mt-1">
            <span className="font-medium">Reason:</span> {kyc.rejectionReason}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          Please correct the issue and resubmit your documents below.
        </p>
      </div>
    </div>
  )
}

export default function KycPage() {
  const [kyc, setKyc] = useState<KycStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [country, setCountry] = useState('')
  const [docType, setDocType] = useState('')
  const [docNumber, setDocNumber] = useState('')
  const [frontImage, setFrontImage] = useState('')
  const [backImage, setBackImage] = useState('')
  const [selfieImage, setSelfieImage] = useState('')

  const fetchKyc = useCallback(async () => {
    const r = await fetch('/api/kyc')
    const d = await r.json()
    setKyc(d.data)
    if (d.data && d.data.status !== 'APPROVED') {
      setFirstName(d.data.firstName || '')
      setLastName(d.data.lastName || '')
      setDob(d.data.dateOfBirth || '')
      setCountry(d.data.country || '')
      setDocType(d.data.documentType || '')
      setDocNumber(d.data.documentNumber || '')
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchKyc() }, [fetchKyc])

  const requiresBack = docType === 'NATIONAL_ID' || docType === 'DRIVERS_LICENSE'
  const canSubmit = kyc?.status !== 'APPROVED' && kyc?.status !== 'PENDING'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !dob || !country || !docType || !docNumber) {
      toast.error('Please fill in all required fields.')
      return
    }
    if (!frontImage) { toast.error('Please upload the front of your document.'); return }
    if (requiresBack && !backImage) { toast.error('Please upload the back of your document.'); return }
    if (!selfieImage) { toast.error('Please upload your selfie.'); return }

    setSubmitting(true)
    try {
      const r = await fetch('/api/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, dateOfBirth: dob, country,
          documentType: docType, documentNumber: docNumber,
          frontImage, backImage: requiresBack ? backImage : undefined, selfieImage,
        }),
      })
      const d = await r.json()
      if (!r.ok) { toast.error(d.error || 'Submission failed.'); return }
      toast.success('KYC submitted successfully! We will review within 24–48 hours.')
      fetchKyc()
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Identity Verification (KYC)
        </h1>
        <p className="text-muted-foreground mt-1">
          KYC verification is required to enable withdrawals. Your data is encrypted and handled securely.
        </p>
      </div>

      {/* Why KYC */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: <ShieldCheck className="h-4 w-4 text-primary" />, title: 'Secure', desc: 'Bank-grade document encryption' },
          { icon: <Clock className="h-4 w-4 text-primary" />, title: 'Fast Review', desc: '24–48 hour processing time' },
          { icon: <CheckCircle2 className="h-4 w-4 text-primary" />, title: 'One-Time', desc: 'Submit once, verified forever' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 border border-border">
            {item.icon}
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Status banner */}
      {kyc && <StatusBanner kyc={kyc} />}

      {/* Not submitted yet */}
      {!kyc && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">KYC Not Submitted</p>
            <p className="text-sm text-muted-foreground mt-1">
              You must complete identity verification before making withdrawals.
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      {canSubmit && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" /> Personal Information
              </CardTitle>
              <CardDescription>Enter your legal name exactly as it appears on your document.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name <span className="text-destructive">*</span></Label>
                  <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name <span className="text-destructive">*</span></Label>
                  <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date of Birth <span className="text-destructive">*</span></Label>
                  <Input type="date" value={dob} onChange={e => setDob(e.target.value)} max={new Date(Date.now() - 18 * 365.25 * 24 * 3600 * 1000).toISOString().split('T')[0]} />
                </div>
                <div className="space-y-2">
                  <Label>Country of Residence <span className="text-destructive">*</span></Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                    <SelectContent className="max-h-60">
                      {COUNTRIES.map(c => <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" /> Identity Document
              </CardTitle>
              <CardDescription>Upload clear, well-lit photos. All four corners must be visible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Document Type <span className="text-destructive">*</span></Label>
                  <Select value={docType} onValueChange={v => { setDocType(v); setBackImage('') }}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {DOC_TYPES.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Document Number <span className="text-destructive">*</span></Label>
                  <Input value={docNumber} onChange={e => setDocNumber(e.target.value)} placeholder="e.g. AB1234567" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageUploadBox
                  label="Front Side"
                  description={docType === 'PASSPORT' ? 'Photo page of your passport' : 'Front of your document'}
                  value={frontImage}
                  onChange={setFrontImage}
                />
                <ImageUploadBox
                  label="Back Side"
                  description={docType === 'PASSPORT' ? 'Not required for passport' : 'Back of your document'}
                  value={backImage}
                  onChange={setBackImage}
                  required={requiresBack}
                />
              </div>
            </CardContent>
          </Card>

          {/* Selfie */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Camera className="h-4 w-4" /> Selfie with Document
              </CardTitle>
              <CardDescription>
                Take a clear photo holding your ID document next to your face. Both must be clearly visible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploadBox
                label="Selfie with ID"
                description="Hold your document clearly visible beside your face"
                value={selfieImage}
                onChange={setSelfieImage}
              />
            </CardContent>
          </Card>

          {/* Consent */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border">
            By submitting this form you confirm that the information provided is accurate and that you are the legitimate owner of the
            document. Your data is processed solely for identity verification purposes in compliance with applicable regulations.
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={submitting}>
            {submitting ? 'Submitting...' : kyc?.status === 'REJECTED' ? 'Resubmit KYC' : 'Submit KYC Verification'}
          </Button>
        </form>
      )}

      {/* Approved summary */}
      {kyc?.status === 'APPROVED' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Verified Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['Name', `${kyc.firstName} ${kyc.lastName}`],
              ['Date of Birth', kyc.dateOfBirth],
              ['Country', kyc.country],
              ['Document Type', DOC_TYPES.find(d => d.value === kyc.documentType)?.label || kyc.documentType],
              ['Document Number', kyc.documentNumber],
              ['Status', <Badge key="s" className="bg-green-500/20 text-green-500 border-green-500/30">Approved</Badge>],
            ].map(([k, v], i) => (
              <div key={i}>
                <p className="text-muted-foreground">{k}</p>
                <p className="font-medium">{v}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
