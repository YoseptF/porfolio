import { type FC } from 'react'
import styled from 'styled-components'
import { Button } from '../components/ui/Button'
import { Panel } from '../components/ui/Panel'
import { Text } from '../components/ui/Text'
import { ModalWrapper } from '../components/ui/ModalWrapper'
import { useAppDispatch } from '../store/hooks'
import { closeModal } from '../store/slices/navigation'
import { isMusicEnabled, audioPlayer } from '../services/audioPlayer'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  text-align: center;
`

const restartIntro = () => {
  window.dispatchEvent(new CustomEvent('portfolio:restart-intro'))
}

const restartMainMenu = () => {
  window.dispatchEvent(new CustomEvent('portfolio:restart-main-menu'))
}

export const Music: FC = () => {
  const dispatch = useAppDispatch()
  const active = isMusicEnabled()
  const blocked = active && !audioPlayer.isPlaying()

  const handleEnableWithIntro = () => {
    localStorage.setItem('musicEnabled', 'true')
    localStorage.setItem('replayIntro', 'true')
    audioPlayer.unlock()
    dispatch(closeModal())
    restartIntro()
  }

  const handleDisable = () => {
    localStorage.removeItem('musicEnabled')
    window.location.reload()
  }

  const handleReplayIntro = () => {
    localStorage.setItem('replayIntro', 'true')
    audioPlayer.unlock()
    dispatch(closeModal())
    restartIntro()
  }

  if (!active) {
    return (
      <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="380px" fitContent>
        <Panel title="MUSIC">
          <Content>
            <Text variant="body">The page will start playing music</Text>
            <Button color="green" onClick={handleEnableWithIntro}>
              Let&apos;s go!
            </Button>
          </Content>
        </Panel>
      </ModalWrapper>
    )
  }

  const handleBlockedLetsGo = () => {
    audioPlayer.start()
    dispatch(closeModal())
    restartMainMenu()
  }

  if (blocked) {
    return (
      <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="380px" fitContent>
        <Panel title="MUSIC">
          <Content>
            <Text variant="body">Browser blocked the music — click to enable it now</Text>
            <Button color="green" onClick={handleBlockedLetsGo}>
              Let&apos;s go!
            </Button>
            <Button color="blue" onClick={handleReplayIntro}>
              Replay intro
            </Button>
          </Content>
        </Panel>
      </ModalWrapper>
    )
  }

  return (
    <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="380px" fitContent>
      <Panel title="MUSIC">
        <Content>
          <Text variant="body">Turn off the music?</Text>
          <Button color="red" onClick={handleDisable}>
            Turn off
          </Button>
          <Button color="blue" onClick={handleReplayIntro}>
            Replay intro
          </Button>
        </Content>
      </Panel>
    </ModalWrapper>
  )
}
