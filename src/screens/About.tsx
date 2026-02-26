import { type FC } from 'react'
import styled from 'styled-components'
import { BalatroText } from '../components/ui/BalatroText'
import { BalatroButton } from '../components/ui/BalatroButton'
import { useAppDispatch } from '../store/hooks'
import { navigateTo } from '../store/slices/navigation'

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: #2e1a2e;
`

export const About: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <Placeholder>
      <BalatroText variant="heading">About — Coming Soon</BalatroText>
      <BalatroButton color="red" onClick={() => dispatch(navigateTo('menu'))}>
        Back
      </BalatroButton>
    </Placeholder>
  )
}
