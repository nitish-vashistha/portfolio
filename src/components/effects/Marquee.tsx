import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: React.ReactNode
  reverse?: boolean
  duration?: number
  /**
   * How many times the content repeats inside EACH scrolling half.
   * The -50% translate loop is only seamless when one half is wider than
   * the viewport — short item lists need several repetitions or the loop
   * shows a blank gap. 4 copies covers ultrawide screens comfortably.
   */
  repeat?: number
  className?: string
}

/**
 * Infinite marquee: two identical halves translated -50% in a CSS loop, so
 * the animation runs on the compositor with zero JS per frame.
 * Pauses on hover; every copy after the first is aria-hidden.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  repeat = 4,
  className,
}: MarqueeProps) {
  const half = (hidden: boolean) => (
    <div className="flex shrink-0 items-center whitespace-nowrap" aria-hidden={hidden || undefined}>
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className="flex shrink-0 items-center whitespace-nowrap"
          aria-hidden={hidden || i > 0 || undefined}
        >
          {children}
        </div>
      ))}
    </div>
  )

  return (
    <div className={cn('mask-fade-x group flex overflow-hidden whitespace-nowrap', className)}>
      <div
        className="flex w-max shrink-0 animate-marquee items-center whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{
          ['--marquee-duration' as string]: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {half(false)}
        {half(true)}
      </div>
    </div>
  )
}
