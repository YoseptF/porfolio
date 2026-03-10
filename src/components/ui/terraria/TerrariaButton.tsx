import { type FC } from 'react'
import styled from 'styled-components'
import { pixelatedClipPath } from '../../../styles/utils'
import type { ButtonColor, ButtonProps } from '../types'

const colorFillMap: Record<ButtonColor, string> = {
  blue: '#2a4a9a',
  orange: '#8a4a12',
  red: '#8a1e1e',
  green: '#1a6a2a',
  purple: '#4a1e8a',
  grey: '#3a424e',
}

const colorBorderMap: Record<ButtonColor, string> = {
  blue: '#5a80d8',
  orange: '#d88040',
  red: '#d84040',
  green: '#40c050',
  purple: '#8040d8',
  grey: '#6a7480',
}

/*
 * Two-layer background creates the border inside a single element:
 *   layer 1 (top): fill color, inset 2px on all sides
 *   layer 2 (base): border color filling the full shape
 * pixelatedClipPath cuts the corners of both layers simultaneously.
 */
const StyledBtn = styled.button<{ $color: ButtonColor; $large: boolean }>`
  font-family: 'Andy Bold', sans-serif;
  font-size: ${({ $large }) => ($large ? '2.2rem' : '1.4rem')};
  color: #e8d080;
  text-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
  background:
    linear-gradient(
        ${({ $color }) => colorFillMap[$color]},
        ${({ $color }) => colorFillMap[$color]}
      )
      2px 2px / calc(100% - 4px) calc(100% - 4px) no-repeat,
    ${({ $color }) => colorBorderMap[$color]};
  border: none;
  padding: 10px 24px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.1s, transform 0.1s;
  outline: none;
  ${pixelatedClipPath(5)}

  &:hover {
    filter: brightness(1.25);
    color: #fff8a0;
    text-shadow:
      2px 2px 0 #000,
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      0 0 12px rgba(255, 240, 100, 0.8);
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

export const TerrariaButton: FC<ButtonProps> = ({
  color = 'blue',
  children,
  className,
  large = false,
  ...rest
}) => {
  if (rest.href !== undefined) {
    return (
      <StyledBtn
        as="a"
        $color={color}
        $large={large}
        className={className}
        href={rest.href}
        target={rest.target}
        rel={rest.rel}
      >
        {children}
      </StyledBtn>
    )
  }
  return (
    <StyledBtn
      $color={color}
      $large={large}
      className={className}
      onClick={rest.onClick}
      disabled={rest.disabled ?? false}
    >
      {children}
    </StyledBtn>
  )
}
