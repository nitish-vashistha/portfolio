import type Lenis from 'lenis'

/**
 * Single source of truth for programmatic scrolling.
 * When Lenis is active it OWNS the scroll position — native
 * `scrollIntoView({ behavior: 'smooth' })` gets overridden by Lenis's rAF
 * loop and silently does nothing. Every in-app scroll must route through
 * the registered instance; the native path is only the reduced-motion /
 * pre-mount fallback.
 */
let lenis: Lenis | null = null

/** Height of the fixed navbar — scroll targets land just below it. */
const SCROLL_OFFSET = -72

export function registerLenis(instance: Lenis | null) {
  lenis = instance
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: SCROLL_OFFSET })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
