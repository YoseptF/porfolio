import { describe, it, expect } from 'vitest'
import { navigationReducer, navigateTo, openModal, closeModal } from './navigation'

const initialState = { currentScreen: 'menu' as const, activeModal: null }

describe('navigation slice', () => {
  it('has correct initial state', () => {
    const state = navigationReducer(undefined, { type: '@@init' })
    expect(state.currentScreen).toBe('menu')
    expect(state.activeModal).toBeNull()
  })

  it('navigateTo changes currentScreen', () => {
    const state = navigationReducer(initialState, navigateTo('menu'))
    expect(state.currentScreen).toBe('menu')
  })

  it('navigateTo clears activeModal', () => {
    const withModal = { ...initialState, activeModal: 'about' as const }
    const state = navigationReducer(withModal, navigateTo('menu'))
    expect(state.activeModal).toBeNull()
  })

  it('openModal sets activeModal', () => {
    const state = navigationReducer(initialState, openModal('contact'))
    expect(state.activeModal).toBe('contact')
  })

  it('openModal can set play', () => {
    const state = navigationReducer(initialState, openModal('play'))
    expect(state.activeModal).toBe('play')
  })

  it('closeModal clears activeModal', () => {
    const withModal = { ...initialState, activeModal: 'skills' as const }
    const state = navigationReducer(withModal, closeModal())
    expect(state.activeModal).toBeNull()
  })
})
