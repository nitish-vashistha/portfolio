import { useSyncExternalStore } from 'react'

/**
 * Subscribe to a CSS media query with React 18+ concurrent-safe semantics.
 * useSyncExternalStore avoids the classic useEffect "flash of wrong value".
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', notify)
      return () => mql.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** True on devices whose primary pointer can hover precisely (i.e. not touch). */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
