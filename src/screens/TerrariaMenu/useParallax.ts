import { useState, useEffect } from 'react'

type ParallaxOffset = { x: number; y: number }

export const useParallax = (): ParallaxOffset => {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setOffset({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return offset
}
