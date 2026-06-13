import { motion, type Variants } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  y?: number
  once?: boolean
  className?: string
}

/** Scroll-triggered reveal with the house ease. Falls back to a fade for reduced motion. */
export function Reveal({ children, delay = 0, y = 28, once = true, className }: RevealProps) {
  const reduced = usePrefersReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px' }}
    >
      {children}
    </motion.div>
  )
}
