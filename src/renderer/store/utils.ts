import { AsyncThunk, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {
  IpcChannels,
  IpcExpectedInput,
  IpcInvokeReturn,
} from 'shared/types/ipc';

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
    payload: IpcExpectedInput<T>,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>,
  ) => Promise<IpcInvokeReturn<T>>,
): AsyncThunk<IpcInvokeReturn<T>, IpcExpectedInput<T>, {}> =>
  createAsyncThunk(`${storeName}/${channelName}`, async (payload, thunkAPI) =>
    callback(payload, thunkAPI),
  );
