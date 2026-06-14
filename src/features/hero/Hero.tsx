import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, FileDown } from 'lucide-react'
import { heroStats, site } from '@/config/site'
import { SplitText } from '@/components/effects/SplitText'
import { MagneticButton } from '@/components/effects/MagneticButton'
import { Particles } from '@/components/effects/Particles'
import { AuroraBackground } from '@/components/effects/AuroraBackground'
import { useCountUp } from '@/hooks/useCountUp'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { TechOrbit } from './TechOrbit'
import type { Stat } from '@/types'

const HEADLINE_HOLD_MS = 2200

export function Hero({ glowBoost = false }: { glowBoost?: boolean }) {
  const reduced = usePrefersReducedMotion()
  // Phase 0: "Frontend Engineer" → Phase 1: the morphed tagline.
  const [phase, setPhase] = useState<0 | 1>(reduced ? 1 : 0)

  useEffect(() => {
    if (reduced) return
    const timer = setTimeout(() => setPhase(1), HEADLINE_HOLD_MS)
    return () => clearTimeout(timer)
  }, [reduced])

  // Subtle parallax: content drifts up slower than the scroll.
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -80])
  const orbitY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -140])

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24"
    >
      <AuroraBackground intensity={glowBoost ? 'high' : 'normal'} />
      <div className="grid-bg grid-bg-mask absolute inset-0" aria-hidden />
      <Particles count={55} burst={glowBoost} className="absolute inset-0 h-full w-full" />

      <div className="section-shell relative grid items-center gap-14 py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
        <motion.div style={{ y: contentY }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow mb-6"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
            </span>
            Available for ambitious teams · {site.availability}
          </motion.p>

          {/* Morphing headline — fixed min-height prevents layout shift between phases */}
          <h1 className="min-h-[3.4em] font-display text-4xl font-bold leading-[1.06] tracking-tight text-snow sm:text-6xl lg:text-7xl">
            <AnimatePresence mode="wait">
              {phase === 0 ? (
                <motion.span
                  key="intro"
                  exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  <SplitText text="Frontend" by="chars" delay={0.3} />
                  <br />
                  <span className="text-gradient">
                    <SplitText text="Engineer" by="chars" delay={0.55} />
                  </span>
                </motion.span>
              ) : (
                <motion.span
                  key="tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  <SplitText text="Building Fast." delay={0.1} />
                  <br />
                  <SplitText text="Beautiful." delay={0.3} />
                  {/* <span className="text-shine animate-shine">
                  </span>{' '} */}
                  <br className="sm:hidden" />
                  <SplitText text="Scalable Experiences." delay={0.45} />
                </motion.span>
              )}
            </AnimatePresence>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-snow/60 sm:text-lg"
          >
            I'm <span className="text-snow">{site.name}</span> — a {site.role.toLowerCase()} with{' '}
            <span className="text-snow">3.5+ years</span> of experience crafting design systems,
            page builders and performance-obsessed interfaces used by thousands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton strength={0.25}>
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-light px-7 text-sm font-medium text-snow shadow-glow-sm transition-shadow duration-300 hover:shadow-glow-md"
              >
                View Projects
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <a
                href={site.resume}
                download
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white/[0.02] px-7 text-sm font-medium text-snow/85 backdrop-blur-sm transition-colors duration-300 hover:border-primary-light/50 hover:bg-primary/10"
              >
                <FileDown size={16} aria-hidden />
                Download Resume
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Orbit — decorative, hidden from small screens where it crowds content */}
        <motion.div style={{ y: orbitY }} className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <TechOrbit />
          </motion.div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="section-shell relative pb-14"
      >
        <dl className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4">
          {heroStats.map((stat) => (
            <StatCell key={stat.label} stat={stat} />
          ))}
        </dl>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="block h-9 w-[1.4rem] rounded-full border border-snow/25 p-1">
          <motion.span
            className="block h-2 w-1 rounded-full bg-snow/60 mx-auto"
            animate={reduced ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}

function StatCell({ stat }: { stat: Stat }) {
  const decimals = Number.isInteger(stat.value) ? 0 : 1
  const { ref, value } = useCountUp(stat.value, { decimals })
  return (
    <div className="flex flex-col bg-ink-soft/40 px-6 py-5 text-center transition-colors duration-300 hover:bg-primary/[0.07]">
      <dt className="order-last mt-1 text-xs text-snow/50">{stat.label}</dt>
      <dd className="font-display text-2xl font-bold text-snow sm:text-3xl">
        <span ref={ref} className="tabular-nums">
          {value}
        </span>
        <span className="text-gradient">{stat.suffix}</span>
      </dd>
    </div>
  )
}
