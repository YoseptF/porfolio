import { describe, it, expect } from 'vitest'
import { getRandomBiome, BIOMES } from './biomes'

describe('biomes', () => {
  it('all biomes have required fields', () => {
    for (const biome of BIOMES) {
      expect(biome.id).toBeTruthy()
      expect(Array.isArray(biome.layers)).toBe(true)
      expect(biome.layers.length).toBeGreaterThan(0)
      expect(['day', 'night', 'both']).toContain(biome.timeOfDay)
    }
  })

  it('getRandomBiome("day") always returns a day or both biome', () => {
    for (let i = 0; i < 20; i++) {
      const biome = getRandomBiome('day')
      expect(['day', 'both']).toContain(biome.timeOfDay)
    }
  })

  it('getRandomBiome("night") always returns a night or both biome', () => {
    for (let i = 0; i < 20; i++) {
      const biome = getRandomBiome('night')
      expect(['night', 'both']).toContain(biome.timeOfDay)
    }
  })

  it('has at least one day biome and one night biome', () => {
    const dayBiomes = BIOMES.filter(b => b.timeOfDay === 'day' || b.timeOfDay === 'both')
    const nightBiomes = BIOMES.filter(b => b.timeOfDay === 'night' || b.timeOfDay === 'both')
    expect(dayBiomes.length).toBeGreaterThan(0)
    expect(nightBiomes.length).toBeGreaterThan(0)
  })
})
