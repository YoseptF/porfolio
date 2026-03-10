import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TerrariaButton } from './TerrariaButton'

describe('TerrariaButton', () => {
  it('renders children', () => {
    render(<TerrariaButton>Click me</TerrariaButton>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders as a direct button element', () => {
    const { container } = render(<TerrariaButton>X</TerrariaButton>)
    expect(container.firstChild?.nodeName).toBe('BUTTON')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<TerrariaButton onClick={onClick}>Go</TerrariaButton>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    render(<TerrariaButton onClick={onClick} disabled>Go</TerrariaButton>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders without error for each color variant', () => {
    const colors = ['blue', 'orange', 'red', 'green', 'purple', 'grey'] as const
    for (const color of colors) {
      const { unmount } = render(<TerrariaButton color={color}>Label</TerrariaButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      unmount()
    }
  })
})
