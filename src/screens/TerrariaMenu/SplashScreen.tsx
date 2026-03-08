import { type FC, useState, useEffect, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const Overlay = styled.div<{ $fading: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #000;
  ${({ $fading }) =>
    $fading &&
    css`
      animation: ${fadeOut} 0.5s ease forwards;
    `}
`

const Layer = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const SPLASH_COUNT = 10

type Props = {
  onComplete: () => void
}

export const SplashScreen: FC<Props> = ({ onComplete }) => {
  const [fading, setFading] = useState(false)
  const [splashN] = useState(() => Math.floor(Math.random() * SPLASH_COUNT) + 1)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2500)
    const doneTimer = setTimeout(() => {
      localStorage.setItem('terrariaSplashPlayed', 'true')
      onCompleteRef.current()
    }, 3000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
    // empty deps: run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Overlay $fading={fading}>
      <Layer src={`/terraria/splash/Splash_${splashN}_0.webp`} alt="" />
      <Layer src={`/terraria/splash/Splash_${splashN}_1.webp`} alt="" />
      <Layer src={`/terraria/splash/Splash_${splashN}_2.webp`} alt="" />
    </Overlay>
  )
}
