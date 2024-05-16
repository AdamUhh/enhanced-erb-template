import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import exampleReducer from './stores/exampleStore/slice';

export const store = configureStore({
  reducer: {
    exampleStore: exampleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/** Typesafe useDispatch. */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** Typesafe useSelector. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
