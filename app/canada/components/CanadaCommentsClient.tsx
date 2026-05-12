'use client'

import dynamic from 'next/dynamic'

// ssr: false is only valid inside a Client Component — keep it here, not in page.tsx
const CanadaComments = dynamic(
  () => import('./CanadaComments').then((m) => ({ default: m.CanadaComments })),
  { ssr: false }
)

export function CanadaCommentsClient() {
  return <CanadaComments />
}
