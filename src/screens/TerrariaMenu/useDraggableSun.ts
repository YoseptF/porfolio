import { useState, useEffect, useRef, useCallback } from 'react'

type DraggableSun = {
  sunX: number
  sunY: number
  isDragging: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: () => void
}

// Arc: sun travels from x=0.05 to x=0.95, with peak height at x=0.5
// time 0=dawn(left), 0.5=dusk(right) for day phase
const timeToArcX = (t: number): number => {
  // t in [0, 0.5] for day, map to [0.05, 0.95]
  const dayT = Math.min(t / 0.5, 1)
  return 0.05 + dayT * 0.9
}

const arcXToY = (x: number): number => {
  // Parabola: highest point at x=0.5 viewport
  const normalized = (x - 0.05) / 0.9
  return 0.1 + 0.35 * (1 - Math.pow((normalized - 0.5) * 2, 2))
}

export const useDraggableSun = (time: number): DraggableSun => {
  const [isDragging, setIsDragging] = useState(false)
  const [overrideX, setOverrideX] = useState<number | null>(null)
  const returnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cycleSunX = timeToArcX(time)

  const sunX = overrideX ?? cycleSunX
  const sunY = arcXToY(sunX)

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

  return { sunX, sunY, isDragging, onPointerDown, onPointerMove, onPointerUp }
}
