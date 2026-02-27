import { type ReactNode } from 'react'
import { render, type RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { navigationReducer } from '../store/slices/navigation'

export const makeStore = () =>
  configureStore({ reducer: { navigation: navigationReducer } })

export const renderWithStore = (
  ui: ReactNode,
  store = makeStore(),
): RenderResult & { store: ReturnType<typeof makeStore> } => {
  const result = render(<Provider store={store}>{ui}</Provider>)
  return { ...result, store }
}
