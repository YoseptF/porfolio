import { type FC } from 'react'
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

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
`

const Title = styled.h1`
  font-family: ${theme.font.family};
  font-size: 5rem;
  color: ${theme.colors.text.white};
  text-shadow:
    4px 4px 0 #000,
    -2px -2px 0 #000,
    2px -2px 0 #000,
    -2px 2px 0 #000;
  letter-spacing: 8px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    font-size: 3rem;
    letter-spacing: 4px;
  }
`

const CardImage = styled.img`
  width: 160px;
  height: auto;
  border-radius: 8px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  margin-bottom: 32px;
  animation: bob 3s ease-in-out infinite;
  pointer-events: auto;

  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 600px) {
    width: 120px;
    margin-bottom: 20px;
  }
`

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  pointer-events: auto;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 16px;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`

const SocialLinks = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 16px;
  pointer-events: auto;
  z-index: 2;

  a {
    color: ${theme.colors.text.muted};
    text-decoration: none;
    font-family: ${theme.font.family};
    font-size: 1.1rem;
    transition: color 0.2s;

    &:hover {
      color: ${theme.colors.text.gold};
    }
  }
`

const Subtitle = styled.div`
  margin-bottom: 24px;
`

export const MainMenu: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <Wrapper>
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <BalatroBackground />
      </Canvas>

      <Overlay>
        <Title>JOSEPH</Title>
        <Subtitle>
          <BalatroText variant="body">Software Developer</BalatroText>
        </Subtitle>
        <CardImage
          src={`/cards/${cardTexture}.png`}
          alt="Personal card"
        />
        <ButtonRow>
          <BalatroButton color="blue" onClick={() => dispatch(navigateTo('projects'))}>
            Projects
          </BalatroButton>
          <BalatroButton color="orange" onClick={() => dispatch(openModal('about'))}>
            About
          </BalatroButton>
          <BalatroButton color="red" onClick={() => dispatch(openModal('contact'))}>
            Contact
          </BalatroButton>
          <BalatroButton color="green" onClick={() => dispatch(openModal('skills'))}>
            Skills
          </BalatroButton>
        </ButtonRow>
      </Overlay>

      <SocialLinks>
        <a href="https://github.com/YoseptF" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/joseph-flores-vega/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </SocialLinks>
    </Wrapper>
  )
}
