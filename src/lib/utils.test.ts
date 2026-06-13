import { describe, expect, it, vi } from 'vitest'
import { clamp, cn, debounce, throttle } from './utils'

describe('cn', () => {
  it('merges conflicting tailwind classes, last one wins', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('handles conditional classes', () => {
    const isHidden = false as boolean
    expect(cn('text-snow', isHidden && 'hidden', undefined, 'font-bold')).toBe('text-snow font-bold')
  })
})

describe('clamp', () => {
  it('clamps below, inside and above the range', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(15, 0, 10)).toBe(10)
  })
})

describe('debounce', () => {
  it('only fires the trailing call', () => {
    vi.useFakeTimers()
    const spy = vi.fn()
    const debounced = debounce(spy, 100)

    debounced('a')
    debounced('b')
    debounced('c')
    vi.advanceTimersByTime(99)
    expect(spy).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('c')
    vi.useRealTimers()
  })
})

describe('throttle', () => {
  it('fires on the leading edge and suppresses calls inside the window', () => {
    const spy = vi.fn()
    let now = 0
    vi.spyOn(performance, 'now').mockImplementation(() => now)
    const throttled = throttle(spy, 100)

    throttled(1)
    throttled(2)
    expect(spy).toHaveBeenCalledTimes(1)

    now = 150
    throttled(3)
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenLastCalledWith(3)
    vi.restoreAllMocks()
  })
})
