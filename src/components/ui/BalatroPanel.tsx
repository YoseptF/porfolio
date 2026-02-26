import { type FC, type ReactNode } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { BalatroText } from './BalatroText'

interface BalatroPanelProps {
  title?: string
  children: ReactNode
  className?: string
}

const PanelWrapper = styled.div`
  background: ${theme.colors.panel.bg};
  border: 2px solid ${theme.colors.panel.border};
  border-radius: ${theme.radii.lg};
  overflow: hidden;
`

const TitleBar = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid ${theme.colors.panel.border};
  padding: 8px 16px;
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
  <PanelWrapper className={className}>
    {title && (
      <TitleBar>
        <BalatroText variant="heading">{title}</BalatroText>
      </TitleBar>
    )}
    <Content>{children}</Content>
  </PanelWrapper>
)
