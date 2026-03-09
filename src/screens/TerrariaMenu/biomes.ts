import { BG_POOL } from './bgManifest'

export type SkyPalette = {
  dawn: string
  noon: string
  dusk: string
  night: string
}

export type BiomeDef = {
  layers: string[]
  timeOfDay: 'day' | 'night'
  skyColor: SkyPalette
}

const DAY_SKY_PALETTES: SkyPalette[] = [
  { dawn: '#f5c77e', noon: '#5b9bd5', dusk: '#e07c52', night: '#0d1b3e' }, // forest blue
  { dawn: '#d4c89a', noon: '#6aacde', dusk: '#c87040', night: '#0d1b3e' }, // pine
  { dawn: '#c8dce8', noon: '#a8c8e0', dusk: '#b090a0', night: '#0d1b3e' }, // snow
  { dawn: '#70a858', noon: '#508038', dusk: '#405828', night: '#0d1b3e' }, // jungle
  { dawn: '#e0c8f0', noon: '#90c8f8', dusk: '#d0a0d0', night: '#1a1040' }, // hallow
  { dawn: '#e8c87c', noon: '#d4a84c', dusk: '#c07030', night: '#0d1b3e' }, // desert
  { dawn: '#f0d890', noon: '#60b8e0', dusk: '#f08060', night: '#0d1b3e' }, // ocean
]

const NIGHT_SKY_PALETTES: SkyPalette[] = [
  { dawn: '#1a1e30', noon: '#0d1228', dusk: '#1a1e30', night: '#080c1a' }, // forest night
  { dawn: '#181828', noon: '#0d1b3e', dusk: '#181828', night: '#06040e' }, // corruption
  { dawn: '#280810', noon: '#1a0508', dusk: '#280810', night: '#0a0208' }, // crimson
  { dawn: '#1e1430', noon: '#140c28', dusk: '#1e1430', night: '#0a0818' }, // hallow night
]

const pickRandom = <T>(arr: T[]): T | undefined => arr[Math.floor(Math.random() * arr.length)]

export const getRandomBiome = (phase: 'day' | 'night'): BiomeDef => {
  const far = [...(BG_POOL['far']?.[phase] ?? []), ...(BG_POOL['far']?.['both'] ?? [])]
  const mid = [...(BG_POOL['mid']?.[phase] ?? []), ...(BG_POOL['mid']?.['both'] ?? [])]
  const near = [...(BG_POOL['near']?.[phase] ?? []), ...(BG_POOL['near']?.['both'] ?? [])]

  const palettes = phase === 'day' ? DAY_SKY_PALETTES : NIGHT_SKY_PALETTES
  const skyColor = pickRandom(palettes) ?? palettes[0]!

  const layers = [
    pickRandom(far),
    pickRandom(mid),
    pickRandom(near),
  ].filter((l): l is string => l !== undefined)

  return { layers, timeOfDay: phase, skyColor }
}
