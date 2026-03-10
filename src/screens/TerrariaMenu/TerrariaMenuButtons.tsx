import { type FC } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../store/hooks'
import { openModal } from '../../store/slices/navigation'

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 0.5vw, 8px);
  align-items: center;
`

const TerrariaBtn = styled.button`
  font-family: 'Andy Bold', sans-serif;
  font-size: clamp(26px, 4.7vw, 68px);
  color: #e8d080;
  background: none;
  border: none;
  padding: clamp(2px, 0.3vw, 4px) clamp(6px, 0.8vw, 12px);
  cursor: pointer;
  text-shadow:
    2px 2px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000;
  transition: color 0.1s, text-shadow 0.1s;

  &:hover {
    color: #fff8a0;
    text-shadow:
      2px 2px 0 #000,
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      0 0 12px rgba(255, 240, 100, 0.8);
  }
`

export const TerrariaMenuButtons: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <ButtonList>
      <TerrariaBtn onClick={() => dispatch(openModal('play'))}>Play</TerrariaBtn>
      <TerrariaBtn onClick={() => dispatch(openModal('about'))}>About</TerrariaBtn>
      <TerrariaBtn onClick={() => dispatch(openModal('contact'))}>Contact</TerrariaBtn>
      <TerrariaBtn onClick={() => dispatch(openModal('theme'))}>Style</TerrariaBtn>
    </ButtonList>
  )
}
