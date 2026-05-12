'use client'

import { useEffect } from 'react'

/**
 * Global IntersectionObserver that watches all [data-reveal] elements
 * on the page and adds the `reveal-visible` class when they enter the
 * viewport. This triggers the CSS transition defined in globals.css.
 *
 * Place once in a layout component. Works with any server-rendered
 * children that carry `data-reveal` (and optional `data-delay` ms).
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = parseInt(el.dataset.delay ?? '0', 10)
          if (delay > 0) {
            setTimeout(() => el.classList.add('reveal-visible'), delay)
          } else {
            el.classList.add('reveal-visible')
          }
          observer.unobserve(el)
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -48px 0px',
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
