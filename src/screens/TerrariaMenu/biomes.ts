type BiomeId =
  | 'forest'
  | 'pine-forest'
  | 'snow'
  | 'jungle'
  | 'hallow'
  | 'desert'
  | 'ocean'
  | 'night-forest'
  | 'corruption'
  | 'crimson'
  | 'mushroom'
  | 'hallow-night'

type SkyPalette = {
  dawn: string
  noon: string
  dusk: string
  night: string
}

type BiomeDef = {
  id: BiomeId
  layers: string[]
  timeOfDay: 'day' | 'night' | 'both'
  skyColor: SkyPalette
}

const bg = (folder: string, n: number) => `/terraria/bg/${folder}/Background_${n}.webp`

export const BIOMES: BiomeDef[] = [
  {
    id: 'forest',
    layers: [bg('far/day', 7), bg('mid/day', 91), bg('near/day', 52)],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#f5c77e',
      noon: '#5b9bd5',
      dusk: '#e07c52',
      night: '#0d1b3e',
    },
  },
  {
    id: 'pine-forest',
    layers: [bg('far/day', 22), bg('mid/day', 9), bg('near/day', 10)],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#d4c89a',
      noon: '#6aacde',
      dusk: '#c87040',
      night: '#0d1b3e',
    },
  },
  {
    id: 'snow',
    layers: [bg('far/day', 35), bg('mid/day', 37), bg('near/day', 95)],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#c8dce8',
      noon: '#a8c8e0',
      dusk: '#b090a0',
      night: '#0d1b3e',
    },
  },
  {
    id: 'jungle',
    layers: [bg('far/day', 172), bg('near/day', 60), bg('near/day', 61)],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#70a858',
      noon: '#508038',
      dusk: '#405828',
      night: '#0d1b3e',
    },
  },
  {
    id: 'hallow',
    layers: [bg('far/day', 214), bg('mid/day', 92), bg('near/day', 59)],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#e0c8f0',
      noon: '#90c8f8',
      dusk: '#d0a0d0',
      night: '#1a1040',
    },
  },
  {
    id: 'desert',
    layers: [bg('far/day', 217), bg('mid/day', 101), bg('near/day', 50)],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#e8c87c',
      noon: '#d4a84c',
      dusk: '#c07030',
      night: '#0d1b3e',
    },
  },
  {
    id: 'ocean',
    layers: [bg('far/day', 332), bg('mid/day', 109), bg('near/day', 51)],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#f0d890',
      noon: '#60b8e0',
      dusk: '#f08060',
      night: '#0d1b3e',
    },
  },
  {
    id: 'night-forest',
    layers: [bg('far/night', 23), bg('mid/night', 29), bg('near/night', 12)],
    timeOfDay: 'night',
    skyColor: {
      dawn: '#1a1e30',
      noon: '#0d1228',
      dusk: '#1a1e30',
      night: '#080c1a',
    },
  },
  {
    id: 'corruption',
    layers: [bg('far/night', 25), bg('mid/night', 45), bg('near/night', 14)],
    timeOfDay: 'night',
    skyColor: {
      dawn: '#181828',
      noon: '#0d1b3e',
      dusk: '#181828',
      night: '#06040e',
    },
  },
  {
    id: 'crimson',
    layers: [bg('far/night', 41), bg('mid/night', 44), bg('near/night', 13)],
    timeOfDay: 'night',
    skyColor: {
      dawn: '#280810',
      noon: '#1a0508',
      dusk: '#280810',
      night: '#0a0208',
    },
  },
  {
    id: 'mushroom',
    layers: [bg('far/night', 198), bg('mid/night', 30), bg('near/night', 48)],
    timeOfDay: 'night',
    skyColor: {
      dawn: '#1a1e30',
      noon: '#0d1228',
      dusk: '#1a1e30',
      night: '#080c1a',
    },
  },
  {
    id: 'hallow-night',
    layers: [bg('far/night', 127), bg('mid/night', 173), bg('near/night', 56)],
    timeOfDay: 'night',
    skyColor: {
      dawn: '#1e1430',
      noon: '#140c28',
      dusk: '#1e1430',
      night: '#0a0818',
    },
  },
]

const DEFAULT_BIOME: BiomeDef = BIOMES[0]!

export const getRandomBiome = (phase: 'day' | 'night'): BiomeDef => {
  const eligible = BIOMES.filter(b => b.timeOfDay === phase || b.timeOfDay === 'both')
  const idx = Math.floor(Math.random() * eligible.length)
  return eligible[idx] ?? DEFAULT_BIOME
}
