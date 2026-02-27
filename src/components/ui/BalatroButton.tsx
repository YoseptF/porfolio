import { type FC, type ReactNode } from "react";
import styled from "styled-components";
import { theme, pixelatedClipPath, shadows } from "../../styles/theme";

type ButtonColor = "blue" | "orange" | "red" | "green" | "purple" | "grey";

interface BalatroButtonProps {
  color?: ButtonColor;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const colorMap: Record<ButtonColor, string> = {
  blue: theme.colors.button.blue,
  orange: theme.colors.button.orange,
  red: theme.colors.button.red,
  green: theme.colors.button.green,
  purple: theme.colors.button.purple,
  grey: theme.colors.button.grey,
};

/*
 * Shadow lives here, NOT on StyledButton. drop-shadow on an element that also
 * has clip-path gets clipped (CSS renders filter → clip-path in that order).
 * This wrapper has no clip-path, so the shadow traces the child's alpha shape freely.
 * className is passed here so styled(BalatroButton) overrides (layout, shadow) work.
 */
const ShadowWrapper = styled.div`
  display: flex;
  filter: ${shadows.dropShadowHard};
  transition: filter 0.1s;

  &:hover {
    filter: brightness(1.15) drop-shadow(0 4px 0 rgba(0, 0, 0, 0.4));
  }

  &:active {
    filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.4));
  }
`;

export const BalatroButtonInner = styled.button<{ $color: ButtonColor }>`
  font-family: ${theme.font.family};
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${theme.colors.text.white};
  text-shadow: ${shadows.textShadowMid};
  background-color: ${({ $color }) => colorMap[$color]};
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0px,
      rgba(0, 0, 0, 0) 1px,
      rgba(0, 0, 0, 0.1) 1px,
      rgba(0, 0, 0, 0.1) 2px
    ),
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0) 40%,
      rgba(0, 0, 0, 0.05) 100%
    );
  padding: 14px 32px;
  cursor: pointer;
  position: relative;
  transition: transform 0.1s;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${pixelatedClipPath(5)}

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const BalatroButton: FC<BalatroButtonProps> = ({
  color = "blue",
  children,
  onClick,
  className,
  disabled = false,
}) => (
  <ShadowWrapper className={className}>
    <BalatroButtonInner $color={color} onClick={onClick} disabled={disabled}>
      {children}
    </BalatroButtonInner>
  </ShadowWrapper>
);
