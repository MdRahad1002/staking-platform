import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { PUBLIC_CONTENT_PATHS } from '@/lib/seo-routes'

// ── Static patterns that are always public ────────────────────────────────────
// Public content routes come from the shared SEO source of truth so the sitemap
// and this allowlist can never desync. Auth/utility routes are added on top.
const PUBLIC_EXACT = new Set<string>([
  ...PUBLIC_CONTENT_PATHS,
  '/login',
  '/signup',
  '/auth-re-password',
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
])

const PUBLIC_PREFIXES = [
  '/api/auth',
  '/api/cron',
  '/api/crypto-prices',
  '/api/contact',
  '/api/unsubscribe',
  '/api/trading/market', // public Binance market data, no auth needed
  // NOTE: /api/test-email is intentionally NOT public guarded by CRON_SECRET
  '/_next',
  '/favicon',
  '/uploads',
]

const PUBLIC_EXTENSIONS = /\.(png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|eot|xml|txt|webmanifest)$/i

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_EXACT.has(pathname)) return true
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) return true
  if (PUBLIC_EXTENSIONS.test(pathname)) return true
  // Dynamic public segments
  if (pathname.startsWith('/verify-email')) return true
  if (pathname.startsWith('/referral-program')) return true
  if (pathname.startsWith('/why-choose-us')) return true
  if (pathname.startsWith('/what-is-staking')) return true
  if (pathname.startsWith('/what-is-mining')) return true
  if (pathname.startsWith('/plans')) return true
  if (pathname.startsWith('/faq')) return true
  if (pathname.startsWith('/contact')) return true
  if (pathname.startsWith('/about')) return true
  if (pathname.startsWith('/canada')) return true
  if (pathname.startsWith('/blog')) return true
  return false
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // ── Role-based access control ────────────────────────────────────────────

    // Admin routes ADMIN only
    if (pathname.startsWith('/admin')) {
      if (token?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    // Worker routes WORKER or ADMIN
    if (pathname.startsWith('/worker')) {
      if (token?.role !== 'WORKER' && token?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    // Support routes SUPPORT, WORKER, or ADMIN
    if (pathname.startsWith('/support')) {
      if (
        token?.role !== 'SUPPORT' &&
        token?.role !== 'WORKER' &&
        token?.role !== 'ADMIN'
      ) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    // ── Security response headers added at the edge ──────────────────────────
    const res = NextResponse.next()
    res.headers.set('X-Frame-Options', 'DENY')
    res.headers.set('X-Content-Type-Options', 'nosniff')
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    return res
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        if (isPublicPath(pathname)) return true

        // A twoFaPending token means password was correct but TOTP not yet
        // verified treat as unauthenticated for all protected routes.
        return !!token && !token.twoFaPending
      },
    },
  }
)

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

