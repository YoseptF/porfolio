import { type FC, type ReactNode } from "react";
import styled from "styled-components";
import { theme, pixelatedClipPath, shadows } from "../../styles/theme";

type ButtonColor = "blue" | "orange" | "red" | "green" | "purple" | "grey";

type BalatroButtonProps = {
  color?: ButtonColor;
  children: ReactNode;
  className?: string;
  large?: boolean;
} & (
  | { href: string; target?: string; rel?: string; onClick?: never; disabled?: never }
  | { href?: never; onClick?: () => void; disabled?: boolean; target?: never; rel?: never }
);

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
    filter: brightness(0.85) drop-shadow(0 4px 0 rgba(0, 0, 0, 0.4));
  }

  &:active {
    filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.4));
  }
`;

export const BalatroButtonInner = styled.button<{
  $color: ButtonColor;
  $large: boolean;
}>`
  font-family: ${theme.font.family};
  font-size: ${({ $large }) => ($large ? "2.6rem" : "1.6rem")};
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
  className,
  large = false,
  ...rest
}) => (
  <ShadowWrapper className={className}>
    {rest.href !== undefined ? (
      <BalatroButtonInner
        as="a"
        $color={color}
        $large={large}
        href={rest.href}
        target={rest.target}
        rel={rest.rel}
      >
        {children}
      </BalatroButtonInner>
    ) : (
      <BalatroButtonInner
        $color={color}
        $large={large}
        onClick={rest.onClick}
        disabled={rest.disabled ?? false}
      >
        {children}
      </BalatroButtonInner>
    )}
  </ShadowWrapper>
);
