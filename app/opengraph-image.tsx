import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'StakeOnix - Earn Passive Income on Crypto'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow blobs */}
        <div style={{ position: 'absolute', top: -120, left: -120, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -100, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', display: 'flex' }} />

        {/* Logo + brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
          <svg viewBox="0 0 40 40" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="50%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            <polygon points="20,2 35,11 35,29 20,38 5,29 5,11" fill="url(#lg1)" />
            <rect x="12" y="10" width="13" height="4.5" rx="1.5" fill="white" />
            <rect x="12" y="10" width="4.5" height="9" rx="1.5" fill="white" />
            <rect x="12" y="17" width="16" height="4.5" rx="1.5" fill="white" />
            <rect x="23.5" y="17" width="4.5" height="9" rx="1.5" fill="white" />
            <rect x="15" y="25.5" width="13" height="4.5" rx="1.5" fill="white" />
          </svg>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-2px',
            }}
          >
            StakeOnix
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#cbd5e1',
            letterSpacing: '0.02em',
            marginBottom: 52,
            textAlign: 'center',
          }}
        >
          Earn Daily Passive Income on Your Crypto
        </div>

        {/* Stat pills */}
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { label: 'Daily Returns', value: 'Up to 5%' },
            { label: 'Investors', value: '10,000+' },
            { label: 'Min. Deposit', value: '$20' },
            { label: 'Coins Supported', value: '10+' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 16,
                padding: '18px 28px',
                minWidth: 160,
              }}
            >
              <span style={{ fontSize: 30, fontWeight: 700, color: '#38bdf8' }}>{s.value}</span>
              <span style={{ fontSize: 14, color: '#94a3b8', marginTop: 4 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Domain badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            right: 40,
            fontSize: 18,
            color: 'rgba(148,163,184,0.7)',
            letterSpacing: '0.05em',
          }}
        >
          www.stakeonix.com
        </div>
      </div>
    ),
    { ...size },
  )
}
