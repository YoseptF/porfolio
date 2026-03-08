import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { SplashScreen } from './SplashScreen'

describe('SplashScreen', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('does NOT call onComplete before 3000ms', () => {
    const onComplete = vi.fn()
    render(<SplashScreen onComplete={onComplete} />)

    act(() => { vi.advanceTimersByTime(2999) })
    expect(onComplete).not.toHaveBeenCalled()
  })

  it('calls onComplete after 3000ms', () => {
    const onComplete = vi.fn()
    render(<SplashScreen onComplete={onComplete} />)

    act(() => { vi.advanceTimersByTime(3000) })
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('does NOT reset its timer when parent re-renders rapidly', () => {
    const onComplete2 = vi.fn()
    const { rerender } = render(<SplashScreen onComplete={vi.fn()} />)

    act(() => { vi.advanceTimersByTime(1000) })
    // Parent re-renders (e.g. from RAF loop) passing a new function reference
    rerender(<SplashScreen onComplete={onComplete2} />)
    rerender(<SplashScreen onComplete={onComplete2} />)
    rerender(<SplashScreen onComplete={onComplete2} />)

    // Timer fires at 3000ms from MOUNT (1000ms already elapsed, 2000ms left)
    act(() => { vi.advanceTimersByTime(1999) })
    expect(onComplete2).not.toHaveBeenCalled()

    act(() => { vi.advanceTimersByTime(1) })
    expect(onComplete2).toHaveBeenCalledOnce()
  })

  it('calls onComplete exactly once (not multiple times)', () => {
    const onComplete = vi.fn()
    render(<SplashScreen onComplete={onComplete} />)

    act(() => { vi.advanceTimersByTime(10000) })
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('overlay has a background-color so the fade is visible', () => {
    const onComplete = vi.fn()
    const { container } = render(<SplashScreen onComplete={onComplete} />)

    const overlay = container.firstElementChild
    expect(overlay).toBeTruthy()
    // The overlay should have a background so fading it is visually meaningful
    const style = window.getComputedStyle(overlay!)
    expect(style.background || style.backgroundColor).not.toBe('')
  })

  it('fires regardless of localStorage state', () => {
    localStorage.setItem('terrariaSplashPlayed', 'true')
    const onComplete = vi.fn()
    render(<SplashScreen onComplete={onComplete} />)

    act(() => { vi.advanceTimersByTime(3000) })
    expect(onComplete).toHaveBeenCalledOnce()
  })
})
