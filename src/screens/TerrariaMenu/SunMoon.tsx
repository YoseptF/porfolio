import { type FC } from 'react'
import styled from 'styled-components'

// Static styles only — no animated props so styled-components never injects new classes during drag
const CelestialBodyBase = styled.div<{ $isDragging: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 64px;
  height: 64px;
  will-change: transform;
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
  touch-action: none;
  user-select: none;
  z-index: 1;

  @media (max-width: 640px) {
    width: 32px;
    height: 32px;
  }
`

const SunCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ffe87c, #ffb830);
  box-shadow: 0 0 20px 8px rgba(255, 200, 60, 0.5);
`

const MoonCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #e8e4d0, #c8c4b0);
  box-shadow: 0 0 16px 6px rgba(200, 210, 255, 0.4);
`


const LightOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  z-index: 1;
`

const HORIZON_Y = 0.40

const FlareImg = styled.img`
  position: absolute;
  top: ${HORIZON_Y * 100}%;
  transform: translate(-50%, -50%);
  width: min(400px, 40vw);
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 1;
`

// Overshoot easing: arrives at target then bounces slightly back before settling
const SPRING_EASING = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'

const celestialTransform = (x: number, y: number) =>
  `translate(calc(${x * 100}vw - 50%), calc(${y * 100}vh - 50%))`

type Props = {
  sunX: number
  sunY: number
  moonX: number
  moonY: number
  time: number
  phase: 'day' | 'night'
  isDragging: boolean
  isReturning: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: () => void
}

export const SunMoon: FC<Props> = ({
  sunX,
  sunY,
  moonX,
  moonY,
  time,
  phase,
  isDragging,
  isReturning,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}) => {
  const normalized = (sunX - 0.05) / 0.9

  const nearLeft = normalized < 0.18
  const nearRight = normalized > 0.82
  const showFlare = phase === 'day' && (nearLeft || nearRight)

  let flareOpacity = 0
  if (nearLeft) {
    flareOpacity = Math.min(1, (0.18 - normalized) / 0.18)
  } else if (nearRight) {
    flareOpacity = Math.min(1, (normalized - 0.82) / 0.18)
  }

  const flareSrc =
    time < 0.25 ? '/terraria/Sunrise_Yellow.webp' : '/terraria/Sunset_Red.webp'

  return (
    <>
      {phase === 'day' && (
        <LightOverlay style={{ background: `radial-gradient(ellipse 80% 60% at ${sunX * 100}% ${sunY * 100}%, rgba(255,220,100,0.25) 0%, transparent 70%)` }} />
      )}

      {showFlare && (
        <FlareImg src={flareSrc} alt="" style={{ left: `${sunX * 100}%`, opacity: flareOpacity }} />
      )}

      {/* Sun hidden during night so it doesn't block the moon at the right horizon */}
      {phase === 'day' && (
        <CelestialBodyBase
          $isDragging={isDragging}
          style={{
            transform: celestialTransform(sunX, sunY),
            transition: isReturning ? `transform 1.2s ${SPRING_EASING}` : 'none',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <SunCircle />
        </CelestialBodyBase>
      )}

      {phase === 'night' && (
        <CelestialBodyBase
          $isDragging={isDragging}
          style={{
            transform: celestialTransform(moonX, moonY),
            transition: isReturning ? `transform 1.2s ${SPRING_EASING}` : 'none',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <MoonCircle />
        </CelestialBodyBase>
      )}
    </>
  )
}
