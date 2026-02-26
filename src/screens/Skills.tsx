import { type FC } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { BalatroBackground } from '../components/three/BalatroBackground'
import { BalatroText } from '../components/ui/BalatroText'
import { BalatroButton } from '../components/ui/BalatroButton'
import { useAppDispatch } from '../store/hooks'
import { navigateTo } from '../store/slices/navigation'
import { skills } from '../data/skills'
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
  padding: 20px;
  gap: 20px;
`

const Title = styled.div`
  pointer-events: auto;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
  max-width: 600px;
  width: 100%;
  pointer-events: auto;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`

const levelColors: Record<string, string> = {
  beginner: theme.colors.text.muted,
  intermediate: theme.colors.text.chips,
  advanced: theme.colors.text.gold,
  expert: theme.colors.text.mult,
}

const SkillCard = styled.div<{ $level: string }>`
  background: ${theme.colors.panel.bg};
  border: 2px solid ${({ $level }) => levelColors[$level] ?? theme.colors.panel.border};
  border-radius: ${theme.radii.md};
  padding: 12px 8px;
  text-align: center;
  cursor: default;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
`

const SkillName = styled.div`
  font-family: ${theme.font.family};
  font-size: 0.9rem;
  color: ${theme.colors.text.white};
  text-shadow: 1px 1px 0 #000;
  margin-bottom: 4px;
`

const SkillLevel = styled.div<{ $level: string }>`
  font-family: ${theme.font.family};
  font-size: 0.7rem;
  color: ${({ $level }) => levelColors[$level] ?? theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const BackButton = styled.div`
  pointer-events: auto;
`

export const Skills: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <Wrapper>
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <BalatroBackground
          color1={[0.30, 0.69, 0.49]}
          color2={[0.20, 0.45, 0.35]}
          color3={[0.03, 0.06, 0.04]}
          spinSpeed={0.2}
        />
      </Canvas>

      <Overlay>
        <Title>
          <BalatroText variant="heading">COLLECTION</BalatroText>
        </Title>

        <Grid>
          {skills.map((skill) => (
            <SkillCard key={skill.name} $level={skill.level}>
              <SkillName>{skill.name}</SkillName>
              <SkillLevel $level={skill.level}>{skill.level}</SkillLevel>
            </SkillCard>
          ))}
        </Grid>

        <BackButton>
          <BalatroButton color="purple" onClick={() => dispatch(navigateTo('menu'))}>
            Back
          </BalatroButton>
        </BackButton>
      </Overlay>
    </Wrapper>
  )
}
