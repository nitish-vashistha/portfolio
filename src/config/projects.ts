import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'egsma-page-builder',
    index: '01',
    title: 'React Page Builder',
    subtitle: 'EGSMA.io',
    description:
      'A production drag-and-drop page builder with real-time preview, responsive layout primitives and fully API-driven content management — letting non-engineers ship pages in minutes.',
    features: [
      'Drag & Drop Builder',
      'Real-Time Preview',
      'Responsive Layouts',
      'API-Driven Content Management',
    ],
    metrics: [
      { value: '−80%', label: 'page creation effort' },
      { value: '+30%', label: 'faster load times' },
    ],
    stack: ['React', 'TypeScript', 'Redux', 'REST APIs'],
    accent: 'violet',
    mockup: 'builder',
  },
  {
    id: 'unopim-enhancements',
    index: '02',
    title: 'Unopim Website Enhancements',
    subtitle: 'Open-Source PIM',
    description:
      'Elevated the Unopim web experience with a full dark mode, internationalization, micro-interactions and a deep performance pass across the entire surface.',
    features: ['Dark Mode', 'Internationalization (i18n)', 'Micro-Interactions', 'Performance Optimization'],
    metrics: [
      { value: '+25%', label: 'engagement' },
      { value: '+40%', label: 'faster content rollout' },
      { value: '+30%', label: 'performance' },
    ],
    stack: ['React', 'i18n', 'Tailwind', 'Web Vitals'],
    accent: 'cyan',
    mockup: 'website',
  },
  {
    id: 'bagisto-marketing',
    index: '03',
    title: 'Bagisto Marketing Site + Builder',
    subtitle: 'Open-Source Commerce',
    description:
      'A React content builder powering the Bagisto marketing site — SEO-optimized, accessible and multilingual, built on a reusable design system that accelerated every release after it.',
    features: ['React Content Builder', 'SEO Optimization', 'Accessibility', 'Multilingual Support'],
    metrics: [
      { value: '95+', label: 'Lighthouse score' },
      { value: '1', label: 'reusable design system' },
      { value: '↑', label: 'dev workflow velocity' },
    ],
    stack: ['React', 'SEO', 'a11y', 'Design System'],
    accent: 'blue',
    mockup: 'marketing',
  },
]
