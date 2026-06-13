import { Marquee } from '@/components/effects/Marquee'
import { marqueeItems } from '@/config/site'

/** Dual counter-scrolling marquee separating projects from performance. */
export function TechMarquee() {
  const mid = Math.ceil(marqueeItems.length / 2)
  const rows = [marqueeItems.slice(0, mid), marqueeItems.slice(mid)]

  return (
    <section aria-label="Technologies" className="relative border-y border-line py-10">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-primary/[0.04] via-transparent to-accent-cyan/[0.04]" />
      <div className="relative space-y-5">
        {rows.map((row, rowIndex) => (
          <Marquee key={rowIndex} reverse={rowIndex === 1} duration={36 + rowIndex * 8}>
            {row.map((item) => (
              <span key={item} className="mx-4 inline-flex shrink-0 items-center gap-4 whitespace-nowrap">
                <span className="font-display text-xl font-semibold text-snow/70 transition-colors duration-300 hover:text-snow sm:text-2xl">
                  {item}
                </span>
                <span aria-hidden className="text-primary-light">
                  •
                </span>
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}
