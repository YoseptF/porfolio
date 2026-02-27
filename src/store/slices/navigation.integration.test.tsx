import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '../../test/renderWithStore'
import { About } from '../../screens/About'
import { openModal } from './navigation'

describe('modal screens via redux state', () => {
  it('About renders its content', () => {
    renderWithStore(<About />)
    expect(screen.getByText('Joseph Flores')).toBeInTheDocument()
  })

  it('About back button dispatches closeModal', async () => {
    const { store } = renderWithStore(<About />)
    store.dispatch(openModal('about'))
    expect(store.getState().navigation.activeModal).toBe('about')

    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(store.getState().navigation.activeModal).toBeNull()
  })
})
