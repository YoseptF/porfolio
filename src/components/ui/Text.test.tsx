import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithStore, makeStore } from '../../test/renderWithStore'
import { Text } from './Text'

describe('Text adapter', () => {
  it('renders children for balatro theme', () => {
    const store = makeStore({ navigation: { menuTheme: 'balatro', currentScreen: 'menu', activeModal: null } })
    renderWithStore(<Text>Hello</Text>, store)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders children for terraria theme', () => {
    const store = makeStore({ navigation: { menuTheme: 'terraria', currentScreen: 'menu', activeModal: null } })
    renderWithStore(<Text>Hello</Text>, store)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
