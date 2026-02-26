import { type FC } from 'react'
import styled from 'styled-components'
import { useTransition, animated } from '@react-spring/web'
import { BalatroButton } from './BalatroButton'
import { projects } from '../../data/projects'

interface ActionButtonsProps {
  selectedIndex: number | null
}

const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
  pointer-events: auto;
  z-index: 2;

  @media (max-width: 768px) {
    bottom: auto;
    top: 20px;
    right: 20px;
  }
`

const AnimatedButtons = styled(animated.div)`
  display: flex;
  gap: 12px;
`

export const ActionButtons: FC<ActionButtonsProps> = ({ selectedIndex }) => {
  const project = selectedIndex !== null ? projects[selectedIndex] ?? null : null

  const transitions = useTransition(project, {
    keys: project?.name ?? 'none',
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 280, friction: 26 },
  })

  return (
    <ButtonsWrapper>
      {transitions(
        (style, item) =>
          item && (
            <AnimatedButtons style={style}>
              <BalatroButton
                color="blue"
                onClick={() => window.open(item.github, '_blank')}
              >
                GitHub
              </BalatroButton>
              {item.demo && (
                <BalatroButton
                  color="red"
                  onClick={() => window.open(item.demo ?? undefined, '_blank')}
                >
                  Live Demo
                </BalatroButton>
              )}
            </AnimatedButtons>
          ),
      )}
    </ButtonsWrapper>
  )
}
