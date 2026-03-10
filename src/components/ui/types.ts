import type { ReactNode } from 'react'

export type ButtonColor = 'blue' | 'orange' | 'red' | 'green' | 'purple' | 'grey'
export type TextVariant = 'title' | 'heading' | 'body' | 'chips' | 'mult' | 'gold'

type ButtonBase = {
  color?: ButtonColor
  children: ReactNode
  className?: string
  large?: boolean
}

type ButtonAsButton = ButtonBase & {
  href?: never
  onClick?: () => void
  disabled?: boolean
  target?: never
  rel?: never
}

type ButtonAsLink = ButtonBase & {
  href: string
  target?: string
  rel?: string
  onClick?: never
  disabled?: never
}

export type ButtonProps = ButtonAsButton | ButtonAsLink

export interface PanelProps {
  title?: string
  children: ReactNode
  className?: string
}

export interface TextProps {
  variant?: TextVariant
  children: ReactNode
  className?: string
}

export interface ModalWrapperProps {
  children: ReactNode
  maxWidth?: string
  fitContent?: boolean
  onBack: () => void
}
