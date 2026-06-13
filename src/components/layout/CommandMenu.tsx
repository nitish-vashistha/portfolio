import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  User,
  Sparkles,
  Briefcase,
  FolderKanban,
  Gauge,
  Mail,
  FileDown,
  Copy,
  CornerDownLeft,
} from 'lucide-react'
import { LinkedInIcon } from '@/components/ui/icons'
import { site } from '@/config/site'
import { scrollToId } from '@/lib/scroll'
import { copyText } from '@/lib/utils'
import { useCommandMenu } from './command-menu-context'
import type { CommandAction } from '@/types'
import { cn } from '@/lib/utils'

/**
 * ⌘K command palette built from scratch: fuzzy-ish filtering, full keyboard
 * navigation (↑ ↓ Enter Esc), focus trap and ARIA listbox semantics.
 */
export function CommandMenu() {
  const { isOpen, close, toggle } = useCommandMenu()

  // Global shortcut.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggle])

  return (
    <AnimatePresence>{isOpen && <Palette onClose={close} />}</AnimatePresence>
  )
}

/**
 * The palette body mounts fresh on every open (AnimatePresence unmounts it
 * on close), so query/selection/copied state resets without any effects.
 */
function Palette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [copied, setCopied] = useState(false)

  const actions = useMemo<CommandAction[]>(
    () => [
      { id: 'about', label: 'Go to About', group: 'Navigate', icon: User, perform: () => scrollToId('about') },
      { id: 'skills', label: 'Go to Skills', group: 'Navigate', icon: Sparkles, perform: () => scrollToId('skills') },
      { id: 'experience', label: 'Go to Experience', group: 'Navigate', icon: Briefcase, perform: () => scrollToId('experience') },
      { id: 'projects', label: 'Go to Projects', group: 'Navigate', icon: FolderKanban, perform: () => scrollToId('projects') },
      { id: 'performance', label: 'Go to Performance', group: 'Navigate', icon: Gauge, perform: () => scrollToId('performance') },
      { id: 'contact', label: 'Go to Contact', group: 'Navigate', icon: Mail, perform: () => scrollToId('contact') },
      {
        id: 'copy-email',
        label: 'Copy email address',
        hint: site.email,
        group: 'Actions',
        icon: Copy,
        perform: () => {
          void copyText(site.email).then((ok) => setCopied(ok))
        },
      },
      {
        id: 'resume',
        label: 'Download resume',
        group: 'Actions',
        icon: FileDown,
        // Anchor click instead of window.open — immune to popup blockers
        // and triggers a real download.
        perform: () => {
          const link = document.createElement('a')
          link.href = site.resume
          link.download = ''
          document.body.appendChild(link)
          link.click()
          link.remove()
        },
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        hint: 'vashisthnitish',
        group: 'Actions',
        icon: LinkedInIcon,
        perform: () => window.open(site.linkedin, '_blank', 'noopener'),
      },
    ],
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.hint?.toLowerCase().includes(q),
    )
  }, [actions, query])

  // Focus after the enter animation starts; autoFocus alone can lose the
  // race against the motion transform on some browsers.
  useEffect(() => {
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(raf)
  }, [])

  const run = (action: CommandAction) => {
    action.perform()
    if (action.id !== 'copy-email') onClose()
  }

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const action = filtered[activeIndex]
      if (action) run(action)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const groups = ['Navigate', 'Actions'] as const

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-[18vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <button
        aria-label="Close command menu"
        className="absolute inset-0 cursor-default bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
        tabIndex={-1}
      />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="glass relative w-full max-w-lg overflow-hidden rounded-2xl shadow-glow-md"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onListKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="text-snow/40" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActiveIndex(0)
                }}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-listbox"
                aria-activedescendant={
                  filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined
                }
                className="h-13 w-full bg-transparent py-4 text-sm text-snow placeholder:text-snow/35 focus:outline-none"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-snow/40">
                ESC
              </kbd>
            </div>

            <ul id="command-listbox" role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-snow/40">No results. Try “projects”.</li>
              )}
              {groups.map((group) => {
                const items = filtered.filter((a) => a.group === group)
                if (items.length === 0) return null
                return (
                  <li key={group}>
                    <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-snow/35">
                      {group}
                    </p>
                    <ul role="presentation">
                      {items.map((action) => {
                        const index = filtered.indexOf(action)
                        const isActive = index === activeIndex
                        const Icon = action.icon
                        return (
                          <li
                            key={action.id}
                            // Namespaced: the raw action id ('about', 'projects', …)
                            // would shadow the page section ids and hijack
                            // getElementById-based scrolling while the palette is open.
                            id={`cmd-${action.id}`}
                            role="option"
                            aria-selected={isActive}
                            className={cn(
                              'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                              isActive ? 'bg-primary/15 text-snow' : 'text-snow/65',
                            )}
                            onPointerMove={() => setActiveIndex(index)}
                            onClick={() => run(action)}
                          >
                            <Icon size={15} className={isActive ? 'text-primary-light' : 'text-snow/40'} aria-hidden />
                            <span className="flex-1">
                              {action.id === 'copy-email' && copied ? 'Copied to clipboard ✓' : action.label}
                            </span>
                            {action.hint && (
                              <span className="font-mono text-[11px] text-snow/30">{action.hint}</span>
                            )}
                            {isActive && <CornerDownLeft size={13} className="text-snow/30" aria-hidden />}
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-snow/35">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
      </motion.div>
    </motion.div>
  )
}
