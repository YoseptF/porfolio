import { useState, useEffect, useRef, useCallback } from 'react'

type Phase = 'day' | 'night'

type DayNightCycle = {
  time: number
  phase: Phase
  paused: boolean
  togglePause: () => void
  seekTo: (t: number) => void
  setTimeForTest: (t: number) => void
}

const FULL_CYCLE_MS = 60 * 1000 // 1 real minute = 1 full day

export const useDayNightCycle = (): DayNightCycle => {
  const [time, setTime] = useState(0.1)
  const [paused, setPaused] = useState(() => localStorage.getItem('dbg:paused') === '1')
  const rafRef = useRef<number>(0)
  // Absolute start ref: startTimeRef = now - t * FULL_CYCLE_MS
  // Each tick: time = (now - startTimeRef) / FULL_CYCLE_MS % 1
  const startTimeRef = useRef<number | null>(null)
  const pausedRef = useRef(localStorage.getItem('dbg:paused') === '1')

  // Phase derived directly from time — no separate state needed
  const phase: Phase = time >= 0.5 && time < 1.0 ? 'night' : 'day'

  const seekTo = useCallback((t: number) => {
    const now = performance.now()
    startTimeRef.current = now - t * FULL_CYCLE_MS
    setTime(t)
  }, [])

  const togglePause = useCallback(() => {
    setPaused(prev => {
      const next = !prev
      pausedRef.current = next
      localStorage.setItem('dbg:paused', next ? '1' : '0')
      if (!next) {
        startTimeRef.current = performance.now() - time * FULL_CYCLE_MS
      }
      return next
    })
  }, [time])

  // For tests: same as seekTo
  const setTimeForTest = seekTo

  useEffect(() => {
    const tick = (now: number) => {
      if (!pausedRef.current) {
        if (startTimeRef.current === null) {
          startTimeRef.current = now - 0.1 * FULL_CYCLE_MS
        }
        const next = ((now - startTimeRef.current) / FULL_CYCLE_MS) % 1
        setTime(next)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return { time, phase, paused, togglePause, seekTo, setTimeForTest }
}
