import { useRef, useCallback, useEffect } from 'react'

export const useCardDrag = () => {
  const cardRef = useRef<HTMLImageElement>(null)
  const animFrame = useRef(0)
  const startTime = useRef(0)
  const dragState = useRef({
    dragging: false,
    offsetX: 0,
    offsetY: 0,
    x: 0,
    y: 0,
  })

  useEffect(() => {
    startTime.current = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - startTime.current) / 1000
      const jiggleAngle = Math.sin(elapsed * 3) * 4
      const bobY = Math.sin(elapsed * 2) * 6
      const { x, y } = dragState.current

      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${x}px, ${y + bobY}px) rotate(${jiggleAngle}deg)`
      }

      animFrame.current = requestAnimationFrame(animate)
    }

    animFrame.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame.current)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
    e.preventDefault()
    const card = cardRef.current
    if (!card) return

    card.setPointerCapture(e.pointerId)
    const rect = card.getBoundingClientRect()
    dragState.current.dragging = true
    dragState.current.offsetX = e.clientX - rect.left - rect.width / 2 - dragState.current.x
    dragState.current.offsetY = e.clientY - rect.top - rect.height / 2 - dragState.current.y
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragState.current.dragging || !cardRef.current) return

    const rect = cardRef.current.parentElement?.getBoundingClientRect()
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    dragState.current.x = e.clientX - centerX - dragState.current.offsetX
    dragState.current.y = e.clientY - centerY - dragState.current.offsetY
  }, [])

  const onPointerUp = useCallback(() => {
    dragState.current.dragging = false
  }, [])

  return { cardRef, onPointerDown, onPointerMove, onPointerUp }
}
