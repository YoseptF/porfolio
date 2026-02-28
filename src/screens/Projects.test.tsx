import { describe, it, expect } from 'vitest'
import { PROJECT_BG_CONFIG } from './Projects'

describe('PROJECT_BG_CONFIG', () => {
  it('color1 is actually green (green channel > red channel)', () => {
    expect(PROJECT_BG_CONFIG.color1[1]).toBeGreaterThan(PROJECT_BG_CONFIG.color1[0])
  })

  it('spinAmount is less swirly than main menu default (< 0.5)', () => {
    expect(PROJECT_BG_CONFIG.spinAmount).toBeLessThan(0.5)
  })
})
