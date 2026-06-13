import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CommandMenu } from './CommandMenu'
import { CommandMenuProvider } from './command-menu-context'

function renderMenu() {
  return render(
    <CommandMenuProvider>
      {/* scroll target the navigate command resolves against */}
      <div id="about" />
      <CommandMenu />
    </CommandMenuProvider>,
  )
}

describe('CommandMenu', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('opens with Ctrl+K and closes with Escape', async () => {
    const user = userEvent.setup()
    renderMenu()

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.keyboard('{Control>}k{/Control}')
    expect(screen.getByRole('dialog', { name: /command menu/i })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    // AnimatePresence keeps the dialog mounted during its exit animation
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('clicking a navigate command scrolls to the section and closes', async () => {
    const user = userEvent.setup()
    const scrollSpy = vi.spyOn(window, 'scrollTo')
    renderMenu()

    await user.keyboard('{Control>}k{/Control}')
    await user.click(screen.getByRole('option', { name: /go to about/i }))

    expect(scrollSpy).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth' }),
    )
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('selecting with Enter runs the highlighted command', async () => {
    const user = userEvent.setup()
    const scrollSpy = vi.spyOn(window, 'scrollTo')
    renderMenu()

    await user.keyboard('{Control>}k{/Control}')
    await user.keyboard('about')
    await user.keyboard('{Enter}')

    expect(scrollSpy).toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('option ids never shadow page section ids while the palette is open', async () => {
    const user = userEvent.setup()
    renderMenu()

    await user.keyboard('{Control>}k{/Control}')

    // Regression: options once rendered id="about", so getElementById('about')
    // resolved to the fixed-position menu item and scrolling targeted the
    // overlay instead of the section.
    expect(document.querySelectorAll('#about')).toHaveLength(1)
    expect(document.getElementById('about')).not.toHaveAttribute('role', 'option')
  })

  it('filters commands by query', async () => {
    const user = userEvent.setup()
    renderMenu()

    await user.keyboard('{Control>}k{/Control}')
    await user.keyboard('linkedin')

    expect(screen.getByRole('option', { name: /open linkedin/i })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: /go to about/i })).not.toBeInTheDocument()
  })
})
