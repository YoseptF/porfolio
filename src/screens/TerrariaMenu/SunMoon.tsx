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
  width: 48px;
  height: 48px;
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
  touch-action: none;
  user-select: none;
  z-index: 5;
  filter: drop-shadow(0 0 12px currentColor);
`

const SunCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ffe87c, #ffb830);
  box-shadow: 0 0 20px 8px rgba(255, 200, 60, 0.5);
`

const MoonCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #e8e0c8, #b8b0a0);
  box-shadow: 0 0 16px 4px rgba(200, 200, 180, 0.4);
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

type Props = {
  sunX: number
  sunY: number
  phase: 'day' | 'night'
  isDragging: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: () => void
}

export const SunMoon: FC<Props> = ({
  sunX,
  sunY,
  phase,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}) => (
  <>
    <LightOverlay $x={sunX} />
    <CelestialBody
      $x={sunX}
      $y={sunY}
      $isDragging={isDragging}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {phase === 'day' ? <SunCircle /> : <MoonCircle />}
    </CelestialBody>
  </>
)
