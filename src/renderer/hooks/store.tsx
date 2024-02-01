import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

/**
 * Typesafe useDispatch.
 */
const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Typesafe useSelector.
 */
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };
