import { type FC, useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useDayNightCycle } from './useDayNightCycle'
import { useParallax } from './useParallax'
import { useDraggableSun } from './useDraggableSun'
import { getRandomBiome } from './biomes'
import { ParallaxBackground } from './ParallaxBackground'
import { SunMoon } from './SunMoon'
import { TerrariaLogo } from './TerrariaLogo'
import { SplashScreen } from './SplashScreen'
import { TerrariaMenuButtons } from './TerrariaMenuButtons'

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
`

const Sky = styled.div<{ $color: string; $ready: boolean }>`
  position: absolute;
  inset: 0;
  background: ${({ $color }) => $color};
  transition: ${({ $ready }) => ($ready ? 'background 8s ease' : 'none')};
`

const LogoArea = styled.div`
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonArea = styled.div`
  position: absolute;
  bottom: 12%;
  left: 6%;
  z-index: 10;
`

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')

type SkyStop = [number, string]

const interpolateSky = (time: number, skyColor: { dawn: string; noon: string; dusk: string; night: string }) => {
  const stops: SkyStop[] = [
    [0, skyColor.dawn],
    [0.25, skyColor.noon],
    [0.5, skyColor.dusk],
    [0.75, skyColor.night],
    [1, skyColor.dawn],
  ]

  let fromStop: SkyStop = [0, skyColor.dawn]
  let toStop: SkyStop = [0.25, skyColor.noon]

  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i]
    const b = stops[i + 1]
    if (a !== undefined && b !== undefined && time >= a[0] && time <= b[0]) {
      fromStop = a
      toStop = b
      break
    }
  }

  const span = toStop[0] - fromStop[0]
  const t = span === 0 ? 0 : (time - fromStop[0]) / span
  const [r1, g1, b1] = hexToRgb(fromStop[1])
  const [r2, g2, b2] = hexToRgb(toStop[1])
  return rgbToHex(lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t))
}

const shouldShowSplash = () => !localStorage.getItem('terrariaSplashPlayed')

export const TerrariaMenu: FC = () => {
  const { time, phase } = useDayNightCycle()
  const parallax = useParallax()
  const { sunX, sunY, isDragging, onPointerDown, onPointerMove, onPointerUp } = useDraggableSun(time)
  const [splashActive, setSplashActive] = useState(shouldShowSplash)
  const onSplashComplete = useCallback(() => setSplashActive(false), [])
  const [skyReady, setSkyReady] = useState(false)
  const [biome, setBiome] = useState(() => getRandomBiome('day'))
  const prevPhaseRef = useRef(phase)

  // Change biome when phase flips
  useEffect(() => {
    if (prevPhaseRef.current !== phase) {
      prevPhaseRef.current = phase
      setBiome(getRandomBiome(phase))
    }
  }, [phase])

  // Enable sky color transition only after first paint (avoid black→color flash)
  useEffect(() => { setSkyReady(true) }, [])

  // Soft-restart: listen for theme-changed event and reset splash state
  useEffect(() => {
    const handler = () => {
      localStorage.removeItem('terrariaSplashPlayed')
    }
    window.addEventListener('portfolio:theme-changed', handler)
    return () => window.removeEventListener('portfolio:theme-changed', handler)
  }, [])

  const skyColor = interpolateSky(time, biome.skyColor)

  return (
    <Wrapper>
      {splashActive && <SplashScreen onComplete={onSplashComplete} />}

      <Sky $color={skyColor} $ready={skyReady} />

      <ParallaxBackground layers={biome.layers} parallaxX={parallax.x} />

      <SunMoon
        sunX={sunX}
        sunY={sunY}
        phase={phase}
        isDragging={isDragging}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />

      <LogoArea>
        <TerrariaLogo />
      </LogoArea>

      <ButtonArea>
        <TerrariaMenuButtons />
      </ButtonArea>
    </Wrapper>
  )
}
