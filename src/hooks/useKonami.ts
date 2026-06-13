import { useEffect, useState } from 'react'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
] as const

/**
 * Easter egg: the Konami code triggers a one-shot celebration state.
 * Returns true for `durationMs` after the sequence is completed.
 */
export function useKonami(durationMs = 4000) {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    let progress = 0
    const onKeyDown = (e: KeyboardEvent) => {
      const expected = SEQUENCE[progress]
      progress = e.key === expected ? progress + 1 : e.key === SEQUENCE[0] ? 1 : 0
      if (progress === SEQUENCE.length) {
        progress = 0
        setTriggered(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!triggered) return
    const timer = setTimeout(() => setTriggered(false), durationMs)
    return () => clearTimeout(timer)
  }, [triggered, durationMs])

  return triggered
}
