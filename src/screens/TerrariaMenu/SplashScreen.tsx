import { type FC, useState, useEffect, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'

// Overlay fades OUT to reveal splash images underneath
const revealSplash = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

// Overlay fades IN to black before returning to menu
const hideSplash = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

type OverlayState = 'reveal' | 'hold' | 'hide'

const Overlay = styled.div<{ $state: OverlayState }>`
  position: fixed;
  inset: 0;
  z-index: 101;
  background: #000;
  ${({ $state }) =>
    $state === 'reveal' &&
    css`animation: ${revealSplash} 0.5s ease forwards;`}
  ${({ $state }) => $state === 'hold' && css`opacity: 0;`}
  ${({ $state }) =>
    $state === 'hide' &&
    css`animation: ${hideSplash} 0.5s ease forwards;`}
`

const BlackBase = styled.div`
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 99;
`

const Layer = styled.img`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 100;
`

const SpriteLayer = styled.img`
  position: fixed;
  bottom: 0;
  right: 0;
  height: 28vh;
  width: auto;
  z-index: 100;
  image-rendering: pixelated;

  @media (min-width: 768px) {
    height: 55vh;
  }
`

// Text/title layer must always be fully visible — contain so it's never cropped
const TextLayer = styled(Layer)`
  object-fit: contain;
`

const SPLASH_COUNT = 10

type Props = {
  onComplete: () => void
}

export const SplashScreen: FC<Props> = ({ onComplete }) => {
  const [state, setState] = useState<OverlayState>('reveal')
  const [splashN] = useState(() => Math.floor(Math.random() * SPLASH_COUNT) + 1)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    const holdTimer = setTimeout(() => setState('hold'), 500)
    const hideTimer = setTimeout(() => setState('hide'), 2500)
    const doneTimer = setTimeout(() => onCompleteRef.current(), 3000)
    return () => {
      clearTimeout(holdTimer)
      clearTimeout(hideTimer)
      clearTimeout(doneTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BlackBase />
      <Layer src={`/terraria/splash/Splash_${splashN}_0.webp`} alt="" />
      <SpriteLayer src={`/terraria/splash/Splash_${splashN}_1.webp`} alt="" />
      <TextLayer src={`/terraria/splash/Splash_${splashN}_2.webp`} alt="" />
      <Overlay $state={state} />
    </>
  )
}
