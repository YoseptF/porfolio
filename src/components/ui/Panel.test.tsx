import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithStore, makeStore } from '../../test/renderWithStore'
import { Panel } from './Panel'

describe('Panel adapter', () => {
  it('renders children for balatro theme', () => {
    const store = makeStore({ navigation: { menuTheme: 'balatro', currentScreen: 'menu', activeModal: null } })
    renderWithStore(<Panel>Content</Panel>, store)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders children for terraria theme', () => {
    const store = makeStore({ navigation: { menuTheme: 'terraria', currentScreen: 'menu', activeModal: null } })
    renderWithStore(<Panel>Content</Panel>, store)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders title for both themes', () => {
    const store = makeStore({ navigation: { menuTheme: 'terraria', currentScreen: 'menu', activeModal: null } })
    renderWithStore(<Panel title="TEST">Content</Panel>, store)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })
})
