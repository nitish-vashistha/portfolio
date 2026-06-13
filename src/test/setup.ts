import '@testing-library/jest-dom/vitest'

// jsdom does not implement matchMedia / IntersectionObserver / ResizeObserver —
// all three are used by the motion system, so they are stubbed here.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
  root = null
  rootMargin = ''
  thresholds = []
}

window.IntersectionObserver = ObserverStub as unknown as typeof IntersectionObserver
window.ResizeObserver = ObserverStub as unknown as typeof ResizeObserver

window.scrollTo = () => {}
