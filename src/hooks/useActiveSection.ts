import { useEffect, useState } from 'react'
import type { SectionId } from '@/types'

/**
 * Track which page section currently dominates the viewport.
 * Powers the navbar's active state and the command menu's context.
 */
export function useActiveSection(ids: SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      // A narrow horizontal band around the viewport's upper third —
      // a section becomes "active" when it crosses that band.
      { rootMargin: '-30% 0px -60% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
