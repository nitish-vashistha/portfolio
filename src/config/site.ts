import type { NavItem, Stat } from '@/types'

export const site = {
  name: 'Nitish Vashistha',
  initials: 'NV',
  role: 'Frontend Software Engineer',
  tagline: 'Building Fast. Beautiful. Scalable Experiences.',
  email: 'nitishvashistha00@gmail.com',
  phone: '+91 93067 35003',
  phoneHref: 'tel:+919306735003',
  location: 'Noida, India',
  linkedin: 'https://linkedin.com/in/vashisthnitish',
  resume: '/nitish_resume.pdf',
  url: 'https://nitishvashistha.dev',
} as const

export const navItems: NavItem[] = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Performance', id: 'performance' },
  { label: 'Contact', id: 'contact' },
]

export const heroStats: Stat[] = [
  { value: 3.5, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Features Delivered' },
  { value: 95, suffix: '+', label: 'Lighthouse Scores' },
  { value: 100, suffix: '%', label: 'Performance Focused' },
]

export const orbitTech = ['React', 'TypeScript', 'Tailwind', 'Redux', 'React Router'] as const

export const marqueeItems = [
  'React',
  'TypeScript',
  'Redux',
  'React Router',
  'Tailwind',
  'Jest',
  'Webpack',
  'Git',
  'REST APIs',
  'Figma',
  'Accessibility',
  'Performance Optimization',
] as const
