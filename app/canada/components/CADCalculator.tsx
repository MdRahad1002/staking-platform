'use client'

import { useState, useMemo } from 'react'
import { yields, CTA_HREF } from '../data'
import Link from 'next/link'
import Image from 'next/image'

// Best 1-yr GIC rate on the market (Apr 2025 average)
const GIC_APY = 3.9

const CDN = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color'

const PRESETS = [1000, 5000, 10000, 25000, 50000]

function fmt(n: number, decimals = 2) {
  return n.toLocaleString('en-CA', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function CADCalculator() {
  const [cadAmount, setCadAmount] = useState(5000)
  const [inputValue, setInputValue] = useState('5,000')
  const [selectedNetwork, setSelectedNetwork] = useState('SOL')

  const row = useMemo(
    () => yields.find((y) => y.network === selectedNetwork) ?? yields[0],
    [selectedNetwork]
  )

  const annualCAD   = (cadAmount * row.apyValue) / 100
  const monthlyCAD  = annualCAD / 12
  const dailyCAD    = annualCAD / 365

  // What you'd earn in a GIC
  const gicAnnual   = (cadAmount * GIC_APY) / 100
  const gicDaily    = gicAnnual / 365

  // Opportunity cost (what you LOSE by staying in GIC)
  const lostAnnual  = Math.max(0, annualCAD - gicAnnual)
  const lostDaily   = Math.max(0, dailyCAD - gicDaily)

  function handleInput(raw: string) {
    const numeric = raw.replace(/[^0-9]/g, '')
    const n = parseInt(numeric || '0', 10)
    setCadAmount(n)
    setInputValue(n === 0 ? '' : n.toLocaleString('en-CA'))
  }

  return (
    <section
      id="calculator"
      className="py-20 lg:py-28 bg-gradient-to-b from-[#f0faf6] to-white"
      aria-labelledby="calc-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-red-100 text-red-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-4">
            Daily Opportunity Cost
          </span>
          <h2
            id="calc-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight mb-3"
          >
            How Much Is Your GIC Costing You?{' '}<span className="text-red-500">Every Single Day.</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Enter your amount and see the gap between a GIC and staking live, in dollars, per day.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
          {/* Inputs */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* CAD amount */}
            <div>
              <label htmlFor="cad-input" className="block text-sm font-semibold text-gray-700 mb-2">
                Amount in CAD
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 font-semibold text-lg pointer-events-none">
                  $
                </span>
                <input
                  id="cad-input"
                  type="text"
                  inputMode="numeric"
                  value={inputValue}
                  onChange={(e) => handleInput(e.target.value)}
                  className="w-full pl-8 pr-4 py-3.5 rounded-xl border border-gray-200 text-[#0A1628] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] transition"
                  placeholder="5,000"
                  aria-label="Amount in Canadian dollars"
                />
              </div>
              {/* Presets */}
              <div className="flex flex-wrap gap-2 mt-3">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => { setCadAmount(p); setInputValue(p.toLocaleString('en-CA')) }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors ${
                      cadAmount === p
                        ? 'bg-[#00C896] border-[#00C896] text-white'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-[#00C896] hover:text-[#00C896]'
                    }`}
                  >
                    ${p.toLocaleString('en-CA')}
                  </button>
                ))}
              </div>
            </div>

            {/* Asset selector */}
            <div>
              <p className="block text-sm font-semibold text-gray-700 mb-2">Staking asset</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {yields.map((y) => (
                  <button
                    key={y.network}
                    type="button"
                    onClick={() => setSelectedNetwork(y.network)}
                    className={`flex items-center gap-2.5 rounded-xl border p-3 transition-all ${
                      selectedNetwork === y.network
                        ? 'border-[#00C896] bg-[#00C896]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    aria-pressed={selectedNetwork === y.network}
                  >
                    <div className='h-8 w-8 rounded-full overflow-hidden flex-shrink-0 bg-white shadow-sm'>
                      <Image
                        src={`${CDN}/${y.logoSymbol}.svg`}
                        alt={y.token}
                        width={32}
                        height={32}
                        className='h-8 w-8'
                        unoptimized
                      />
                    </div>
                    <div className="text-left min-w-0">
                      <p className={`text-xs font-bold leading-none ${selectedNetwork === y.network ? 'text-[#00C896]' : 'text-gray-700'}`}>
                        {y.network}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{y.apy} APY</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#0d2040] px-6 sm:px-8 py-7">

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* GIC column */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Best 1-yr GIC</p>
                <p className="text-white/50 text-xs mb-0.5">{GIC_APY}% / year</p>
                <p className="text-white font-bold text-xl tabular-nums mb-0.5">${fmt(gicDaily)}<span className="text-xs font-normal text-white/40">/day</span></p>
                <p className="text-white/30 text-xs">${fmt(gicAnnual, 0)}/yr</p>
              </div>

              {/* Staking column */}
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-center relative overflow-hidden">
                <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2">Staking ({row.network})</p>
                <p className="text-emerald-400/70 text-xs mb-0.5">{row.apy} / year</p>
                <p className="text-emerald-400 font-bold text-xl tabular-nums mb-0.5">${fmt(dailyCAD)}<span className="text-xs font-normal text-emerald-400/60">/day</span></p>
                <p className="text-emerald-400/60 text-xs">${fmt(annualCAD, 0)}/yr</p>
              </div>
            </div>

            {/* Opportunity cost callout */}
            {lostAnnual > 0 && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-5 py-4 mb-5 text-center">
                <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">You leave behind every day you wait</p>
                <p className="text-red-400 font-black text-3xl tabular-nums">${fmt(lostDaily)}</p>
                <p className="text-red-400/60 text-xs mt-1">${fmt(lostAnnual, 0)} per year in missed rewards</p>
              </div>
            )}

            <p className="text-white/25 text-xs text-center mb-5">
              Staking rewards are estimates only. Actual returns vary. GIC rate based on best posted rate, Apr 2025.
            </p>
            <Link
              href={CTA_HREF}
              className="flex items-center justify-center w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Stop Losing Start Staking Free →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
