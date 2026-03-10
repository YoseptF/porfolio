import { type FC } from 'react'
import styled from 'styled-components'
import { pixelatedClipPath } from '../../../styles/utils'
import type { PanelProps } from '../types'
import { TerrariaText } from './TerrariaText'

/*
 * Two-layer gradient background creates the border in a single element:
 *   layer 1: fill color, offset 2px inward on all sides
 *   layer 2: border color, fills the full shape
 * clip-path cuts both layers simultaneously — no wrapper divs needed.
 *
 * TranslucentFrame is the outer ring: same blue but semi-transparent,
 * so the parallax background shows through at the edges.
 */

const TitleBadge = styled.div`
  background:
    linear-gradient(#1a2a5e, #1a2a5e) 2px 2px / calc(100% - 4px) calc(100% - 4px) no-repeat,
    #5a7aaa;
  align-self: center;
  padding: 6px 24px;
  margin-bottom: -2px;
  z-index: 1;
  ${pixelatedClipPath(5)}
`

const PanelBox = styled.div`
  background:
    linear-gradient(#1a2a5e, #1a2a5e) 2px 2px / calc(100% - 4px) calc(100% - 4px) no-repeat,
    #5a7aaa;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 22px 14px 16px;
  ${pixelatedClipPath(6)}
`

const TranslucentFrame = styled.div`
  background: rgba(40, 70, 180, 0.4);
  padding: 6px;
  display: flex;
  flex-direction: column;
  ${pixelatedClipPath(8)}
`

export const TerrariaPanel: FC<PanelProps> = ({ title, children, className }) => (
  <TranslucentFrame className={className}>
    {title && (
      <TitleBadge>
        <TerrariaText variant="heading">{title}</TerrariaText>
      </TitleBadge>
    )}
    <PanelBox>{children}</PanelBox>
  </TranslucentFrame>
)
