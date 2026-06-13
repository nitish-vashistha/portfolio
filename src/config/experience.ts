import type { ExperienceEntry, TimelineMilestone } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    company: 'Webkul',
    role: 'Software Engineer (Frontend)',
    period: 'Jan 2023 — Present',
    location: 'Noida, India',
    achievements: [
      'Built scalable UI modules powering production e-commerce and PIM products',
      'Improved application performance across critical user journeys',
      'Created reusable component systems adopted across multiple product teams',
      'Integrated REST APIs with resilient, typed data-fetching layers',
      'Improved accessibility to meet WCAG AA across key surfaces',
      'Enhanced frontend architecture for long-term maintainability',
    ],
    stack: ['React', 'TypeScript', 'Redux', 'Tailwind', 'LESS', 'Jest', 'Webpack'],
  },
]

export const aboutMilestones: TimelineMilestone[] = [
  {
    period: '2022',
    title: 'Foundations',
    description:
      'Mastered the fundamentals — semantic HTML, modern CSS and JavaScript — and fell in love with the craft of interfaces.',
  },
  {
    period: '2023',
    title: 'Engineering at scale',
    description:
      'Joined Webkul. Shipped production React modules, learned what scale really means, and started thinking in systems.',
  },
  {
    period: '2024',
    title: 'Builders & design systems',
    description:
      'Architected drag-and-drop page builders and reusable component systems used by thousands of merchants.',
  },
  {
    period: '2025+',
    title: 'Performance obsession',
    description:
      'Deep focus on Core Web Vitals, accessibility and internationalization — engineering interfaces that feel instant for everyone.',
  },
]

export const aboutFocus = [
  'React Architecture',
  'Performance Optimization',
  'Design Systems',
  'Accessibility',
  'Internationalization',
  'Frontend Scalability',
] as const
