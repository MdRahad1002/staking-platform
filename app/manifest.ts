import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StakeOnix Crypto Staking Platform',
    short_name: 'StakeOnix',
    description: 'Earn daily passive income on Bitcoin, Ethereum, USDT, Solana & 10+ cryptocurrencies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#4F46E5',
    orientation: 'portrait-primary',
    categories: ['finance', 'business'],
    icons: [
      {
        src: '/icon',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
