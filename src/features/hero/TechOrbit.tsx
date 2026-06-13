import { memo } from 'react'
import { site, orbitTech } from '@/config/site'

/**
 * Tech stack orbiting the monogram. The rotation runs as pure CSS on the
 * compositor; each chip counter-rotates so labels stay upright.
 * The wrapper is a CSS size container, so chip orbit radii are expressed
 * in cqw units and stay correct at every viewport size.
 */
export const TechOrbit = memo(function TechOrbit() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[26rem] [container-type:size]"
      aria-hidden
    >
      {/* Glow core */}
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-primary/25 blur-3xl" />

      {/* Monogram avatar */}
      <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary-light/30 bg-ink-soft shadow-glow-md">
        <span className="text-gradient font-display text-4xl font-bold">{site.initials}</span>
      </div>

      {/* Ring outlines */}
      <div className="absolute inset-[14%] rounded-full border border-line" />
      <div className="absolute inset-[1%] rounded-full border border-dashed border-line" />

      {/* Inner ring — 2 chips */}
      <div className="absolute inset-0 animate-orbit" style={{ ['--orbit-duration' as string]: '22s' }}>
        {orbitTech.slice(0, 2).map((tech, i) => (
          <OrbitChip key={tech} label={tech} angle={180 * i} radius="36cqw" duration="22s" reverse />
        ))}
      </div>

      {/* Outer ring — 3 chips, counter-rotating */}
      <div
        className="absolute inset-0 animate-orbit-reverse"
        style={{ ['--orbit-duration' as string]: '34s' }}
      >
        {orbitTech.slice(2).map((tech, i) => (
          <OrbitChip key={tech} label={tech} angle={120 * i + 60} radius="49cqw" duration="34s" />
        ))}
      </div>
    </div>
  )
})

function OrbitChip({
  label,
  angle,
  radius,
  duration,
  reverse = false,
}: {
  label: string
  angle: number
  radius: string
  duration: string
  /** True when the parent ring spins forward — the chip then spins in
   *  reverse (and vice versa) so the label stays upright. */
  reverse?: boolean
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 h-0 w-0"
      style={{ transform: `rotate(${angle}deg) translateY(-${radius}) rotate(${-angle}deg)` }}
    >
      <div
        className={reverse ? 'animate-orbit-reverse' : 'animate-orbit'}
        style={{ ['--orbit-duration' as string]: duration }}
      >
        <span className="glass inline-block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-xs text-snow/85 shadow-glow-sm">
          {label}
        </span>
      </div>
    </div>
  )
}
