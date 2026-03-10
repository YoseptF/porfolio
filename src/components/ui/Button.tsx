import { type FC } from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectMenuTheme } from '../../store/slices/navigation'
import { BalatroButton } from './BalatroButton'
import { TerrariaButton } from './terraria/TerrariaButton'
import type { ButtonProps } from './types'

export const Button: FC<ButtonProps> = (props) => {
  const menuTheme = useAppSelector(selectMenuTheme)
  if (menuTheme === 'terraria') return <TerrariaButton {...props} />
  return <BalatroButton {...props} />
}
