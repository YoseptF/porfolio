import { configureStore } from '@reduxjs/toolkit';
import sceneReducer from '../features/scene';

const Store = configureStore({
  reducer: {
    scene: sceneReducer,
  },
});

export default Store;
