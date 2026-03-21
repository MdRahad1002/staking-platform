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
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-md transition-all duration-200 flex-shrink-0">
      <img
        src={logo}
        alt={name}
        width={32}
        height={32}
        className="h-8 w-8 rounded-sm object-contain flex-shrink-0"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
      <span className="text-sm font-semibold text-slate-700 whitespace-nowrap select-none">{name}</span>
    </div>
  )
}

export function PartnersMarquee() {
  return (
    <section className="py-12 relative overflow-hidden bg-slate-100 border-y border-slate-200">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-transparent to-slate-100 pointer-events-none z-10" />
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
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
