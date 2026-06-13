import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/** Last line of defense — a crash in any section never blanks the page. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
            <p className="font-mono text-sm text-primary-light">Something broke — gracefully.</p>
            <h1 className="font-display text-2xl text-snow">This section failed to render.</h1>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-2 rounded-full border border-line px-5 py-2 text-sm text-snow/80 transition hover:border-primary-light/50"
            >
              Try again
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
