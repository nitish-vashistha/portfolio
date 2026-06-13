import { useId } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { Card } from '@/components/ui/card'
import { TiltCard } from '@/components/effects/TiltCard'
import { lighthouseScores, perfTechniques } from '@/config/performance'
import { useCountUp } from '@/hooks/useCountUp'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import type { LighthouseScore, PerfTechnique } from '@/types'
import { cn } from '@/lib/utils'

export function Performance() {
  return (
    <section id="performance" aria-label="Performance engineering" className="relative py-28 lg:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="section-shell">
        <SectionHeading
          eyebrow="Performance Engineering"
          title="Speed Is a Feature. I Treat It Like One."
          description="Every interface I ship is profiled, measured and budgeted. These are the disciplines behind the numbers — and this very site practices all of them."
        />

        {/* Lighthouse rings */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {lighthouseScores.map((score, i) => (
            <ScoreRing key={score.label} score={score} delay={i * 0.12} />
          ))}
        </div>

        {/* Technique cards with micro-visualizations */}
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {perfTechniques.map((technique, i) => (
            <motion.li
              key={technique.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.65, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard maxTilt={6} className="h-full">
                <TechniqueCard technique={technique} />
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Lighthouse score ring                                              */
/* ------------------------------------------------------------------ */

function ScoreRing({ score, delay }: { score: LighthouseScore; delay: number }) {
  const reduced = usePrefersReducedMotion()
  const { ref, value } = useCountUp(score.score, { duration: 1.8 })
  const gradientId = useId()
  const radius = 34
  const circumference = 2 * Math.PI * radius

  return (
    <Card className="flex flex-col items-center gap-3 p-6">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(248,250,252,0.08)" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * (1 - score.score / 100) }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: reduced ? 0 : 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="80" y2="80">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
        <span
          ref={ref}
          className="absolute inset-0 grid place-items-center font-display text-2xl font-bold tabular-nums text-snow"
        >
          {value}
        </span>
      </div>
      <p className="text-sm text-snow/60">{score.label}</p>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  Technique cards — each carries a tiny living visualization         */
/* ------------------------------------------------------------------ */

function TechniqueCard({ technique }: { technique: PerfTechnique }) {
  const Icon = technique.icon
  return (
    <Card className="group flex h-full flex-col p-6 transition-colors duration-500 hover:border-primary-light/35">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-primary-light transition-colors duration-300 group-hover:text-accent-cyan">
          <Icon size={18} aria-hidden />
        </span>
        <h3 className="font-display text-base font-semibold text-snow">{technique.title}</h3>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-snow/55">{technique.description}</p>
      <div className="mt-5 h-12" aria-hidden>
        <MiniVisual visual={technique.visual} />
      </div>
    </Card>
  )
}

function MiniVisual({ visual }: { visual: PerfTechnique['visual'] }) {
  const reduced = usePrefersReducedMotion()
  if (reduced) return <div className="h-px w-full bg-line" />

  switch (visual) {
    case 'split':
      // one fat bundle breaking into three chunks
      return (
        <div className="flex h-full items-center gap-1.5">
          {[0.5, 0.3, 0.2].map((w, i) => (
            <motion.div
              key={i}
              className="h-2.5 rounded-full bg-gradient-to-r from-primary-light/70 to-accent-cyan/70"
              style={{ width: `${w * 100}%`, transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
      )
    case 'lazy':
      return (
        <div className="flex h-full items-center gap-1.5">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="h-7 flex-1 rounded-md bg-white/[0.06]"
              initial={{ opacity: 0.15 }}
              whileInView={{ opacity: i < 2 ? 1 : [0.15, 0.15, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.25, times: [0, 0.6, 1] }}
            />
          ))}
        </div>
      )
    case 'render':
      return (
        <div className="flex h-full items-center gap-2 font-mono text-[10px]">
          <span className="text-snow/40">renders/frame</span>
          <motion.span
            className="text-red-400/80 line-through"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            47
          </motion.span>
          <motion.span
            className="text-2xl text-accent-cyan"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
          >
            3
          </motion.span>
        </div>
      )
    case 'memo':
      return (
        <div className="flex h-full items-center gap-1.5">
          {['cached', 'cached', 'recompute', 'cached'].map((state, i) => (
            <motion.span
              key={i}
              className={cn(
                'rounded-md px-2 py-1 font-mono text-[9px]',
                state === 'cached' ? 'bg-accent-cyan/15 text-accent-cyan' : 'bg-primary/20 text-primary-light',
              )}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.18 }}
            >
              {state}
            </motion.span>
          ))}
        </div>
      )
    case 'debounce':
      // many input events collapsing to one handled call
      return (
        <div className="relative h-full">
          <div className="absolute inset-x-0 top-1 flex justify-between">
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-snow/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0.2] }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
              />
            ))}
          </div>
          <motion.div
            className="absolute bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-cyan shadow-glow-cyan"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 260 }}
          />
        </div>
      )
    case 'a11y':
      return (
        <div className="flex h-full items-center gap-2">
          {['focus', 'aria', 'kbd', 'motion'].map((label, i) => (
            <motion.span
              key={label}
              className="rounded-md border border-line px-2 py-1 font-mono text-[9px] text-snow/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, borderColor: 'rgba(6,182,212,0.4)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              {label} ✓
            </motion.span>
          ))}
        </div>
      )
  }
}
