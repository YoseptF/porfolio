import { type FC, useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useDayNightCycle } from './useDayNightCycle'
import { useAutoScroll } from './useAutoScroll'
import { useCelestialBodies, sunXToT } from './useCelestialBodies'
import { getRandomBiome } from './biomes'
import { SCENE_LIGHT_STOPS, SCENE_LIGHT_ALPHA_STOPS, BRIGHTNESS_STOPS } from '../../constants'
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

const Sky = styled.div`
  position: absolute;
  inset: 0;
`

const SceneLight = styled.div`
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
  mix-blend-mode: multiply;
`

const DebugOverlay = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-family: monospace;
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 4px;
  line-height: 1.6;
`

const LogoArea = styled.div`
  position: absolute;
  top: 2%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`

const ButtonArea = styled.div`
  position: absolute;
  top: 32%;
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
  const { time, phase, paused, togglePause, seekTo } = useDayNightCycle()
  const scrollOffset = useAutoScroll()
  const { sunX, sunY, moonX, moonY, isDragging, isReturning, onPointerDown, onPointerMove, onPointerUp } =
    useCelestialBodies(time, seekTo, phase)
  const [splashActive, setSplashActive] = useState(true)
  const [debugVisible, setDebugVisible] = useState(false)
  const debugClicksRef = useRef(0)
  const onSplashComplete = useCallback(() => setSplashActive(false), [])

  const onLogoClick = useCallback(() => {
    debugClicksRef.current += 1
    if (debugClicksRef.current >= 7) {
      debugClicksRef.current = 0
      setDebugVisible(v => !v)
    }
  }, [])
  const [biome, setBiome] = useState(() => getRandomBiome('day'))
  const prevPhaseRef = useRef(phase)

  useEffect(() => {
    if (prevPhaseRef.current !== phase) {
      prevPhaseRef.current = phase
      setBiome(getRandomBiome(phase))
    }
  }, [phase])

  useEffect(() => {
    const handler = () => {}
    window.addEventListener('portfolio:theme-changed', handler)
    return () => window.removeEventListener('portfolio:theme-changed', handler)
  }, [])

  const lightingT = sunXToT(sunX, phase)

  const skyColor = interpolateSky(time, biome.skyColor)
  const sceneLightColor = interpolateColor(lightingT, SCENE_LIGHT_STOPS)
  const sceneLightAlpha = interpolateNum(lightingT, SCENE_LIGHT_ALPHA_STOPS)
  const brightness = interpolateNum(lightingT, BRIGHTNESS_STOPS)

  // Split layers: back layers sit behind sun/moon (z 2+), front layer sits in front (z 5)
  const backLayers = biome.layers.slice(0, -1)
  const frontLayer = biome.layers.slice(-1)

  return (
    <>
      {splashActive && <SplashScreen onComplete={onSplashComplete} />}

      <Wrapper $visible={!splashActive}>
        <Sky style={{ background: skyColor }} />

        <Stars phase={phase} />

        <ParallaxBackground
          layers={backLayers}
          offsetX={scrollOffset}
          brightness={brightness}
          zIndexStart={2}
        />

        <SunMoon
          sunX={sunX}
          sunY={sunY}
          moonX={moonX}
          moonY={moonY}
          time={time}
          phase={phase}
          isDragging={isDragging}
          isReturning={isReturning}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />

        <ParallaxBackground
          layers={frontLayer}
          offsetX={scrollOffset}
          brightness={brightness}
          zIndexStart={5}
          layerIndexOffset={backLayers.length}
        />

        <SceneLight style={{ background: hexToRgba(sceneLightColor, sceneLightAlpha) }} />

        <Clouds phase={phase} />

        <LogoArea onClick={onLogoClick}>
          <TerrariaLogo />
        </LogoArea>

        <ButtonArea>
          <TerrariaMenuButtons />
        </ButtonArea>

        <TerrariaBottomBar />

        {debugVisible && (
          <DebugOverlay>
            {['far', 'mid', 'near'].map((label, i) => {
              const path = biome.layers[i]
              const name = path?.split('/').slice(-3).join('/') ?? '–'
              return <div key={label}><b>{label}:</b> {name}</div>
            })}
            <div style={{ marginTop: 4 }}>
              <button onClick={togglePause} style={{ fontSize: 11, cursor: 'pointer' }}>
                {paused ? '▶ resume' : '⏸ pause'}
              </button>
            </div>
          </DebugOverlay>
        )}
      </Wrapper>
    </>
  )
}
