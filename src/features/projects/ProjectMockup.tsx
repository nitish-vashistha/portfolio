import { memo } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

const accentBar = {
  violet: 'bg-primary-light/70',
  cyan: 'bg-accent-cyan/70',
  blue: 'bg-accent-blue/70',
} as const

const accentSoft = {
  violet: 'bg-primary/25',
  cyan: 'bg-accent-cyan/20',
  blue: 'bg-accent-blue/20',
} as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const block = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

/**
 * Pure-CSS animated "screenshot": a browser frame whose abstract UI builds
 * itself when scrolled into view. No images to load — LCP stays tiny and the
 * mockup doubles as a motion-design showcase.
 */
export const ProjectMockup = memo(function ProjectMockup({ project }: { project: Project }) {
  return (
    <div aria-hidden className="relative overflow-hidden rounded-2xl border border-line bg-ink-soft shadow-card">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-snow/40">
          {project.subtitle.toLowerCase().replace(/\s.*/, '')}
          {project.mockup === 'builder' ? '/editor' : project.mockup === 'website' ? '/docs' : '/'}
        </span>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="aspect-[16/10] p-4"
      >
        {project.mockup === 'builder' && <BuilderUI accent={project.accent} />}
        {project.mockup === 'website' && <WebsiteUI accent={project.accent} />}
        {project.mockup === 'marketing' && <MarketingUI accent={project.accent} />}
      </motion.div>
    </div>
  )
})

type AccentProps = { accent: Project['accent'] }

function BuilderUI({ accent }: AccentProps) {
  return (
    <div className="flex h-full gap-3">
      {/* Component palette */}
      <div className="flex w-1/4 flex-col gap-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            variants={block}
            className={cn('h-8 rounded-lg border border-line bg-white/[0.04]', i === 1 && 'border-dashed')}
          />
        ))}
      </div>
      {/* Canvas with "dropping" blocks */}
      <div className="relative flex-1 rounded-lg border border-dashed border-line p-3">
        <motion.div variants={block} className={cn('mb-2 h-10 rounded-md', accentSoft[accent])} />
        <div className="mb-2 flex gap-2">
          <motion.div variants={block} className="h-16 flex-1 rounded-md bg-white/[0.05]" />
          <motion.div variants={block} className="h-16 flex-1 rounded-md bg-white/[0.05]" />
          <motion.div variants={block} className={cn('h-16 flex-1 rounded-md', accentSoft[accent])} />
        </div>
        <motion.div variants={block} className="h-6 w-2/3 rounded-md bg-white/[0.05]" />
        {/* Floating drag ghost */}
        <motion.div
          className={cn('absolute right-5 top-6 h-8 w-20 rounded-md shadow-glow-sm', accentBar[accent])}
          animate={{ y: [0, 46, 46], x: [0, -16, -16], opacity: [0.9, 0.9, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

function WebsiteUI({ accent }: AccentProps) {
  return (
    <div className="flex h-full flex-col gap-2">
      {/* Header with theme toggle morphing */}
      <motion.div variants={block} className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2">
        <div className={cn('h-3 w-14 rounded-full', accentBar[accent])} />
        <motion.div
          className="h-4 w-8 rounded-full bg-white/10 p-0.5"
          animate={{ backgroundColor: ['rgba(248,250,252,0.1)', 'rgba(6,182,212,0.35)', 'rgba(248,250,252,0.1)'] }}
          transition={{ duration: 3.4, repeat: Infinity }}
        >
          <motion.div
            className="h-3 w-3 rounded-full bg-snow/80"
            animate={{ x: [0, 16, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
      <div className="flex flex-1 gap-2">
        <motion.div variants={block} className="w-1/4 rounded-lg bg-white/[0.04]" />
        <div className="flex flex-1 flex-col gap-2">
          <motion.div variants={block} className={cn('h-1/3 rounded-lg', accentSoft[accent])} />
          <div className="flex flex-1 gap-2">
            <motion.div variants={block} className="flex-1 rounded-lg bg-white/[0.05]" />
            <motion.div variants={block} className="flex-1 rounded-lg bg-white/[0.05]" />
          </div>
        </div>
      </div>
      {/* i18n ticker */}
      <motion.div variants={block} className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5">
        {['EN', 'FR', 'DE', 'AR', 'HI'].map((lang, i) => (
          <motion.span
            key={lang}
            className="font-mono text-[9px] text-snow/50"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.45 }}
          >
            {lang}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

function MarketingUI({ accent }: AccentProps) {
  return (
    <div className="flex h-full flex-col gap-2">
      <motion.div variants={block} className="flex h-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-white/[0.04]">
        <div className={cn('h-3.5 w-1/2 rounded-full', accentBar[accent])} />
        <div className="h-2 w-2/3 rounded-full bg-white/10" />
        <div className="mt-1 flex gap-2">
          <div className={cn('h-5 w-14 rounded-full', accentSoft[accent])} />
          <div className="h-5 w-14 rounded-full bg-white/[0.07]" />
        </div>
      </motion.div>
      <div className="flex flex-1 gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} variants={block} className="flex flex-1 flex-col gap-1.5 rounded-lg bg-white/[0.05] p-2">
            <div className={cn('h-1.5 w-2/3 rounded-full', i === 1 ? accentBar[accent] : 'bg-white/10')} />
            <div className="h-1.5 w-full rounded-full bg-white/[0.07]" />
            <div className="h-1.5 w-1/2 rounded-full bg-white/[0.07]" />
            {/* Lighthouse-style score dot */}
            <motion.div
              className="mt-auto self-end font-mono text-[9px] text-green-400/90"
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.8, delay: 1 + i * 0.3 }}
            >
              9{5 + i}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
