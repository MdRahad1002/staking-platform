'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Eye, EyeOff, Lock, Mail, User, Gift, Shield, Users,
  BarChart3, ChevronLeft, Phone, CheckCircle2, ArrowRight,
} from 'lucide-react'
import { toast } from 'sonner'

const COUNTRY_CODES = [
  { code: '+1',   flag: '🇨🇦', name: 'Canada' },
  { code: '+1',   flag: '🇺🇸', name: 'USA' },
  { code: '+44',  flag: '🇬🇧', name: 'UK' },
  { code: '+61',  flag: '🇦🇺', name: 'AU' },
  { code: '+49',  flag: '🇩🇪', name: 'DE' },
  { code: '+33',  flag: '🇫🇷', name: 'FR' },
  { code: '+39',  flag: '🇮🇹', name: 'IT' },
  { code: '+34',  flag: '🇪🇸', name: 'ES' },
  { code: '+31',  flag: '🇳🇱', name: 'NL' },
  { code: '+7',   flag: '🇷🇺', name: 'RU' },
  { code: '+91',  flag: '🇮🇳', name: 'IN' },
  { code: '+86',  flag: '🇨🇳', name: 'CN' },
  { code: '+81',  flag: '🇯🇵', name: 'JP' },
  { code: '+82',  flag: '🇰🇷', name: 'KR' },
  { code: '+55',  flag: '🇧🇷', name: 'BR' },
  { code: '+52',  flag: '🇲🇽', name: 'MX' },
  { code: '+27',  flag: '🇿🇦', name: 'ZA' },
  { code: '+234', flag: '🇳🇬', name: 'NG' },
  { code: '+20',  flag: '🇪🇬', name: 'EG' },
  { code: '+254', flag: '🇰🇪', name: 'KE' },
  { code: '+971', flag: '🇦🇪', name: 'AE' },
  { code: '+966', flag: '🇸🇦', name: 'SA' },
  { code: '+92',  flag: '🇵🇰', name: 'PK' },
  { code: '+880', flag: '🇧🇩', name: 'BD' },
  { code: '+62',  flag: '🇮🇩', name: 'ID' },
  { code: '+63',  flag: '🇵🇭', name: 'PH' },
  { code: '+84',  flag: '🇻🇳', name: 'VN' },
  { code: '+66',  flag: '🇹🇭', name: 'TH' },
  { code: '+60',  flag: '🇲🇾', name: 'MY' },
  { code: '+65',  flag: '🇸🇬', name: 'SG' },
  { code: '+48',  flag: '🇵🇱', name: 'PL' },
  { code: '+380', flag: '🇺🇦', name: 'UA' },
  { code: '+90',  flag: '🇹🇷', name: 'TR' },
  { code: '+98',  flag: '🇮🇷', name: 'IR' },
  { code: '+212', flag: '🇲🇦', name: 'MA' },
  { code: '+233', flag: '🇬🇭', name: 'GH' },
  { code: '+255', flag: '🇹🇿', name: 'TZ' },
]

const highlights = [
  {
    icon: <BarChart3 className="h-5 w-5 text-blue-400" />,
    title: '100% Transparent Returns',
    desc: 'Fixed daily ROI with no hidden fees or surprise deductions.',
  },
  {
    icon: <Users className="h-5 w-5 text-yellow-400" />,
    title: 'Referral Rewards',
    desc: 'Earn commissions when friends you invite start staking.',
  },
  {
    icon: <Shield className="h-5 w-5 text-green-400" />,
    title: 'FINTRAC Registered',
    desc: 'Compliant with Canadian anti-money laundering regulations.',
  },
]

const socialProof = [
  { value: '480K+', label: 'Active stakers' },
  { value: 'FINTRAC', label: 'Registered' },
  { value: '4.8/5', label: 'User rating' },
  { value: '170+', label: 'Assets' },
]

