import { type FC } from 'react'
import styled from 'styled-components'
import { pixelatedClipPath } from '../../../styles/utils'
import type { PanelProps } from '../types'
import { TerrariaText } from './TerrariaText'

/*
 * Border via ::before pseudo-element — same pixelated clip-path at inset: -2px.
 * The 2px gap between the two polygons shows the border color.
 */
const panelMixin = (step: number) => `
  background: #1a2a5e;
  position: relative;
  ${pixelatedClipPath(step)}

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: #4a6aaa;
    ${pixelatedClipPath(step)}
    z-index: -1;
  }
`

const TitleBadge = styled.div`
  ${panelMixin(5)}
  align-self: center;
  padding: 6px 24px;
  margin-bottom: -2px;
  z-index: 1;
`

const PanelBox = styled.div`
  ${panelMixin(6)}
  padding: 24px 16px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const TerrariaPanel: FC<PanelProps> = ({ title, children, className }) => (
  <Wrapper className={className}>
    {title && (
      <TitleBadge>
        <TerrariaText variant="heading">{title}</TerrariaText>
      </TitleBadge>
    )}
    <PanelBox>{children}</PanelBox>
  </Wrapper>
)
