import { type FC, type ReactNode } from 'react'
import styled from 'styled-components'
import { BalatroButton } from '../BalatroButton'

const Container = styled.div<{ $maxWidth: string }>`
  max-width: ${({ $maxWidth }) => $maxWidth};
  width: 100%;
  margin: 0 auto;
`

const BackRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`

interface ModalWrapperProps {
  children: ReactNode
  maxWidth?: string
  onBack: () => void
}

export const ModalWrapper: FC<ModalWrapperProps> = ({ children, maxWidth = '500px', onBack }) => (
  <Container $maxWidth={maxWidth}>
    {children}
    <BackRow>
      <BalatroButton color="orange" onClick={onBack}>
        Back
      </BalatroButton>
    </BackRow>
  </Container>
)
