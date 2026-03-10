import { type ComponentPropsWithoutRef, type FC } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../store/hooks'
import { selectMenuTheme } from '../../store/slices/navigation'
import { theme } from '../../styles/theme'

const BalatroInput = styled.input`
  font-family: ${theme.font.family};
  font-size: 1rem;
  color: ${theme.colors.text.white};
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid ${theme.colors.panel.border};
  border-radius: ${theme.radii.md};
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${theme.colors.button.blue};
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`

const TerrariaInput = styled.input`
  font-family: 'Andy Bold', sans-serif;
  font-size: 1rem;
  color: #e8d080;
  background: #243456;
  border: 2px solid #4a6fa8;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #7ab0e0;
  }

  &::placeholder {
    color: rgba(232, 208, 128, 0.45);
  }
`

const BalatroTextArea = styled.textarea`
  font-family: ${theme.font.family};
  font-size: 1rem;
  color: ${theme.colors.text.white};
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid ${theme.colors.panel.border};
  border-radius: ${theme.radii.md};
  padding: 10px 14px;
  min-height: 120px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${theme.colors.button.blue};
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`

const TerrariaTextArea = styled.textarea`
  font-family: 'Andy Bold', sans-serif;
  font-size: 1rem;
  color: #e8d080;
  background: #243456;
  border: 2px solid #4a6fa8;
  padding: 10px 14px;
  min-height: 120px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #7ab0e0;
  }

  &::placeholder {
    color: rgba(232, 208, 128, 0.45);
  }
`

export const ThemedInput: FC<ComponentPropsWithoutRef<'input'>> = (props) => {
  const menuTheme = useAppSelector(selectMenuTheme)
  if (menuTheme === 'terraria') return <TerrariaInput {...props} />
  return <BalatroInput {...props} />
}

export const ThemedTextArea: FC<ComponentPropsWithoutRef<'textarea'>> = (props) => {
  const menuTheme = useAppSelector(selectMenuTheme)
  if (menuTheme === 'terraria') return <TerrariaTextArea {...props} />
  return <BalatroTextArea {...props} />
}
