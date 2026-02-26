import { type FC } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { BalatroBackground } from '../components/three/BalatroBackground'
import { BalatroText } from '../components/ui/BalatroText'
import { BalatroButton } from '../components/ui/BalatroButton'
import { BalatroPanel } from '../components/ui/BalatroPanel'
import { useAppDispatch } from '../store/hooks'
import { navigateTo } from '../store/slices/navigation'
import { theme } from '../styles/theme'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
  padding: 20px;
`

const PanelContainer = styled.div`
  pointer-events: auto;
  max-width: 500px;
  width: 100%;
`

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid ${theme.colors.panel.border};
`

const Bio = styled.div`
  margin-bottom: 16px;
  line-height: 1.6;
`

const StatsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    justify-content: center;
  }
`

const StatItem = styled.div`
  text-align: center;
`

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    justify-content: center;
  }
`

export const About: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <Wrapper>
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <BalatroBackground
          color1={[0.61, 0.35, 0.71]}
          color2={[0.29, 0.20, 0.45]}
          color3={[0.04, 0.03, 0.08]}
          spinSpeed={0.25}
        />
      </Canvas>

      <Overlay>
        <PanelContainer>
          <BalatroPanel title="ABOUT">
            <ProfileSection>
              <ProfileImage src="/cards/happy.png" alt="Joseph" />
              <div>
                <BalatroText variant="heading">Joseph Flores</BalatroText>
                <br />
                <BalatroText variant="gold">Software Developer</BalatroText>
              </div>
            </ProfileSection>

            <Bio>
              <BalatroText variant="body">
                5+ years of experience building web applications with JavaScript, React,
                and modern frameworks. Passionate about 3D graphics, game development,
                and creating unique interactive experiences.
              </BalatroText>
            </Bio>

            <StatsRow>
              <StatItem>
                <BalatroText variant="chips">5+</BalatroText>
                <br />
                <BalatroText variant="body">Years</BalatroText>
              </StatItem>
              <StatItem>
                <BalatroText variant="mult">6+</BalatroText>
                <br />
                <BalatroText variant="body">Projects</BalatroText>
              </StatItem>
              <StatItem>
                <BalatroText variant="gold">∞</BalatroText>
                <br />
                <BalatroText variant="body">Curiosity</BalatroText>
              </StatItem>
            </StatsRow>

            <ButtonRow>
              <BalatroButton color="blue" onClick={() => dispatch(navigateTo('projects'))}>
                Projects
              </BalatroButton>
              <BalatroButton color="red" onClick={() => dispatch(navigateTo('contact'))}>
                Contact
              </BalatroButton>
              <BalatroButton color="purple" onClick={() => dispatch(navigateTo('menu'))}>
                Back
              </BalatroButton>
            </ButtonRow>
          </BalatroPanel>
        </PanelContainer>
      </Overlay>
    </Wrapper>
  )
}
