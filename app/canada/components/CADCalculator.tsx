'use client'

import { useState, useMemo } from 'react'
import { yields, CTA_HREF } from '../data'
import Link from 'next/link'
import Image from 'next/image'

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

  const annualCAD = (cadAmount * row.apyValue) / 100
  const monthlyCAD = annualCAD / 12
  const dailyCAD = annualCAD / 365

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
          <span className="inline-block rounded-full bg-[#00C896]/10 text-[#00C896] text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-4">
            Reward Estimator
          </span>
          <h2
            id="calc-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight mb-3"
          >
            Estimate Possible Staking Rewards
          </h2>
          <p className="text-gray-500 text-lg">
            Use this tool to understand how staking estimates may work. Actual rewards are variable and not guaranteed.
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
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-white/50 text-xs font-medium mb-1">Daily</p>
                <p className="text-white font-bold text-xl tabular-nums">${fmt(dailyCAD)}</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-white/50 text-xs font-medium mb-1">Monthly</p>
                <p className="text-white font-bold text-xl tabular-nums">${fmt(monthlyCAD)}</p>
              </div>
              <div className="text-center">
                <p className="text-[#00C896] text-xs font-semibold mb-1">Annual</p>
                <p className="text-[#00C896] font-extrabold text-2xl tabular-nums">${fmt(annualCAD)}</p>
              </div>
            </div>
            <p className="text-white/30 text-xs text-center mb-5">
              This is an estimate only. Rewards may change based on asset, network conditions, plan terms, and market risk. Not a guarantee.
            </p>
            <Link
              href={CTA_HREF}
              className="flex items-center justify-center w-full rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-semibold py-3.5 transition-all hover:shadow-lg hover:shadow-[#00C896]/25"
            >
              View My Staking Options
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
