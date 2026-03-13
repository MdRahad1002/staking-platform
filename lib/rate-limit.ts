/**
 * In-memory sliding-window rate limiter.
 *
 * ⚠️  Works correctly on single-process deployments (local dev, single Vercel
 *     instance).  For horizontally-scaled / serverless environments, replace
 *     the Map with a distributed store (Vercel KV / Upstash Redis) so limits
 *     are enforced across all instances.
 *
 * Usage:
 *   const { success, retryAfter } = rateLimit('login:' + ip, 10, 60_000)
 *   if (!success) return NextResponse.json({ error: '...' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } })
 */

interface RateLimitStore {
  timestamps: number[]
  blockedUntil?: number
}

const store = new Map<string, RateLimitStore>()

// GC: purge entries that haven't had a request in > 10 min to avoid memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of store.entries()) {
    const newest = value.timestamps[value.timestamps.length - 1] ?? 0
    if (now - newest > 10 * 60_000) store.delete(key)
  }
}, 5 * 60_000)

/**
 * @param key        Unique string per action+identity (e.g. `login:1.2.3.4`)
 * @param limit      Max requests allowed in the window
 * @param windowMs   Window size in milliseconds
 * @param blockMs    Optional hard-block duration after limit exceeded (ms)
 * @returns          { success, remaining, retryAfter }
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  blockMs = 0,
): { success: boolean; remaining: number; retryAfter: number } {
  const now = Date.now()
  const entry = store.get(key) ?? { timestamps: [] }

  // Check hard-block first
  if (entry.blockedUntil && now < entry.blockedUntil) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((entry.blockedUntil - now) / 1000),
    }
  }

  // Slide window: keep only timestamps within the current window
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs)

  if (entry.timestamps.length >= limit) {
    // Optionally impose a hard block beyond the window
    if (blockMs > 0) entry.blockedUntil = now + blockMs
    store.set(key, entry)
    const oldest = entry.timestamps[0] ?? now
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((oldest + windowMs - now) / 1000),
    }
  }

  entry.timestamps.push(now)
  store.set(key, entry)

  return {
    success: true,
    remaining: limit - entry.timestamps.length,
    retryAfter: 0,
  }
}

/** Convenience: return a 429 NextResponse with standard headers */
export function rateLimitResponse(retryAfter: number) {
  const { NextResponse } = require('next/server') as typeof import('next/server')
  return NextResponse.json(
    { error: 'Too many requests. Please slow down and try again.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': '0',
      },
    },
  )
}
