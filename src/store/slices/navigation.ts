import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

type Screen = 'menu'
type Modal = 'about' | 'contact' | 'skills' | 'play' | 'music' | 'theme'
type MenuTheme = 'balatro' | 'terraria'

interface NavigationState {
  currentScreen: Screen
  activeModal: Modal | null
  menuTheme: MenuTheme
}

const storedTheme = localStorage.getItem('menuTheme')
const menuTheme: MenuTheme = storedTheme === 'terraria' ? 'terraria' : 'balatro'

const initialState: NavigationState = {
  currentScreen: 'menu',
  activeModal: null,
  menuTheme,
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
    setMenuTheme: (state, action: PayloadAction<MenuTheme>) => {
      state.menuTheme = action.payload
      localStorage.setItem('menuTheme', action.payload)
    },
  },
})

export const { navigateTo, openModal, closeModal, setMenuTheme } = navigationSlice.actions
export const navigationReducer = navigationSlice.reducer

export const selectCurrentScreen = (state: RootState) => state.navigation.currentScreen
export const selectActiveModal = (state: RootState) => state.navigation.activeModal
export const selectMenuTheme = (state: RootState) => state.navigation.menuTheme
