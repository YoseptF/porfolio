import { type FC } from 'react'
import styled from 'styled-components'
import { BalatroText } from '../components/ui/BalatroText'
import { BalatroButton } from '../components/ui/BalatroButton'
import { useAppDispatch } from '../store/hooks'
import { closeModal } from '../store/slices/navigation'
import { skills } from '../data/skills'
import { theme } from '../styles/theme'

const PanelContainer = styled.div`
  max-width: 550px;
  width: 100%;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
  background: ${theme.colors.panel.bg};
  border: 2px solid ${theme.colors.panel.border};
  border-radius: ${theme.radii.lg};
  padding: 16px;

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
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid ${({ $level }) => levelColors[$level] ?? theme.colors.panel.border};
  border-radius: ${theme.radii.md};
  padding: 10px 6px;
  text-align: center;
  cursor: default;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
`

const SkillName = styled.div`
  font-family: ${theme.font.family};
  font-size: 0.85rem;
  color: ${theme.colors.text.white};
  text-shadow: 1px 1px 0 #000;
  margin-bottom: 3px;
`

const SkillLevel = styled.div<{ $level: string }>`
  font-family: ${theme.font.family};
  font-size: 0.65rem;
  color: ${({ $level }) => levelColors[$level] ?? theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const BackRow = styled.div`
  display: flex;
  justify-content: center;
`

export const Skills: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <PanelContainer>
      <Header>
        <BalatroText variant="heading">COLLECTION</BalatroText>
      </Header>

      <Grid>
        {skills.map((skill) => (
          <SkillCard key={skill.name} $level={skill.level}>
            <SkillName>{skill.name}</SkillName>
            <SkillLevel $level={skill.level}>{skill.level}</SkillLevel>
          </SkillCard>
        ))}
      </Grid>

      <BackRow>
        <BalatroButton color="orange" onClick={() => dispatch(closeModal())}>
          Back
        </BalatroButton>
      </BackRow>
    </PanelContainer>
  )
}
