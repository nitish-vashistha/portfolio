import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Base surface of the design system. The cursor-position spotlight is
 * driven by CSS custom properties set in the pointer-move handler — zero
 * re-renders on hover.
 */
export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onPointerMove, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'spotlight-card rounded-2xl border border-line bg-ink-soft/60 shadow-card',
        className,
      )}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
        e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
        onPointerMove?.(e)
      }}
      {...props}
    />
  ),
)
Card.displayName = 'Card'
