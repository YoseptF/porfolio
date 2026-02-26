import { type FC } from 'react'
import styled from 'styled-components'
import { useTransition, animated } from '@react-spring/web'
import { BalatroText } from './BalatroText'
import { BalatroButton } from './BalatroButton'
import { BalatroPanel } from './BalatroPanel'
import { projects } from '../../data/projects'
import { theme } from '../../styles/theme'
import { useAppDispatch } from '../../store/hooks'
import { navigateTo } from '../../store/slices/navigation'

interface ProjectSidebarProps {
  selectedIndex: number | null
}

const SidebarWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 280px;
  pointer-events: auto;
  z-index: 2;

  @media (max-width: 768px) {
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-height: 40vh;
    overflow-y: auto;
  }
`

const AnimatedPanel = styled(animated.div)`
  width: 100%;
`

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`

const Tag = styled.span`
  font-family: ${theme.font.family};
  font-size: 0.85rem;
  color: ${theme.colors.text.gold};
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 4px;
  padding: 2px 8px;
`

const NavButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`

const Description = styled.div`
  margin-top: 8px;
`

const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
`

export const ProjectSidebar: FC<ProjectSidebarProps> = ({ selectedIndex }) => {
  const dispatch = useAppDispatch()
  const project = selectedIndex !== null ? projects[selectedIndex] ?? null : null

  const transitions = useTransition(project, {
    keys: project?.name ?? 'default',
    from: { opacity: 0, transform: 'translateX(-20px)' },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: { opacity: 0, transform: 'translateX(-20px)' },
    config: { tension: 280, friction: 26 },
  })

  return (
    <SidebarWrapper>
      {transitions((style, item) =>
        item ? (
          <AnimatedPanel style={style}>
            <BalatroPanel title={item.name}>
              <Description>
                <BalatroText variant="body">{item.description}</BalatroText>
              </Description>
              <TagRow>
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagRow>
            </BalatroPanel>
          </AnimatedPanel>
        ) : (
          <AnimatedPanel style={style}>
            <BalatroPanel title="PROJECTS">
              <BalatroText variant="body">Select a card to view project details.</BalatroText>
              <StatsRow>
                <BalatroText variant="chips">{projects.length} Projects</BalatroText>
              </StatsRow>
              <NavButtons>
                <BalatroButton color="orange" onClick={() => dispatch(navigateTo('about'))}>
                  About
                </BalatroButton>
                <BalatroButton color="red" onClick={() => dispatch(navigateTo('contact'))}>
                  Contact
                </BalatroButton>
              </NavButtons>
            </BalatroPanel>
          </AnimatedPanel>
        ),
      )}
      <NavButtons>
        <BalatroButton color="purple" onClick={() => dispatch(navigateTo('menu'))}>
          Back
        </BalatroButton>
      </NavButtons>
    </SidebarWrapper>
  )
}
