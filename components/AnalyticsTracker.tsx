'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// Generate or retrieve a persistent session ID (tab-scoped)
function getSessionId(): string {
  try {
    let id = sessionStorage.getItem('_sx_sid')
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem('_sx_sid', id)
    }
    return id
  } catch {
    return crypto.randomUUID()
  }
}

// Describe a clicked element without capturing PII
function describeElement(el: Element): string {
  const tag = el.tagName.toLowerCase()
  const label =
    el.getAttribute('aria-label') ||
    el.getAttribute('data-track') ||
    (el as HTMLElement).innerText?.trim().slice(0, 80) ||
    el.getAttribute('id') ||
    el.getAttribute('name') ||
    ''
  return `${tag}:${label}`.slice(0, 200)
}

const ENDPOINT = '/api/analytics'

function send(payload: Record<string, unknown>) {
  // Use sendBeacon when available for exit events; fetch otherwise
  const data = JSON.stringify(payload)
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon(ENDPOINT, new Blob([data], { type: 'application/json' }))
  } else {
    fetch(ENDPOINT, { method: 'POST', body: data, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {})
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname()
  const pageViewId = useRef<string | null>(null)
  const enterTime = useRef<number>(Date.now())
  const sessionId = useRef<string>('')

  useEffect(() => {
    sessionId.current = getSessionId()
  }, [])

  // Track page views and duration
  useEffect(() => {
    if (!sessionId.current) return

    const sid = sessionId.current
    const page = window.location.pathname + window.location.search
    enterTime.current = Date.now()

    // Send page view, store returned ID for duration update
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        sessionId: sid,
        page,
        referrer: document.referrer || undefined,
      }),
    })
      .then(r => r.json())
      .then(({ id }) => { pageViewId.current = id })
      .catch(() => {})

    // Send duration on page exit
    function sendDuration() {
      const duration = Math.round((Date.now() - enterTime.current) / 1000)
      send({
        type: 'duration',
        sessionId: sid,
        page,
        pageViewId: pageViewId.current,
        duration,
      })
    }

    window.addEventListener('beforeunload', sendDuration)
    return () => {
      window.removeEventListener('beforeunload', sendDuration)
      // Also send on route change
      sendDuration()
    }
  }, [pathname])

  // Track clicks globally
  useEffect(() => {
    if (!sessionId.current) return

    function handleClick(e: MouseEvent) {
      const target = e.target as Element
      if (!target) return

      // Walk up max 3 levels to find a meaningful element
      let el: Element | null = target
      for (let i = 0; i < 3 && el; i++) {
        const tag = el.tagName.toLowerCase()
        if (['a', 'button', 'input', 'select', 'textarea'].includes(tag)) break
        el = el.parentElement
      }
      if (!el) el = target

      const href = (el as HTMLAnchorElement).href || el.getAttribute('href') || undefined

      send({
        type: 'click',
        sessionId: sessionId.current,
        pageViewId: pageViewId.current,
        page: window.location.pathname + window.location.search,
        element: describeElement(el),
        href,
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
      })
    }

    document.addEventListener('click', handleClick, { passive: true })
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
