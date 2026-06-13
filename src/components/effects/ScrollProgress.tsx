import { motion, useScroll, useSpring } from 'framer-motion'

/** Top-edge scroll progress bar, spring-smoothed, gradient-branded. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-gradient-to-r from-primary via-accent-blue to-accent-cyan"
      style={{ scaleX }}
    />
  )
}
