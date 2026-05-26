'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { signIn, getSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Eye, EyeOff, Lock, Mail, Shield, Zap, BarChart3,
  ChevronRight, Smartphone, ArrowRight, TrendingUp,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type FormData = z.infer<typeof schema>

function getRoleRedirect(role: string, callbackUrl: string): string {
  if (callbackUrl !== '/dashboard') return callbackUrl
  if (role === 'ADMIN') return '/admin'
  if (role === 'WORKER') return '/worker'
  if (role === 'SUPPORT') return '/support'
  return '/dashboard'
}

const perks = [
  {
    icon: <BarChart3 className="h-5 w-5 text-blue-400" />,
    title: 'Up to 365% APR',
    desc: 'Industry-leading staking returns, paid daily.',
  },
  {
    icon: <Zap className="h-5 w-5 text-yellow-400" />,
    title: 'Instant Daily Payouts',
    desc: 'Earnings credited automatically every 24 hours.',
  },
  {
    icon: <Shield className="h-5 w-5 text-green-400" />,
    title: 'Bank-Grade Security',
    desc: '2FA, cold wallet storage & SSL encryption.',
  },
]

const stats = [
  { value: '480K+', label: 'Active stakers' },
  { value: '$2.4B+', label: 'Total staked' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.8/5', label: 'User rating' },
]

// ── Reusable logo SVG ───────────────────────────────────────────────────────
function LogoMark({ size = 9, id = 'l1' }: { size?: number; id?: string }) {
  const px = size * 4
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={`h-${size} w-${size} flex-shrink-0`} style={{ height: px, width: px }}>
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
  )
}

function LogoLink({ id = 'logo' }: { id?: string }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <LogoMark size={9} id={id} />
      <span className="font-extrabold tracking-tight text-xl leading-none">
        <span className="text-white/60">Stake</span>
        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">onix</span>
      </span>
    </Link>
  )
}

