import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { navigationReducer, navigateTo, openModal, closeModal, setMenuTheme, selectMenuTheme } from './navigation'
import { configureStore } from '@reduxjs/toolkit'

type TestNavState = {
  currentScreen: 'menu'
  activeModal: 'about' | 'contact' | 'skills' | 'play' | 'music' | 'theme' | null
  menuTheme: 'balatro' | 'terraria'
}

const initialState: TestNavState = { currentScreen: 'menu', activeModal: null, menuTheme: 'balatro' }

const makeStore = (preloadedState?: Partial<TestNavState>) =>
  configureStore({
    reducer: { navigation: navigationReducer },
    preloadedState: preloadedState ? { navigation: { ...initialState, ...preloadedState } } : undefined,
  })

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

  it('openModal can set theme', () => {
    const state = navigationReducer(initialState, openModal('theme'))
    expect(state.activeModal).toBe('theme')
  })

  describe('menuTheme', () => {
    beforeEach(() => {
      vi.spyOn(Storage.prototype, 'setItem')
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('initial menuTheme is balatro when localStorage is empty', () => {
      const state = navigationReducer(undefined, { type: '@@init' })
      expect(state.menuTheme).toBe('balatro')
    })

    it('setMenuTheme updates menuTheme to terraria', () => {
      const state = navigationReducer(initialState, setMenuTheme('terraria'))
      expect(state.menuTheme).toBe('terraria')
    })

    it('setMenuTheme updates menuTheme back to balatro', () => {
      const terrariaState = { ...initialState, menuTheme: 'terraria' as const }
      const state = navigationReducer(terrariaState, setMenuTheme('balatro'))
      expect(state.menuTheme).toBe('balatro')
    })

    it('setMenuTheme persists to localStorage', () => {
      const store = makeStore()
      store.dispatch(setMenuTheme('terraria'))
      expect(localStorage.setItem).toHaveBeenCalledWith('menuTheme', 'terraria')
    })

    it('selectMenuTheme selector returns current theme', () => {
      const store = makeStore({ menuTheme: 'terraria' })
      const selected = selectMenuTheme(store.getState())
      expect(selected).toBe('terraria')
    })
  })
})
