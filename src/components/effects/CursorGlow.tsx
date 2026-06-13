import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/**
 * Custom cursor system:
 *  1. a small dot that tracks the pointer 1:1
 *  2. a trailing ring on a spring that expands over interactive elements
 *  3. a large ambient spotlight that tints the page around the pointer
 *
 * Pointer position is also mirrored into --cursor-x/--cursor-y so pure-CSS
 * effects (interactive grid mask) can consume it without React involvement.
 * Renders nothing on touch devices or under prefers-reduced-motion.
 */
export function CursorGlow() {
  const finePointer = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = finePointer && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 250, damping: 24, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 250, damping: 24, mass: 0.5 })
  const spotX = useSpring(x, { stiffness: 60, damping: 18 })
  const spotY = useSpring(y, { stiffness: 60, damping: 18 })

  const [interactive, setInteractive] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      root.style.setProperty('--cursor-x', `${e.clientX}px`)
      root.style.setProperty('--cursor-y', `${e.clientY}px`)
      setHidden(false)
      const target = e.target as Element | null
      setInteractive(!!target?.closest('a, button, [role="button"], input, textarea, [data-cursor]'))
    }
    const onLeave = () => setHidden(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      {/* Ambient spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[1] h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: spotX,
          y: spotY,
          opacity: hidden ? 0 : 1,
          background:
            'radial-gradient(closest-side, rgba(124,58,237,0.07), rgba(6,182,212,0.03) 55%, transparent)',
        }}
      />
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-primary-light/60 mix-blend-screen"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: interactive ? 44 : 28,
          height: interactive ? 44 : 28,
          opacity: hidden ? 0 : interactive ? 1 : 0.6,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
      {/* Core dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-snow"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: hidden ? 0 : 1 }}
      />
    </>
  )
}
