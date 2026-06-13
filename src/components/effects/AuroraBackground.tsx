import { memo } from 'react'
import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  className?: string
  /** Theme-glow intensity multiplier (Konami easter egg cranks this up). */
  intensity?: 'normal' | 'high'
}

/**
 * Layered aurora / mesh gradient backdrop. Pure CSS — the drift animation
 * runs on the compositor (transform only) and costs no JavaScript.
 */
export const AuroraBackground = memo(function AuroraBackground({
  className,
  intensity = 'normal',
}: AuroraBackgroundProps) {
  const boost = intensity === 'high'
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className={cn(
          'absolute -inset-[20%] bg-aurora blur-3xl transition-opacity duration-1000',
          'animate-aurora-drift',
          boost ? 'opacity-100' : 'opacity-70',
        )}
      />
      <div
        className={cn(
          'absolute left-1/2 top-[-20%] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-1000',
          boost ? 'opacity-40' : 'opacity-20',
        )}
        style={{
          background:
            'conic-gradient(from 90deg at 50% 50%, rgba(124,58,237,0.5), rgba(59,130,246,0.3), rgba(6,182,212,0.4), rgba(124,58,237,0.5))',
        }}
      />
      {/* Noise-free vignette keeps edges anchored to the ink background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#030712_100%)]" />
    </div>
  )
})
