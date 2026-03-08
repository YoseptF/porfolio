import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ThemeSelector } from './index'
import { navigationReducer } from '../../store/slices/navigation'

const makeStore = (menuTheme: 'balatro' | 'terraria' = 'balatro') =>
  configureStore({
    reducer: { navigation: navigationReducer },
    preloadedState: {
      navigation: { currentScreen: 'menu' as const, activeModal: 'theme' as const, menuTheme },
    },
  })

const renderWithStore = (menuTheme: 'balatro' | 'terraria' = 'balatro') => {
  const store = makeStore(menuTheme)
  const result = render(
    <Provider store={store}>
      <ThemeSelector />
    </Provider>
  )
  return { ...result, store }
}

describe('ThemeSelector', () => {
  it('renders Balatro and Terraria options', () => {
    renderWithStore()
    expect(screen.getByText(/balatro/i)).toBeTruthy()
    expect(screen.getByText(/terraria/i)).toBeTruthy()
  })

  it('clicking Terraria dispatches setMenuTheme and closes modal', () => {
    const { store } = renderWithStore('balatro')
    fireEvent.click(screen.getByText(/terraria/i))
    const state = store.getState().navigation
    expect(state.menuTheme).toBe('terraria')
    expect(state.activeModal).toBeNull()
  })

  it('clicking Balatro dispatches setMenuTheme and closes modal', () => {
    const { store } = renderWithStore('terraria')
    fireEvent.click(screen.getByText(/balatro/i))
    const state = store.getState().navigation
    expect(state.menuTheme).toBe('balatro')
    expect(state.activeModal).toBeNull()
  })
})
