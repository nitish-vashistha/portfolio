import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useFinePointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  glare?: boolean
}

/**
 * 3D perspective tilt driven entirely by motion values — no React re-renders
 * during pointer movement. Includes an optional moving glare highlight.
 */
export function TiltCard({ children, className, maxTilt = 10, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const finePointer = useFinePointer()
  const enabled = finePointer && !reduced

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 140, damping: 18 })
  const sy = useSpring(py, { stiffness: 140, damping: 18 })

  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt])
  const glareX = useTransform(sx, [0, 1], ['20%', '80%'])
  const glareY = useTransform(sy, [0, 1], ['20%', '80%'])
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(320px circle at ${gx} ${gy}, rgba(248,250,252,0.08), transparent 60%)`,
  )

  const onPointerMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const onPointerLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={enabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={cn('transform-3d relative will-change-transform', className)}
    >
      {children}
      {glare && enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
