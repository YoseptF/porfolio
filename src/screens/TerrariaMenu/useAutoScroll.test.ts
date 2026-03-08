import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAutoScroll } from './useAutoScroll'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useAutoScroll', () => {
  it('offset starts at 0', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0)
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})

    const { result } = renderHook(() => useAutoScroll())
    expect(result.current).toBe(0)
  })

  it('offset increases after RAF ticks spanning 1s', () => {
    const callbacks: FrameRequestCallback[] = []
    let id = 0
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      callbacks.push(cb)
      return ++id
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})

    const { result } = renderHook(() => useAutoScroll())

    act(() => {
      callbacks[0]?.(0)      // first tick — sets lastTime
      callbacks[1]?.(1000)   // second tick — 1s later
    })

    expect(result.current).toBeGreaterThan(0)
  })
})
