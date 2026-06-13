import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/layout/ErrorBoundary'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { CommandMenuProvider } from '@/components/layout/command-menu-context'
import { CommandMenu } from '@/components/layout/CommandMenu'
import { Preloader } from '@/components/layout/Preloader'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { CursorGlow } from '@/components/effects/CursorGlow'
import HomePage from '@/pages/HomePage'

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CommandMenuProvider>
          <Preloader onComplete={() => setReady(true)} />
          {/* The page mounts behind the preloader so fonts/layout settle
              before the reveal — no pop-in when the veil lifts. */}
          <SmoothScroll>
            <ScrollProgress />
            <CursorGlow />
            <CommandMenu />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:text-snow"
            >
              Skip to content
            </a>
            <Navbar />
            {/* inert keeps the page out of the focus order and a11y tree
                until the preloader veil lifts */}
            <main id="main" inert={!ready}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<div className="min-h-screen" />}>
                      <NotFoundPage />
                    </Suspense>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </SmoothScroll>
        </CommandMenuProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
