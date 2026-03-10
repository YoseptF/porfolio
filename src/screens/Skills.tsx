import { type FC } from 'react'
import styled from 'styled-components'
import { Text } from '../components/ui/Text'
import { ModalWrapper } from '../components/ui/ModalWrapper'
import { ThemedSkillCard } from '../components/ui/ThemedSkillCard'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { closeModal, selectMenuTheme } from '../store/slices/navigation'
import { skills } from '../data/skills'
import { theme } from '../styles/theme'

const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
`

const BalatroGrid = styled.div`
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

const TerrariaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
  background: rgba(27, 40, 62, 0.95);
  border: 2px solid #4a6fa8;
  padding: 16px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
`

export const Skills: FC = () => {
  const dispatch = useAppDispatch()
  const menuTheme = useAppSelector(selectMenuTheme)

  const Grid = menuTheme === 'terraria' ? TerrariaGrid : BalatroGrid

  return (
    <ModalWrapper maxWidth="550px" onBack={() => dispatch(closeModal())}>
      <Header>
        <Text variant="heading">COLLECTION</Text>
      </Header>

      <Grid>
        {skills.map((skill) => (
          <ThemedSkillCard key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </Grid>
    </ModalWrapper>
  )
}
