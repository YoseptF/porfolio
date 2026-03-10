import { type FC, useEffect, useRef } from 'react'
import { useTransition, animated } from '@react-spring/web'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { selectCurrentScreen, selectActiveModal, selectMenuTheme, closeModal } from '../../store/slices/navigation'
import { audioPlayer, isMusicEnabled, musicTracks } from '../../services/audioPlayer'
import { MainMenu, shouldPlayIntro } from '../../screens/MainMenu/index'
import { About } from '../../screens/About'
import { Contact } from '../../screens/Contact'
import { Skills } from '../../screens/Skills'
import { PlayModal } from '../../screens/Play'
import { Music } from '../../screens/Music'
import { TerrariaMenu } from '../../screens/TerrariaMenu'
import { ThemeSelector } from '../../screens/ThemeSelector'

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

const BalatroModalBackdrop = styled.div`
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

const TerrariaModalContainer = styled(animated.div)`
  position: fixed;
  inset: 0;
  z-index: 10;
`

const modalComponents: Record<string, FC> = {
  about: About,
  contact: Contact,
  skills: Skills,
  play: PlayModal,
  music: Music,
  theme: ThemeSelector,
}

// Themes where modals cover the full screen (no backdrop, opacity-only transition).
// Add new full-screen themes here; slide-up backdrop is the default.
const overlayModalThemes = new Set(['terraria'])

// Per-theme menu screen. Defaults to MainMenu when not listed.
const menuScreenByTheme: Partial<Record<string, FC>> = {
  terraria: TerrariaMenu,
}

// Per-theme startup track. Defaults to audioPlayer.start() when not listed.
const startTrackByTheme: Partial<Record<string, string>> = {
  terraria: musicTracks.TERRARIA_TRACK,
}

export const AppShell: FC = () => {
  const dispatch = useAppDispatch()
  const currentScreen = useAppSelector(selectCurrentScreen)
  const activeModal = useAppSelector(selectActiveModal)
  const menuTheme = useAppSelector(selectMenuTheme)
  const musicStarted = useRef(false)

  useEffect(() => {
    if (musicStarted.current) return;
    if (!isMusicEnabled()) return;
    if (shouldPlayIntro()) return; // MainMenu onComplete will start music after the white flash
    musicStarted.current = true;
    const track = startTrackByTheme[menuTheme]
    if (track) {
      audioPlayer.switchTrack(track)
    } else {
      audioPlayer.start()
    }
  }, [menuTheme])

  const menuScreen = menuScreenByTheme[menuTheme] ?? MainMenu

  const screenComponents: Record<string, FC> = {
    menu: menuScreen,
  }

  const screenTransitions = useTransition(currentScreen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 280, friction: 30 },
  })

  const useOverlayModal = overlayModalThemes.has(menuTheme)
  const modalTransitions = useTransition(activeModal, {
    from: { opacity: 0, y: useOverlayModal ? 0 : 1100 },
    enter: { opacity: 1, y: 0 },
    leave: useOverlayModal ? [{ opacity: 0, y: 0 }] : [{ y: -60 }, { y: 1100 }],
    config: (_item, _index, phase) =>
      useOverlayModal
        ? { duration: 150 }
        : phase === 'leave'
          ? { tension: 500, friction: 45 }
          : { tension: 320, friction: 18 },
  })

  return (
    <Container>
      {screenTransitions((style, screen) => {
        const ScreenComponent = screenComponents[screen]
        if (!ScreenComponent) return null
        return (
          <AnimatedScreen style={style} key={`${screen}-${menuTheme}`}>
            <ScreenComponent />
          </AnimatedScreen>
        )
      })}

      {modalTransitions((style, modal) => {
        if (!modal) return null
        const ModalComponent = modalComponents[modal]
        if (!ModalComponent) return null

        if (useOverlayModal) {
          return (
            <TerrariaModalContainer style={{ opacity: style.opacity }}>
              <ModalComponent />
            </TerrariaModalContainer>
          )
        }

        return (
          <BalatroModalBackdrop onClick={() => dispatch(closeModal())}>
            <animated.div style={{ ...style, width: '100%' }}>
              <ModalComponent />
            </animated.div>
          </BalatroModalBackdrop>
        )
      })}
    </Container>
  )
}
