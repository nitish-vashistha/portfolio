import { Atom, Palette, Gauge, FlaskConical, Wrench } from 'lucide-react'
import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Atom,
    accent: 'violet',
    skills: ['React', 'Next.js', 'TypeScript', 'Redux', 'React Router'],
  },
  {
    title: 'Styling',
    icon: Palette,
    accent: 'cyan',
    skills: ['Tailwind CSS', 'LESS', 'CSS3', 'HTML5'],
  },
  {
    title: 'Performance',
    icon: Gauge,
    accent: 'blue',
    skills: ['Lazy Loading', 'Code Splitting', 'Memoization', 'Web Vitals', 'Debouncing', 'Throttling'],
  },
  {
    title: 'Testing',
    icon: FlaskConical,
    accent: 'violet',
    skills: ['Jest', 'React Testing Library'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    accent: 'cyan',
    skills: ['Git', 'Webpack', 'Figma'],
  },
]
