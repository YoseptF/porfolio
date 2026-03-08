import { useState, useEffect, useRef, useCallback } from 'react'

type Phase = 'day' | 'night'

type DayNightCycle = {
  time: number
  phase: Phase
  setTimeForTest: (t: number) => void
}

const FULL_CYCLE_MS = 10 * 60 * 1000 // 10 real minutes = 1 full day

export const useDayNightCycle = (): DayNightCycle => {
  const [time, setTime] = useState(0.1) // start at early morning
  const [phase, setPhase] = useState<Phase>('day')
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number | null>(null)

  const setTimeForTest = useCallback((t: number) => {
    setTime(t)
    setPhase(t >= 0.5 && t < 1.0 ? 'night' : 'day')
  }, [])

  useEffect(() => {
    const tick = (now: number) => {
      if (lastTimeRef.current !== null) {
        const delta = now - lastTimeRef.current
        setTime(prev => {
          const next = (prev + delta / FULL_CYCLE_MS) % 1
          setPhase(next >= 0.5 ? 'night' : 'day')
          return next
        })
      }
      lastTimeRef.current = now
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return { time, phase, setTimeForTest }
}
