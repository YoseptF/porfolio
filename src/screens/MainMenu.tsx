import { type FC, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { BalatroBackground } from '../components/three/BalatroBackground'
import { BalatroButton } from '../components/ui/BalatroButton'
import { useAppDispatch } from '../store/hooks'
import { navigateTo, openModal } from '../store/slices/navigation'
import { theme } from '../styles/theme'

const personalCards = ['happy', 'cool', 'coffe', 'shocked', 'te', 'workout', 'call']

const randomCard = () => {
  const idx = Math.floor(Math.random() * personalCards.length)
  return personalCards[idx] ?? personalCards[0]
}

const cardTexture = randomCard()

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
`

const TitleCardArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 12vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
`

const TitleCardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TitleLogo = styled.img`
  width: 75vw;
  max-width: 1100px;
  height: auto;

  @media (max-width: 600px) {
    width: 90vw;
  }
`

const CardImage = styled.img`
  position: absolute;
  width: 13vw;
  min-width: 120px;
  max-width: 200px;
  height: auto;
  border-radius: 8px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  pointer-events: auto;
  z-index: 2;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 600px) {
    width: 25vw;
    min-width: 80px;
  }
`

const ButtonBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 12vh;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 3vw;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: auto;
  z-index: 2;

  @media (max-width: 600px) {
    height: 10vh;
    padding: 0 8px;
    gap: 6px;
  }
`

const MenuButton = styled(BalatroButton)`
  flex: 1;
  max-width: 280px;
  height: 8vh;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 2.2rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    height: 7vh;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-left: 16px;

  a {
    color: ${theme.colors.text.muted};
    text-decoration: none;
    font-family: ${theme.font.family};
    font-size: 1.1rem;
    transition: color 0.2s;
    white-space: nowrap;

    &:hover {
      color: ${theme.colors.text.gold};
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
`

export const MainMenu: FC = () => {
  const dispatch = useAppDispatch()
  const cardRef = useRef<HTMLImageElement>(null)
  const animFrame = useRef(0)
  const startTime = useRef(0)
  const dragState = useRef({ dragging: false, offsetX: 0, offsetY: 0, x: 0, y: 0 })

  useEffect(() => {
    startTime.current = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - startTime.current) / 1000
      const jiggleAngle = Math.sin(elapsed * 3) * 4
      const bobY = Math.sin(elapsed * 2) * 6
      const { x, y } = dragState.current

      if (cardRef.current) {
        cardRef.current.style.transform =
          `translate(${x}px, ${y + bobY}px) rotate(${jiggleAngle}deg)`
      }

      animFrame.current = requestAnimationFrame(animate)
    }

    animFrame.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame.current)
  }, [])

  const handleCardPointerDown = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
    e.preventDefault()
    const card = cardRef.current
    if (!card) return

    card.setPointerCapture(e.pointerId)
    const rect = card.getBoundingClientRect()
    dragState.current.dragging = true
    dragState.current.offsetX = e.clientX - rect.left - rect.width / 2 - dragState.current.x
    dragState.current.offsetY = e.clientY - rect.top - rect.height / 2 - dragState.current.y
  }, [])

  const handleCardPointerMove = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragState.current.dragging || !cardRef.current) return

    const rect = cardRef.current.parentElement?.getBoundingClientRect()
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    dragState.current.x = e.clientX - centerX - dragState.current.offsetX
    dragState.current.y = e.clientY - centerY - dragState.current.offsetY
  }, [])

  const handleCardPointerUp = useCallback(() => {
    dragState.current.dragging = false
  }, [])

  return (
    <Wrapper>
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <BalatroBackground />
      </Canvas>

      <TitleCardArea>
        <TitleCardWrapper>
          <TitleLogo src="/title.png" alt="JOSEPH" />
          <CardImage
            ref={cardRef}
            src={`/cards/${cardTexture}.png`}
            alt="Personal card"
            onPointerDown={handleCardPointerDown}
            onPointerMove={handleCardPointerMove}
            onPointerUp={handleCardPointerUp}
            draggable={false}
          />
        </TitleCardWrapper>
      </TitleCardArea>

      <ButtonBar>
        <MenuButton color="blue" onClick={() => dispatch(navigateTo('projects'))}>
          Play
        </MenuButton>
        <MenuButton color="orange" onClick={() => dispatch(openModal('about'))}>
          About
        </MenuButton>
        <MenuButton color="red" onClick={() => dispatch(openModal('contact'))}>
          Contact
        </MenuButton>
        <MenuButton color="green" onClick={() => dispatch(openModal('skills'))}>
          Skills
        </MenuButton>
        <SocialLinks>
          <a href="https://github.com/YoseptF" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/joseph-flores-vega/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </SocialLinks>
      </ButtonBar>
    </Wrapper>
  )
}
