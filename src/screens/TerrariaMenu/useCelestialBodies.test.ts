import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { arcXToY, timeToMoonX, useCelestialBodies } from './useCelestialBodies'

describe('arcXToY', () => {
  it('returns ~0.40 at left horizon (x=0.05)', () => {
    expect(arcXToY(0.05)).toBeCloseTo(0.40, 1)
  })

  it('returns ~0.08 at noon peak (x=0.50)', () => {
    expect(arcXToY(0.50)).toBeCloseTo(0.08, 1)
  })

  it('returns ~0.40 at right horizon (x=0.95)', () => {
    expect(arcXToY(0.95)).toBeCloseTo(0.40, 1)
  })

  it('center Y < edge Y — arc goes UP not down', () => {
    expect(arcXToY(0.50)).toBeLessThan(arcXToY(0.05))
  })
})

describe('timeToMoonX', () => {
  // Moon travels left→right (same direction as sun), rising in the east
  it('moon X is 0.05 at time=0.5 (just started night — rises on left)', () => {
    expect(timeToMoonX(0.5)).toBeCloseTo(0.05, 5)
  })

  it('moon X is ~0.50 at time=0.75 (mid-night — overhead)', () => {
    expect(timeToMoonX(0.75)).toBeCloseTo(0.50, 1)
  })

  it('moon X is 0.95 at time=1.0 (end of night — sets on right)', () => {
    expect(timeToMoonX(1.0)).toBeCloseTo(0.95, 5)
  })
})

describe('useCelestialBodies drag', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true, writable: true })
  })

  it('overrides both X and Y during drag', () => {
    const seekTo = vi.fn()
    const { result } = renderHook(() => useCelestialBodies(0.25, seekTo, 'day'))

    act(() => {
      result.current.onPointerDown({
        currentTarget: { setPointerCapture: vi.fn() },
        pointerId: 1,
      } as unknown as React.PointerEvent)
    })

    act(() => {
      result.current.onPointerMove({ clientX: 200, clientY: 100 } as React.PointerEvent)
    })

    expect(result.current.sunX).toBeCloseTo(0.2)
    expect(result.current.sunY).toBeCloseTo(0.125)
  })

  it('onPointerUp uses the LATEST drag position even without render flush between moves', () => {
    // Simulates rapid pointer events where React has not re-rendered between moves.
    // The stale-closure bug: onPointerUp reads overrideX from the last COMMITTED render,
    // not the most recent pointer move. With refs, it always reads the latest value.
    const seekTo = vi.fn()
    const { result } = renderHook(() => useCelestialBodies(0.1, seekTo, 'day'))

    act(() => {
      result.current.onPointerDown({
        currentTarget: { setPointerCapture: vi.fn() },
        pointerId: 1,
      } as unknown as React.PointerEvent)
    })

    // Fire multiple moves WITHOUT wrapping in act() so React state is never flushed
    result.current.onPointerMove({ clientX: 600, clientY: 400 } as React.PointerEvent)
    result.current.onPointerMove({ clientX: 700, clientY: 300 } as React.PointerEvent)
    result.current.onPointerMove({ clientX: 800, clientY: 200 } as React.PointerEvent)

    act(() => {
      result.current.onPointerUp()
    })

    // x=0.8 → day t = (0.8 - 0.05) / 0.9 * 0.5 ≈ 0.417
    // With stale closure: seekTo is called with 0.306 (from x=0.6 of the first flushed render),
    // or not at all (if overrideX was null). Either way, 0.417 fails.
    expect(seekTo).toHaveBeenCalledWith(expect.closeTo(0.417, 2))
  })

  it('on drop, computes t from drop X and calls seekTo', () => {
    const seekTo = vi.fn()
    const { result } = renderHook(() => useCelestialBodies(0.1, seekTo, 'day'))

    act(() => {
      result.current.onPointerDown({
        currentTarget: { setPointerCapture: vi.fn() },
        pointerId: 1,
      } as unknown as React.PointerEvent)
    })

    act(() => {
      result.current.onPointerMove({ clientX: 600, clientY: 400 } as React.PointerEvent)
    })

    act(() => {
      result.current.onPointerUp()
    })

    // x=0.6 → day t = (0.6 - 0.05) / 0.9 * 0.5 ≈ 0.306
    expect(seekTo).toHaveBeenCalledWith(expect.closeTo(0.306, 2))
    // overrides cleared → sunX back to time-based
    expect(result.current.sunX).not.toBeCloseTo(0.6)
  })
})
