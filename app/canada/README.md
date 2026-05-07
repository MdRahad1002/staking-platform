# /canada: Canadian Staking Landing Page

High-converting landing page targeting Canadian crypto stakers. Lives at `/canada` and serves as the destination for all Canadian marketing traffic (SEO, KOL links, Reddit, referrals).

---

## Placeholders to fill in before launch

Open `app/canada/data.ts` and replace the following constants:

| Constant | Description | Where to find it |
|---|---|---|
| `CSA_REGISTRATION_TYPE` | Your registration type (e.g., "Restricted Dealer") | Your CSA registration certificate |
| `CSA_DECISION_URL` | Direct link to your CSA decision / registration page | securities-administrators.ca |
| `FINTRAC_MSB_NUMBER` | Your FINTRAC MSB registration number | fintrac-canafe.gc.ca |
| `AUDITOR_NAME` | Name of your proof-of-reserves auditor | Internal |
| `TOTAL_STAKED_CAD` | Dollar figure staked by Canadian users (e.g., "$12M+") | Dashboard / analytics |
| `SUPPORT_EMAIL` | Already set to `info@stakeonix.ca`. Update if different | n/a |

---

## How to update yields

Yields are in `app/canada/data.ts` under the `yields` array. Each entry has:

```ts
{
  token: 'Ethereum',   // display name
  network: 'ETH',      // ticker
  apy: '4.2%',         // display string
  apyValue: 4.2,       // numeric (for logic)
  unbonding: '2–5 days',
  minStake: '0.01 ETH',
  logoSymbol: 'ETH',   // used to render the avatar
  color: '#627EEA',    // token brand color
}
```

Update `apy` and `apyValue` as network conditions change. Consider connecting these to a live API route (e.g., `/api/staking-yields`) and making `YieldsTable` a server component that fetches fresh data on each request.

---

## How to update FAQ answers

FAQ content is in `app/canada/data.ts` under `faqItems`. Each item is `{ question, answer }`. Add, remove, or reorder freely. The accordion in `FAQ.tsx` renders them dynamically.

---

## UTM passthrough

All CTAs link to `/signup?utm_source=canada-lp`. When users arrive at `/canada` with UTM parameters (e.g., `?utm_source=reddit&utm_campaign=may-launch`), those params are **not** automatically merged into the CTA link.

To enable full UTM passthrough, update `CanadaNav.tsx`, `Hero.tsx`, `YieldsTable.tsx`, `HowItWorks.tsx`, `FinalCTA.tsx`, and `StickyMobileCTA.tsx` to read `useSearchParams()` and append inbound UTM params to the CTA href. Example:

```tsx
'use client'
import { useSearchParams } from 'next/navigation'

function useCTAHref(base: string) {
  const params = useSearchParams()
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const url = new URL(base, 'https://www.stakeonix.ca')
  utmKeys.forEach((k) => {
    const v = params.get(k)
    if (v) url.searchParams.set(k, v)
  })
  return url.pathname + url.search
}
```

---

## Design system

- **Accent color:** `#00C896` (emerald): used for all CTAs, active states, token APY values
- **Primary background (dark sections):** `#0A1628` (deep navy)
- **Light sections:** `#FFFFFF` and `#F9FAFB`
- **Footer background:** `#060E1C`
- All sections use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for consistent gutters

## File structure

```
app/canada/
├── page.tsx              ← main page (JSON-LD + component assembly)
├── layout.tsx            ← SEO metadata (title, OG, Twitter card, canonical)
├── data.ts               ← ALL content: yields, FAQ, comparison, placeholders
├── README.md             ← this file
└── components/
    ├── CanadaNav.tsx     ← sticky transparent→white navbar
    ├── Hero.tsx          ← hero with live APY tickers
    ├── TrustBar.tsx      ← full-width regulatory trust strip
    ├── YieldsTable.tsx   ← interactive yields table (desktop + mobile cards)
    ├── TaxAdvantage.tsx  ← CRA tax differentiator section
    ├── ComparisonTable.tsx ← staking vs GIC/HISA comparison
    ├── HowItWorks.tsx    ← 3-step onboarding
    ├── Security.tsx      ← 4-item security grid
    ├── FAQ.tsx           ← custom accordion FAQ (no external dependency)
    ├── FinalCTA.tsx      ← full-width emerald CTA section
    ├── StickyMobileCTA.tsx ← bottom bar shown after hero scroll (mobile only)
    └── Footer.tsx        ← 4-column footer with legal disclosures
```
