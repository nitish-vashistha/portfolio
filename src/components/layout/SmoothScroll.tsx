import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { registerLenis, scrollToId } from '@/lib/scroll'

gsap.registerPlugin(ScrollTrigger)

/**
 * Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger and the
 * scroll position never drift apart. The instance is registered with
 * lib/scroll so every programmatic scroll (navbar, command menu, CTAs)
 * routes through Lenis instead of fighting it. Skipped entirely for users
 * who prefer reduced motion — native scrolling is the accessible default.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    registerLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      registerLenis(null)
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [reduced])

  // Anchor clicks always route through lib/scroll — it picks Lenis when
  // active and falls back to native smooth scrolling otherwise.
  useEffect(() => {
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      e.preventDefault()
      scrollToId(id)
    }
    document.addEventListener('click', onAnchorClick)
    return () => document.removeEventListener('click', onAnchorClick)
  }, [])

  return <>{children}</>
}
