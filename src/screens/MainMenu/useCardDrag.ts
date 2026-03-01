import { useRef, useCallback, useEffect, useState } from 'react'

const JIMBO_HINT_KEY = 'jimbo-hint-seen'

export const useCardDrag = () => {
  const cardRef = useRef<HTMLImageElement>(null)
  const animFrame = useRef(0)
  const startTime = useRef(0)
  const tooltipDismissed = useRef(!!localStorage.getItem(JIMBO_HINT_KEY))
  const [tooltipVisible, setTooltipVisible] = useState(!tooltipDismissed.current)
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
    const parentRect = card.parentElement?.getBoundingClientRect()
    if (!parentRect) return

    const centerX = parentRect.left + parentRect.width / 2
    const centerY = parentRect.top + parentRect.height / 2
    dragState.current.dragging = true
    dragState.current.offsetX = e.clientX - centerX - dragState.current.x
    dragState.current.offsetY = e.clientY - centerY - dragState.current.y
  }, [])

  const dismissTooltip = useCallback(() => {
    if (tooltipDismissed.current) return
    tooltipDismissed.current = true
    localStorage.setItem(JIMBO_HINT_KEY, '1')
    setTooltipVisible(false)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragState.current.dragging || !cardRef.current) return
    dismissTooltip()

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

  return { cardRef, onPointerDown, onPointerMove, onPointerUp, tooltipVisible }
}
