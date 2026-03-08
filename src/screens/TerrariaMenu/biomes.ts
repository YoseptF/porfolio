type BiomeId = 'forest' | 'snow' | 'desert' | 'ocean' | 'jungle' | 'corruption' | 'crimson'

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

export const BIOMES: BiomeDef[] = [
  {
    id: 'forest',
    layers: ['/terraria/Background_55.webp'],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#f5c77e',
      noon: '#5b9bd5',
      dusk: '#e07c52',
      night: '#0d1b3e',
    },
  },
  {
    id: 'snow',
    layers: ['/terraria/Background_90.webp', '/terraria/Background_91.webp'],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#c8dce8',
      noon: '#a8c8e0',
      dusk: '#b090a0',
      night: '#0d1b3e',
    },
  },
  {
    id: 'desert',
    layers: ['/terraria/Background_92.webp', '/terraria/Background_93.webp'],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#f5a050',
      noon: '#e8c870',
      dusk: '#d06020',
      night: '#0d1b3e',
    },
  },
  {
    id: 'ocean',
    layers: ['/terraria/Background_100.webp', '/terraria/Background_101.webp'],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#80b8d8',
      noon: '#4090c8',
      dusk: '#a04878',
      night: '#0d1b3e',
    },
  },
  {
    id: 'jungle',
    layers: ['/terraria/Background_102.webp', '/terraria/Background_103.webp'],
    timeOfDay: 'day',
    skyColor: {
      dawn: '#70a858',
      noon: '#508038',
      dusk: '#405828',
      night: '#0d1b3e',
    },
  },
  {
    id: 'corruption',
    layers: ['/terraria/Background_302.webp', '/terraria/Background_104.webp'],
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
    layers: ['/terraria/Background_337.webp', '/terraria/Background_105.webp'],
    timeOfDay: 'night',
    skyColor: {
      dawn: '#280810',
      noon: '#1a0508',
      dusk: '#280810',
      night: '#0a0208',
    },
  },
]

const DEFAULT_BIOME: BiomeDef = {
  id: 'forest',
  layers: ['/terraria/Background_55.webp'],
  timeOfDay: 'day',
  skyColor: { dawn: '#f5c77e', noon: '#5b9bd5', dusk: '#e07c52', night: '#0d1b3e' },
}

export const getRandomBiome = (phase: 'day' | 'night'): BiomeDef => {
  const eligible = BIOMES.filter(b => b.timeOfDay === phase || b.timeOfDay === 'both')
  const idx = Math.floor(Math.random() * eligible.length)
  return eligible[idx] ?? DEFAULT_BIOME
}
