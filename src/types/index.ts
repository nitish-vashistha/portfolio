/** Structural icon type — satisfied by lucide icons and custom brand icons alike. */
export type IconComponent = React.ComponentType<{ size?: number; className?: string }>

export type SectionId =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'performance'
  | 'contact'

export interface NavItem {
  label: string
  id: SectionId
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface SkillCategory {
  title: string
  icon: IconComponent
  accent: 'violet' | 'cyan' | 'blue'
  skills: string[]
}

export interface TimelineMilestone {
  period: string
  title: string
  description: string
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  location: string
  achievements: string[]
  stack: string[]
}

export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  description: string
  features: string[]
  metrics: ProjectMetric[]
  stack: string[]
  accent: 'violet' | 'cyan' | 'blue'
  mockup: 'builder' | 'website' | 'marketing'
}

export interface PerfTechnique {
  title: string
  description: string
  icon: IconComponent
  visual: 'split' | 'lazy' | 'memo' | 'debounce' | 'render' | 'a11y'
}

export interface LighthouseScore {
  label: string
  score: number
}

export interface CommandAction {
  id: string
  label: string
  hint?: string
  group: 'Navigate' | 'Actions'
  icon: IconComponent
  perform: () => void
}
