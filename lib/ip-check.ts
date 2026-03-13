import { prisma } from './db'

/**
 * Extract the real client IP from a Next.js request.
 * Handles Vercel's X-Forwarded-For header (comma-separated list).
 */
export function getClientIp(req: Request): string | null {
  // Vercel / proxies set X-Forwarded-For: clientIp, proxy1, proxy2, ...
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()

  // Vercel also provides x-real-ip as a fallback
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  return null
}

/**
 * Returns true if the given IP is in the admin-managed blocklist.
 * Uses a short TTL cache (60 s) to avoid a DB hit on every request.
 */
const blocklistCache = new Map<string, { blocked: boolean; expiresAt: number }>()
const CACHE_TTL_MS = 60_000 // 60 seconds

export async function isIpBlocked(ip: string | null): Promise<boolean> {
  if (!ip) return false

  const cached = blocklistCache.get(ip)
  if (cached && Date.now() < cached.expiresAt) return cached.blocked

  try {
    const record = await prisma.ipBlocklist.findFirst({ where: { ip } })
    const blocked = !!record
    blocklistCache.set(ip, { blocked, expiresAt: Date.now() + CACHE_TTL_MS })
    return blocked
  } catch {
    // If DB is unreachable, fail open (don't block legitimate traffic)
    return false
  }
}
