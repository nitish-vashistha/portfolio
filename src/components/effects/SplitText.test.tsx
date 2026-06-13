import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SplitText } from './SplitText'

describe('SplitText accessibility contract', () => {
  it('exposes the full sentence to assistive tech', () => {
    render(<SplitText text="Frontend Engineer" />)
    expect(screen.getByLabelText('Frontend Engineer')).toBeInTheDocument()
  })

  it('hides the visual fragments from the accessibility tree', () => {
    const { container } = render(<SplitText text="Fast Beautiful Scalable" />)
    const fragments = container.querySelectorAll('[aria-hidden]')
    expect(fragments.length).toBeGreaterThan(0)
  })
})
