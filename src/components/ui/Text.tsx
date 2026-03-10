import { type FC } from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectMenuTheme } from '../../store/slices/navigation'
import { BalatroText } from './BalatroText'
import { TerrariaText } from './terraria/TerrariaText'
import type { TextProps } from './types'

export const Text: FC<TextProps> = (props) => {
  const menuTheme = useAppSelector(selectMenuTheme)
  if (menuTheme === 'terraria') return <TerrariaText {...props} />
  return <BalatroText {...props} />
}
