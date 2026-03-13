import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 96, height: 96 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 96,
          height: 96,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 40 40"
          width="72"
          height="72"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          {/* Hexagon background */}
          <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="url(#g)" />
          {/* S-shaped staking bars */}
          <rect x="12" y="10" width="13" height="4.5" rx="1.5" fill="white" />
          <rect x="12" y="10" width="4.5" height="9" rx="1.5" fill="white" />
          <rect x="12" y="17" width="16" height="4.5" rx="1.5" fill="white" />
          <rect x="23.5" y="17" width="4.5" height="9" rx="1.5" fill="white" />
          <rect x="15" y="25.5" width="13" height="4.5" rx="1.5" fill="white" />
        </svg>
      </div>
    ),
    { width: 96, height: 96 },
  )
}
