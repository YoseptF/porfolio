import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { TerrariaLogo } from './TerrariaLogo'

describe('TerrariaLogo', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('renders exactly one visible img frame', () => {
    const { container } = render(<TerrariaLogo />)
    const imgs = container.querySelectorAll('img')
    expect(imgs.length).toBe(1)
  })

  it('frame does not change after 500ms — no cycling interval', () => {
    const { container } = render(<TerrariaLogo />)
    const imgBefore = (container.querySelector('img') as HTMLImageElement).src

    act(() => { vi.advanceTimersByTime(500) })

    const imgAfter = (container.querySelector('img') as HTMLImageElement).src
    expect(imgAfter).toBe(imgBefore)
  })
})
