import { Info } from 'lucide-react'
import { comparisonRows } from '../data'
import { cn } from '@/lib/utils'

export function ComparisonTable() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50" aria-labelledby="comparison-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="comparison-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight mb-4"
          >
            How staking compares to GICs and HISAs
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Canadians compare obsessively — so we built the comparison for you.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Staking vs traditional savings comparison">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th scope="col" className="text-left py-4 px-6 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                    Product
                  </th>
                  <th scope="col" className="text-left py-4 px-6 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                    Typical Yield
                  </th>
                  <th scope="col" className="text-left py-4 px-6 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                    Liquidity
                  </th>
                  <th scope="col" className="text-left py-4 px-6 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                    Insured
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((row) => (
                  <tr
                    key={row.product}
                    className={cn(
                      'transition-colors',
                      row.highlight
                        ? 'bg-[#00C896]/[0.04] hover:bg-[#00C896]/[0.07]'
                        : 'hover:bg-gray-50'
                    )}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {row.highlight && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00C896] flex-shrink-0" aria-hidden="true" />
                        )}
                        <span
                          className={cn(
                            'font-medium',
                            row.highlight ? 'text-[#0A1628] font-semibold' : 'text-gray-700'
                          )}
                        >
                          {row.product}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={cn(
                          'font-semibold tabular-nums',
                          row.highlight ? 'text-[#00C896] text-base' : 'text-gray-600'
                        )}
                      >
                        {row.yield}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{row.liquidity}</td>
                    <td className="py-4 px-6">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium',
                          row.insured.includes('CDIC ✓')
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-gray-100 text-gray-500'
                        )}
                      >
                        {row.insured}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Honest note */}
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
          <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-amber-800">
            <strong>Honest disclaimer:</strong> Crypto staking is not CDIC-insured and carries market
            risk, network risk, and slashing risk. Yields shown are estimates and not guaranteed.
            StakeOnix segregates client assets and publishes weekly proof of reserves — but staking is
            not equivalent to a GIC or HISA. Only stake what you&apos;re comfortable holding long-term.
          </p>
        </div>
      </div>
    </section>
  )
}
