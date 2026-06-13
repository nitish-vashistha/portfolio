import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
  it('renders an accessible button with its label', () => {
    render(<Button>View Projects</Button>)
    expect(screen.getByRole('button', { name: 'View Projects' })).toBeInTheDocument()
  })

  it('applies variant classes through cva', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-line')
  })

  it('fires onClick and respects disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { rerender } = render(<Button onClick={onClick}>Go</Button>)

    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()

    rerender(
      <Button onClick={onClick} disabled>
        Go
      </Button>,
    )
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
