import { type FC } from 'react'
import styled from 'styled-components'

const CelestialBody = styled.div<{
  $x: number
  $y: number
  $isDragging: boolean
}>`
  position: absolute;
  left: ${({ $x }) => $x * 100}%;
  top: ${({ $y }) => $y * 100}%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
  touch-action: none;
  user-select: none;
  z-index: 5;
`

const SunCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ffe87c, #ffb830);
  box-shadow: 0 0 20px 8px rgba(255, 200, 60, 0.5);
`

const MoonImg = styled.img`
  width: 64px;
  height: 64px;
  image-rendering: pixelated;
`

const MoonBody = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  left: ${({ $x }) => $x * 100}%;
  top: ${({ $y }) => $y * 100}%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  z-index: 5;
  pointer-events: none;
`

const LightOverlay = styled.div<{ $x: number }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 60% 40% at ${({ $x }) => $x * 100}% 0%,
    rgba(255, 220, 100, 0.08) 0%,
    transparent 70%
  );
  mix-blend-mode: overlay;
  z-index: 4;
`

// Horizon Y is 0.40 (from arcXToY at edges)
const HORIZON_Y = 0.40

const FlareImg = styled.img<{ $x: number; $opacity: number }>`
  position: absolute;
  left: ${({ $x }) => $x * 100}%;
  top: ${HORIZON_Y * 100}%;
  transform: translate(-50%, -50%);
  width: min(400px, 40vw);
  opacity: ${({ $opacity }) => $opacity};
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 4;
`

type Props = {
  sunX: number
  sunY: number
  moonX: number
  moonY: number
  moonPhase: number
  time: number
  phase: 'day' | 'night'
  isDragging: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: () => void
}

export const SunMoon: FC<Props> = ({
  sunX,
  sunY,
  moonX,
  moonY,
  moonPhase,
  time,
  phase,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}) => {
  const normalized = (sunX - 0.05) / 0.9

  // Flare visible near horizon (within 18% of either edge)
  const nearLeft = normalized < 0.18
  const nearRight = normalized > 0.82
  const showFlare = nearLeft || nearRight

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
      <LightOverlay $x={sunX} />

      {showFlare && (
        <FlareImg
          src={flareSrc}
          alt=""
          $x={sunX}
          $opacity={flareOpacity}
        />
      )}

      <CelestialBody
        $x={sunX}
        $y={sunY}
        $isDragging={isDragging}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <SunCircle />
      </CelestialBody>

      {phase === 'night' && (
        <MoonBody $x={moonX} $y={moonY}>
          <MoonImg
            src={`/terraria/moon/Moon_${moonPhase}.webp`}
            alt=""
          />
        </MoonBody>
      )}
    </>
  )
}
