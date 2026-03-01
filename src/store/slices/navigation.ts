import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

type Screen = 'menu'
type Modal = 'about' | 'contact' | 'skills' | 'play' | 'music'

interface NavigationState {
  currentScreen: Screen
  activeModal: Modal | null
}

const initialState: NavigationState = {
  currentScreen: 'menu',
  activeModal: null,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<Screen>) => {
      state.currentScreen = action.payload
      state.activeModal = null
    },
    openModal: (state, action: PayloadAction<Modal>) => {
      state.activeModal = action.payload
    },
    closeModal: (state) => {
      state.activeModal = null
    },
  },
})

export const { navigateTo, openModal, closeModal } = navigationSlice.actions
export const navigationReducer = navigationSlice.reducer

export const selectCurrentScreen = (state: RootState) => state.navigation.currentScreen
export const selectActiveModal = (state: RootState) => state.navigation.activeModal
