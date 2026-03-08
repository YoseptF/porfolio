import { useState, useEffect, useRef } from 'react'

const SPEED = 15 // px/s
const WRAP_AT = 4096

export const useAutoScroll = (): number => {
  const [offset, setOffset] = useState(0)
  const lastTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const tick = (now: number) => {
      if (lastTimeRef.current !== null) {
        const delta = now - lastTimeRef.current
        setOffset(prev => (prev + SPEED * delta / 1000) % WRAP_AT)
      }
      lastTimeRef.current = now
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return offset
}
