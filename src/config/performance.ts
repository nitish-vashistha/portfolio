import {
  Split,
  ImageDown,
  Repeat2,
  Brain,
  Timer,
  Accessibility,
} from 'lucide-react'
import type { LighthouseScore, PerfTechnique } from '@/types'

export const lighthouseScores: LighthouseScore[] = [
  { label: 'Performance', score: 98 },
  { label: 'Accessibility', score: 100 },
  { label: 'Best Practices', score: 100 },
  { label: 'SEO', score: 100 },
]

export const perfTechniques: PerfTechnique[] = [
  {
    title: 'Code Splitting',
    description:
      'Route- and component-level chunks so users only download the JavaScript the current view actually needs.',
    icon: Split,
    visual: 'split',
  },
  {
    title: 'Lazy Loading',
    description:
      'Below-the-fold sections, images and heavy widgets hydrate on intersection — never on first paint.',
    icon: ImageDown,
    visual: 'lazy',
  },
  {
    title: 'Render Optimization',
    description:
      'Stable references, narrow subscriptions and composition patterns that keep re-renders surgical.',
    icon: Repeat2,
    visual: 'render',
  },
  {
    title: 'Memoization',
    description:
      'React.memo, useMemo and useCallback applied where profiling proves it — not as superstition.',
    icon: Brain,
    visual: 'memo',
  },
  {
    title: 'Debounce & Throttle',
    description:
      'Input, scroll and resize handlers tamed to animation-frame budgets for 60fps interactions.',
    icon: Timer,
    visual: 'debounce',
  },
  {
    title: 'Accessibility',
    description:
      'Semantic HTML, keyboard paths, focus management and reduced-motion support as defaults, not afterthoughts.',
    icon: Accessibility,
    visual: 'a11y',
  },
]
