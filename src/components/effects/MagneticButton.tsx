import { motion } from 'framer-motion'
import { useMagnetic } from '@/hooks/useMagnetic'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

/**
 * Wrapper that makes any child magnetic. The child itself stays a plain
 * semantic element (button / a), so accessibility is untouched.
 */
export function MagneticButton({ children, strength = 0.3, className }: MagneticButtonProps) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic(strength)

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  )
}
