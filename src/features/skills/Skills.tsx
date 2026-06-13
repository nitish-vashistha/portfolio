import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { TiltCard } from '@/components/effects/TiltCard'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { skillCategories } from '@/config/skills'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

const accentText = {
  violet: 'text-primary-light',
  cyan: 'text-accent-cyan',
  blue: 'text-accent-blue',
} as const

const accentRing = {
  violet: 'group-hover:border-primary-light/40',
  cyan: 'group-hover:border-accent-cyan/40',
  blue: 'group-hover:border-accent-blue/40',
} as const

export function Skills() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="skills" aria-label="Skills" className="relative py-28 lg:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="section-shell">
        <SectionHeading
          eyebrow="Capabilities"
          title="A Toolkit Engineered for Modern Products"
          description="Not a wall of logos — these are the tools I use in production every week, grouped by the problems they solve."
        />

        <ul className="skills-slider -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = category.icon
            return (
              <motion.li
                key={category.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'w-[82vw] max-w-[22rem] shrink-0 snap-start md:w-auto md:max-w-none',
                  // Floating offsets give the grid an editorial, non-template rhythm.
                  !reduced && i % 3 === 1 && 'lg:translate-y-8',
                  !reduced && i % 3 === 2 && 'lg:translate-y-4',
                )}
              >
                <TiltCard maxTilt={8} className="h-full">
                  <Card
                    className={cn(
                      'group flex min-h-[20rem] flex-col p-6 transition-colors duration-500',
                      accentRing[category.accent],
                    )}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span
                        className={cn(
                          'grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/[0.03] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6',
                          accentText[category.accent],
                        )}
                      >
                        <Icon size={19} aria-hidden />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-snow/30">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-snow">{category.title}</h3>
                    <ul className="mt-4 flex flex-1 content-start flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <li key={skill}>
                          <Badge
                            variant={category.accent}
                            className="transition-transform duration-300 hover:-translate-y-0.5"
                          >
                            {skill}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-snow/45">
                      <span>{category.skills.length} tools</span>
                      <span className={cn('h-1.5 w-12 rounded-full', `bg-current`, accentText[category.accent])} />
                    </div>
                  </Card>
                </TiltCard>
              </motion.li>
            )
          })}

          {/* Closing card — a quiet flex of design-system thinking */}
          <motion.li
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-[82vw] max-w-[22rem] shrink-0 snap-start md:w-auto md:max-w-none"
          >
            <Card className="flex min-h-[20rem] flex-col justify-center border-dashed p-6">
              <p className="font-mono text-xs leading-loose text-snow/50">
                <span className="text-primary-light">const</span>{' '}
                <span className="text-accent-cyan">approach</span> = {'{'}
                <br />
                &nbsp;&nbsp;ship: <span className="text-accent-blue">'fast'</span>,
                <br />
                &nbsp;&nbsp;break: <span className="text-accent-blue">'nothing'</span>,
                <br />
                &nbsp;&nbsp;measure: <span className="text-accent-blue">'everything'</span>,
                <br />
                {'}'} <span className="text-snow/30">as const</span>
              </p>
            </Card>
          </motion.li>
        </ul>
      </div>
    </section>
  )
}