// ── Left branding panel ─────────────────────────────────────────────────────
function LeftPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12"
      style={{ background: 'linear-gradient(135deg, #050a14 0%, #080d1b 60%, #0a0f20 100%)' }}
    >
      {/* Glow orbs */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/[0.12] blur-[120px] translate-x-1/3 -translate-y-1/4" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-violet-600/[0.10] blur-[100px] -translate-x-1/4 translate-y-1/4" />
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />

      {/* Logo */}
      <div className="relative z-10">
        <LogoLink id="lp1" />
      </div>

      {/* Main copy */}
      <div className="relative z-10 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300 mb-5">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Passive income, simplified
          </div>
          <h2 className="text-4xl font-black leading-tight mb-4 text-white">
            Grow Your Crypto<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Every Single Day
            </span>
          </h2>
          <p className="text-white/50 max-w-sm text-sm leading-relaxed">
            Join 15,000+ investors earning automatic daily staking rewards.
            Transparent plans, zero complexity.
          </p>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm px-4 py-3"
            >
              <p className="text-xl font-black bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Feature list */}
        <div className="space-y-4">
          {perks.map((p) => (
            <div key={p.title} className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08]">
                {p.icon}
              </div>
              <div>
                <p className="font-semibold text-sm text-white/90">{p.title}</p>
                <p className="text-xs text-white/40 mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-xs text-white/30">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          All systems operational &nbsp;&middot;&nbsp; 99.9% uptime
        </div>
      </div>
    </div>
  )
}

// ── Login form ──────────────────────────────────────────────────────────────
function LoginForm() {
  const searchParams = useSearchParams()
  const rawCallback = searchParams.get('callbackUrl') || '/dashboard'
  const callbackUrl = rawCallback.startsWith('/') ? rawCallback : '/dashboard'
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [twoFaStep, setTwoFaStep] = useState(false)
  const [totpCode, setTotpCode] = useState('')
  const [totpLoading, setTotpLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        const msg =
          result.error === 'CredentialsSignin'
            ? 'Invalid email or password'
            : result.error
        toast.error(msg)
        setLoading(false)
      } else {
        const session = await getSession()
        if ((session as any)?.twoFaPending) {
          setTwoFaStep(true)
          setLoading(false)
          return
        }
        toast.success('Welcome back!')
        const role = session?.user?.role || 'USER'
        window.location.href = getRoleRedirect(role, callbackUrl)
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const onTotpSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!totpCode.trim() || totpCode.length < 6) return
    setTotpLoading(true)
    try {
      const res = await fetch('/api/auth/2fa-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: totpCode.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Invalid code')
        setTotpLoading(false)
        return
      }

      const result = await signIn('two-factor', {
        userId: data.userId,
        nonce: data.nonce,
        redirect: false,
      })

      if (result?.error) {
        toast.error('2FA verification failed. Please try again.')
        setTotpLoading(false)
        return
      }

      toast.success('Welcome back!')
      const session = await getSession()
      const role = session?.user?.role || 'USER'
      window.location.href = getRoleRedirect(role, callbackUrl)
    } catch {
      toast.error('Something went wrong. Please try again.')
      setTotpLoading(false)
    }
  }

  // ── 2FA screen ──────────────────────────────────────────────────────
  if (twoFaStep) {
    return (
      <div className="w-full space-y-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/15 border border-blue-500/25 ring-4 ring-blue-500/10">
            <Smartphone className="h-7 w-7 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Two-Factor Auth</h1>
            <p className="text-sm text-white/50 mt-1">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>
        </div>

        <form onSubmit={onTotpSubmit} className="space-y-4">
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            autoFocus
            autoComplete="one-time-code"
            placeholder="000 000"
            className="h-16 text-center text-3xl font-mono tracking-[0.6em] rounded-2xl bg-white/[0.06] border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:ring-blue-500/20"
            value={totpCode}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
              setTotpCode(val)
              if (val.length === 6) setTimeout(() => onTotpSubmit(), 0)
            }}
          />

          <button
            type="submit"
            disabled={totpLoading || totpCode.length < 6}
            className="w-full h-12 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white transition-all hover:scale-[1.01] shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {totpLoading ? 'Verifying...' : 'Verify & Sign In'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => { setTwoFaStep(false); setTotpCode('') }}
          className="w-full text-center text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          Back to sign in
        </button>
      </div>
    )
  }

  // ── Normal login ──────────────────────────────────────────────────────
  return (
    <div className="w-full space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-black text-white">Welcome back</h1>
        <p className="text-sm text-white/50">Sign in to your Stakeonix account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-white/60 uppercase tracking-widest">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="pl-10 h-12 rounded-xl bg-white/[0.06] border-white/10 text-white placeholder:text-white/25 focus:border-blue-500/50 focus:ring-blue-500/20"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold text-white/60 uppercase tracking-widest">Password</Label>
            <Link href="/auth-re-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="pl-10 pr-11 h-12 rounded-xl bg-white/[0.06] border-white/10 text-white placeholder:text-white/25 focus:border-blue-500/50 focus:ring-blue-500/20"
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl font-bold text-sm gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white transition-all hover:scale-[1.01] shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
        >
          {loading
            ? <><span className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2" />Signing in...</>
            : <><ArrowRight className="h-4 w-4 mr-1.5" />Sign In</>
          }
        </button>
      </form>

      <p className="text-center text-sm text-white/40">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
          Create Account
        </Link>
      </p>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  return (
    <div className="min-h-screen flex" style={{ background: '#080d1b' }}>
      <LeftPanel />

      {/* Right: form panel */}
      <div className="flex flex-1 flex-col lg:w-[48%]" style={{ background: '#080d1b' }}>
        {/* Mobile top bar */}
        <div className="flex items-center justify-between p-5 lg:hidden border-b border-white/[0.06]">
          <LogoLink id="mob1" />
          <Link
            href="/signup"
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign up <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12">
          <div className="w-full max-w-sm">
            {/* Glass card */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8 shadow-2xl shadow-black/40">
              <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-xl bg-white/5" />}>
                <LoginForm />
              </Suspense>
            </div>

            {/* Bottom trust line */}
            <p className="text-center text-xs text-white/25 mt-6">
              Protected by 256-bit SSL &nbsp;&middot;&nbsp;{' '}
              <Link href="/policy" className="hover:text-white/50 transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
