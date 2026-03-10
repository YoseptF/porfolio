import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TerrariaText } from './TerrariaText'

describe('TerrariaText', () => {
  it('renders children', () => {
    render(<TerrariaText>Hello</TerrariaText>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders without error for each variant', () => {
    const variants = ['title', 'heading', 'body', 'chips', 'mult', 'gold'] as const
    for (const variant of variants) {
      const { unmount } = render(<TerrariaText variant={variant}>Text</TerrariaText>)
      expect(screen.getByText('Text')).toBeInTheDocument()
      unmount()
    }
  })
})
