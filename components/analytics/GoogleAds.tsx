'use client'

import Script from 'next/script'

/**
 * Google Ads global site tag (gtag.js).
 *
 * Tagging the site with the Google Ads `config` automatically enables
 * REMARKETING (audience building) for that account. Conversion tracking can be
 * layered on later with the reportAdsConversion() helper below.
 *
 * Inert until NEXT_PUBLIC_GOOGLE_ADS_ID is set in the environment (e.g. Vercel),
 * so this ships safely now and activates the moment you paste your AW-XXXX id.
 */
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

export function GoogleAds() {
  if (!ADS_ID) return null

  return (
    <>
      <Script
        id="google-ads-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  )
}

/**
 * Fire a Google Ads conversion. Call after a successful signup/deposit once you
 * have a conversion label from Google Ads.
 * Example: reportAdsConversion('AbC-D_efGh', 1, 'USD')
 */
export function reportAdsConversion(conversionLabel: string, value?: number, currency = 'USD') {
  if (!ADS_ID) return
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag !== 'function') return
  w.gtag('event', 'conversion', {
    send_to: `${ADS_ID}/${conversionLabel}`,
    ...(value != null ? { value, currency } : {}),
  })
}
