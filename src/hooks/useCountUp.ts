import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { usePrefersReducedMotion } from './useMediaQuery'

/**
 * Animate a number from 0 to `target` once the element scrolls into view.
 * Uses rAF with an expo-out ease; jumps straight to the target under
 * prefers-reduced-motion.
 */
export function useCountUp(target: number, { duration = 1.6, decimals = 0 } = {}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      if (reduced) {
        setValue(target)
        return
      }
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(2, -10 * t)
      setValue(Number((target * (t === 1 ? 1 : eased)).toFixed(decimals)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, decimals, reduced])

  return { ref, value }
}
