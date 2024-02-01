import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './stores/exampleStore/slice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
});
