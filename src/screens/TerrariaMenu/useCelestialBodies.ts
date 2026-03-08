import { useState, useEffect, useRef, useCallback } from 'react'

export type CelestialBodies = {
  sunX: number
  sunY: number
  moonX: number
  moonY: number
  moonPhase: number
  isDragging: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: () => void
}

// time 0=dawn(left edge), 0.5=dusk(right edge) for day phase
const timeToSunX = (t: number): number => {
  const dayT = Math.min(t / 0.5, 1)
  return 0.05 + dayT * 0.9
}

// Inverted parabola: LOW at edges (horizon=0.40), HIGH at center (noon=0.08)
export const arcXToY = (x: number): number => {
  const normalized = (x - 0.05) / 0.9
  const heightFactor = 1 - Math.pow((normalized - 0.5) * 2, 2)
  return 0.40 - 0.32 * heightFactor
}

// time 0.5→1.0 maps to x: 0.95→0.05 (right to left)
export const timeToMoonX = (t: number): number =>
  0.95 - ((t - 0.5) / 0.5) * 0.9

export const useCelestialBodies = (time: number): CelestialBodies => {
  const [isDragging, setIsDragging] = useState(false)
  const [overrideX, setOverrideX] = useState<number | null>(null)
  const returnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const moonPhaseRef = useRef(Math.floor(Math.random() * 9))

  const cycleSunX = timeToSunX(time)
  const sunX = overrideX ?? cycleSunX
  const sunY = arcXToY(sunX)

  const moonX = timeToMoonX(Math.max(0.5, Math.min(1.0, time)))
  const moonY = arcXToY(moonX)

  useEffect(() => {
    if (!isDragging && overrideX !== null) {
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current)
      returnTimeoutRef.current = setTimeout(() => setOverrideX(null), 3000)
    }
    return () => {
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current)
    }
  }, [isDragging, overrideX])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)
    if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const x = e.clientX / window.innerWidth
    setOverrideX(Math.max(0.05, Math.min(0.95, x)))
  }, [isDragging])

  const onPointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  return {
    sunX,
    sunY,
    moonX,
    moonY,
    moonPhase: moonPhaseRef.current,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }
}
