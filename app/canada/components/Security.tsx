import { Shield, Layers, Lock, Eye, ExternalLink } from 'lucide-react'
import { securityItems } from '../data'

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Layers,
  Lock,
  Eye,
}

export function Security() {
  return (
    <section id="security" className="py-20 lg:py-28 bg-[#0A1628]" aria-labelledby="security-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            id="security-heading"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4"
          >
            Built like a Canadian financial institution should be
          </h2>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Regulatory compliance isn&apos;t a checkbox for us. It&apos;s the foundation.
          </p>
        </div>

        {/* 4-item grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10" role="list">
          {securityItems.map((item) => {
            const Icon = iconMap[item.icon] ?? Shield
            return (
              <div
                key={item.headline}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#00C896]/30 hover:bg-white/[0.07] transition-all duration-300 group"
                role="listitem"
              >
                <div className="h-11 w-11 rounded-xl bg-[#00C896]/10 border border-[#00C896]/20 flex items-center justify-center mb-5 group-hover:bg-[#00C896]/15 transition-colors">
                  <Icon className="h-5 w-5 text-[#00C896]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{item.headline}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{item.body}</p>
              </div>
            )
          })}
        </div>

        {/* Link */}
        <div className="text-center">
          <a
            href="/security"
            className="inline-flex items-center gap-2 text-[#00C896] font-semibold hover:underline underline-offset-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896] rounded"
          >
            Read our full security disclosure
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
