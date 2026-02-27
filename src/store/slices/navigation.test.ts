import { describe, it, expect } from 'vitest'
import { navigationReducer, navigateTo, openModal, closeModal, selectProject } from './navigation'

const initialState = { currentScreen: 'menu' as const, activeModal: null, selectedProjectIndex: null }

describe('navigation slice', () => {
  it('has correct initial state', () => {
    const state = navigationReducer(undefined, { type: '@@init' })
    expect(state).toEqual(initialState)
  })

  it('navigateTo changes currentScreen', () => {
    const state = navigationReducer(initialState, navigateTo('projects'))
    expect(state.currentScreen).toBe('projects')
  })

  it('navigateTo clears activeModal and selectedProjectIndex', () => {
    const withModal = { currentScreen: 'menu' as const, activeModal: 'about' as const, selectedProjectIndex: 2 }
    const state = navigationReducer(withModal, navigateTo('menu'))
    expect(state.activeModal).toBeNull()
    expect(state.selectedProjectIndex).toBeNull()
  })

  it('openModal sets activeModal', () => {
    const state = navigationReducer(initialState, openModal('contact'))
    expect(state.activeModal).toBe('contact')
  })

  it('closeModal clears activeModal', () => {
    const withModal = { ...initialState, activeModal: 'skills' as const }
    const state = navigationReducer(withModal, closeModal())
    expect(state.activeModal).toBeNull()
  })

  it('selectProject sets selectedProjectIndex', () => {
    const state = navigationReducer(initialState, selectProject(3))
    expect(state.selectedProjectIndex).toBe(3)
  })

  it('selectProject can set null to deselect', () => {
    const withProject = { ...initialState, selectedProjectIndex: 1 }
    const state = navigationReducer(withProject, selectProject(null))
    expect(state.selectedProjectIndex).toBeNull()
  })
})
