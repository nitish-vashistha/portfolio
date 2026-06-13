import { ArrowUp, Mail } from 'lucide-react'
import { LinkedInIcon } from '@/components/ui/icons'
import { site } from '@/config/site'
import { MagneticButton } from '@/components/effects/MagneticButton'
import { Reveal } from '@/components/effects/Reveal'

export function Footer() {
  return (
    <footer className="relative border-t border-line py-14">
      <div className="section-shell flex flex-col items-center gap-8">
        <Reveal>
          <blockquote className="max-w-xl text-center font-display text-xl font-medium leading-relaxed text-snow/80 sm:text-2xl">
            “Great interfaces aren't{' '}
            <span className="text-snow/40 line-through decoration-primary-light/60">designed</span>.
            They're <span className="text-gradient">engineered</span>.”
          </blockquote>
        </Reveal>

        <div className="flex items-center gap-3">
          <MagneticButton>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email Nitish"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-snow/60 transition-colors hover:border-primary-light/50 hover:text-snow"
            >
              <Mail size={17} aria-hidden />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nitish on LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-snow/60 transition-colors hover:border-primary-light/50 hover:text-snow"
            >
              <LinkedInIcon size={17} />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#hero"
              aria-label="Back to top"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-snow/60 transition-colors hover:border-primary-light/50 hover:text-snow"
            >
              <ArrowUp size={17} aria-hidden />
            </a>
          </MagneticButton>
        </div>

        <div className="flex flex-col items-center gap-1 text-center font-mono text-xs text-snow/35">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <p>Crafted with React 19, TypeScript &amp; an unhealthy obsession with 60fps.</p>
        </div>
      </div>
    </footer>
  )
}
