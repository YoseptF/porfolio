import { useState, useRef, useCallback } from 'react'

export type CelestialBodies = {
  sunX: number
  sunY: number
  moonX: number
  moonY: number
  isDragging: boolean
  isReturning: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: () => void
}

// Sun travels from off-screen left (-0.15) to off-screen right (1.15)
const X_START = -0.15
const X_RANGE = 1.3

const timeToSunX = (t: number): number => {
  const dayT = Math.min(t / 0.5, 1)
  return X_START + dayT * X_RANGE
}

export const arcXToY = (x: number): number => {
  const normalized = (x - X_START) / X_RANGE
  const heightFactor = 1 - Math.pow((normalized - 0.5) * 2, 2)
  return 0.40 - 0.18 * heightFactor
}

// Moon mirrors sun: off-screen left → off-screen right during night (t 0.5→1.0)
export const timeToMoonX = (t: number): number =>
  X_START + ((t - 0.5) / 0.5) * X_RANGE

// Inverse: screen x position → cycle time
export const sunXToT = (x: number, phase: 'day' | 'night'): number => {
  const base = phase === 'day' ? 0 : 0.5
  return base + (x - X_START) / X_RANGE * 0.5
}

const RETURN_DURATION_MS = 1200

export const useCelestialBodies = (
  time: number,
  seekTo: (t: number) => void,
  phase: 'day' | 'night',
): CelestialBodies => {
  const [isDragging, setIsDragging] = useState(false)
  const [isReturning, setIsReturning] = useState(false)
  const [overrideX, setOverrideX] = useState<number | null>(null)
  const [overrideY, setOverrideY] = useState<number | null>(null)

  // Refs mirror state synchronously so event handlers always read the latest value,
  // even when React hasn't re-rendered between pointer events.
  const isDraggingRef = useRef(false)
  const overrideXRef = useRef<number | null>(null)
  const overrideYRef = useRef<number | null>(null)
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cycleSunX = timeToSunX(time)
  const cycleMoonX = timeToMoonX(Math.max(0.5, Math.min(1.0, time)))

  // Overrides apply to whichever body is active: sun during day, moon during night
  const sunX = phase === 'day' ? (overrideX ?? cycleSunX) : cycleSunX
  const sunY = phase === 'day' ? (overrideY ?? arcXToY(sunX)) : arcXToY(sunX)
  const moonX = phase === 'night' ? (overrideX ?? cycleMoonX) : cycleMoonX
  const moonY = phase === 'night' ? (overrideY ?? arcXToY(moonX)) : arcXToY(moonX)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    if (returnTimerRef.current) clearTimeout(returnTimerRef.current)
    isDraggingRef.current = true
    setIsDragging(true)
    setIsReturning(false)
  }, [])

  // Empty deps — reads isDraggingRef synchronously instead of stale state closure
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const x = Math.max(0, Math.min(1, e.clientX / window.innerWidth))
    const y = Math.max(0.02, Math.min(0.55, e.clientY / window.innerHeight))
    overrideXRef.current = x
    overrideYRef.current = y
    setOverrideX(x)
    setOverrideY(y)
  }, [])

  // Empty deps — reads refs synchronously so it always sees the latest drag position
  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false
    setIsDragging(false)

    const dropX = overrideXRef.current
    if (dropX !== null) {
      const snappedT = Math.max(0, Math.min(1, sunXToT(dropX, phaseRef.current)))
      seekTo(snappedT)
    }

    overrideXRef.current = null
    overrideYRef.current = null
    setIsReturning(true)
    setOverrideX(null)
    setOverrideY(null)
    returnTimerRef.current = setTimeout(() => setIsReturning(false), RETURN_DURATION_MS)
  }, [seekTo])

  return {
    sunX,
    sunY,
    moonX,
    moonY,
    isDragging,
    isReturning,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }
}
