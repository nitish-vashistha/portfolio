import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Building2, MapPin, CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/effects/Reveal'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { experience } from '@/config/experience'

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 60%'],
  })
  const spineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="experience" aria-label="Experience" className="relative py-28 lg:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="section-shell">
        <SectionHeading
          eyebrow="Experience"
          title="Where the Craft Was Forged"
          description="Production experience shipping features that real businesses depend on, every single day."
        />

        <div ref={trackRef} className="relative mx-auto max-w-3xl">
          {/* Spine */}
          <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-line sm:left-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: spineScale }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-primary-light to-accent-cyan shadow-glow-sm sm:left-1/2"
          />

          <ol className="space-y-14">
            {experience.map((entry) => (
              <li key={entry.company} className="relative pl-12 sm:pl-0">
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute left-4 top-2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border border-primary-light bg-ink shadow-glow-sm sm:left-1/2"
                >
                  <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary-light" />
                </span>

                <div className="sm:grid sm:grid-cols-2 sm:gap-12">
                  {/* Meta column */}
                  <Reveal className="sm:pr-4 sm:text-right">
                    <div className="mb-4 sm:sticky sm:top-28">
                      <p className="font-mono text-xs tracking-widest text-accent-cyan">{entry.period}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-snow">{entry.role}</h3>
                      <p className="mt-2 flex items-center gap-2 text-sm text-snow/60 sm:justify-end">
                        <Building2 size={14} className="text-primary-light" aria-hidden />
                        {entry.company}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-snow/45 sm:justify-end">
                        <MapPin size={14} aria-hidden />
                        {entry.location}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2 sm:justify-end">
                        {entry.stack.map((tech) => (
                          <li key={tech}>
                            <Badge>{tech}</Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>

                  {/* Achievements column */}
                  <div className="mt-6 sm:mt-0 sm:pl-4">
                    <ul className="space-y-3">
                      {entry.achievements.map((achievement, i) => (
                        <motion.li
                          key={achievement}
                          initial={{ opacity: 0, x: 32 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-10% 0px' }}
                          transition={{ duration: 0.6, delay: 0.07 * i, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Card className="flex items-start gap-3 rounded-xl p-4 transition-colors duration-300 hover:border-primary-light/30">
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-cyan" aria-hidden />
                            <span className="text-sm leading-relaxed text-snow/75">{achievement}</span>
                          </Card>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
