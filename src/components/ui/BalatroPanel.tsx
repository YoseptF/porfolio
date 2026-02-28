import { type FC, type ReactNode } from 'react'
import styled from 'styled-components'
import { theme, pixelatedClipPath } from '../../styles/theme'
import { BalatroText } from './BalatroText'

interface BalatroPanelProps {
  title?: string
  children: ReactNode
  className?: string
}

const PanelOuter = styled.div`
  ${pixelatedClipPath(6)}
  background: ${theme.colors.panel.border};
  padding: 2px;
  display: flex;
  flex-direction: column;
`

const PanelInner = styled.div`
  ${pixelatedClipPath(6)}
  background: ${theme.colors.panel.bg};
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const TitleBar = styled.div`
  padding: 10px 16px;
  text-align: center;
`

const Content = styled.div`
  padding: 16px;
`

export const BalatroPanel: FC<BalatroPanelProps> = ({
  title,
  children,
  className,
}) => (
  <PanelOuter className={className}>
    <PanelInner>
      {title && (
        <TitleBar>
          <BalatroText variant="heading">{title}</BalatroText>
        </TitleBar>
      )}
      <Content>{children}</Content>
    </PanelInner>
  </PanelOuter>
)
