import { type FC } from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectMenuTheme } from '../../store/slices/navigation'
import { BalatroPanel } from './BalatroPanel'
import { TerrariaPanel } from './terraria/TerrariaPanel'
import type { PanelProps } from './types'

export const Panel: FC<PanelProps> = (props) => {
  const menuTheme = useAppSelector(selectMenuTheme)
  if (menuTheme === 'terraria') return <TerrariaPanel {...props} />
  return <BalatroPanel {...props} />
}
