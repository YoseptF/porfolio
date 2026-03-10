import { type FC } from 'react'
import styled from 'styled-components'
import type { TextVariant, TextProps } from '../types'

const outline = '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'

const variantStyles: Record<TextVariant, { color: string; fontSize: string; textShadow: string }> = {
  title: {
    color: '#ffffff',
    fontSize: '3rem',
    textShadow: `3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000`,
  },
  heading: {
    color: '#e8d080',
    fontSize: '1.8rem',
    textShadow: outline,
  },
  body: {
    color: '#ffffff',
    fontSize: '1rem',
    textShadow: '1px 1px 0 #000',
  },
  chips: {
    color: '#80c8e8',
    fontSize: '1.2rem',
    textShadow: '1px 1px 0 #000',
  },
  mult: {
    color: '#e87060',
    fontSize: '1.2rem',
    textShadow: '1px 1px 0 #000',
  },
  gold: {
    color: '#e8d080',
    fontSize: '1.2rem',
    textShadow: '1px 1px 0 #000',
  },
}

const StyledText = styled.span<{ $variant: TextVariant }>`
  font-family: 'Andy Bold', sans-serif;
  color: ${({ $variant }) => variantStyles[$variant].color};
  font-size: ${({ $variant }) => variantStyles[$variant].fontSize};
  text-shadow: ${({ $variant }) => variantStyles[$variant].textShadow};
  line-height: 1.3;
  letter-spacing: 1px;
`

export const TerrariaText: FC<TextProps> = ({ variant = 'body', children, className }) => (
  <StyledText $variant={variant} className={className}>
    {children}
  </StyledText>
)
