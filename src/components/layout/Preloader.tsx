import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { site } from '@/config/site'

interface PreloaderProps {
  onComplete: () => void
}

/**
 * Immersive intro: monogram stroke-draw + counting progress, then the whole
 * veil slides away with a clip reveal. Reduced-motion users get a quick fade.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const total = reduced ? 250 : 1500

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1)
      // ease-out so the count rushes early and settles at the end
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 200)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [total])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          aria-label="Loading portfolio"
          role="status"
          exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Monogram */}
          <motion.svg
            width="84"
            height="84"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.path
              d="M26 74 V26 L60 74 V26"
              stroke="url(#preloader-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduced ? 0.2 : 1.2, ease: 'easeInOut' }}
            />
            <motion.path
              d="M66 26 L76 74 L86 26"
              stroke="url(#preloader-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduced ? 0.2 : 0.9, delay: reduced ? 0 : 0.5, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="preloader-gradient" x1="0" y1="0" x2="100" y2="100">
                <stop stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </motion.svg>

          <div className="mt-10 flex w-56 flex-col items-center gap-3">
            <div className="h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-light to-accent-cyan shadow-glow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex w-full items-center justify-between font-mono text-xs text-snow/50">
              <span>{site.name}</span>
              <span className="tabular-nums text-primary-light">{progress}%</span>
            </div>
          </div>
          <span className="sr-only">Loading… {progress} percent</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
