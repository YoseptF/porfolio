import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ModalWrapper } from './index'

describe('ModalWrapper', () => {
  it('renders children', () => {
    render(<ModalWrapper onBack={vi.fn()}>Hello</ModalWrapper>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders a Back button', () => {
    render(<ModalWrapper onBack={vi.fn()}>Content</ModalWrapper>)
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })

  it('calls onBack when Back is clicked', async () => {
    const onBack = vi.fn()
    render(<ModalWrapper onBack={onBack}>Content</ModalWrapper>)
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(onBack).toHaveBeenCalledOnce()
  })
})
