/**
 * NOWPayments integration
 * Docs: https://documenter.getpostman.com/view/7907941/2s93JqTRWN
 */
import crypto from 'crypto'

const BASE_URL = 'https://api.nowpayments.io/v1'
const API_KEY = (process.env.NOWPAYMENTS_API_KEY || '').trim()
const IPN_SECRET = (process.env.NOWPAYMENTS_IPN_SECRET || '').trim()

// ─── Error type ──────────────────────────────────────────────────────────────
export class NowPaymentsError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode?: number
  ) {
    super(message)
    this.name = 'NowPaymentsError'
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NowPayment {
  payment_id: string
  payment_status: string   // waiting | confirming | confirmed | sending | partially_paid | finished | failed | refunded | expired
  pay_address: string
  price_amount: number
  price_currency: string
  pay_amount: number
  pay_currency: string
  order_id: string
  expiration_estimate_date: string | null
}

export interface NowPaymentStatus extends NowPayment {
  actually_paid: number
  outcome_amount: number | null
  outcome_currency: string | null
}

export interface NowCurrency {
  id: string
  name: string
  currency: string
  is_fiat: boolean
  enabled: boolean
  logo_url: string
  network: string
  min_amount: number
  max_amount: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function nowFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  })

  if (!res.ok) {
    let code = 'NOWPAYMENTS_ERROR'
    let message = `NOWPayments error ${res.status}`
    try {
      const json = await res.json() as { code?: string; message?: string; statusCode?: number }
      code = json.code ?? code
      message = json.message ?? message
      throw new NowPaymentsError(code, message, res.status)
    } catch (e) {
      if (e instanceof NowPaymentsError) throw e
      // fallback if body isn't JSON
      const text = await res.text().catch(() => '')
      throw new NowPaymentsError(code, text || message, res.status)
    }
  }

  return res.json() as Promise<T>
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Create a payment request.
 * @param priceUsd  - Amount in USD the user wants to deposit
 * @param payCrypto - Crypto they will pay with (e.g. "btc")
 * @param orderId   - Your internal deposit DB id
 * @param ipnUrl    - Webhook URL (optional — polling works without it)
 */
export async function createPayment(
  priceUsd: number,
  payCrypto: string,
  orderId: string,
  ipnUrl?: string
): Promise<NowPayment> {
  const body: Record<string, unknown> = {
    price_amount: priceUsd,
    price_currency: 'usd',
    pay_currency: payCrypto.toLowerCase(),
    order_id: orderId,
    order_description: 'StakeOnix deposit',
  }
  if (ipnUrl) body.ipn_callback_url = ipnUrl

  return nowFetch<NowPayment>('/payment', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

/**
 * Get current status / payment info.
 */
export async function getPaymentStatus(paymentId: string): Promise<NowPaymentStatus> {
  return nowFetch<NowPaymentStatus>(`/payment/${paymentId}`)
}

/**
 * Get available currencies from NOWPayments.
 */
export async function getAvailableCurrencies(): Promise<NowCurrency[]> {
  const res = await nowFetch<{ currencies: NowCurrency[] }>('/currencies?fixed_rate=false')
  return res.currencies ?? []
}

/**
 * Get the minimum payment amount in USD for the given pay_currency.
 * Uses currency_from=usd so the result is in USD directly.
 * Returns 0 on failure so the caller can still attempt the payment.
 */
export async function getMinAmount(payCurrency: string): Promise<number> {
  try {
    const res = await nowFetch<{ min_amount: number }>(
      `/min-amount?currency_from=usd&currency_to=${payCurrency.toLowerCase()}`
    )
    return res.min_amount ?? 0
  } catch {
    return 0
  }
}

/**
 * Recursively sort all keys of an object alphabetically.
 * Required by NOWPayments' IPN signature scheme (nested objects like `fee` must
 * also be sorted before hashing).
 */
function sortObjectDeep(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortObjectDeep)
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortObjectDeep((obj as Record<string, unknown>)[key])
        return acc
      }, {})
  }
  return obj
}

/**
 * Verify the HMAC-SHA512 signature of an IPN webhook from NOWPayments.
 * Called in the webhook route to ensure the request is genuine.
 *
 * Algorithm (from NowPayments docs):
 *   1. Parse the raw JSON body
 *   2. Recursively sort all keys alphabetically
 *   3. Re-serialize with JSON.stringify
 *   4. HMAC-SHA512 with the IPN secret
 *   5. Compare hex digest to x-nowpayments-sig header
 */
export function verifyIpnSignature(rawBody: string, signature: string): boolean {
  if (!IPN_SECRET) return false
  try {
    const parsed = JSON.parse(rawBody)
    const sortedJson = JSON.stringify(sortObjectDeep(parsed))
    const expected = crypto
      .createHmac('sha512', IPN_SECRET.trim())
      .update(sortedJson)
      .digest('hex')
    return crypto.timingSafeEqual(
      Buffer.from(signature.toLowerCase()),
      Buffer.from(expected.toLowerCase())
    )
  } catch {
    return false
  }
}

/**
 * True if the payment is fully confirmed/finished.
 */
export function isPaymentConfirmed(status: string): boolean {
  return ['confirmed', 'sending', 'finished'].includes(status)
}

/**
 * True if the payment has failed / expired.
 */
export function isPaymentFailed(status: string): boolean {
  return ['failed', 'expired', 'refunded'].includes(status)
}

/**
 * Map a DB currency symbol + network to the NOWPayments currency code.
 * Full list: https://nowpayments.io/supported-currencies
 */
export function toNowPaymentsCode(symbol: string, network: string): string {
  const s = symbol.toLowerCase()
  const n = network.toLowerCase()

  // Stablecoins — network-specific codes
  if (s === 'usdt') {
    if (n === 'trc20') return 'usdttrc20'
    if (n === 'bep20' || n === 'bsc') return 'usdtbsc'
    if (n.includes('polygon') || n === 'matic') return 'usdtmatic'
    if (n === 'sol' || n.includes('solana')) return 'usdtsol'
    return 'usdterc20' // default to ERC20
  }
  if (s === 'usdc') {
    if (n === 'trc20') return 'usdctrc20'
    if (n === 'bep20' || n === 'bsc') return 'usdcbsc'
    if (n.includes('polygon') || n === 'matic') return 'usdcmatic'
    if (n === 'sol' || n.includes('solana')) return 'usdcsol'
    return 'usdcerc20'
  }
  if (s === 'trx') return 'trx'
  if (s === 'bnb') {
    if (n === 'bep20' || n === 'bsc') return 'bnbbsc'
    return 'bnb'
  }
  // Everything else: just lowercase symbol
  return s
}

