import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/effects/Reveal'
import { aboutFocus, aboutMilestones } from '@/config/experience'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const timelineRef = useRef<HTMLOListElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  // GSAP scroll-scrub: the gradient spine fills as the user travels the
  // timeline, and each milestone lights up as the spine reaches it.
  useEffect(() => {
    if (reduced || !timelineRef.current || !lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        },
      )
      gsap.utils.toArray<HTMLElement>('[data-milestone]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.25, x: 24 },
          {
            opacity: 1,
            x: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              end: 'top 45%',
              scrub: 0.5,
            },
          },
        )
      })
    }, timelineRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="about" aria-label="About" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="section-shell">
        <SectionHeading
          eyebrow="About"
          title="Engineering Interfaces That Users Love"
          description="Frontend Engineer with 3.5 years of experience building scalable web applications, design systems, page builders, and performance-focused interfaces."
        />

        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Focus areas */}
          <div>
            <Reveal>
              <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-snow">
                <Sparkles size={16} className="text-primary-light" aria-hidden />
                What I obsess over
              </h3>
            </Reveal>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {aboutFocus.map((focus, i) => (
                <Reveal key={focus} delay={0.06 * i}>
                  <li className="group flex items-center gap-3 rounded-xl border border-line bg-ink-soft/50 px-4 py-3.5 transition-all duration-300 hover:border-primary-light/40 hover:shadow-glow-sm">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary-light to-accent-cyan transition-transform duration-300 group-hover:scale-150"
                    />
                    <span className="text-sm text-snow/80 transition-colors group-hover:text-snow">
                      {focus}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <p className="mt-8 border-l-2 border-primary/50 pl-5 text-sm leading-relaxed text-snow/55">
                My philosophy is simple: an interface isn't done when it works — it's done when it's
                fast for the slowest device, usable by every person, and maintainable by the next
                engineer who touches it.
              </p>
            </Reveal>
          </div>

          {/* Animated timeline */}
          <div className="relative">
            <div aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
            <div
              ref={lineRef}
              aria-hidden
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-primary-light via-accent-blue to-accent-cyan shadow-glow-sm"
              style={{ transform: reduced ? undefined : 'scaleY(0)' }}
            />
            <ol ref={timelineRef} className="space-y-10">
              {aboutMilestones.map((milestone) => (
                <li key={milestone.period} data-milestone className="relative pl-10">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-primary-light/60 bg-ink"
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-primary-light" />
                  </span>
                  <p className="font-mono text-xs tracking-widest text-accent-cyan">{milestone.period}</p>
                  <h4 className="mt-1 font-display text-lg font-semibold text-snow">{milestone.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-snow/60">{milestone.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
