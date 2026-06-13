import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App smoke test', () => {
  it('mounts the full shell without crashing', async () => {
    render(<App />)
    // Preloader is up first…
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
    // …and the primary navigation renders behind it.
    expect(await screen.findByRole('navigation', { name: /primary/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view projects/i })).toBeInTheDocument()
  })
})
