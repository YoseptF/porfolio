import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDayNightCycle } from './useDayNightCycle'

describe('useDayNightCycle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      setTimeout(() => cb(performance.now()), 16)
      return 1
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('initial phase is day', () => {
    const { result } = renderHook(() => useDayNightCycle())
    expect(result.current.phase).toBe('day')
  })

  it('initial time is between 0 and 0.5', () => {
    const { result } = renderHook(() => useDayNightCycle())
    expect(result.current.time).toBeGreaterThanOrEqual(0)
    expect(result.current.time).toBeLessThan(0.5)
  })

  it('phase becomes night when time passes 0.5', () => {
    const { result } = renderHook(() => useDayNightCycle())

    act(() => {
      result.current.setTimeForTest(0.6)
    })

    expect(result.current.phase).toBe('night')
  })

  it('phase becomes day again when time wraps past 1', () => {
    const { result } = renderHook(() => useDayNightCycle())

    act(() => {
      result.current.setTimeForTest(0.6)
    })
    expect(result.current.phase).toBe('night')

    act(() => {
      result.current.setTimeForTest(0.05)
    })
    expect(result.current.phase).toBe('day')
  })
})
