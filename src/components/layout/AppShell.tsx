import { type FC } from 'react'
import { useTransition, animated } from '@react-spring/web'
import styled from 'styled-components'
import { useAppSelector } from '../../store/hooks'
import { selectCurrentScreen, selectActiveModal } from '../../store/slices/navigation'
import { MainMenu } from '../../screens/MainMenu'
import { Projects } from '../../screens/Projects'
import { About } from '../../screens/About'
import { Contact } from '../../screens/Contact'
import { Skills } from '../../screens/Skills'

const screenComponents: Record<string, FC> = {
  menu: MainMenu,
  projects: Projects,
}

const modalComponents: Record<string, FC> = {
  about: About,
  contact: Contact,
  skills: Skills,
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
`

const AnimatedScreen = styled(animated.div)`
  position: absolute;
  inset: 0;
  will-change: opacity;
`

const ModalBackdrop = styled(animated.div)`
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

export const AppShell: FC = () => {
  const currentScreen = useAppSelector(selectCurrentScreen)
  const activeModal = useAppSelector(selectActiveModal)

  const screenTransitions = useTransition(currentScreen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 280, friction: 30 },
  })

  const modalTransitions = useTransition(activeModal, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)' },
    config: { tension: 300, friction: 26 },
  })

  return (
    <Container>
      {screenTransitions((style, screen) => {
        const ScreenComponent = screenComponents[screen]
        if (!ScreenComponent) return null
        return (
          <AnimatedScreen style={style}>
            <ScreenComponent />
          </AnimatedScreen>
        )
      })}

      {modalTransitions((style, modal) => {
        if (!modal) return null
        const ModalComponent = modalComponents[modal]
        if (!ModalComponent) return null
        return (
          <ModalBackdrop style={{ opacity: style.opacity }}>
            <animated.div style={{ transform: style.transform }}>
              <ModalComponent />
            </animated.div>
          </ModalBackdrop>
        )
      })}
    </Container>
  )
}
