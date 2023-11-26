/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './stores/example/slice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
});
