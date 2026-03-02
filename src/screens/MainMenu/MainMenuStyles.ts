import styled, { keyframes } from "styled-components";
import { theme, pixelatedClipPath, shadows } from "../../styles/theme";
import {
  BalatroButton,
  BalatroButtonInner,
} from "../../components/ui/BalatroButton";
import { SocialIconButton } from "./SocialIcons";

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
`;

export const Wrapper = styled.div`
  position: absolute;
  inset: 0;
`;

export const TitleCardArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 18vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
`;

export const TitleCardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleLogo = styled.img`
  width: 75vw;
  max-width: 1100px;
  height: auto;
  filter: url(#burn-reveal);
  /* CSS masking applies AFTER filter effects (CSS Masking Level 1 spec),
     so this clips the filter's output (incl. fire glow) to the logo's pixel shape */
  mask-image: url(/title.png);
  mask-size: 100% 100%;

  @media (max-width: 600px) {
    width: 90vw;
  }
`;

export const CardImage = styled.img<{ $src: string }>`
  position: absolute;
  width: 17vw;
  min-width: 150px;
  max-width: 240px;
  height: auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
  filter: url(#burn-reveal);
  mask-image: url(${({ $src }) => $src});
  mask-size: 100% 100%;
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
`;

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
`;

export const BottomArea = styled.div`
  position: absolute;
  bottom: 30px;
  left: 10px;
  right: 10px;
  height: 12vh;
  min-height: 140px;
  display: flex;
  align-items: stretch;
  gap: 8px;
  pointer-events: auto;
  z-index: 2;

  @media (max-width: 600px) {
    bottom: 10px;
    flex-direction: column;
    height: calc(15vh + 108px);
    min-height: 130px;
    max-height: 155px;
  }
`;

const PixelPanel = styled.div`
  ${panelStyle}
`;

export const ProfileContainer = styled(PixelPanel)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 14px;
  flex-shrink: 0;
  gap: 4px;
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const ProfileLabel = styled.span`
  font-family: ${theme.font.family};
  font-size: 2rem;
  color: ${theme.colors.text.white};
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-bottom: 4px;
  display: inline-block;
`;

export const ProfileValue = styled.span`
  font-family: ${theme.font.family};
  font-size: 1.1rem;
  color: ${theme.colors.text.gold};
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-top: 2px;
`;

export const ButtonsContainer = styled(PixelPanel)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 6px 12px 6px;
  flex: 1;

  @media (max-width: 600px) {
    align-items: stretch;
  }
`;

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
    font-size: clamp(3.3rem, 4vw, 5.5rem);
    white-space: nowrap;
    padding: 0 10px;
  }

  @media (max-width: 600px) {
    ${BalatroButtonInner} {
      font-size: clamp(1.5rem, 5vw, 2.5rem);
    }
  }
`;

export const MenuButton = styled(BalatroButton)`
  flex: 1;
  min-height: calc(100% - 12px);

  ${BalatroButtonInner} {
    font-size: clamp(2.4rem, 3vw, 4rem);
    white-space: nowrap;
    padding: 0 10px;
  }

  @media (max-width: 600px) {
    height: auto;
    min-height: unset;
    align-self: stretch;

    ${BalatroButtonInner} {
      font-size: clamp(1rem, 3.5vw, 1.8rem);
    }
  }
`;

export const JimboTooltipWrapper = styled.div<{ $visible: boolean }>`
  position: absolute;
  left: calc(50% + 134px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 10;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.5s ease;

  @media (orientation: portrait) {
    left: 50%;
    top: calc(50% + 21vw + 10px);
    transform: translateX(-50%);
    flex-direction: column;
  }
`;

export const JimboTooltipArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 13px solid #f5f0e0;
  flex-shrink: 0;

  @media (orientation: portrait) {
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 13px solid #f5f0e0;
    border-top: none;
  }
`;

export const JimboTooltipBubble = styled.div`
  position: relative;
  isolation: isolate;
  padding: 12px 14px;
  width: 190px;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.55));

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #f5f0e0;
    ${pixelatedClipPath(4)}
    z-index: -1;
  }

  @media (orientation: portrait) {
    width: 200px;
  }
`;

export const JimboTooltipText = styled.p`
  font-family: ${theme.font.family};
  font-size: 1.1rem;
  color: #2a2520;
  margin: 0;
  line-height: 1.45;

  @media (orientation: portrait) {
    text-align: center;
    font-size: 0.9rem;
  }
`;

const wordPop = keyframes`
  0%   { transform: translateY(5px) scale(0.8); opacity: 0; }
  55%  { transform: translateY(-3px) scale(1.08); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;

export const TooltipWord = styled.span`
  display: inline-block;
  animation: ${wordPop} 220ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
`;

export const SocialsRow = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 8px;

  @media (min-width: 601px) {
    & > ${SocialIconButton}:last-child {
      display: none;
    }
  }

  @media (max-width: 600px) {
    order: -1;
    flex-direction: row;
    justify-content: flex-end;
    align-self: stretch;
    height: auto;
    min-height: unset;

    ${SocialIconButton} {
      flex: none;
      width: 50px;
      height: 50px;
    }

  }
`;

export const MusicButtonWrapper = styled.div`
  position: relative;
`;

export const MusicSpeechBubble = styled.div`
  position: absolute;
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 20;
  pointer-events: none;

  @media (max-width: 600px) {
    right: auto;
    left: 50%;
    top: auto;
    bottom: calc(100% + 8px);
    transform: translateX(-50%);
    flex-direction: column;
    align-items: center;
  }
`;

export const MusicBubbleArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 11px solid #f5f0e0;
  flex-shrink: 0;

  @media (max-width: 600px) {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 11px solid #f5f0e0;
    border-bottom: none;
  }
`;

export const MusicBubbleBox = styled.div`
  position: relative;
  isolation: isolate;
  padding: 10px 12px;
  width: 170px;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.55));

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #f5f0e0;
    ${pixelatedClipPath(4)}
    z-index: -1;
  }

  font-family: ${theme.font.family};
  font-size: 0.85rem;
  color: #2a2520;
  line-height: 1.4;
`;

export const MusicBubbleDismiss = styled.button`
  position: absolute;
  top: 4px;
  right: 6px;
  background: none;
  border: none;
  cursor: pointer;
  pointer-events: auto;
  font-family: ${theme.font.family};
  font-size: 1rem;
  color: #2a2520;
  padding: 0;
  line-height: 1;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;
