import { useRef, useCallback } from 'react'
import { useSpring, type MotionValue } from 'framer-motion'
import { useFinePointer, usePrefersReducedMotion } from './useMediaQuery'

interface MagneticControls {
  x: MotionValue<number>
  y: MotionValue<number>
  onPointerMove: (e: React.PointerEvent<HTMLElement>) => void
  onPointerLeave: () => void
  ref: React.RefObject<HTMLDivElement | null>
}

/**
 * Magnetic attraction: the element leans toward the cursor while hovered
 * and springs back on leave. Disabled on touch devices and for users who
 * prefer reduced motion.
 */
export function useMagnetic(strength = 0.35): MagneticControls {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const finePointer = useFinePointer()
  const enabled = finePointer && !reduced

  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 })
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 })

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!enabled || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
    },
    [enabled, strength, x, y],
  )

  const onPointerLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { x, y, onPointerMove, onPointerLeave, ref }
}
