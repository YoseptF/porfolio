import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BalatroButton } from './BalatroButton'

describe('BalatroButton', () => {
  it('renders children', () => {
    render(<BalatroButton>Click me</BalatroButton>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<BalatroButton onClick={onClick}>Go</BalatroButton>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    render(<BalatroButton onClick={onClick} disabled>Go</BalatroButton>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders without error for each color variant', () => {
    const colors = ['blue', 'orange', 'red', 'green', 'purple'] as const
    for (const color of colors) {
      const { unmount } = render(<BalatroButton color={color}>Label</BalatroButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      unmount()
    }
  })
})
