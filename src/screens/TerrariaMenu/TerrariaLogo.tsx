import { type FC, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const FRAMES = [
  '/terraria/logo/Logo.webp',
  '/terraria/logo/Logo2.webp',
  '/terraria/logo/Logo3.webp',
  '/terraria/logo/Logo4.webp',
  '/terraria/logo/Logo5.webp',
  '/terraria/logo/Logo6.webp',
]

const wobble = keyframes`
  0%, 100% { transform: rotate(-1.5deg) scale(1); }
  50% { transform: rotate(1.5deg) scale(1.02); }
`

const Wrapper = styled.div`
  position: relative;
  max-width: min(480px, 85vw);
`

const LogoImg = styled.img`
  width: 100%;
  height: auto;
  animation: ${wobble} 3s ease-in-out infinite;
  image-rendering: pixelated;
`

export const TerrariaLogo: FC = () => {
  const [frame] = useState(() => Math.floor(Math.random() * FRAMES.length))

  return (
    <Wrapper>
      <LogoImg src={FRAMES[frame]} alt="Terraria" />
    </Wrapper>
  )
}
