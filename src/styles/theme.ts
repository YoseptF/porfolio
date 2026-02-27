export const theme = {
  colors: {
    button: {
      blue: '#4B96E4',
      orange: '#F5A623',
      red: '#E85D4A',
      green: '#4CAF7D',
      purple: '#9B59B6',
    },
    panel: {
      bg: '#1A1A2E',
      border: '#3A3A5C',
    },
    text: {
      white: '#FFFFFF',
      gold: '#FFD700',
      chips: '#4B96E4',
      mult: '#E85D4A',
      muted: '#8888AA',
    },
    bg: {
      dark: '#070710',
      vortexRed: '#E85D4A',
      vortexBlue: '#4B96E4',
      felt: '#35654D',
    },
  },
  font: {
    family: "'m6x11plus', monospace",
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
} as const

export type Theme = typeof theme

export const pixelatedClipPath = (step = 6): string => {
  const c = step * 2
  return `clip-path: polygon(
    0 ${c}px,
    ${step}px ${c}px,
    ${step}px ${step}px,
    ${c}px ${step}px,
    ${c}px 0,
    calc(100% - ${c}px) 0,
    calc(100% - ${step}px) 0,
    calc(100% - ${step}px) ${step}px,
    100% ${step}px,
    100% ${c}px,
    100% calc(100% - ${c}px),
    100% calc(100% - ${step}px),
    calc(100% - ${step}px) calc(100% - ${step}px),
    calc(100% - ${step}px) 100%,
    calc(100% - ${c}px) 100%,
    ${c}px 100%,
    ${step}px 100%,
    ${step}px calc(100% - ${step}px),
    0 calc(100% - ${step}px),
    0 calc(100% - ${c}px)
  );`
}
