import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TerrariaPanel } from './TerrariaPanel'

describe('TerrariaPanel', () => {
  it('renders children', () => {
    render(<TerrariaPanel>Content</TerrariaPanel>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<TerrariaPanel title="ABOUT">Content</TerrariaPanel>)
    expect(screen.getByText('ABOUT')).toBeInTheDocument()
  })

  it('renders without title', () => {
    const { container } = render(<TerrariaPanel>Content</TerrariaPanel>)
    expect(container.firstChild).toBeInTheDocument()
  })
})
