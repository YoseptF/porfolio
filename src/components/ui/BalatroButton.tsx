import { type FC, type ReactNode } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

type ButtonColor = 'blue' | 'orange' | 'red' | 'green' | 'purple'

interface BalatroButtonProps {
  color?: ButtonColor
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const colorMap: Record<ButtonColor, string> = {
  blue: theme.colors.button.blue,
  orange: theme.colors.button.orange,
  red: theme.colors.button.red,
  green: theme.colors.button.green,
  purple: theme.colors.button.purple,
}

const StyledButton = styled.button<{ $color: ButtonColor }>`
  font-family: ${theme.font.family};
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  color: ${theme.colors.text.white};
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
  background: ${({ $color }) => colorMap[$color]};
  border: 3px solid rgba(0, 0, 0, 0.4);
  border-radius: ${theme.radii.md};
  padding: 14px 32px;
  cursor: pointer;
  position: relative;
  transition: transform 0.1s, filter 0.1s;
  box-shadow:
    0 4px 0 rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.15);
    box-shadow:
      0 6px 0 rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: translateY(2px);
    box-shadow:
      0 1px 0 rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

export const BalatroButton: FC<BalatroButtonProps> = ({
  color = 'blue',
  children,
  onClick,
  className,
  disabled = false,
}) => (
  <StyledButton
    $color={color}
    onClick={onClick}
    className={className}
    disabled={disabled}
  >
    {children}
  </StyledButton>
)
