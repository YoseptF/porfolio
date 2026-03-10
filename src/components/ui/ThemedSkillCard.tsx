import { type FC } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../store/hooks'
import { selectMenuTheme } from '../../store/slices/navigation'
import { theme } from '../../styles/theme'

const balatroLevelColors: Record<string, string> = {
  beginner: theme.colors.text.muted,
  intermediate: theme.colors.text.chips,
  advanced: theme.colors.text.gold,
  expert: theme.colors.text.mult,
}

const terrariaLevelColors: Record<string, string> = {
  beginner: 'rgba(255,255,255,0.4)',
  intermediate: '#80c8e8',
  advanced: '#e8d080',
  expert: '#e87060',
}

const BalatroCard = styled.div<{ $level: string }>`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid ${({ $level }) => balatroLevelColors[$level] ?? theme.colors.panel.border};
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

const BalatroName = styled.div`
  font-family: ${theme.font.family};
  font-size: 0.85rem;
  color: ${theme.colors.text.white};
  text-shadow: 1px 1px 0 #000;
  margin-bottom: 3px;
`

const BalatroLevel = styled.div<{ $level: string }>`
  font-family: ${theme.font.family};
  font-size: 0.65rem;
  color: ${({ $level }) => balatroLevelColors[$level] ?? theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const TerrariaCard = styled.div<{ $level: string }>`
  background: rgba(27, 40, 62, 0.85);
  border: 2px solid ${({ $level }) => terrariaLevelColors[$level] ?? '#4a6fa8'};
  padding: 10px 6px;
  text-align: center;
  cursor: default;
  transition: transform 0.15s;

  &:hover {
    transform: translateY(-3px);
  }
`

const TerrariaName = styled.div`
  font-family: 'Andy Bold', sans-serif;
  font-size: 0.85rem;
  color: #ffffff;
  text-shadow: 1px 1px 0 #000;
  margin-bottom: 3px;
`

const TerrariaLevel = styled.div<{ $level: string }>`
  font-family: 'Andy Bold', sans-serif;
  font-size: 0.65rem;
  color: ${({ $level }) => terrariaLevelColors[$level] ?? '#4a6fa8'};
  text-transform: uppercase;
  letter-spacing: 1px;
`

interface SkillCardProps {
  name: string
  level: string
}

export const ThemedSkillCard: FC<SkillCardProps> = ({ name, level }) => {
  const menuTheme = useAppSelector(selectMenuTheme)

  if (menuTheme === 'terraria') {
    return (
      <TerrariaCard $level={level}>
        <TerrariaName>{name}</TerrariaName>
        <TerrariaLevel $level={level}>{level}</TerrariaLevel>
      </TerrariaCard>
    )
  }

  return (
    <BalatroCard $level={level}>
      <BalatroName>{name}</BalatroName>
      <BalatroLevel $level={level}>{level}</BalatroLevel>
    </BalatroCard>
  )
}
