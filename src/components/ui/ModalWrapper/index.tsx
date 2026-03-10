import { type FC } from 'react'
import { useAppSelector } from '../../../store/hooks'
import { selectMenuTheme } from '../../../store/slices/navigation'
import { BalatroModalWrapper } from './BalatroModalWrapper'
import { TerrariaModalWrapper } from './TerrariaModalWrapper'
import type { ModalWrapperProps } from '../types'

export const ModalWrapper: FC<ModalWrapperProps> = (props) => {
  const menuTheme = useAppSelector(selectMenuTheme)
  if (menuTheme === 'terraria') return <TerrariaModalWrapper {...props} />
  return <BalatroModalWrapper {...props} />
}
