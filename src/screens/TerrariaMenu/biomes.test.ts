import { describe, it, expect } from 'vitest'
import { getRandomBiome } from './biomes'

describe('getRandomBiome', () => {
  it('always returns a day biome when phase is day', () => {
    for (let i = 0; i < 20; i++) {
      const biome = getRandomBiome('day')
      expect(biome.timeOfDay).toBe('day')
    }
  })

  it('always returns a night biome when phase is night', () => {
    for (let i = 0; i < 20; i++) {
      const biome = getRandomBiome('night')
      expect(biome.timeOfDay).toBe('night')
    }
  })

  it('returns at least 1 non-empty layer', () => {
    const biome = getRandomBiome('day')
    expect(biome.layers.length).toBeGreaterThan(0)
    for (const layer of biome.layers) {
      expect(typeof layer).toBe('string')
      expect(layer.length).toBeGreaterThan(0)
    }
  })

  it('skyColor has all required fields', () => {
    const biome = getRandomBiome('day')
    expect(typeof biome.skyColor.dawn).toBe('string')
    expect(typeof biome.skyColor.noon).toBe('string')
    expect(typeof biome.skyColor.dusk).toBe('string')
    expect(typeof biome.skyColor.night).toBe('string')
  })
})
