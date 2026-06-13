import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes with conflict resolution (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Clamp a number into [min, max]. */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

/** Typed debounce — trailing edge. */
export function debounce<Args extends unknown[]>(fn: (...args: Args) => void, wait = 200) {
  let timer: ReturnType<typeof setTimeout> | undefined
  const debounced = (...args: Args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
  debounced.cancel = () => clearTimeout(timer)
  return debounced
}

/** Typed throttle — leading edge, rAF-friendly default. */
export function throttle<Args extends unknown[]>(fn: (...args: Args) => void, limit = 100) {
  let last = -Infinity // guarantees the leading call always fires
  return (...args: Args) => {
    const now = performance.now()
    if (now - last >= limit) {
      last = now
      fn(...args)
    }
  }
}

/**
 * Copy text to the clipboard. Prefers the async Clipboard API, but falls
 * back to a hidden textarea + execCommand for non-secure (http) contexts
 * where `navigator.clipboard` is undefined. Resolves to success.
 */
export async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      /* fall through to legacy path */
    }
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    textarea.remove()
  }
}
