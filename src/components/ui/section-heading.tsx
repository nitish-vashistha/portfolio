import { Reveal } from '@/components/effects/Reveal'
import { SplitText } from '@/components/effects/SplitText'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

/** Consistent section intro: eyebrow → split-text headline → supporting copy. */
export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={cn('mb-14 max-w-3xl md:mb-20', align === 'center' && 'mx-auto text-center')}>
      <Reveal>
        <p className="eyebrow mb-4">
          <span aria-hidden className="h-px w-8 bg-gradient-to-r from-primary-light to-transparent" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-snow sm:text-4xl lg:text-5xl">
        <SplitText text={title} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-base leading-relaxed text-snow/60 sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
