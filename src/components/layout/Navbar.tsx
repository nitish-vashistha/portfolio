import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Menu, X, Command } from 'lucide-react'
import { navItems, site } from '@/config/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useCommandMenu } from '@/components/layout/command-menu-context'
import { MagneticButton } from '@/components/effects/MagneticButton'
import { cn } from '@/lib/utils'

const sectionIds = ['hero', ...navItems.map((n) => n.id)] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection([...sectionIds])
  const { open: openCommandMenu } = useCommandMenu()
  const { scrollY } = useScroll()

  useEffect(() => scrollY.on('change', (y) => setScrolled(y > 24)), [scrollY])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={cn(
        'fixed inset-x-0 top-0 z-[80] transition-all duration-500',
        scrolled ? 'glass border-b border-line py-3 shadow-card' : 'border-b border-transparent py-5',
      )}
    >
      <nav aria-label="Primary" className="section-shell flex items-center justify-between">
        <a
          href="#hero"
          className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-snow"
          aria-label={`${site.name} — back to top`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent-cyan text-sm font-bold text-snow shadow-glow-sm transition-shadow group-hover:shadow-glow-md">
            {site.initials}
          </span>
          <span className="hidden sm:inline">
            {site.name.split(' ')[0]}
            <span className="text-snow/40">.dev</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm transition-colors duration-300',
                  active === item.id ? 'text-snow' : 'text-snow/55 hover:text-snow',
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={openCommandMenu}
            className="hidden items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-2 font-mono text-xs text-snow/50 transition-colors hover:border-primary-light/40 hover:text-snow md:flex"
            aria-label="Open command menu"
          >
            <Command size={13} aria-hidden />
            <span>⌘K</span>
          </button>
          <MagneticButton className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex h-10 items-center rounded-full bg-gradient-to-r from-primary to-primary-light px-5 text-sm font-medium text-snow shadow-glow-sm transition-shadow hover:shadow-glow-md"
            >
              Let's talk
            </a>
          </MagneticButton>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-snow lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass overflow-hidden border-b border-line lg:hidden"
          >
            <ul className="section-shell flex flex-col gap-1 py-4">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base text-snow/80 transition-colors hover:bg-white/5 hover:text-snow"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
