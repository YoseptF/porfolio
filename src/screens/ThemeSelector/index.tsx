import { type FC } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { closeModal, setMenuTheme, selectMenuTheme } from '../../store/slices/navigation'
import { ModalWrapper } from '../../components/ui/ModalWrapper'
import { Panel } from '../../components/ui/Panel'
import { Text } from '../../components/ui/Text'
import { audioPlayer, musicTracks } from '../../services/audioPlayer'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
`

const ThemeCard = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? '#2a1a0e' : '#0d0a08')};
  border: 2px solid ${({ $active }) => ($active ? '#f0a030' : '#3a2a1a')};
  border-radius: 4px;
  padding: 24px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: #f0a030;
    background: #1a1008;
  }
`

const Preview = styled.div<{ $theme: 'balatro' | 'terraria' }>`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 2px;
  background: ${({ $theme }) =>
    $theme === 'balatro'
      ? 'radial-gradient(ellipse at center, #1a0a2e 0%, #0d0518 100%)'
      : 'linear-gradient(180deg, #5b9bd5 0%, #4a7c59 70%, #6b4c2a 100%)'};
`

export const ThemeSelector: FC = () => {
  const dispatch = useAppDispatch()
  const menuTheme = useAppSelector(selectMenuTheme)

  const select = (selected: 'balatro' | 'terraria') => {
    dispatch(setMenuTheme(selected))
    dispatch(closeModal())
    if (selected === 'terraria') {
      localStorage.setItem('musicEnabled', 'true')
      audioPlayer.switchTrack(musicTracks.TERRARIA_TRACK)
    } else {
      audioPlayer.switchTrack(musicTracks.BALATRO_TRACK)
    }
    window.dispatchEvent(new Event('portfolio:theme-changed'))
  }

  return (
    <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="min(600px, 92vw)" fitContent>
      <Panel title="MENU STYLE">
        <Grid>
          <ThemeCard $active={menuTheme === 'balatro'} onClick={() => select('balatro')}>
            <Preview $theme="balatro" />
            <Text variant={menuTheme === 'balatro' ? 'gold' : 'body'}>Balatro</Text>
          </ThemeCard>
          <ThemeCard $active={menuTheme === 'terraria'} onClick={() => select('terraria')}>
            <Preview $theme="terraria" />
            <Text variant={menuTheme === 'terraria' ? 'gold' : 'body'}>Terraria</Text>
          </ThemeCard>
        </Grid>
      </Panel>
    </ModalWrapper>
  )
}
