import { type FC } from 'react'
import styled from 'styled-components'
import { TerrariaButton } from '../terraria/TerrariaButton'
import type { ModalWrapperProps } from '../types'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 8px;
  overflow-y: auto;
  background: rgba(0, 5, 20, 0.55);

  @media (max-width: 600px) {
    padding: 12px;
    justify-content: flex-start;
    padding-top: 40px;
  }
`

const ContentBox = styled.div<{ $maxWidth: string }>`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth};
  min-height: 0;
  flex-shrink: 1;
  margin-top: 16px;
`

const BackRow = styled.div<{ $maxWidth: string }>`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth};
  flex-shrink: 0;
  display: flex;
`

const FullWidthButton = styled(TerrariaButton)`
  flex: 1;
  font-size: 2rem;
`

export const TerrariaModalWrapper: FC<ModalWrapperProps> = ({
  children,
  maxWidth = '500px',
  onBack,
}) => (
  <Overlay>
    <ContentBox $maxWidth={maxWidth}>{children}</ContentBox>
    <BackRow $maxWidth={maxWidth}>
      <FullWidthButton color="blue" onClick={onBack}>
        Back
      </FullWidthButton>
    </BackRow>
  </Overlay>
)
