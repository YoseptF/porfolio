import { createSlice } from '@reduxjs/toolkit';

const sceneSlice = createSlice({
  name: 'scene',
  initialState: {
    currentScene: 1,
    dragging: false,
    sceneEnum: {
      1: [-20, 10],
      2: [100, 100],
      3: [-200, 200],
    },
    centered: true,
  },
  reducers: {
    updateScene: (state, { payload }) => { state.currentScene = payload; },
    centre: state => { state.centered = true; },
    decentre: state => { state.centered = false; },
    toogleDragging: state => { state.dragging = !state.dragging; },
  },
});

export const {
  updateScene, centre, decentre, toogleDragging,
} = sceneSlice.actions;

export const selectScene = ({ scene: { sceneEnum, currentScene } }) => (
  [sceneEnum[currentScene], currentScene]
);
export const selectCentered = state => state.scene.centered;
export const selectDragging = state => state.scene.dragging;

export default sceneSlice.reducer;
