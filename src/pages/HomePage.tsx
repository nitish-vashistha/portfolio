import { lazy, Suspense } from 'react'
import { Hero } from '@/features/hero/Hero'
import { useKonami } from '@/hooks/useKonami'

/**
 * Everything below the fold is lazy — the initial bundle only pays for the
 * hero. Each chunk hydrates as the user approaches it; Suspense fallbacks
 * are simple spacers so scroll height never jumps.
 */
const About = lazy(() => import('@/features/about/About').then((m) => ({ default: m.About })))
const Skills = lazy(() => import('@/features/skills/Skills').then((m) => ({ default: m.Skills })))
const Experience = lazy(() =>
  import('@/features/experience/Experience').then((m) => ({ default: m.Experience })),
)
const Projects = lazy(() =>
  import('@/features/projects/Projects').then((m) => ({ default: m.Projects })),
)
const TechMarquee = lazy(() =>
  import('@/features/techstack/TechMarquee').then((m) => ({ default: m.TechMarquee })),
)
const Performance = lazy(() =>
  import('@/features/performance/Performance').then((m) => ({ default: m.Performance })),
)
const Contact = lazy(() =>
  import('@/features/contact/Contact').then((m) => ({ default: m.Contact })),
)

function SectionFallback() {
  return <div className="min-h-96" aria-hidden />
}

export default function HomePage() {
  const partyMode = useKonami()

  return (
    <>
      <Hero glowBoost={partyMode} />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <TechMarquee />
        <Performance />
        <Contact />
      </Suspense>
      {partyMode && (
        <p role="status" className="sr-only">
          Konami code activated — enjoy the glow.
        </p>
      )}
    </>
  )
}
