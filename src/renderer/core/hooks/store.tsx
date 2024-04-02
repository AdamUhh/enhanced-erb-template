import { Dispatch, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunk,
  GetThunkAPI,
} from '@reduxjs/toolkit/dist/createAsyncThunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IpcChannels, IpcInputConditional, IpcReturn } from 'shared/types/ipc';
import { store } from '../../store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/** Typesafe useDispatch. */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** Typesafe useSelector. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

/** Typesafe redux async thunk */
export const appCreateAsyncThunk = <T extends IpcChannels>(
  storeName: string,
  channelName: T,
  callback: (
    payload: IpcInputConditional<T>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>,
  ) => Promise<IpcReturn<T>>,
): AsyncThunk<IpcReturn<T>, IpcInputConditional<T>, {}> =>
  createAsyncThunk(`${storeName}/${channelName}`, async (payload, thunkAPI) =>
    callback(payload, thunkAPI),
  );
