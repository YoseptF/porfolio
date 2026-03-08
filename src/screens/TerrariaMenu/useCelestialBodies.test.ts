import { describe, it, expect } from 'vitest'
import { arcXToY, timeToMoonX } from './useCelestialBodies'

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
  it('moon X is 0.95 at time=0.5 (just started night)', () => {
    expect(timeToMoonX(0.5)).toBeCloseTo(0.95, 5)
  })

  it('moon X is ~0.50 at time=0.75 (mid-night)', () => {
    expect(timeToMoonX(0.75)).toBeCloseTo(0.50, 1)
  })

  it('moon X is 0.05 at time=1.0 (end of night)', () => {
    expect(timeToMoonX(1.0)).toBeCloseTo(0.05, 5)
  })
})
