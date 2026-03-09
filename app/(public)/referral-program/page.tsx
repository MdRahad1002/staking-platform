'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Users,
  DollarSign,
  TrendingUp,
  Gift,
  Share2,
  CheckCircle2,
  ArrowRight,
  Rocket,
  Star,
  Crown,
  Zap,
  Trophy,
  ChevronRight,
  Wallet,
} from 'lucide-react'

const TIERS = [
  {
    name: 'Bronze',
    icon: '🥉',
    min: 0,
    target: 1,
    color: 'text-amber-600',
    bg: 'bg-amber-600/10 border-amber-600/30',
    glow: 'hover:border-amber-500/50',
    perk: 'Unlock your referral badge + 5% commission',
  },
  {
    name: 'Silver',
    icon: '🥈',
    min: 1,
    target: 5,
    color: 'text-slate-300',
    bg: 'bg-slate-400/10 border-slate-400/30',
    glow: 'hover:border-slate-300/50',
    perk: 'Top-referrer leaderboard entry',
  },
  {
    name: 'Gold',
    icon: '🥇',
    min: 5,
    target: 10,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/30',
    glow: 'hover:border-yellow-400/50',
    perk: 'Priority support access',
  },
  {
    name: 'Platinum',
    icon: '💎',
    min: 10,
    target: 25,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10 border-cyan-400/30',
    glow: 'hover:border-cyan-400/50',
    perk: 'VIP ambassador status + bonus perks',
  },
]

const steps = [
  {
    num: '01',
    icon: <Rocket className="h-6 w-6" />,
    color: 'bg-cyan-500/15 text-cyan-400',
    title: 'Create your free account',
    desc: 'Sign up in under 2 minutes. No fees, no credit card required.',
  },
  {
    num: '02',
    icon: <Share2 className="h-6 w-6" />,
    color: 'bg-purple-500/15 text-purple-400',
    title: 'Share your unique link',
    desc: 'Get your personal referral link from your dashboard. Share it anywhere - WhatsApp, Telegram, Instagram, or just send it to a friend.',
  },
  {
    num: '03',
    icon: <Users className="h-6 w-6" />,
    color: 'bg-blue-500/15 text-blue-400',
    title: 'Friend signs up & invests',
    desc: 'When they sign up through your link and activate any staking plan, they are tracked as your referral.',
  },
  {
    num: '04',
    icon: <DollarSign className="h-6 w-6" />,
    color: 'bg-green-500/15 text-green-400',
    title: 'You earn 5% commission',
    desc: 'Every time your referral earns staking rewards, you automatically receive 5% of their earnings - for as long as they stake.',
  },
]

