import { type FC, useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useDayNightCycle } from './useDayNightCycle'
import { useAutoScroll } from './useAutoScroll'
import { useCelestialBodies } from './useCelestialBodies'
import { getRandomBiome } from './biomes'
import { ParallaxBackground } from './ParallaxBackground'
import { SunMoon } from './SunMoon'
import { TerrariaLogo } from './TerrariaLogo'
import { SplashScreen } from './SplashScreen'
import { TerrariaMenuButtons } from './TerrariaMenuButtons'
import { Clouds } from './Clouds'
import { Stars } from './Stars'
import { TerrariaBottomBar } from './TerrariaBottomBar'

const Wrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  overflow: hidden;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.6s ease;
`

const Sky = styled.div<{ $color: string; $ready: boolean }>`
  position: absolute;
  inset: 0;
  background: ${({ $color }) => $color};
  transition: ${({ $ready }) => ($ready ? 'background 8s ease' : 'none')};
`

const SceneLight = styled.div<{ $color: string }>`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: ${({ $color }) => $color};
  mix-blend-mode: multiply;
`

const LogoArea = styled.div`
  position: absolute;
  top: 4%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonArea = styled.div`
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')

type ColorStop = [number, string]

const interpolateColor = (time: number, stops: ColorStop[]): string => {
  let from: ColorStop = stops[0] ?? [0, '#000000']
  let to: ColorStop = stops[1] ?? [1, '#000000']

  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i]
    const b = stops[i + 1]
    if (a !== undefined && b !== undefined && time >= a[0] && time <= b[0]) {
      from = a
      to = b
      break
    }
  }

  const span = to[0] - from[0]
  const t = span === 0 ? 0 : (time - from[0]) / span
  const [r1, g1, b1] = hexToRgb(from[1])
  const [r2, g2, b2] = hexToRgb(to[1])
  return rgbToHex(lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t))
}

type NumStop = [number, number]

const interpolateNum = (time: number, stops: NumStop[]): number => {
  let from: NumStop = stops[0] ?? [0, 0]
  let to: NumStop = stops[1] ?? [1, 0]

  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i]
    const b = stops[i + 1]
    if (a !== undefined && b !== undefined && time >= a[0] && time <= b[0]) {
      from = a
      to = b
      break
    }
  }

  const span = to[0] - from[0]
  const t = span === 0 ? 0 : (time - from[0]) / span
  return lerp(from[1], to[1], t)
}

const SCENE_LIGHT_STOPS: ColorStop[] = [
  [0, '#ff8c3c'],    // dawn: warm orange
  [0.25, '#000000'], // noon: no overlay (black at 0 opacity via rgba — use transparent hex trick)
  [0.5, '#c8501e'],  // dusk: dark warm
  [0.75, '#000a28'], // night: very dark blue
  [1, '#ff8c3c'],
]

const SCENE_LIGHT_ALPHA_STOPS: NumStop[] = [
  [0, 0.20],    // dawn
  [0.25, 0.00], // noon
  [0.5, 0.30],  // dusk
  [0.75, 0.60], // night
  [1, 0.20],
]

const BRIGHTNESS_STOPS: NumStop[] = [
  [0, 0.75],    // dawn
  [0.25, 1.10], // noon
  [0.5, 0.65],  // dusk
  [0.75, 0.28], // night
  [1, 0.75],
]

const hexToRgba = (hex: string, alpha: number): string => {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r},${g},${b},${alpha})`
}

const interpolateSky = (
  time: number,
  skyColor: { dawn: string; noon: string; dusk: string; night: string },
): string => {
  const stops: ColorStop[] = [
    [0, skyColor.dawn],
    [0.25, skyColor.noon],
    [0.5, skyColor.dusk],
    [0.75, skyColor.night],
    [1, skyColor.dawn],
  ]
  return interpolateColor(time, stops)
}

export const TerrariaMenu: FC = () => {
  const { time, phase } = useDayNightCycle()
  const scrollOffset = useAutoScroll()
  const { sunX, sunY, moonX, moonY, moonPhase, isDragging, onPointerDown, onPointerMove, onPointerUp } =
    useCelestialBodies(time)
  const [splashActive, setSplashActive] = useState(true)
  const onSplashComplete = useCallback(() => setSplashActive(false), [])
  const [skyReady, setSkyReady] = useState(false)
  const [biome, setBiome] = useState(() => getRandomBiome('day'))
  const prevPhaseRef = useRef(phase)

  useEffect(() => {
    if (prevPhaseRef.current !== phase) {
      prevPhaseRef.current = phase
      setBiome(getRandomBiome(phase))
    }
  }, [phase])

  useEffect(() => { setSkyReady(true) }, [])

  useEffect(() => {
    const handler = () => {
      // Reset handled by always-showing splash on theme change
    }
    window.addEventListener('portfolio:theme-changed', handler)
    return () => window.removeEventListener('portfolio:theme-changed', handler)
  }, [])

  const skyColor = interpolateSky(time, biome.skyColor)
  const sceneLightColor = interpolateColor(time, SCENE_LIGHT_STOPS)
  const sceneLightAlpha = interpolateNum(time, SCENE_LIGHT_ALPHA_STOPS)
  const brightness = interpolateNum(time, BRIGHTNESS_STOPS)

  return (
    <>
      {splashActive && <SplashScreen onComplete={onSplashComplete} />}

      <Wrapper $visible={!splashActive}>
        <Sky $color={skyColor} $ready={skyReady} />

        <Stars phase={phase} />

        <ParallaxBackground
          layers={biome.layers}
          offsetX={scrollOffset}
          brightness={brightness}
        />

        <SceneLight $color={hexToRgba(sceneLightColor, sceneLightAlpha)} />

        <Clouds phase={phase} />

        <SunMoon
          sunX={sunX}
          sunY={sunY}
          moonX={moonX}
          moonY={moonY}
          moonPhase={moonPhase}
          time={time}
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

        <TerrariaBottomBar />
      </Wrapper>
    </>
  )
}
