'use client'

const partners = [
  { name: 'BBC',         logo: '/logos/bbc.co.uk.jpg' },
  { name: 'Bloomberg',   logo: '/logos/bloomberg.com.png' },
  { name: 'J.P. Morgan', logo: '/logos/jpmorgan.com.png' },
  { name: 'CoinGecko',   logo: '/logos/coingecko.com.png' },
  { name: 'ING',         logo: '/logos/ing.com.png' },
  { name: 'Shell',       logo: '/logos/shell.com.png' },
  { name: 'Bodø/Glimt',  logo: '/logos/bodo-glimt.no.png' },
  { name: 'Scania',      logo: '/logos/scania.com.png' },
]

function PartnerTile({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 flex-shrink-0">
      <img
        src={logo}
        alt={name}
        width={28}
        height={28}
        className="h-7 w-7 rounded-md object-contain opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
      <span className="text-sm font-semibold text-white/60 whitespace-nowrap select-none">{name}</span>
    </div>
  )
}

export function PartnersMarquee() {
  return (
    <section className="py-12 relative border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-white/[0.01] to-background pointer-events-none z-10" />
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
          As featured in &amp; trusted by
        </p>
      </div>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 gap-6 items-center animate-marquee pr-6">
          {partners.map((p) => <PartnerTile key={p.logo} {...p} />)}
        </div>
        <div className="flex shrink-0 gap-6 items-center animate-marquee pr-6" aria-hidden>
          {partners.map((p) => <PartnerTile key={p.logo + '-dup'} {...p} />)}
        </div>
      </div>
    </section>
  )
}
