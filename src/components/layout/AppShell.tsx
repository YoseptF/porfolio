import { type FC, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { selectCurrentScreen, selectActiveModal, closeModal } from '../../store/slices/navigation'
import { MainMenu } from '../../screens/MainMenu/index'
import { About } from '../../screens/About'
import { Contact } from '../../screens/Contact'
import { Skills } from '../../screens/Skills'
import { PlayModal } from '../../screens/Play'
import { Music } from '../../screens/Music'

const screenComponents: Record<string, FC> = {
  menu: MainMenu,
}

const modalComponents: Record<string, FC> = {
  about: About,
  contact: Contact,
  skills: Skills,
  play: PlayModal,
  music: Music,
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

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 8px;
    align-items: flex-start;
  }
`

export const AppShell: FC = () => {
  const dispatch = useAppDispatch()
  const currentScreen = useAppSelector(selectCurrentScreen)
  const activeModal = useAppSelector(selectActiveModal)

  useEffect(() => {
    if (localStorage.getItem("playMusic") !== "true") return;
    localStorage.removeItem("playMusic");
    const audio = new Audio("/music/theme.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, []);

  const screenTransitions = useTransition(currentScreen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 280, friction: 30 },
  })

  const modalTransitions = useTransition(activeModal, {
    from: { opacity: 0, y: 1100 },
    enter: { opacity: 1, y: 0 },
    leave: [{ y: -60 }, { y: 1100 }],
    config: (_item, _index, phase) =>
      phase === 'leave'
        ? { tension: 500, friction: 45 }
        : { tension: 320, friction: 18 },
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
          <ModalBackdrop onClick={() => dispatch(closeModal())}>
            <animated.div style={{ ...style, width: '100%' }}>
              <ModalComponent />
            </animated.div>
          </ModalBackdrop>
        )
      })}
    </Container>
  )
}
