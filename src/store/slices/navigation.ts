import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

type Screen = 'menu' | 'projects' | 'about' | 'contact' | 'skills'

interface NavigationState {
  currentScreen: Screen
  selectedProjectIndex: number | null
}

const initialState: NavigationState = {
  currentScreen: 'menu',
  selectedProjectIndex: null,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<Screen>) => {
      state.currentScreen = action.payload
      state.selectedProjectIndex = null
    },
    selectProject: (state, action: PayloadAction<number | null>) => {
      state.selectedProjectIndex = action.payload
    },
  },
})

export const { navigateTo, selectProject } = navigationSlice.actions
export const navigationReducer = navigationSlice.reducer

export const selectCurrentScreen = (state: RootState) => state.navigation.currentScreen
export const selectSelectedProjectIndex = (state: RootState) => state.navigation.selectedProjectIndex
