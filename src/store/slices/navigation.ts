import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

type Screen = 'menu' | 'projects'
type Modal = 'about' | 'contact' | 'skills'

interface NavigationState {
  currentScreen: Screen
  activeModal: Modal | null
  selectedProjectIndex: number | null
}

const initialState: NavigationState = {
  currentScreen: 'menu',
  activeModal: null,
  selectedProjectIndex: null,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<Screen>) => {
      state.currentScreen = action.payload
      state.activeModal = null
      state.selectedProjectIndex = null
    },
    openModal: (state, action: PayloadAction<Modal>) => {
      state.activeModal = action.payload
    },
    closeModal: (state) => {
      state.activeModal = null
    },
    selectProject: (state, action: PayloadAction<number | null>) => {
      state.selectedProjectIndex = action.payload
    },
  },
})

export const { navigateTo, openModal, closeModal, selectProject } = navigationSlice.actions
export const navigationReducer = navigationSlice.reducer

export const selectCurrentScreen = (state: RootState) => state.navigation.currentScreen
export const selectActiveModal = (state: RootState) => state.navigation.activeModal
export const selectSelectedProjectIndex = (state: RootState) => state.navigation.selectedProjectIndex
