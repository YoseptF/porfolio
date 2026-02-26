import { type FC } from 'react'
import { useTransition, animated } from '@react-spring/web'
import styled from 'styled-components'
import { useAppSelector } from '../../store/hooks'
import { selectCurrentScreen } from '../../store/slices/navigation'
import { MainMenu } from '../../screens/MainMenu'
import { Projects } from '../../screens/Projects'
import { About } from '../../screens/About'
import { Contact } from '../../screens/Contact'
import { Skills } from '../../screens/Skills'

const screenComponents: Record<string, FC> = {
  menu: MainMenu,
  projects: Projects,
  about: About,
  contact: Contact,
  skills: Skills,
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const AnimatedScreen = styled(animated.div)`
  position: absolute;
  inset: 0;
  will-change: transform, opacity;
`

export const AppShell: FC = () => {
  const currentScreen = useAppSelector(selectCurrentScreen)

  const transitions = useTransition(currentScreen, {
    from: { opacity: 0, transform: 'scale(0.95)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(1.05)' },
    config: { tension: 280, friction: 30 },
  })

  return (
    <Container>
      {transitions((style, screen) => {
        const ScreenComponent = screenComponents[screen]
        if (!ScreenComponent) return null
        return (
          <AnimatedScreen style={style}>
            <ScreenComponent />
          </AnimatedScreen>
        )
      })}
    </Container>
  )
}
