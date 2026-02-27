import { type FC, type ReactNode } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

type TextVariant = 'title' | 'heading' | 'body' | 'chips' | 'mult' | 'gold'

interface BalatroTextProps {
  variant?: TextVariant
  children: ReactNode
  className?: string
}

const shadowBlack = '1px 1px 0 #000'

const variantStyles: Record<TextVariant, { color: string; fontSize: string; textShadow: string }> = {
  title: {
    color: theme.colors.text.white,
    fontSize: '4rem',
    textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
  },
  heading: {
    color: theme.colors.text.white,
    fontSize: '2rem',
    textShadow: '2px 2px 0 #000',
  },
  body: {
    color: theme.colors.text.white,
    fontSize: '1.2rem',
    textShadow: shadowBlack,
  },
  chips: {
    color: theme.colors.text.chips,
    fontSize: '1.4rem',
    textShadow: shadowBlack,
  },
  mult: {
    color: theme.colors.text.mult,
    fontSize: '1.4rem',
    textShadow: shadowBlack,
  },
  gold: {
    color: theme.colors.text.gold,
    fontSize: '1.4rem',
    textShadow: shadowBlack,
  },
}

const StyledText = styled.span<{ $variant: TextVariant }>`
  font-family: ${theme.font.family};
  color: ${({ $variant }) => variantStyles[$variant].color};
  font-size: ${({ $variant }) => variantStyles[$variant].fontSize};
  text-shadow: ${({ $variant }) => variantStyles[$variant].textShadow};
  line-height: 1.2;
  letter-spacing: 1px;
`

export const BalatroText: FC<BalatroTextProps> = ({
  variant = 'body',
  children,
  className,
}) => (
  <StyledText $variant={variant} className={className}>
    {children}
  </StyledText>
)
