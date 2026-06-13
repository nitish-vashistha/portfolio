import { useMemo } from 'react'
import { motion, type Variants } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

interface SplitTextProps {
  text: string
  /** 'words' is cheaper; 'chars' is more cinematic — use for short headlines only. */
  by?: 'words' | 'chars'
  delay?: number
  stagger?: number
  className?: string
  once?: boolean
}

/**
 * Splits text into animated fragments while keeping the full string
 * readable for screen readers (aria-label on the wrapper, fragments hidden).
 */
export function SplitText({
  text,
  by = 'words',
  delay = 0,
  stagger = 0.035,
  className,
  once = true,
}: SplitTextProps) {
  const reduced = usePrefersReducedMotion()

  const fragments = useMemo(() => {
    const words = text.split(' ')
    return by === 'words' ? words : words.map((w) => [...w])
  }, [text, by])

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : '0.6em', rotateX: reduced ? 0 : -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.span
      aria-label={text}
      role="text"
      className={className}
      style={{ display: 'inline-block', perspective: 600 }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px' }}
    >
      {by === 'words'
        ? (fragments as string[]).map((word, i) => (
            <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
              <motion.span variants={item} className="inline-block will-change-transform">
                {word}
              </motion.span>
              {i < fragments.length - 1 && ' '}
            </span>
          ))
        : (fragments as string[][]).map((word, wi) => (
            <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
              {word.map((char, ci) => (
                <span key={ci} className="inline-block overflow-hidden align-bottom">
                  <motion.span variants={item} className="inline-block will-change-transform">
                    {char}
                  </motion.span>
                </span>
              ))}
              {wi < fragments.length - 1 && <span className="inline-block">{' '}</span>}
            </span>
          ))}
    </motion.span>
  )
}