const schema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(4, 'Enter a valid phone number').regex(/^[0-9\s\-()]+$/, 'Numbers only'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

// ── Reusable logo ────────────────────────────────────────────────────────────
function LogoLink({ id = 'logo' }: { id?: string }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 36, width: 36 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <polygon points="20,2 35,11 35,29 20,38 5,29 5,11" fill={`url(#${id})`} />
        <rect x="12" y="10" width="13" height="5" rx="1.5" fill="white" />
        <rect x="12" y="10" width="5" height="10" rx="1.5" fill="white" />
        <rect x="12" y="17.5" width="16" height="5" rx="1.5" fill="white" />
        <rect x="23" y="20" width="5" height="10" rx="1.5" fill="white" />
        <rect x="15" y="25" width="13" height="5" rx="1.5" fill="white" />
      </svg>
      <span className="font-extrabold tracking-tight text-xl leading-none">
        <span className="text-white/60">Stake</span>
        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">onix</span>
      </span>
    </Link>
  )
}

// ── Signup form ──────────────────────────────────────────────────────────────
function SignupForm() {
  const searchParams = useSearchParams()
  const refCode = searchParams.get('ref') || ''
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [countryCode, setCountryCode] = useState('+1')
  const [successEmail, setSuccessEmail] = useState<string | null>(null)
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { referralCode: refCode },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const { confirmPassword: _, phoneNumber, ...rest } = data
      const payload = { ...rest, phone: `${countryCode}${phoneNumber}` }
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json()

      if (!res.ok) {
        toast.error(result.error || 'Registration failed')
        setLoading(false)
        return
      }

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      setSuccessEmail(data.email)
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const handleResend = async () => {
    if (!successEmail || resending || resent) return
    setResending(true)
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: successEmail }),
      })
      if (res.ok) {
        setResent(true)
        toast.success('Verification email resent!')
      } else {
        toast.error('Could not resend email. Try again.')
      }
    } catch {
      toast.error('Something went wrong. Try again.')
    }
    setResending(false)
  }

  // ── Success screen ──────────────────────────────────────────────────────
  if (successEmail) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15 border-2 border-green-500/30 ring-4 ring-green-500/10">
            <CheckCircle2 className="h-10 w-10 text-green-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">Account Created!</h1>
          <p className="text-sm text-white/50">We&apos;ve sent a welcome email to</p>
          <p className="text-sm font-semibold text-white break-all">{successEmail}</p>
        </div>

        <div className="rounded-xl border border-blue-500/20 bg-blue-500/8 p-4 text-left">
          <p className="text-xs text-white/50 leading-relaxed">
            Your account is <span className="text-green-400 font-semibold">active</span> — you can start using Stakeonix right away.
            The email contains your verification link and a summary of your account.
          </p>
        </div>

        <button
          className="w-full h-12 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white transition-all hover:scale-[1.01] shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          onClick={() => { window.location.href = '/dashboard' }}
        >
          <ArrowRight className="h-4 w-4" /> Go to Dashboard
        </button>

        <div className="border-t border-white/[0.06] pt-4">
          <p className="text-xs text-white/30 mb-2">Didn&apos;t receive the email? Check your spam folder or</p>
          {resent ? (
            <p className="text-xs font-semibold text-green-400">Email resent successfully!</p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
            >
              {resending ? 'Sending...' : 'Resend verification email'}
            </button>
          )}
        </div>
      </div>
    )
  }

  const inputClass = "h-12 rounded-xl bg-white/[0.06] border-white/10 text-white placeholder:text-white/25 focus:border-blue-500/50 focus:ring-blue-500/20"
  const labelClass = "text-xs font-semibold text-white/60 uppercase tracking-widest"

  return (
    <div className="w-full space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white">Create Account</h1>
        <p className="text-sm text-white/50">Join thousands of investors today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className={labelClass}>First Name</Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
              <Input placeholder="John" className={`pl-10 ${inputClass}`} {...register('firstName')} />
            </div>
            {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label className={labelClass}>Last Name</Label>
            <Input placeholder="Doe" className={inputClass} {...register('lastName')} />
            {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label className={labelClass}>Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            <Input type="email" placeholder="your@email.com" className={`pl-10 ${inputClass}`} {...register('email')} />
          </div>
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label className={labelClass}>Phone Number</Label>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="h-12 rounded-xl border border-white/10 bg-white/[0.06] pl-3 pr-7 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
                style={{ minWidth: '7.5rem' }}
              >
                {COUNTRY_CODES.map((c, i) => (
                  <option key={`${c.code}-${i}`} value={c.code} className="bg-[#0d1422] text-white">
                    {c.flag} {c.name} ({c.code})
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/30 text-xs">▼</span>
            </div>
            <div className="relative flex-1">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
              <Input type="tel" placeholder="Phone number" className={`pl-10 ${inputClass}`} {...register('phoneNumber')} />
            </div>
          </div>
          {errors.phoneNumber && <p className="text-xs text-red-400">{errors.phoneNumber.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label className={labelClass}>Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              className={`pl-10 pr-11 ${inputClass}`}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <Label className={labelClass}>Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            <Input type="password" placeholder="Repeat password" className={`pl-10 ${inputClass}`} {...register('confirmPassword')} />
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
        </div>

        {/* Referral code */}
        <div className="space-y-1.5">
          <Label className={labelClass}>
            Referral Code{' '}
            <span className="text-white/30 normal-case tracking-normal font-normal">(optional)</span>
            {refCode && (
              <span className="ml-2 text-green-400 font-medium text-[10px] normal-case tracking-normal"> Code applied</span>
            )}
          </Label>
          <div className="relative">
            <Gift className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            <Input
              placeholder="Enter referral code"
              className={`pl-10 ${inputClass} ${refCode ? 'border-green-500/30 bg-green-500/[0.06]' : ''}`}
              {...register('referralCode')}
            />
          </div>
        </div>

        {/* Terms */}
        <p className="text-xs text-white/30 leading-relaxed">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/policy" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</Link>.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white transition-all hover:scale-[1.01] shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
        >
          {loading
            ? <><span className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Creating Account...</>
            : <><ArrowRight className="h-4 w-4" />Create Account</>
          }
        </button>
      </form>

      <p className="text-center text-sm text-white/40">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function SignupPage() {
  return (
    <div className="min-h-screen flex" style={{ background: '#080d1b' }}>

      {/* ── Left branding panel ── */}
      <div
        className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(135deg, #050a14 0%, #080d1b 60%, #0a0f20 100%)' }}
      >
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/[0.12] blur-[120px] translate-x-1/3 -translate-y-1/4" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-violet-600/[0.10] blur-[100px] -translate-x-1/4 translate-y-1/4" />
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />

        {/* Logo */}
        <div className="relative z-10">
          <LogoLink id="slp1" />
        </div>

        {/* Copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-300 mb-5">
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Start earning in minutes
            </div>
            <h2 className="text-4xl font-black leading-tight mb-4 text-white">
              Your First Daily<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Reward Awaits
              </span>
            </h2>
            <p className="text-white/50 max-w-sm text-sm leading-relaxed">
              Create a free account, deposit crypto, choose a plan — and earn passive income on autopilot.
            </p>
          </div>

          {/* Social proof */}
          <div className="grid grid-cols-2 gap-3">
            {socialProof.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm px-4 py-3"
              >
                <p className="text-xl font-black bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{s.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-4">
            {highlights.map((h) => (
              <div key={h.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08]">
                  {h.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-white/90">{h.title}</p>
                  <p className="text-xs text-white/40 mt-0.5">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer badge */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/8 px-3 py-1.5 text-xs text-green-300">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            No credit card required &nbsp;&middot;&nbsp; Free to start
          </div>
        </div>
      </div>

      {/* ── Right: form ── */}
      <div className="flex flex-1 flex-col lg:w-[55%]">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between p-5 lg:hidden border-b border-white/[0.06]">
          <LogoLink id="smob" />
          <Link
            href="/login"
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Sign in
          </Link>
        </div>

        {/* Scrollable form area */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-6 py-10 lg:px-12">
            <div className="w-full max-w-sm">
              {/* Glass card */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8 shadow-2xl shadow-black/40">
                <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-xl bg-white/5" />}>
                  <SignupForm />
                </Suspense>
              </div>

              <p className="text-center text-xs text-white/25 mt-6">
                Protected by 256-bit SSL &nbsp;&middot;&nbsp;{' '}
                <Link href="/terms" className="hover:text-white/50 transition-colors">Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
