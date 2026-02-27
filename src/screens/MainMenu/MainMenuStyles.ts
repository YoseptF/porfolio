import styled from "styled-components";
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

  @media (max-width: 600px) {
    width: 90vw;
  }
`;

export const CardImage = styled.img`
  position: absolute;
  width: 17vw;
  min-width: 150px;
  max-width: 240px;
  height: auto;
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

export const SocialsRow = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 8px;

  @media (min-width: 601px) {
    ${SocialIconButton}:last-child {
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
