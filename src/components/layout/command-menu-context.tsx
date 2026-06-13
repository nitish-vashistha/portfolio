import { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface CommandMenuContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null)

export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle])
  return <CommandMenuContext.Provider value={value}>{children}</CommandMenuContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook co-location is intentional
export function useCommandMenu() {
  const ctx = useContext(CommandMenuContext)
  if (!ctx) throw new Error('useCommandMenu must be used within CommandMenuProvider')
  return ctx
}
