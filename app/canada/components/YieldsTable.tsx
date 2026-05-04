'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronRight, Info, RefreshCw } from 'lucide-react'
import { yields, CTA_HREF } from '../data'
import Link from 'next/link'

const CDN = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color'

function TokenLogo({ symbol, name }: { symbol: string; name: string }) {
  return (
    <div className='h-9 w-9 rounded-full overflow-hidden flex-shrink-0 shadow-md bg-white/10' aria-hidden='true'>
      <Image
        src={`${CDN}/${symbol}.svg`}
        alt={name}
        width={36}
        height={36}
        className='h-9 w-9'
        unoptimized
      />
    </div>
  )
}

export function YieldsTable() {
  const [activeRow, setActiveRow] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState('')

  useEffect(() => {
    // Show a timestamp that feels live, anchored to the last round hour
    const now = new Date()
    now.setMinutes(0, 0, 0)
    setUpdatedAt(now.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }))
  }, [])

  return (
    <section id="yields" className="py-20 lg:py-28 bg-white" aria-labelledby="yields-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="yields-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight mb-4"
          >
            Current yields, updated live
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-2">
            Scan chain details, unbonding periods, and minimums before you commit a single dollar.
          </p>
          {updatedAt && (
            <p className="inline-flex items-center gap-1.5 text-xs text-gray-400 mt-1">
              <RefreshCw className="h-3 w-3" aria-hidden="true" />
              Rates last updated {updatedAt}
            </p>
          )}
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm" aria-label="Staking yields by chain">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th scope="col" className="text-left py-4 px-6 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                    Token
                  </th>
                  <th scope="col" className="text-left py-4 px-6 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                    Network
                  </th>
                  <th scope="col" className="text-left py-4 px-6 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                    APY
                  </th>
                  <th scope="col" className="text-left py-4 px-6 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                    Unbonding Period
                  </th>
                  <th scope="col" className="text-left py-4 px-6 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                    Min Stake
                  </th>
                  <th scope="col" className="py-4 px-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {yields.map((row) => (
                  <tr
                    key={row.network}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => setActiveRow(activeRow === row.network ? null : row.network)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActiveRow(activeRow === row.network ? null : row.network)
                      }
                    }}
                    role="row"
                    aria-expanded={activeRow === row.network}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <TokenLogo symbol={row.logoSymbol} name={row.token} />
                        <span className="font-semibold text-[#0A1628]">{row.token}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                        {row.network}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[#00C896] font-bold text-xl tabular-nums">{row.apy}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{row.unbonding}</td>
                    <td className="py-4 px-6 text-gray-600">{row.minStake}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400 group-hover:text-[#00C896] transition-colors">
                        Details
                        <ChevronRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100">
            {yields.map((row) => (
              <div key={row.network} className="px-4 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <TokenLogo symbol={row.logoSymbol} name={row.token} />
                    <div>
                      <p className="font-semibold text-[#0A1628]">{row.token}</p>
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {row.network}
                      </span>
                    </div>
                  </div>
                  <span className="text-[#00C896] font-bold text-2xl tabular-nums">{row.apy}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Unbonding</p>
                    <p className="text-gray-700 font-medium">{row.unbonding}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Min Stake</p>
                    <p className="text-gray-700 font-medium">{row.minStake}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note + CTA */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="flex items-start sm:items-center gap-1.5 text-sm text-gray-400">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
            Yields update every 24 hours. Past performance does not guarantee future results.
          </p>
          <Link
            href={CTA_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-semibold text-sm px-6 py-3 transition-all duration-200 hover:shadow-lg hover:shadow-[#00C896]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896] focus-visible:ring-offset-2 whitespace-nowrap"
          >
            Start Staking
          </Link>
        </div>
      </div>
    </section>
  )
}
