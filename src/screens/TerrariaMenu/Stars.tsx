import { type FC, useMemo } from 'react'
import styled, { keyframes, css } from 'styled-components'

const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
`

const Star = styled.div<{ $left: number; $top: number; $size: number; $delay: number; $visible: boolean }>`
  position: absolute;
  left: ${({ $left }) => $left}%;
  top: ${({ $top }) => $top}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: white;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 2s ease;
  pointer-events: none;
  z-index: 3;
  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${twinkle} ${2 + Math.random() * 3}s ease-in-out infinite;
      animation-delay: ${-Math.random() * 4}s;
    `}
`

type Props = {
  phase: 'day' | 'night'
}

type StarDef = {
  left: number
  top: number
  size: number
  delay: number
}

export const Stars: FC<Props> = ({ phase }) => {
  const stars = useMemo<StarDef[]>(
    () =>
      Array.from({ length: 80 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 70,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
      })),
    [],
  )

  return (
    <>
      {stars.map((s, i) => (
        <Star
          key={i}
          $left={s.left}
          $top={s.top}
          $size={s.size}
          $delay={s.delay}
          $visible={phase === 'night'}
        />
      ))}
    </>
  )
}
