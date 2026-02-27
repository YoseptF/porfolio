import styled from 'styled-components'
import { theme, pixelatedClipPath, shadows } from '../../styles/theme'
import { BalatroButton, BalatroButtonInner } from '../../components/ui/BalatroButton'

const panelStyle = `
  position: relative;
  isolation: isolate;
  filter: ${shadows.dropShadowHard};
  transition: filter 0.1s;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #494951;
    ${pixelatedClipPath(6)}
    z-index: -1;
  }
`

export const Wrapper = styled.div`
  position: absolute;
  inset: 0;
`

export const TitleCardArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
`

export const TitleCardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TitleLogo = styled.img`
  width: 75vw;
  max-width: 1100px;
  height: auto;

  @media (max-width: 600px) {
    width: 90vw;
  }
`

export const CardImage = styled.img`
  position: absolute;
  width: 17vw;
  min-width: 150px;
  max-width: 240px;
  height: auto;
  border-radius: 8px;
  border: 3px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
  pointer-events: auto;
  z-index: 2;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 600px) {
    width: 28vw;
    min-width: 100px;
  }
`

export const VersionText = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  font-family: ${theme.font.family};
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  text-align: right;
  line-height: 1.4;
  letter-spacing: 1px;
  pointer-events: none;
  z-index: 3;
  text-shadow: ${shadows.textShadowDark};
`

export const BottomArea = styled.div`
  position: absolute;
  bottom: 30px;
  left: 10px;
  right: 10px;
  height: 15vh;
  min-height: 120px;
  display: flex;
  align-items: stretch;
  gap: 8px;
  pointer-events: auto;
  z-index: 2;
`

const PixelPanel = styled.div`
  ${panelStyle}
`

export const ProfileContainer = styled(PixelPanel)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 14px;
  flex-shrink: 0;
  gap: 4px;
`

export const ProfileLabel = styled.span`
  font-family: ${theme.font.family};
  font-size: 1rem;
  color: ${theme.colors.text.muted};
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const ProfileValue = styled.span`
  font-family: ${theme.font.family};
  font-size: 1.1rem;
  color: ${theme.colors.text.gold};
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-top: 2px;
`

export const ButtonsContainer = styled(PixelPanel)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 6px 12px 6px;
  flex: 1;
`

export const PlayButton = styled(BalatroButton)`
  flex: 1.5;
  align-self: stretch;
  filter: drop-shadow(0 7px 0 rgba(0, 0, 0, 0.6));

  &:hover {
    filter: brightness(1.15) drop-shadow(0 6px 0 rgba(0, 0, 0, 0.4));
  }

  &:active {
    filter: drop-shadow(0 3px 0 rgba(0, 0, 0, 0.4));
  }

  ${BalatroButtonInner} {
    font-size: 3.3rem;
    white-space: nowrap;
    padding: 0 10px;
  }
`

export const MenuButton = styled(BalatroButton)`
  flex: 1;
  height: calc(15vh * 0.62 - 12px);
  min-height: 92px;

  ${BalatroButtonInner} {
    font-size: 2.4rem;
    white-space: nowrap;
    padding: 0 10px;
  }
`