function EarningsCalc() {
  const [friends, setFriends] = useState(5)
  const [avgStake, setAvgStake] = useState(500)
  const RATE = 0.05
  const AVG_DAILY = 0.012 // ~1.2% avg daily yield
  const dailyPerFriend = avgStake * AVG_DAILY * RATE
  const monthlyEarnings = dailyPerFriend * friends * 30
  const yearlyEarnings = dailyPerFriend * friends * 365

  return (
    <div className="glass-card p-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-cyan-400" />
        Earnings Calculator
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Friends referred</span>
            <span className="font-bold text-white">{friends} friends</span>
          </div>
          <input
            type="range" min={1} max={50} value={friends}
            onChange={(e) => setFriends(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-muted-foreground/50 mt-1">
            <span>1</span><span>50</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Average stake per friend</span>
            <span className="font-bold text-white">${avgStake.toLocaleString()}</span>
          </div>
          <input
            type="range" min={20} max={5000} step={20} value={avgStake}
            onChange={(e) => setAvgStake(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-muted-foreground/50 mt-1">
            <span>$20</span><span>$5,000</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[{f:3,s:100},{f:5,s:300},{f:10,s:500}].map(p => (
            <button key={`${p.f}-${p.s}`}
              onClick={() => { setFriends(p.f); setAvgStake(p.s) }}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 text-muted-foreground hover:text-cyan-400 transition-all">
              {p.f} friends @ ${p.s}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Monthly</p>
          <p className="text-2xl font-black gradient-text">${monthlyEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-4 text-center">
          <p className="text-xs text-cyan-400 uppercase tracking-wider mb-1">Yearly</p>
          <p className="text-2xl font-black text-white">${yearlyEarnings.toFixed(2)}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground/50 mt-4 text-center">Based on average platform yields. Actual earnings may vary.</p>
    </div>
  )
}

export default function ReferralProgramPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-background to-cyan-950/20" />
        <div className="absolute inset-0 hero-grid opacity-[0.04]" />
        <div className="glow-blob w-[700px] h-[700px] bg-purple-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/3" />

        <div className="container relative mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <Gift className="h-3.5 w-3.5" />
            Referral Program
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Invite Friends.<br />
            <span className="gradient-text">Earn Forever.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
            Earn <span className="text-white font-bold">5% commission</span> on everything your referrals earn - automatically, every single day, for as long as they stake.
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            No cap. No expiry. The more friends you bring, the more you earn together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2 rounded-xl text-base px-8">
                <Rocket className="h-4 w-4" />
                Get My Referral Link
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                Already have an account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="py-12 border-b border-white/5 bg-white/[0.015]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <DollarSign className="h-5 w-5" />, color: 'text-green-400 bg-green-500/15', value: '5%', label: 'Commission Rate' },
              { icon: <Zap className="h-5 w-5" />, color: 'text-yellow-400 bg-yellow-500/15', value: 'Daily', label: 'Payout Frequency' },
              { icon: <Users className="h-5 w-5" />, color: 'text-purple-400 bg-purple-500/15', value: 'Unlimited', label: 'Referrals Allowed' },
              { icon: <Star className="h-5 w-5" />, color: 'text-cyan-400 bg-cyan-500/15', value: '4 Tiers', label: 'Milestone Rewards' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                  {s.icon}
                </div>
                <p className="text-2xl md:text-3xl font-black text-white">{s.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 relative overflow-hidden">
        <div className="glow-blob w-[500px] h-[500px] bg-blue-600/8 top-1/2 right-0 translate-x-1/3 -translate-y-1/2" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Four steps. Takes 2 minutes to set up. Pays you indefinitely.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            {steps.map((step, i) => (
              <div key={step.num} className="relative group">
                <div className="glass-card p-7 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${step.color} group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 -right-3 z-10 items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                    <ChevronRight className="h-3 w-3 text-cyan-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS + CALCULATOR side by side */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/15 to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Tiers */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Milestone Rewards</p>
              <h2 className="text-3xl font-black mb-3">Climb the Ranks</h2>
              <p className="text-muted-foreground mb-8">The more friends you refer, the higher your tier and the more perks you unlock.</p>
              <div className="space-y-4">
                {TIERS.map((tier, i) => (
                  <div key={tier.name} className={`glass-card p-5 flex items-center gap-5 border ${tier.bg} ${tier.glow} transition-all duration-300`}>
                    <div className="text-3xl flex-shrink-0">{tier.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-black text-lg ${tier.color}`}>{tier.name}</span>
                        <span className="text-xs text-muted-foreground/50">
                          {i < TIERS.length - 1 ? `${tier.target} referral${tier.target > 1 ? 's' : ''}` : `${tier.min}+ referrals`}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tier.perk}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10">
                        <Trophy className="h-4 w-4 text-muted-foreground/40" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculator */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Potential Income</p>
              <h2 className="text-3xl font-black mb-3">See What You Could Earn</h2>
              <p className="text-muted-foreground mb-8">Adjust the sliders to estimate your referral income.</p>
              <EarningsCalc />
            </div>
          </div>
        </div>
      </section>

      {/* WHY REFER */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Benefits</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Why Refer Friends to StakeOnix?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: <DollarSign className="h-5 w-5" />,
                color: 'bg-green-500/15 text-green-400',
                title: 'Passive income on top of passive income',
                desc: "You're already earning from staking. Referrals stack another income stream on top - no extra work required.",
              },
              {
                icon: <Zap className="h-5 w-5" />,
                color: 'bg-yellow-500/15 text-yellow-400',
                title: 'Paid automatically every day',
                desc: 'No claiming, no waiting. Commission is credited to your wallet daily alongside your own staking rewards.',
              },
              {
                icon: <Crown className="h-5 w-5" />,
                color: 'bg-purple-500/15 text-purple-400',
                title: 'No limit on referrals',
                desc: 'Refer 1 person or 1,000. There is no ceiling on how many friends you can bring or how much you can earn.',
              },
              {
                icon: <Trophy className="h-5 w-5" />,
                color: 'bg-amber-500/15 text-amber-400',
                title: 'Tier milestones unlock perks',
                desc: 'As you refer more people you climb from Bronze to Platinum, unlocking leaderboard status, priority support, and VIP access.',
              },
              {
                icon: <Share2 className="h-5 w-5" />,
                color: 'bg-blue-500/15 text-blue-400',
                title: 'Share everywhere instantly',
                desc: 'Your dashboard gives you a one-click share link for WhatsApp, Telegram, Twitter, or any other platform.',
              },
              {
                icon: <CheckCircle2 className="h-5 w-5" />,
                color: 'bg-cyan-500/15 text-cyan-400',
                title: 'Your friends benefit too',
                desc: 'They join one of the most trusted staking platforms. You look good, they earn daily - everybody wins.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex gap-4 items-start">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1.5 text-white">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-background to-cyan-950/20" />
        <div className="glow-blob w-[600px] h-[400px] bg-purple-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-600/20 text-purple-400 mx-auto mb-6">
              <Gift className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to Start Earning From Referrals?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Create your free account, grab your link, and start sharing. Your first commission could arrive tomorrow.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-xl text-base px-10">
                  <Wallet className="h-4 w-4" />
                  Create Free Account
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                  Go to My Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
