import { motion } from 'framer-motion'
import { CheckCircle2, TrendingUp } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/effects/Reveal'
import { TiltCard } from '@/components/effects/TiltCard'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { projects } from '@/config/projects'
import { ProjectMockup } from './ProjectMockup'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

const accentText = {
  violet: 'text-primary-light',
  cyan: 'text-accent-cyan',
  blue: 'text-accent-blue',
} as const

export function Projects() {
  return (
    <section id="projects" aria-label="Featured projects" className="relative py-28 lg:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="section-shell">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects Built to Move Metrics"
          description="Case studies, not screenshots — every project ships with the numbers it moved."
        />

        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, i) => (
            <ProjectCase key={project.id} project={project} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCase({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className={cn('grid items-center gap-10 lg:grid-cols-2 lg:gap-16')}
    >
      {/* Mockup side — sticky-ish parallax entrance */}
      <motion.div
        initial={{ opacity: 0, y: 48, rotate: flip ? 1.5 : -1.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={cn(flip && 'lg:order-2')}
      >
        <TiltCard maxTilt={5}>
          <ProjectMockup project={project} />
        </TiltCard>
      </motion.div>

      {/* Story side */}
      <div className={cn(flip && 'lg:order-1')}>
        <Reveal>
          <p className="flex items-baseline gap-3">
            <span className={cn('font-mono text-sm tracking-widest', accentText[project.accent])}>
              {project.index}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-snow/40">
              {project.subtitle}
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h3
            id={`${project.id}-title`}
            className="mt-3 font-display text-2xl font-semibold tracking-tight text-snow sm:text-3xl"
          >
            {project.title}
          </h3>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 leading-relaxed text-snow/60">{project.description}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-sm text-snow/75">
                <CheckCircle2 size={15} className={cn('shrink-0', accentText[project.accent])} aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Results */}
        <Reveal delay={0.26}>
          <Card className="mt-7 p-1">
            <div className="flex items-center gap-2 px-4 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-snow/40">
              <TrendingUp size={12} aria-hidden />
              Impact
            </div>
            <dl className="grid grid-cols-2 gap-px p-2 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.03]">
                  <dd className={cn('font-display text-xl font-bold', accentText[project.accent])}>
                    {metric.value}
                  </dd>
                  <dt className="mt-0.5 text-xs text-snow/50">{metric.label}</dt>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>

        <Reveal delay={0.32}>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  )
}
