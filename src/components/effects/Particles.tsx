import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  hue: number
  alpha: number
}

interface ParticlesProps {
  count?: number
  className?: string
  /** Burst mode briefly multiplies velocity — used by the Konami easter egg. */
  burst?: boolean
}

/**
 * Ambient floating particles on a single canvas.
 * Engineering notes:
 *  - one rAF loop, no per-particle DOM nodes
 *  - paused automatically when the tab is hidden or the canvas leaves viewport
 *  - DPR-capped at 2 to keep fill-rate cheap on retina screens
 *  - fully disabled under prefers-reduced-motion
 */
export function Particles({ count = 50, className, burst = false }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()
  // Latest-value ref so the long-lived rAF loop sees burst changes without
  // tearing down and rebuilding the whole particle field.
  const burstRef = useRef(burst)
  useEffect(() => {
    burstRef.current = burst
  }, [burst])

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let raf = 0
    let running = true
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const hues = [262, 252, 217, 188] // violet → blue → cyan

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: -Math.random() * 0.0005 - 0.0001,
      radius: Math.random() * 1.6 + 0.4,
      hue: hues[Math.floor(Math.random() * hues.length)] ?? 262,
      alpha: Math.random() * 0.5 + 0.15,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const tick = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      const speed = burstRef.current ? 14 : 1
      for (const p of particles) {
        p.x += p.vx * speed
        p.y += p.vy * speed
        if (p.y < -0.02) {
          p.y = 1.02
          p.x = Math.random()
        }
        if (p.x < -0.02) p.x = 1.02
        if (p.x > 1.02) p.x = -0.02
        ctx.beginPath()
        ctx.arc(p.x * width, p.y * height, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onVisibility = () => (document.hidden ? stop() : start())
    const intersection = new IntersectionObserver(([entry]) =>
      entry?.isIntersecting ? start() : stop(),
    )
    const resizeObserver = new ResizeObserver(resize)

    resize()
    raf = requestAnimationFrame(tick)
    document.addEventListener('visibilitychange', onVisibility)
    intersection.observe(canvas)
    resizeObserver.observe(canvas)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
      intersection.disconnect()
      resizeObserver.disconnect()
    }
  }, [count, reduced])

  if (reduced) return null

  return <canvas ref={canvasRef} aria-hidden className={className ?? 'absolute inset-0 h-full w-full'} />
}
