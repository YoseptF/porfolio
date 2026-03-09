import { type FC, useRef, useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'

const CLOUD_IDS = [0, 2, 5, 8, 11]

const CloudImg = styled.img<{ $y: number }>`
  position: absolute;
  top: ${({ $y }) => $y}%;
  height: 80px;
  image-rendering: pixelated;
  pointer-events: none;
  z-index: 7;
`

type CloudDef = {
  id: number
  startX: number // vw
  y: number     // %
  speed: number // vw/s
}

type Props = {
  phase: 'day' | 'night'
}

export const Clouds: FC<Props> = ({ phase }) => {
  const cloudDefs = useMemo<CloudDef[]>(
    () =>
      Array.from({ length: 4 }, () => ({
        id: CLOUD_IDS[Math.floor(Math.random() * CLOUD_IDS.length)] ?? 0,
        startX: Math.random() * 200 - 50,
        y: 8 + Math.random() * 27,
        speed: 1 + Math.random() * 2,
      })),
    [],
  )

  const [positions, setPositions] = useState(() => cloudDefs.map(c => c.startX))
  const lastTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (phase !== 'day') return

    const tick = (now: number) => {
      if (lastTimeRef.current !== null) {
        const delta = now - lastTimeRef.current
        setPositions(prev =>
          prev.map((x, i) => {
            const next = x + (cloudDefs[i]?.speed ?? 1) * delta / 1000
            return next > 115 ? -15 : next
          }),
        )
      }
      lastTimeRef.current = now
      rafRef.current = requestAnimationFrame(tick)
    }

    lastTimeRef.current = null
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase, cloudDefs])

  if (phase !== 'day') return null

  return (
    <>
      {cloudDefs.map((cloud, i) => (
        <CloudImg
          key={i}
          src={`/terraria/clouds/Cloud_${cloud.id}.webp`}
          alt=""
          $y={cloud.y}
          style={{ left: `${positions[i]}vw` }}
        />
      ))}
    </>
  )
}
