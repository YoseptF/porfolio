import { describe, it, expect } from 'vitest'
import { renderWithStore, makeStore } from '../../test/renderWithStore'
import { Button } from './Button'

describe('Button adapter', () => {
  it('renders Balatro button (ShadowWrapper div) for balatro theme', () => {
    const store = makeStore({ navigation: { menuTheme: 'balatro', currentScreen: 'menu', activeModal: null } })
    const { container } = renderWithStore(<Button>X</Button>, store)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('renders Terraria button (direct button element) for terraria theme', () => {
    const store = makeStore({ navigation: { menuTheme: 'terraria', currentScreen: 'menu', activeModal: null } })
    const { container } = renderWithStore(<Button>X</Button>, store)
    expect(container.firstChild?.nodeName).toBe('BUTTON')
  })
})
