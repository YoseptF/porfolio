import { type FC, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { BalatroBackground } from '../components/three/BalatroBackground'
import { BalatroButton } from '../components/ui/BalatroButton'
import { BalatroText } from '../components/ui/BalatroText'
import { useAppDispatch } from '../store/hooks'
import { navigateTo, openModal } from '../store/slices/navigation'
import { theme } from '../styles/theme'

const personalCards = ['happy', 'cool', 'coffe', 'shocked', 'te', 'workout', 'call']

const randomCard = () => {
  const idx = Math.floor(Math.random() * personalCards.length)
  return personalCards[idx] ?? personalCards[0]
}

const cardTexture = randomCard()

const isTouchDevice = () =>
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
`

const CenterContent = styled.div`
  position: absolute;
  inset: 0;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 600px) {
    bottom: 80px;
  }
`

const TitleLogo = styled.img`
  width: 55vw;
  max-width: 800px;
  height: auto;

  @media (max-width: 600px) {
    width: 80vw;
  }
`

const Subtitle = styled.div`
  margin-top: 8px;
  margin-bottom: 0;
`

const CardImage = styled.img`
  width: 280px;
  height: auto;
  border-radius: 8px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  margin-top: -10px;
  pointer-events: auto;
  position: relative;
  z-index: 2;

  @media (max-width: 600px) {
    width: 160px;
    animation: bob 3s ease-in-out infinite;
  }

  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`

const ButtonBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 24px;
  background: rgba(0, 0, 0, 0.35);
  pointer-events: auto;
  z-index: 2;

  @media (max-width: 600px) {
    padding: 10px 8px;
    gap: 6px;
    flex-wrap: wrap;
  }
`

const MenuButton = styled(BalatroButton)`
  flex: 1;
  max-width: 240px;
  min-width: 120px;
  padding: 18px 0;
  font-size: 1.8rem;

  @media (max-width: 600px) {
    min-width: 0;
    padding: 12px 0;
    font-size: 1.2rem;
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
  const tiltRef = useRef({ x: 0, y: 0 })
  const animFrame = useRef(0)
  const startTime = useRef(0)

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouchDevice() || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2

    const maxTilt = 15
    const distX = (e.clientX - cardCenterX) / (window.innerWidth / 2)
    const distY = (e.clientY - cardCenterY) / (window.innerHeight / 2)

    tiltRef.current = {
      x: Math.max(-maxTilt, Math.min(maxTilt, distX * maxTilt)),
      y: Math.max(-maxTilt, Math.min(maxTilt, -distY * maxTilt)),
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    tiltRef.current = { x: 0, y: 0 }
  }, [])

  useEffect(() => {
    if (isTouchDevice()) return

    startTime.current = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - startTime.current) / 1000
      const bobY = Math.sin(elapsed * 2) * 10
      const { x, y } = tiltRef.current

      if (cardRef.current) {
        cardRef.current.style.transform =
          `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(${bobY}px)`
      }

      animFrame.current = requestAnimationFrame(animate)
    }

    animFrame.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame.current)
  }, [])

  return (
    <Wrapper onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <BalatroBackground />
      </Canvas>

      <CenterContent>
        <TitleLogo src="/title.png" alt="JOSEPH" />
        <Subtitle>
          <BalatroText variant="body">Software Developer</BalatroText>
        </Subtitle>
        <CardImage
          ref={cardRef}
          src={`/cards/${cardTexture}.png`}
          alt="Personal card"
        />
      </CenterContent>

      <ButtonBar>
        <MenuButton color="blue" onClick={() => dispatch(navigateTo('projects'))}>
          Projects
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
