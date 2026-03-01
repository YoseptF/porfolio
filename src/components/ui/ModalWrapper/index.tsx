import { type FC, type ReactNode } from 'react'
import styled from 'styled-components'
import { BalatroButton } from '../BalatroButton'

const Container = styled.div<{ $maxWidth: string; $fitContent: boolean }>`
  max-width: ${({ $maxWidth }) => $maxWidth};
  width: 100%;
  margin: 0 auto;
  height: ${({ $fitContent }) => ($fitContent ? 'auto' : 'calc(90vh - 40px)')};
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    height: ${({ $fitContent }) => ($fitContent ? 'auto' : 'calc(100dvh - 16px)')};
  }

  & > :first-child {
    flex: ${({ $fitContent }) => ($fitContent ? '0 0 auto' : '1')};
    min-height: 0;
  }
`

const BackRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`

interface ModalWrapperProps {
  children: ReactNode
  maxWidth?: string
  fitContent?: boolean
  onBack: () => void
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  maxWidth = '500px',
  fitContent = false,
  onBack,
}) => (
  <Container $maxWidth={maxWidth} $fitContent={fitContent} onClick={(e) => e.stopPropagation()}>
    {children}
    <BackRow>
      <BalatroButton color="orange" onClick={onBack}>
        Back
      </BalatroButton>
    </BackRow>
  </Container>
)
